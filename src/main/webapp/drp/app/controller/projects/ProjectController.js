/**
 * @author allenjin
 */
Ext.define("drp.app.controller.projects.ProjectController", {
    extend : "drp.app.controller.AbstractController",

    projectTreePanel : null,
    me : null,

    init : function() {
        
        me = this; 

        this.control({

            'projectview' : {
                afterrender : function(panel) {
                    projectTreePanel = panel.down('treepanel');
                    var store = projectTreePanel.getStore();
                    store.load({
                        node : store.getRootNode()
                    });
                }
            },

            // 查询项目
            'projectview button[action=searchProject]' : {
                click : this.searchProject
            },

            // 增加项目
            'projectview button[action=addProject]' : {
                click : this.showCreateProjectForm
            },
            
            // 添加系统
            'projectview button[action=addSystem]' : {
                click : this.showCreateSystemForm
            },

            // 更新项目
            'projectview > treepanel' : {
                itemdblclick : this.showUpdateProjectOrSystemForm,
                itemclick : function(tree, record, item, index, e, eOpts) {
                    tree.toggleOnDblClick = false;
                }
            },

            // 删除项目
            'projectview button[action=deleteProject]' : {
                click : this.deleteProject
            },

            'projectviewform button[action=submitProjectForm]' : {
                click : this.submitProjectForm
            },

            'projectviewform button[action=closeProjectForm]' : {
                click : this.closeProjectForm
            },
            
            'systemviewform button[action=submitSystemForm]' : {
                click : this.submitProjectForm
            },

            'systemviewform button[action=closeSystemForm]' : {
                click : this.closeSystemForm
            }

        });
    },

    showCreateProjectForm : function(btn) {
        var projectForm = Ext.widget("projectviewform");
        AlertWin.alert('新增项目', null, projectForm, 450, 240);
    },
    
    showCreateSystemForm : function(btn){
        var record = projectTreePanel.getSelectionModel().getSelection()[0];
        if (!record || record.data.leaf) {
            Ext.MessageBox.show({
                title : "提示",
                msg : "请先选择项目!",
                icon : Ext.MessageBox.INFO,
                buttons : Ext.Msg.OK
            });
            return;
        }
        var systemForm = Ext.widget("systemviewform");
        
        //设置项目名称
        var project = record;
        systemForm.down('#projectId').setValue(project.data.id);
        systemForm.down('#projectName').setValue(project.data.name);
        
        AlertWin.alert('添加系统', null, systemForm, 450, 180);
    },
    
    showUpdateProjectOrSystemForm : function(grid, record, item, index, e, eopts) {
        if (!record) {
            me.showPromptsOnUpdate("数据");
            return;
        } else {
            //如果是系统
            if(record.isLeaf()){
                var systemForm = Ext.widget("systemviewform");
                if (!record) {
                    me.showPromptsOnUpdate("系统");
                    return;
                } else {
                    systemForm.down('form').loadRecord(record);
                    
                    //设置项目名称
                    var project = record.parentNode;
                    systemForm.down('#projectId').setValue(project.data.id);
                    systemForm.down('#projectName').setValue(project.data.name);
                    
                    AlertWin.alert('修改系统', null, systemForm, 450, 180);
                }
            //如果是项目
            }else{
                var projectForm = Ext.widget("projectviewform");
                if (!record) {
                    me.showPromptsOnUpdate("项目");
                    return;
                } else {
                    //在弹出更新项目的form前，需要设置下面三部分内容
                    projectForm.down('form').loadRecord(record);
                    
                    //1.设置项目经理
                    var projectManagerRecord = Ext.create("drp.app.model.users.ProjectManagerModel", {
                        id : record.data.projectManager.id,
                        name : record.data.projectManager.name
                    });
                    projectForm.down('#projectManager_cb').setValue(projectManagerRecord);
                    
                    //2.设置库管员
                    var WareKeeperRecord = Ext.create("drp.app.model.users.WareKeeperModel", {
                        id : record.data.wareKeeper.id,
                        name : record.data.wareKeeper.name
                    });
                    projectForm.down('#wareKeeper_cb').setValue(WareKeeperRecord);
                    
                    //3.设置材料员
                    var MaterialKeeperRecord = Ext.create("drp.app.model.users.MaterialKeeperModel", {
                        id : record.data.materialKeeper.id,
                        name : record.data.materialKeeper.name
                    });
                    projectForm.down('#materialKeeper_cb').setValue(MaterialKeeperRecord);
                    
                    AlertWin.alert('修改项目', null, projectForm, 450, 240);
                }
            }
        }
    }, 

    deleteProject : function(btn) {
        var record = projectTreePanel.getSelectionModel().getSelection()[0];
        if (!record) {
            me.showPromptsOnDelete(name);
            return;
        } else {
            Ext.MessageBox.confirm("标题", "你要删除这个项目吗？", function(btn) {
                if (btn == 'yes') {
                    me.destroyTreeNode(record, {
                        success : function(records, operation) {
                            projectTreePanel.getSelectionModel().deselectAll();
                            projectTreePanel.getStore().load();
                            Ext.Msg.alert("成功!", operation.request.scope.reader.jsonData["message"]);
                        },
                        failure : function(records, operation) {
                            Ext.Msg.alert("失败!", operation.request.scope.reader.jsonData["message"]);
                        }
                    });
                }
            });
        }
    },

    submitProjectForm : function(btn) {
        var modelName = "drp.app.model.projects.ProjectModel";
        var form = btn.up('form').getForm();
        if (form.isValid()) {
            var formBean = form.getValues();
            var model = Ext.create(modelName, formBean);
            model.set("projectManager",formBean['projectManager.id']);
            model.set("wareKeeper",formBean['wareKeeper.id']);
            model.set("materialKeeper",formBean['materialKeeper.id']);
            me.saveModel(model, projectTreePanel);
        }
    },

    closeProjectForm : function(btn) {
        me.closeForm();
    },
    
    closeSystemForm : function(btn) {
        me.closeForm();
    },

    searchProject : function(btn) {
        var store = projectTreePanel.getStore();
        store.filters.clear();
        store.filter([ {
            property : "name",
            value : Ext.getCmp("projectName_filter").getValue()
        }, {
            property : "code",
            value : Ext.getCmp("projectCode_filter").getValue()
        }, {
            property : "city",
            value : Ext.getCmp("projectCity_filter").getValue()
        }, {
            property : "startDate",
            value : Ext.getCmp("projectStartDate_filter").getValue()
        }, {
            property : "endDate",
            value : Ext.getCmp("projectEndDate_filter").getValue()
        } ]);
    },

    models : [ "drp.app.model.projects.ProjectModel","drp.app.model.users.ProjectManagerModel",
               "drp.app.model.users.WareKeeperModel","drp.app.model.users.MaterialKeeperModel" ],
    stores : [ "drp.app.store.projects.ProjectStore", "drp.app.store.users.ProjectManagerStore",
               "drp.app.store.users.MaterialKeeperStore","drp.app.store.users.WareKeeperStore"],
    views : [ "drp.app.view.projects.ProjectView",
            "drp.app.view.projects.ProjectViewForm",
            "drp.app.view.projects.SystemViewForm" ]
});