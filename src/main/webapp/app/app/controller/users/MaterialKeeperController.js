Ext.define("wms.app.controller.users.MaterialKeeperController", {
	extend : "wms.app.controller.AbstractController",

	materialKeeperGrid : null,
	me : null,
	
	init : function() {

	    me = this; 
	    
		this.control({

		    'materialkeeperview' : {
                afterrender : function(panel) {
                    materialKeeperGrid = panel.down('gridpanel');
                    materialKeeperGrid.getStore().load();
                }
            },

            // 查询
            'materialkeeperview button[action=searchMaterialKeeper]' : {
                click : this.searchMaterialKeeper
            },

            // 增加
            'materialkeeperview button[action=addMaterialKeeper]' : {
                click : this.showCreateMaterialKeeperForm
            },

            // 更新
            'materialkeeperview gridpanel' : {
                itemdblclick : this.showUpdateMaterialKeeperForm
            },

            // 注销
            'materialkeeperview button[action=deleteMaterialKeeper]' : {
                click : this.deleteMaterialKeeper
            },

            'materialkeeperviewform button[action=submitMaterialKeeperForm]' : {
                click : this.submitMaterialKeeperForm
            },

            'materialkeeperviewform button[action=closeMaterialKeeperForm]' : {
                click : this.closeMaterialKeeperForm
            }
		    
		});
	},
	
	searchMaterialKeeper : function(btn){
		var store = materialKeeperGrid.getStore();
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
	
	showCreateMaterialKeeperForm : function(btn) {
        var wareForm = Ext.widget("materialkeeperviewform");
        AlertWin.alert('新增材料管理员', null, wareForm, 500, 220);
    },

    showUpdateMaterialKeeperForm : function(grid, record, item, index, e, eopts) {
        var wareForm = Ext.widget("materialkeeperviewform");
        if (!record) {
            me.showPromptsOnUpdate("材料管理员");
            return;
        } else {
            wareForm.down('form').loadRecord(record);
            AlertWin.alert('修改材料管理员', null, wareForm, 500, 220);
        }
    },

    deleteMaterialKeeper : function(btn) {
       // me.deleteModel(btn, materialKeeperGrid, "材料管理员");
    	me.deleteBatchModel(btn,materialKeeperGrid,"材料管理员","/materialKeeper/deleteBatch");
    },

    submitMaterialKeeperForm : function(btn) {
        var modelName = "wms.app.model.users.MaterialKeeperModel";
        var form = btn.up('form').getForm();
        if (form.isValid()) {
            var formBean = form.getValues();
            var model = Ext.create(modelName, formBean);
            me.saveModel(model, materialKeeperGrid);
        }
    },

    closeMaterialKeeperForm : function(btn) {
        me.closeForm();
    },

	models : [ "wms.app.model.users.MaterialKeeperModel" ],
	stores : [ "wms.app.store.users.MaterialKeeperStore" ],
	views : [ "wms.app.view.users.MaterialKeeperView","wms.app.view.users.MaterialKeeperViewForm" ]
});