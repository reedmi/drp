/**
 * @author ReedMi
 */
Ext.define("wms.app.controller.projects.invoices.StockOutInvoiceController", {
    extend : "wms.app.controller.AbstractController",

    me : null,
    invoiceGrid : null,
    currentInvoice : null,
    outCostGrid : null,
    outCostForm : null,
    outInvoiceCostWin : null,//costWin默认是未创建的
    invoiceCostWin : null,
    wareWindow : null,

    init : function() {
        me = this;
        this.control({
        	
            'stockoutinvoiceview' : {
                afterrender : function(panel) {
                	outInvoiceCostWin = false;
                	invoiceCostWin = false;
                	currentInvoice = null;
                	wareWindow= false;
                    invoiceGrid = panel.down('gridpanel');
                    //只有材料员可以新建删除出库单
                    if(user.type != "MaterialKeeper"){
                    	invoiceGrid.down('#addOutInvoice_btn').setVisible(false);
                    	invoiceGrid.down('#deleteOutInvoice_btn').setVisible(false);
                    }
                    if(user.type == "Leader"){
                    	invoiceGrid.down('#operationOutInvoice_tb').setVisible(false);
                    }
                }
            },
            
            //stock_in_invoice filter
            'stockoutinvoiceview > gridpanel' : {
                afterrender : this.buildFiltersByLoginUser,
                itemdblclick : this.showUpdateOutInvoiceForm
            },
            
            //stock_in_invoice search
            'stockoutinvoiceview button[action=searchStockOutInvoice]' : {
                click : this.searchStockOutInvoice
            },

            //stock_in_invoice add
            'stockoutinvoiceview button[action=showAddOutInvoiceUI]' : {
                click : this.showCreateOutInvoiceForm
            },

            //stock_in_invoice delete
            'stockoutinvoiceview button[action=deleteOutInvoice]' : {
                click : this.deleteOutInvoice
            },

            //stock_in_invoice approve-submit
            'stockoutinvoiceview button[action=approveOutInvoice]' : {
                click : this.approveOutInvoice
            },
            
            //stock_in_invoice unapprove-submit
            'stockoutinvoiceview button[action=unapproveOutInvoice]' : {
                click : this.unapproveOutInvoice
            },

            //----------------------------------------------------------------
            'stockoutcostview' : {
                afterrender : function(panel) {
                    outCostGrid = panel.down('grid');
                    outCostForm = panel.down('#stockOutCost_form');
                    //设置只能选择、检索，不能增加删除
                },
                beforehide : this.updateInvoiceTotalPrice
            },
            
            //stock_in_cost add system info
            'stockoutcostview button[action=addSystemInfo]' : {
                click : this.addSystemInfo
            },
            
            //stock_in_cost save
            'stockoutcostview button[action=saveStockOutCost]' : {
                click : this.saveStockOutCost
            },

            //stock_in_cost delete
            'stockoutcostview button[action=deleteStockOutCost]' : {
                click : this.deleteStockOutCost
            },
            
             //stock_in_cost choose ware
            'stockoutcostview button[action=chooseWare]' : {
                click : function(btn){
                	// 加载弹窗相关的controller
                	if(!wareWindow){
				    	wareWindow = Ext.widget('warewindow');
				        var WareControllerName = "wms.app.controller.resources.WareController";
				    	if (!Ext.ClassManager.isCreated(WareControllerName)) {
			                var mainController = this.application.getController("wms.base.controller.MainController");
			                mainController.application.getController(WareControllerName).init();
			            }
			    	}
			        wareWindow.show();
			     }
            },
            
            //-----------------------------------------------------------
            'warewindow' :{
            	afterrender : function(panel) {
                    //设置只能选择、检索，不能增加删除
            		panel.down('toolbar').setVisible(false);
                }
            },
            'warewindow gridpanel' : {
            	itemcontextmenu : function(view, record, item, index, e){
            		// 禁用浏览器自带的右键菜单
			        e.preventDefault();
			        e.stopEvent();
			        
			        var wareName = record.data.name;
            		Ext.create('Ext.menu.Menu', {
            			minWidth : 0,
            			width : 62+(wareName.length)*13,
            			items : [{
            				text : '选择<font color="red">'+wareName+'</font>',
            				icon : 'resources/images/icons/ok.png',
            				listeners : {
            					click : function(item){
            						wareWindow.hide();
            						var costForm = outInvoiceCostWin.down('#stockOutCost_form');
            						costForm.down('#wareName_stockOutCost_tf').setValue(record.data.name);
            						costForm.down('#wareId_stockOutCost_tf').setValue(record.data.id);
            						costForm.down('#wareModel_stockOutCost_tf').setValue(record.data.model);
            						costForm.down('#wareUnit_stockOutCost_tf').setValue(record.data.unit);
            					}
            				}
            			}]
            		}).showAt(e.getXY());
            	}
            }

        });
    },
    
    //出库单-查询
    searchStockOutInvoice : function(btn){
    	var store = invoiceGrid.getStore();
    	var form = btn.up("form");
		store.filters.clear();
		store.filter([ {
			property : "startDate",
			value : Ext.Date.format(form.down("#startDate_filter").getValue(),'Y-m-d')
		}, {
			property : "endDate",
			value : Ext.Date.format(form.down("#endDate_filter").getValue(),'Y-m-d')
		}, {
			property : "project",
			value : form.down("#projectName_filter").getValue()
		}, {
			property : "system",
			value : form.down("#systemName_filter").getValue()
		}, {
			property : "minTotal",
			value : form.down("#minTotal_filter").getValue()
		}, {
			property : "maxTotal",
			value : form.down("#maxTotal_filter").getValue()
		}, {
			property : "wareName",
			value : form.down("#wareName_filter").getValue()
		},  {
			property : "receiveManName",
			value : form.down("#receiveManName_filter").getValue()
		}, {
			property : "materialKeeperName",
			value : form.down("#materialKeeperName_filter").getValue()
		}, {
			property : "wareKeeperName",
			value : form.down("#wareKeeperName_filter").getValue()
		}, {
			property : "projectManagerName",
			value : form.down("#projetManagerName_filter").getValue()
		} ]);
    },
    
    //根据当前登录用户过滤出库单
    buildFiltersByLoginUser : function(grid){
    	var filters = [];
    	var index = 0;
    	if(user.type == "MaterialKeeper"){
    		filters[index++] = new Object({
    			property : "materialKeeperId",
				value : user.id
    		});
    	}else if(user.type == "WareKeeper"){
    		filters[index++] = {
    			property : "materialKeeperAuditState",
				value : "APPROVED"
    		};
    		filters[index++] = {
    			property : "wareKeeperId",
				value : user.id
    		};
    	}else if(user.type == "ProjectManager"){
    		filters[index++] = new Object({
    			property : "wareKeeperAuditState",
				value : "APPROVED"
    		});
    		filters[index++] = new Object({
    			property : "projectManagerId",
				value : user.id
    		});
    	}
    	var store = grid.getStore();
        store.filters.clear();
        store.filter(filters);
    },

    //入库商品-删除
    deleteStockOutCost : function(btn) {
        me.deleteModel(btn, outCostGrid, "商品条目");
        var grid = outCostGrid;
        var name = "商品条目";
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

    //入库商品-提交保存
    saveStockOutCost : function(btn) {
        var modelName = "wms.app.model.projects.costs.StockOutCostModel";
        var form = btn.up("form").getForm();
        if (form.isValid()) {
            var formBean = form.getValues();
            var model = Ext.create(modelName, formBean);
            if(formBean.id){
	            model.set("ware",null);
	            model.set("invoice",null);
            }else{
	            model.set("ware", {
	                id : formBean['wareId']
	            });
	            model.set("invoice", {
	                id : currentInvoice.data.id
	            });
            }
            if(formBean.unitPrice == ""){
            	model.set("unitPrice",0);
            }
            model.save({
	    		success : function(response, operation) {
	                var store = outCostGrid.getStore();
	                store.filters.clear();
			        store.filter([{
			            property : "invoice",
			            value : currentInvoice.data.id
			        }]);
			        Ext.Msg.alert("失败!", operation.request.scope.reader.jsonData["message"]);
	            },
	            failure : function(response, operation) {
	                Ext.Msg.alert("失败!", operation.request.scope.reader.jsonData["message"]);
	            }
	    	});
        }
    },

    //出库单-新增
    showCreateOutInvoiceForm : function() {
        if(!outInvoiceCostWin){
	    	outInvoiceCostWin = Ext.widget('stockoutcostview');
    	}
    	var store = outInvoiceCostWin.down("gridpanel").getStore();
    	//在弹出新建出库单的页面之前，需要做三部分工作：清空store、合价设置为0
    	currentInvoice = null;
    	store.removeAll(false);
    	outInvoiceCostWin.down('#addStockOutCost_btn').setDisabled(true);
        outInvoiceCostWin.down('#totalPrice_stockOutCost_df').setValue(0);
    	outInvoiceCostWin.down('#systemInfo_stockOutCost_form').getForm().reset();
    	outInvoiceCostWin.down('#stockOutCost_form').getForm().reset();
    	//设置bottom toolbar
        var wareKeeperName = outInvoiceCostWin.down('#wareKeeperName_df');
        var materialKeeperName = outInvoiceCostWin.down('#materialKeeperName_df');
        var projectManagerName = outInvoiceCostWin.down('#projectManagerName_df');
        wareKeeperName.setValue("");
        materialKeeperName.setValue("");
        projectManagerName.setValue("");
        
        outInvoiceCostWin.setTitle("新增出库单");
        outInvoiceCostWin.show();
    },
    
    showUpdateOutInvoiceForm : function( grid, record, item, index){
    	currentInvoice = record;//在弹出更新的窗口时，保存选中的invoice
        var invoiceData = record.data;
        var costWin = null;
        
    	//1.非材料员登陆的，只提供预览
    	//2.若是材料员，则pass=true的和已经通过审核的，只提供预览
    	if(user.type != "MaterialKeeper" || invoiceData.pass || invoiceData.materialKeeperAuditState =="APPROVED"){
    		if(!invoiceCostWin){
		    	invoiceCostWin = Ext.widget('stockoutcostshowview');
	    	}
	    	costWin = invoiceCostWin;
	        invoiceCostWin.setTitle("查看出库单");
	    	
    	}else{
	    	if(!outInvoiceCostWin){
	    		outInvoiceCostWin = Ext.widget('stockoutcostview');
    		}
    		costWin = outInvoiceCostWin;
    		costWin.down('#addStockOutCost_btn').setDisabled(false);
        	costWin.down('#stockOutCost_form').getForm().reset();
	        outInvoiceCostWin.setTitle("更新出库单");
    	}
    	
    	var store = costWin.down("gridpanel").getStore();
        store.filters.clear();
        store.filter([{
            property : "invoice",
            value : currentInvoice.data.id
        }]);
        
        costWin.down('#systemInfo_stockOutCost_form').loadRecord(record);
        
        //设置bottom form
        var wareKeeperName = costWin.down('#wareKeeperName_df');
        var materialKeeperName = costWin.down('#materialKeeperName_df');
        var projectManagerName = costWin.down('#projectManagerName_df');
        var receiveMan = costWin.down('#receiveMan_df');
        
        wareKeeperName.setValue(invoiceData['materialKeeperName']);
        materialKeeperName.setValue(invoiceData['materialKeeperName']);
        projectManagerName.setValue(invoiceData['projectManagerName']);
        receiveMan.setValue(invoiceData['receiveMan']);
        
        costWin.show();
    },

    //出库单-删除
    deleteOutInvoice : function(btn) {
    	me.deleteBatchModel(btn,invoiceGrid,"出库单","/stockOutInvoice/deleteBatch");
    },

    //出库单-更新总价
    updateInvoiceTotalPrice : function(panel){
    	panel.down('#chooseWare_stockOutCost_btn').setDisabled(true);
    	var totalPrice_stockOutCost = panel.down('#totalPrice_stockOutCost_df').getValue();
    	if(!currentInvoice){
    		return;
    	}
    	if(currentInvoice.data.totalPrice == totalPrice_stockOutCost){
    		return;
    	}
    	
    	currentInvoice.set("forDate",panel.down('#forDate_stockOutInvoice_df').getValue());
    	currentInvoice.set("code",panel.down('#code_stockOutInvoice_tf').getValue());
    	currentInvoice.set("totalPrice",totalPrice_stockOutCost);
    	currentInvoice.set("system", null);
    	currentInvoice.set("materialKeeperAuditState", null);
		currentInvoice.set("wareKeeperAuditState",null);
		currentInvoice.set("projectManagerAuditState", null);
		
    	currentInvoice.save({
    		success : function(response, operation) {
                invoiceGrid.getStore().load();
            },
            failure : function(response, operation) {
                Ext.Msg.alert("失败!", operation.request.scope.reader.jsonData["message"]);
            }
    	});
    },

    approveOutInvoice : function(btn){
    	var state = "APPROVED";
    	var records = invoiceGrid.getSelectionModel().getSelection();
    	var ids = [];
    	var index = 0;
    	for(var i = 0,len = records.length;i<len;i++){
    		var record = records[i].data;
    		if(record.pass){
    			continue;
    		}
    		if(user.type=="MaterialKeeper"){
	    		if(record.materialKeeperAuditState !="APPROVED" && record.costCount>0){
	    			ids[index] = record.id;
	    			index++;
	    		}
    		}else if(user.type=="WareKeeper"){
    			if(record.materialKeeperAuditState =="APPROVED" && record.wareKeeperAuditState == "UNAUDITED" && record.projectManagerAuditState == "UNAUDITED"){
	    			ids[index] = record.id;
	    			index++;
	    		}
    		}else if(user.type=="ProjectManager"){
    			if(record.wareKeeperAuditState == "APPROVED" && record.projectManagerAuditState == "UNAUDITED"){
	    			ids[index] = record.id;
	    			index++;
	    		}
    		}
    	}
    	
    	if(ids.length == 0){
    		Ext.Msg.alert("提交退回", "该出库单已被提交或者还未添加商品");
    		return;
    	}
    	
    	var data = new Object({
    		invoiceIds : ids,
    		userType : user.type,
    		userId : user.id,
    		state : state
    	});
    	
    	Ext.Ajax.request({
            url : ctx+"/stockOutInvoice/updateAuditState",
            method : "GET",
            params : {
            	data : Ext.encode(data)
            },
            success : function(response, operation){
            	var resp = Ext.decode(response.responseText);
            	Ext.Msg.alert("成功!", resp.message);
            	invoiceGrid.getStore().load();
            },
            failure : function(resp, operation) {
            	Ext.Msg.alert("失败!", operation.request.scope.reader.jsonData["message"]);
            }
        });
    },
    
    unapproveOutInvoice : function(){
    	//me.submitOutInvoiceToAudit("UNAPPROVED");
    	var state = "UNAPPROVED";
    	var records = invoiceGrid.getSelectionModel().getSelection();
    	var ids = [];
    	for(var i = 0,len = records.length;i<len;i++){
    		ids[i] = records[i].data.id;
    	}
    	
    	var data = new Object({
    		invoiceIds : ids,
    		userType : user.type,
    		userId : user.id,
    		state : state
    	});
    	
    	Ext.Ajax.request({
            url : ctx+"/stockOutInvoice/updateAuditState",
            method : "GET",
            params : {
            	data : Ext.encode(data)
            },
            success : function(response, operation){
            	var resp = Ext.decode(response.responseText);
            	Ext.Msg.alert("成功!", resp.message);
            	invoiceGrid.getStore().load();
            },
            failure : function(resp, operation) {
            	Ext.Msg.alert("失败!", operation.request.scope.reader.jsonData["message"]);
            }
        });
    },
    
    addSystemInfo : function(btn){
    	var modelName = "wms.app.model.projects.invoices.StockOutInvoiceModel";
        var form = btn.up("form").getForm();
        if (form.isValid()) {
            var formBean = form.getValues();
            var model = Ext.create(modelName, formBean);
            model.set("system", {
                id : formBean['system.id']
            });
            model.set("materialKeeperAuditState", null);
            model.set("wareKeeperAuditState",null);
            model.set("projectManagerAuditState", null);
            model.save({
            	success : function(response, operation){
            		invoiceGrid.getStore().load();
            		var reader = operation.request.scope.reader;
            		currentInvoice = Ext.create(modelName,{
            			id : reader.jsonData["object"]
            		});
            		btn.up("form").down('#id_stockOutInvoice').setValue(reader.jsonData["object"]);
            		btn.up("stockoutcostview").down('#addStockOutCost_btn').setDisabled(false);
                	Ext.Msg.alert("成功!", reader.jsonData["message"]);
            	},
            	failure : function(response, operation) {
	                Ext.Msg.alert("失败!", operation.request.scope.reader.jsonData["message"]);
	            }
            });
        }
    },

    models : ["wms.app.model.projects.invoices.StockOutInvoiceModel",
			  "wms.app.model.projects.costs.StockOutCostModel", 
			  "wms.app.model.resources.WareModel"],
    stores : ["wms.app.store.projects.invoices.StockOutInvoiceStore", 
    		  "wms.app.store.projects.costs.StockOutCostStore",
              "wms.app.store.projects.ProjectDataStore",
              "wms.app.store.resources.WareStore", 
              "wms.app.store.resources.VendorStore"],
    views : ["wms.app.view.projects.invoices.StockOutInvoiceView", 
    		 "wms.app.view.projects.costs.StockOutCostView",
    		 "wms.app.view.projects.costs.StockOutCostShowView",
    		 "wms.app.view.resources.WareView",
    		 "wms.app.view.resources.WareWindow",
    		 "wms.app.view.resources.WareViewForm" ]
});