Ext.define("wms.app.controller.AbstractController", {
	extend : "Ext.app.Controller",

	me : null,
	
	init : function() {
	    me = this;
	},

	/**
	 * btn：删除按钮；grid：view的grid；name：提示信息
	 */
	deleteModel : function(btn, grid, name,fn) {
		var record = grid.getSelectionModel().getSelection()[0];
		if (!record) {
		    me.showPromptsOnDelete(name);
			return;
		} else {
			Ext.MessageBox.confirm("标题", "你要删除这个" + name + "吗？", function(btn) {
				if (btn == 'yes') {
					record.destroy({
						success : function(record, operation) {
							var store = grid.getStore();
							var dataLength = store.data.length;
							if (dataLength > 1) {
								store.load();
							} else {
								store.loadPage(1);
							}
							Ext.Msg.alert("成功!", operation.request.scope.reader.jsonData["message"]);
						},
						failure : function(record, operation) {
							Ext.Msg.alert("失败!", operation.request.scope.reader.jsonData["message"]);
						}
					});
				}
			});
		}
	},
	/*
	 * 批量删除
	 */
    deleteBatchModel : function(btn, grid, name,actionUrl){
    	var records = grid.getSelectionModel().getSelection();
    	var ids = [];
    	for(var i = 0,len = records.length;i<len;i++){
    		ids[i] = records[i].data.id;
    	}
    	
    	var data = new Object({
    		ids : ids
    	});
		Ext.MessageBox.confirm("标题", "确定删除所选的" + name + "吗？", function(btn) {
			if (btn == 'yes') {
		    	Ext.Ajax.request({
		            url : ctx+actionUrl,
		            method : "GET",
		            params : {
		            	data : Ext.encode(data)
		            },
		            success : function(response, operation){
		            	var resp = Ext.decode(response.responseText);
		            	Ext.Msg.alert("成功!", resp.message);
		            	grid.getStore().load();
		            },
		            failure : function(response, operation) {
		            	Ext.Msg.alert("失败!", operation.request.scope.reader.jsonData["message"]);
		            }
		        });
			}
		});
    },
	/**
	 * modelName：指代model名全路径(包名+类名)
	 */
	submitForm : function(btn, grid, modelName,extraParams) {
		var form = btn.up('form').getForm();
		if (form.isValid()) {
			var formBean = form.getValues();
			var model = Ext.create(modelName, formBean);
			me.saveModel(model, grid);
		}
	},
	
	/**
	 * @param model
	 * @param grid
	 * @param hidden(default=true,close window after saving data)
	 */
	saveModel : function(model,grid,hidden){
	    model.save({
            success : function(response, operation) {
                grid.getStore().load();
                Ext.Msg.alert("成功!", operation.request.scope.reader.jsonData["message"]);
                if(hidden == null){
                	hidden=true;
                }
                if(hidden){
	                AlertWin.hide();
                }
            },
            failure : function(response, operation) {
                Ext.Msg.alert("失败!", operation.request.scope.reader.jsonData["message"]);
            }
        });
	},
	
	//显示提示信息
	showPromptsOnDelete : function(name){
	    me.showPrompts(name, "删除");
	},
	
	showPromptsOnUpdate : function(name){
        me.showPrompts(name, "修改");
    },
    
    showPrompts : function(name,action){
        Ext.MessageBox.show({
            title : "提示",
            msg : "请先选择要"+action+"的" + name + "!",
            icon : Ext.MessageBox.INFO,
            buttons : Ext.Msg.OK
        });
    },

	/**
	 * 关闭窗口
	 */
	closeForm : function(btn) {
		AlertWin.hide();
	},
	
	destroyTreeNode : function(me, options) {
        options = Ext.apply({}, options);

        var scope = options.scope || me, stores = me.stores, i = 0, storeCount, store, args, operation, callback;

        Ext.apply(options, {
            records : [me],
            action : 'destroy'
        });

        operation = new Ext.data.Operation(options);
        callback = function(operation) {
            args = [me, operation];
            if (operation.wasSuccessful()) {
                for (storeCount = stores.length; i < storeCount; i++) {
                    store = stores[i];
                    store.fireEvent('write', store, operation);
                    store.fireEvent('datachanged', store);
                    // Not firing refresh here, since it's a single record
                }
                me.clearListeners();
                Ext.callback(options.success, scope, args);
            } else {
                Ext.callback(options.failure, scope, args);
            }
            Ext.callback(options.callback, scope, args);
        };

        me.getProxy().destroy(operation, callback, me);
        return me;
    }
});