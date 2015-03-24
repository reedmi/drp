Ext.define("drp.app.controller.users.WareKeeperController", {
    extend : "drp.app.controller.AbstractController",

    wareKeeperGrid : null,
    me : null,
    
    init : function() {

        me = this; 
        
        this.control({

            'warekeeperview' : {
                afterrender : function(panel) {
                    wareKeeperGrid = panel.down('gridpanel');
                    wareKeeperGrid.getStore().load();
                }
            },

            // 查询
            'warekeeperview button[action=searchWareKeeper]' : {
                click : this.searchWareKeeper
            },

            // 增加
            'warekeeperview button[action=addWareKeeper]' : {
                click : this.showCreateWareKeeperForm
            },

            // 更新
            'warekeeperview gridpanel' : {
                itemdblclick : this.showUpdateWareKeeperForm
            },

            // 注销
            'warekeeperview button[action=deleteWareKeeper]' : {
                click : this.deleteWareKeeper
            },

            'warekeeperviewform button[action=submitWareKeeperForm]' : {
                click : this.submitWareKeeperForm
            },

            'warekeeperviewform button[action=closeWareKeeperForm]' : {
                click : this.closeWareKeeperForm
            }
            
        });
    },
    
    searchWareKeeper : function(btn){
        var store = wareKeeperGrid.getStore();
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
    
    showCreateWareKeeperForm : function(btn) {
        var wareForm = Ext.widget("warekeeperviewform");
        AlertWin.alert('新增库管', null, wareForm, 500, 220);
    },

    showUpdateWareKeeperForm : function(grid, record, item, index, e, eopts) {
        var wareForm = Ext.widget("warekeeperviewform");
        if (!record) {
            me.showPromptsOnUpdate("库管");
            return;
        } else {
            wareForm.down('form').loadRecord(record);
            AlertWin.alert('修改库管', null, wareForm, 500, 220);
        }
    },

    deleteWareKeeper : function(btn) {
        //me.deleteModel(btn, wareKeeperGrid, "库管");
        me.deleteBatchModel(btn,wareKeeperGrid,"库管","users/wareKeeper/deleteBatch");
    },

    submitWareKeeperForm : function(btn) {
        var modelName = "drp.app.model.users.WareKeeperModel";
        var form = btn.up('form').getForm();
        if (form.isValid()) {
            var formBean = form.getValues();
            var model = Ext.create(modelName, formBean);
            me.saveModel(model, wareKeeperGrid);
        }
    },

    closeWareKeeperForm : function(btn) {
        me.closeForm();
    },

    models : [ "drp.app.model.users.WareKeeperModel" , "drp.app.model.projects.ProjectModel"],
    stores : [ "drp.app.store.users.WareKeeperStore"],
    views : [ "drp.app.view.users.WareKeeperView","drp.app.view.users.WareKeeperViewForm" ]
});