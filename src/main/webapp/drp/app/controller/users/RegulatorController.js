Ext.define("drp.app.controller.users.RegulatorController", {
    extend : "drp.app.controller.AbstractController",

    regulatorGrid : null,
    me : null,
    
    init : function() {

        me = this; 
        
        this.control({

            'regulatorview' : {
                afterrender : function(panel) {
                    regulatorGrid = panel.down('gridpanel');
                    regulatorGrid.getStore().load();
                }
            },

            // 查询
            'regulatorview button[action=searchRegulator]' : {
                click : this.searchRegulator
            },

            // 增加
            'regulatorview button[action=addRegulator]' : {
                click : this.showCreateRegulatorForm
            },

            // 更新
            'regulatorview gridpanel' : {
                itemdblclick : this.showUpdateRegulatorForm
            },

            // 注销
            'regulatorview button[action=deleteRegulator]' : {
                click : this.deleteRegulator
            },

            'regulatorviewform button[action=submitRegulatorForm]' : {
                click : this.submitRegulatorForm
            },

            'regulatorviewform button[action=closeRegulatorForm]' : {
                click : this.closeRegulatorForm
            }
            
        });
    },
    
    searchRegulator : function(btn){
        var store = regulatorGrid.getStore();
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
    
    showCreateRegulatorForm : function(btn) {
        var wareForm = Ext.widget("regulatorviewform");
        AlertWin.alert('新增经手人', null, wareForm, 500, 220);
    },

    showUpdateRegulatorForm : function(grid, record, item, index, e, eopts) {
        var wareForm = Ext.widget("regulatorviewform");
        if (!record) {
            me.showPromptsOnUpdate("经手人");
            return;
        } else {
            wareForm.down('form').loadRecord(record);
            AlertWin.alert('修改经手人', null, wareForm, 500, 220);
        }
    },

    deleteRegulator : function(btn) {
        me.deleteBatchModel(btn,regulatorGrid,"经手人","users/regulator/deleteBatch");
    },

    submitRegulatorForm : function(btn) {
        var modelName = "drp.app.model.users.RegulatorModel";
        var form = btn.up('form').getForm();
        if (form.isValid()) {
            var formBean = form.getValues();
            var model = Ext.create(modelName, formBean);
            me.saveModel(model, regulatorGrid);
        }
    },

    closeRegulatorForm : function(btn) {
        me.closeForm();
    },

    models : [ "drp.app.model.users.RegulatorModel" ],
    stores : [ "drp.app.store.users.RegulatorStore" ],
    views : [ "drp.app.view.users.RegulatorView","drp.app.view.users.RegulatorViewForm" ]
});