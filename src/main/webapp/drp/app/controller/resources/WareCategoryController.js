Ext.define("drp.app.controller.resources.WareCategoryController", {
    extend : "drp.app.controller.AbstractController",

    wareCategoryTreePanel : null,
    me : null,

    init : function() {

        me = this; 

        this.control({

            'warecategoryview' : {
                afterrender : function(panel) {
                    wareCategoryTreePanel = panel.down('treepanel');
                    var store = wareCategoryTreePanel.getStore();
                    store.load({
                        node : store.getRootNode()
                    });
                }
            },

            // 查询类别
            'warecategoryview button[action=searchWareCategory]' : {
                click : this.searchWareCategory
            },

            // 增加类别
            'warecategoryview button[action=addWareCategory]' : {
                click : this.showCreateWareCategoryForm
            },

            // 更新类别
            'warecategoryview > treepanel' : {
                itemdblclick : this.showUpdateWareCategoryOrSystemForm,
                itemclick : function(tree, record, item, index, e, eOpts) {
                    tree.toggleOnDblClick = false;
                }
            },

            // 删除类别
            'warecategoryview button[action=deleteWareCategory]' : {
                click : this.deleteWareCategory
            },

            'warecategoryviewform button[action=submitWareCategoryForm]' : {
                click : this.submitWareCategoryForm
            },

            'warecategoryviewform button[action=closeWareCategoryForm]' : {
                click : this.closeWareCategoryForm
            }

        });
    },

    showCreateWareCategoryForm : function(btn) {
        var projectForm = Ext.widget("warecategoryviewform");
        AlertWin.alert('新增类别', null, projectForm, 450, 120);
    },

    showUpdateWareCategoryOrSystemForm : function(grid, record, item, index, e, eopts) {
        if (!record) {
            me.showPromptsOnUpdate("数据");
            return;
        } else {
            var wareCategoryForm = Ext.widget("warecategoryviewform");
            if (!record) {
                me.showPromptsOnUpdate("类别");
                return;
            } else {
                //在弹出更新类别的form前，需要设置下面三部分内容
                wareCategoryForm.down('form').loadRecord(record);
                AlertWin.alert('修改类别', null, wareCategoryForm, 450, 120);
            }
        }
    }, 

    deleteWareCategory : function(btn) {
        var record = wareCategoryTreePanel.getSelectionModel().getSelection()[0];
        if (!record) {
            me.showPromptsOnDelete(name);
            return;
        } else {
            Ext.MessageBox.confirm("标题", "你要删除这个类别吗？", function(btn) {
                if (btn == 'yes') {
                    me.destroyTreeNode(record, {
                        success : function(records, operation) {
                            wareCategoryTreePanel.getSelectionModel().deselectAll();
                            wareCategoryTreePanel.getStore().load();
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

    submitWareCategoryForm : function(btn) {
        var modelName = "drp.app.model.resources.WareCategoryModel";
        var form = btn.up('form').getForm();
        if (form.isValid()) {
            var formBean = form.getValues();
            var model = Ext.create(modelName, formBean);
            me.saveModel(model, wareCategoryTreePanel);
        }
    },

    closeWareCategoryForm : function(btn) {
        me.closeForm();
    },

    searchWareCategory : function(btn) {
        var store = wareCategoryTreePanel.getStore();
        store.filters.clear();
        store.filter([ {
            property : "name",
            value : Ext.getCmp("wareCategoryName_filter").getValue()
        }, {
            property : "code",
            value : Ext.getCmp("wareCategoryCode_filter").getValue()
        }]);
    },

    models : [ "drp.app.model.resources.WareCategoryModel"],
    stores : [ "drp.app.store.resources.WareCategoryStore"],
    views : [ "drp.app.view.resources.WareCategoryView", "drp.app.view.resources.WareCategoryViewForm"]
});