Ext.define("drp.app.controller.users.ManagerController", {
    extend : "drp.app.controller.AbstractController",

    managerGrid : null,
    me : null,

    init : function() {

        me = this; 
        
        this.control({

            'managerview' : {
                afterrender : function(panel) {
                    managerGrid = panel.down('gridpanel');
                    managerGrid.getStore().load();
                }
            },

            // 查询
            'managerview button[action=searchManager]' : {
                click : this.searchManager
            },

            // 增加
            'managerview button[action=addManager]' : {
                click : this.showCreateManagerForm
            },

            // 更新
            'managerview gridpanel' : {
                itemdblclick : this.showUpdateManagerForm
            },

            // 注销
            'managerview button[action=deleteManager]' : {
                click : this.deleteManager
            },

            'managerviewform button[action=submitManagerForm]' : {
                click : this.submitManagerForm
            },

            'managerviewform button[action=closeManagerForm]' : {
                click : this.closeManagerForm
            }
            
        });
    },
    
    searchManager : function(btn){
        var store = managerGrid.getStore();
        store.filters.clear();
        var form = btn.up("form");
        store.filter([ {
            property : "name",
            value : form.down("#name_filter").getValue()
        }, {
            property : "code",
            value : form.down("#code_filter").getValue()
        }, {
            property : "phone",
            value : form.down("#phone_filter").getValue()
        }, {
            property : "email",
            value : form.down("#email_filter").getValue()
        }, {
            property : "gender",
            value : form.down("#gender_filter").getValue()
        }, {
            property : "status",
            value : form.down("#status_filter").getValue()
        }]);
    },
    
    showCreateManagerForm : function(btn) {
        var wareForm = Ext.widget("managerviewform");
        AlertWin.alert('新增负责人', null, wareForm, 500, 220);
    },

    showUpdateManagerForm : function(grid, record, item, index, e, eopts) {
        var wareForm = Ext.widget("managerviewform");
        if (!record) {
            me.showPromptsOnUpdate("负责人");
            return;
        } else {
            wareForm.down('form').loadRecord(record);
            AlertWin.alert('修改负责人', null, wareForm, 500, 220);
        }
    },

    deleteManager : function(btn) {
        //me.deleteModel(btn, managerGrid, "负责人");
        me.deleteBatchModel(btn,managerGrid,"负责人","/projectManager/deleteBatch");
    },

    submitManagerForm : function(btn) {
        var modelName = "drp.app.model.users.ManagerModel";
        var form = btn.up('form').getForm();
        if (form.isValid()) {
            var formBean = form.getValues();
            var model = Ext.create(modelName, formBean);
            me.saveModel(model, managerGrid);
        }
    },

    closeManagerForm : function(btn) {
        me.closeForm();
    },

    models : [ "drp.app.model.users.ManagerModel" ],
    stores : [ "drp.app.store.users.ManagerStore" ],
    views : [ "drp.app.view.users.ManagerView","drp.app.view.users.ManagerViewForm" ]
});