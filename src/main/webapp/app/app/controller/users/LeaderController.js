Ext.define("wms.app.controller.users.LeaderController", {
	extend : "wms.app.controller.AbstractController",

	leaderGrid : null,
	me : null,
	
	init : function() {

	    me = this; 
	    
		this.control({

		    'leaderview' : {
                afterrender : function(panel) {
                    leaderGrid = panel.down('gridpanel');
                    leaderGrid.getStore().load();
                }
            },

            // 查询
            'leaderview button[action=searchLeader]' : {
                click : this.searchLeader
            },

            // 增加
            'leaderview button[action=addLeader]' : {
                click : this.showCreateLeaderForm
            },

            // 更新
            'leaderview gridpanel' : {
                itemdblclick : this.showUpdateLeaderForm
            },

            // 注销
            'leaderview button[action=deleteLeader]' : {
                click : this.deleteLeader
            },

            'leaderviewform button[action=submitLeaderForm]' : {
                click : this.submitLeaderForm
            },

            'leaderviewform button[action=closeLeaderForm]' : {
                click : this.closeLeaderForm
            }
		    
		});
	},
	
	searchLeader : function(btn){
		var store = leaderGrid.getStore();
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
	
	showCreateLeaderForm : function(btn) {
        var wareForm = Ext.widget("leaderviewform");
        AlertWin.alert('新增管理员', null, wareForm, 500, 220);
    },

    showUpdateLeaderForm : function(grid, record, item, index, e, eopts) {
        var wareForm = Ext.widget("leaderviewform");
        if (!record) {
            me.showPromptsOnUpdate("管理员");
            return;
        } else {
            wareForm.down('form').loadRecord(record);
            AlertWin.alert('修改管理员', null, wareForm, 500, 220);
        }
    },

    deleteLeader : function(btn) {
    	me.deleteBatchModel(btn,leaderGrid,"管理员","/leader/deleteBatch");
    },

    submitLeaderForm : function(btn) {
        var modelName = "wms.app.model.users.LeaderModel";
        var form = btn.up('form').getForm();
        if (form.isValid()) {
            var formBean = form.getValues();
            var model = Ext.create(modelName, formBean);
            me.saveModel(model, leaderGrid);
        }
    },

    closeLeaderForm : function(btn) {
        me.closeForm();
    },

	models : [ "wms.app.model.users.LeaderModel" ],
	stores : [ "wms.app.store.users.LeaderStore" ],
	views : [ "wms.app.view.users.LeaderView","wms.app.view.users.LeaderViewForm" ]
});