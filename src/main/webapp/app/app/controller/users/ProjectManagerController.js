Ext.define("wms.app.controller.users.ProjectManagerController", {
	extend : "wms.app.controller.AbstractController",

	projectManagerGrid : null,
	me : null,
	
	init : function() {

	    me = this; 
	    
		this.control({

		    'projectmanagerview' : {
                afterrender : function(panel) {
                    projectManagerGrid = panel.down('gridpanel');
                    projectManagerGrid.getStore().load();
                }
            },

            // 查询
            'projectmanagerview button[action=searchProjectManager]' : {
                click : this.searchProjectManager
            },

            // 增加
            'projectmanagerview button[action=addProjectManager]' : {
                click : this.showCreateProjectManagerForm
            },

            // 更新
            'projectmanagerview gridpanel' : {
                itemdblclick : this.showUpdateProjectManagerForm
            },

            // 注销
            'projectmanagerview button[action=deleteProjectManager]' : {
                click : this.deleteProjectManager
            },

            'projectmanagerviewform button[action=submitProjectManagerForm]' : {
                click : this.submitProjectManagerForm
            },

            'projectmanagerviewform button[action=closeProjectManagerForm]' : {
                click : this.closeProjectManagerForm
            }
		    
		});
	},
	
	searchProjectManager : function(btn){
		var store = projectManagerGrid.getStore();
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
	
	showCreateProjectManagerForm : function(btn) {
        var wareForm = Ext.widget("projectmanagerviewform");
        AlertWin.alert('新增项目经理', null, wareForm, 500, 220);
    },

    showUpdateProjectManagerForm : function(grid, record, item, index, e, eopts) {
        var wareForm = Ext.widget("projectmanagerviewform");
        if (!record) {
            me.showPromptsOnUpdate("项目经理");
            return;
        } else {
            wareForm.down('form').loadRecord(record);
            AlertWin.alert('修改项目经理', null, wareForm, 500, 220);
        }
    },

    deleteProjectManager : function(btn) {
        //me.deleteModel(btn, projectManagerGrid, "项目经理");
    	me.deleteBatchModel(btn,projectManagerGrid,"项目经理","/projectManager/deleteBatch");
    },

    submitProjectManagerForm : function(btn) {
        var modelName = "wms.app.model.users.ProjectManagerModel";
        var form = btn.up('form').getForm();
        if (form.isValid()) {
            var formBean = form.getValues();
            var model = Ext.create(modelName, formBean);
            me.saveModel(model, projectManagerGrid);
        }
    },

    closeProjectManagerForm : function(btn) {
        me.closeForm();
    },

	models : [ "wms.app.model.users.ProjectManagerModel" ],
	stores : [ "wms.app.store.users.ProjectManagerStore" ],
	views : [ "wms.app.view.users.ProjectManagerView","wms.app.view.users.ProjectManagerViewForm" ]
});