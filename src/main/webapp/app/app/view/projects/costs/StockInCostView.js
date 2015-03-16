Ext.define('wms.app.view.projects.resources.StockInCostView', {
    extend : 'Ext.window.Window',
    alias : 'widget.stockincostview',
    height: 510,
    width: 840,
    constrain : true,
    modal : true,
    closeAction : 'hide',
    layout : {
        type : 'border'
    },
    resizable : false,
    initComponent : function() {
        var me = this;
        
        var selModel = Ext.create('Ext.selection.CheckboxModel', {
	        listeners: {
	            selectionchange: function(sm, selections) {
	                me.down('#deleteStockInCost_btn').setDisabled(selections.length == 0);
	            }
		    }
	    });

        Ext.applyIf(me, {

            items : [{//<<<<<<<<<<<<<<<<<<<<入库单-抬头字段
                xtype : 'panel',
                region : 'north',
                layout : 'fit',
                height: 70,
                items : [{
                    xtype : 'form',
                    itemId : 'systemInfo_stockInCost_form',
                    items : [{
                        xtype : 'fieldcontainer',
                        layout : 'column',
                        items : [{
                        	xtype : 'textfield',//入库单的id
                        	itemId : 'id_stockInInvoice',
				            hidden : true,
				            name : 'id'
                        }, {
                            xtype : 'combobox',
                            margin : '5 0 0 15',
                            labelWidth: 60,
                            itemId : 'project_stockInInvoice_cb',
                            name : 'system.projectName',
                            editable : false,
                            allowBlank : false,
                            width : 300,
                            displayField :"name",
            				valueField :"id",
                            fieldLabel : '项目<font color="red">*</font>',
                            store : 'wms.app.store.projects.ProjectDataStore',
				            listeners : {
				            	afterrender : function(combo){
				            		//显示人员所属项目
				            		var store = combo.getStore();
				            		if(user.type != "Leader"){
				            			Ext.apply(store.proxy.extraParams, {
					                        userType : user.type,
					                        userId : user.id
					                    });
				            		}
				            	},
				            	select : function(combo,records){
				            		var project = records[0].data;
				            		var stockincostview = combo.up("stockincostview");
				            		//设置该项目下的人员
				            		stockincostview.down("#materialKeeperName_df").setValue(project.materialKeeper.name);
				            		stockincostview.down("#wareKeeperName_df").setValue(project.wareKeeper.name);
				            		stockincostview.down("#projectManagerName_df").setValue(project.projectManager.name);
				            		//根据项目动态加载下属系统
				            		var _url = ctx + "/project/" + project.id;
				            		var system = stockincostview.down("#systemName_stockInInvoice_cb");
				            		system.getStore().getProxy().url = _url;
				            		system.setValue("");
				            		system.setDisabled(false);
				            	}
				            }
                        }, {
                            xtype : 'combobox',
                            margin : '5 0 0 15',
                            labelWidth: 60,
                            itemId : 'systemName_stockInInvoice_cb',
                            name : 'system.name',
                            allowBlank : false,
				            editable : false,
				            disabled : true,
                            width : 300,
                            fieldLabel : '系统<font color="red">*</font>',
                            valueField : 'id',
                            displayField : 'name',
				            fieldLabel : '系统名称<font color="red">*</font>',
				            store : Ext.create('Ext.data.Store', {
				                fields : ['id', 'name'],
				                proxy : {
							        type : 'ajax',
							        reader : {
							            type : "json",
							            root : "data",
							            successProperty : 'success'
							        },
							        writer : {
							            type : "json"
							        }
							    }
				            }),
				            listeners : {
				            	select : function(combo){
				            		combo.up('form').down('#systemId_stockInInvoice_tf').setValue(combo.getSubmitValue());
				            	}
				            }
                        }, {
                        	xtype : 'numberfield',
				            hidden : true,
				            itemId : 'systemId_stockInInvoice_tf',
				            name : 'system.id'
                        }]
                    }, {
                        xtype : 'fieldcontainer',
                        layout : 'column',
                        items : [ { 
                        	xtype: 'datefield',
                            fieldLabel: '日期<font color="red">*</font>',
                            margin : '5 0 0 15',
                            labelWidth: 60,
                            itemId : 'forDate_stockInInvoice_df',
                            name : 'forDate',
                            editable : false,
                            width : 300,
                            format : 'Y-m-d'
                        }, { 
                        	xtype: 'textfield',
                            fieldLabel: '编号<font color="red">*</font>',
                            itemId : 'code_stockInInvoice_tf',
                            name : 'code',
                            margin : '5 0 0 15',
                            width : 300,
                            labelWidth: 60
                        }, {
                            xtype : 'button',
                            margin : '5 0 0 65',
                            action : 'addSystemInfo',
                            icon : 'resources/images/icons/ok.png',
                            text : '确认所属系统'
                        }]
                    }]
                }]
            }, {//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<入库单-商品列表
                xtype : 'gridpanel',
                region : 'center',
                height : 260,
                autoScroll : true,
                columnLines : true,
                selModel : selModel,
                store : 'wms.app.store.projects.costs.StockInCostStore',
                columns : [
					Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype : 'gridcolumn',
                    flex : 2,
                    text : '商品名',
                    dataIndex : 'ware.name'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'ware.model',
                    flex : 2,
                    text : '规格'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'ware.unit',
                    flex : 1,
                    text : '单位'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'unitPrice',
                    flex : 2,
                    text : '单价'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'quantity',
                    flex : 2,
                    text : '数目'
                }, {
                    xtype : 'gridcolumn',
                    dataIndex : 'total',
                    flex : 2,
                    text : '总价'
                }],
                dockedItems : [{
                    xtype : 'toolbar',
                    dock : 'top',
                    items : [{
                        xtype : 'button',
                        icon : 'resources/images/icons/add.png',
                        action : 'addStockInCost',
                        itemId : 'addStockInCost_btn',
                        text : '新增',
                        listeners : {
                            click : function() {
                                inCostForm.getForm().reset();
	                    		inCostForm.down('#chooseWare_stockInCost_btn').setDisabled(false);
                                inCostForm.down('#wareUnitPrice_stockInCost_nf').setReadOnly(false);
	                    		inCostForm.down('#wareQuantity_stockInCost_nf').setReadOnly(false);
	                    		inCostForm.down('#wareUnitPrice_stockInCost_nf').setValue(0);
                            }
                        }
                    }, '-', {
                        xtype : 'button',
                        icon : 'resources/images/icons/delete.png',
                        action : 'deleteStockInCost',
                        itemId : 'deleteStockInCost_btn',
		                disabled : true,
                        text : '删除'
                    }, '->', {
                        xtype : 'displayfield',
                        margin : '0 30 0 0',
                        labelWidth: 40,
                        itemId : 'totalPrice_stockInCost_df',
                        fieldLabel : '<B><font color="red">合价</font></B>',
                        listeners : {
	                        afterrender : function(displayfield) {
	                            var store = displayfield.up('stockincostview').down('grid').getStore();
	                            store.on("load", function() {
	                                var sumPrice = 0;
	                                var items = store.data.items;
	                                for (var i = 0; i < items.length; i++) {
	                                    sumPrice += parseInt(items[i].data.total);
	                                }
	                                displayfield.setValue(sumPrice);
	                            });
	                        }
	                    }
                    }]
                }],
                listeners : {
                	select : function(grid, record){
	                    var cost = record.data;
	                    var ware = cost.ware;
	                    //设置cost的id
	                    inCostForm.down('#id_stockInCost_tf').setValue(cost.id);
	                    //动态设置form表单
	                    inCostForm.down('#wareName_stockInCost_tf').setValue(ware.name);
	                    inCostForm.down('#wareModel_stockInCost_tf').setValue(ware.model);
	                    inCostForm.down('#wareUnit_stockInCost_tf').setValue(ware.unit);
	                    
	                    inCostForm.down('#chooseWare_stockInCost_btn').setDisabled(true);
	                    
	                    inCostForm.down('#wareUnitPrice_stockInCost_nf').setReadOnly(false);
	                    inCostForm.down('#wareUnitPrice_stockInCost_nf').setValue(cost.unitPrice);
	                    inCostForm.down('#wareQuantity_stockInCost_nf').setReadOnly(false);
	                    inCostForm.down('#wareQuantity_stockInCost_nf').setValue(cost.quantity);
	                }
                }
            }, {//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<入库单-商品添加的form
                xtype : 'panel',
                region : 'south',
                collapsible : true,
                height : 110,
                layout : 'fit',
                title : '商品信息',
                items : [{
                    xtype : 'form',
                    itemId : 'stockInCost_form',
                    items : [{
                        xtype : 'fieldcontainer',
                        layout : 'column',
                        items : [{
                        	xtype : 'textfield',//入库单的id
				            hidden : true,
				            name : 'id',
				            itemId : 'id_stockInCost_tf'
                        }, {
                            xtype : 'textfield',
                            margin : '15 0 0 10',
                            itemId : 'wareName_stockInCost_tf',
                            labelWidth : 50,
                            allowBlank : false,
                            readOnly : true,
                            fieldLabel : '名称<font color="red">*</font>'
                        }, {
                        	xtype : 'textfield',
                        	name : 'wareId',
                        	itemId : 'wareId_stockInCost_tf',
                        	hidden : true
                        }, {
                        	xtype : 'button',
	                        text : '浏览...',
	                        itemId : 'chooseWare_stockInCost_btn',
	                        disabled : true,
	                        action : 'chooseWare',
	                        margin : '15 0 0 5'
                        }, {
                            xtype : 'textfield',
                            margin : '15 0 0 15',
                            itemId : 'wareModel_stockInCost_tf',
                            labelWidth : 50,
                            readOnly : true,
                            fieldLabel : '规格'
                        }, {
                            xtype : 'textfield',
                            margin : '15 0 0 15',
                            itemId : 'wareUnit_stockInCost_tf',
                            labelWidth : 50,
                            readOnly : true,
                            allowBlank : false,
                            fieldLabel : '单位<font color="red">*</font>'
                        }]
                    }, {
                        xtype : 'fieldcontainer',
                        layout : 'column',
                        items : [{
                            xtype : 'numberfield',
                            margin : '5 0 0 10',
                            itemId : 'wareUnitPrice_stockInCost_nf',
                            name : 'unitPrice',
                            labelWidth : 50,
                            readOnly : true,
                            fieldLabel : '单价',
                            listeners : {
                                change : function(field, newValue, oldValue) {
                                    var form = field.up('form');
                                    var _quantity = form.down('#wareQuantity_stockInCost_nf').getValue();
                                    var _unitPrice = newValue;
                                    if (parseInt(_quantity) > 0)
                                        form.down('#wareTotal_stockInCost_nf').setValue(_quantity * _unitPrice);
                                    else
                                        form.down('#wareTotal_stockInCost_nf').setValue(0);
                                }
                            }
                        }, {
                            xtype : 'numberfield',
                            margin : '5 0 0 70',
                            itemId : 'wareQuantity_stockInCost_nf',
                            name : "quantity",
                            labelWidth : 50,
                            readOnly : true,
                            allowBlank : false,
                            fieldLabel : '数量<font color="red">*</font>',
                            listeners : {
                                change : function(field, newValue, oldValue) {
                                    var form = field.up('form');
                                    var _quantity = newValue;
                                    var _unitPrice = form.down('#wareUnitPrice_stockInCost_nf').getValue();
                                    if (parseInt(_quantity) > 0)
                                        form.down('#wareTotal_stockInCost_nf').setValue(_quantity * _unitPrice);
                                    else
                                        form.down('#wareTotal_stockInCost_nf').setValue(0);
                                }
                            }
                        }, {
                            xtype : 'numberfield',
                            margin : '5 0 0 15',
                            itemId : 'wareTotal_stockInCost_nf',
                            name : "total",
                            labelWidth : 50,
                            readOnly : true,
                            fieldLabel : '总价<font color="red">*</font>'
                        }, {
                        	xtype : 'button',
	                        formBind : true,
	                        text : '添加商品',
	                        action : 'saveStockInCost',
	                        icon : 'resources/images/icons/add2.png',
	                        margin : '5 0 0 20'
                        }]
                    }]
                }]
            }],
            dockedItems : [{//<<<<<<<<<<<<<<<<<<<<<<<<入库单-汇总人员信息
            	xtype: 'toolbar',
	            dock: 'bottom',
	            ui: 'footer',
	            items: [{
                    xtype : 'displayfield',
                    flex : 1,
                    margin : '0 0 0 30',
                    labelWidth: 50,
                    itemId : 'wareKeeperName_df',
                    fieldLabel : '库管员'
                }, {
                    xtype : 'displayfield',
                    flex : 1,
                    labelWidth: 50,
                    itemId : 'materialKeeperName_df',
                    fieldLabel : '材料员'
                }, {
                    xtype : 'displayfield',
                    flex : 1,
                    labelWidth: 60,
                    itemId : 'projectManagerName_df',
                    fieldLabel : '项目经理'
                }]
	        }]
        });
        me.callParent(arguments);
    }
    
    
});