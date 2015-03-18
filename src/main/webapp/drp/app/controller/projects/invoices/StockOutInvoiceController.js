/**
 * @author ReedMi
 */
Ext.define("drp.app.controller.projects.invoices.StockOutInvoiceController", {
    extend : "drp.app.controller.AbstractController",

    me : null,
    invoiceGrid : null,
    currentInvoice : null,
    outCostGrid : null,
    outCostForm : null,
    outInvoiceCostWin : null,// costWin默认是未创建的
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
                    wareWindow = false;
                    invoiceGrid = panel.down('gridpanel');
                    invoiceGrid.getStore().load();
                }
            },

            // stock_in_invoice filter
            'stockoutinvoiceview > gridpanel' : {
                itemdblclick : this.showUpdateOutInvoiceForm
            },

            // stock_in_invoice search
            'stockoutinvoiceview button[action=searchStockOutInvoice]' : {
                click : this.searchStockOutInvoice
            },

            // stock_in_invoice add
            'stockoutinvoiceview button[action=showAddOutInvoiceUI]' : {
                click : this.showCreateOutInvoiceForm
            },

            // stock_in_invoice delete
            'stockoutinvoiceview button[action=deleteOutInvoice]' : {
                click : this.deleteOutInvoice
            },

            // stock_in_invoice approve-submit
            'stockoutinvoiceview button[action=approveOutInvoice]' : {
                click : this.approveOutInvoice
            },

            // stock_in_invoice unapprove-submit
            'stockoutinvoiceview button[action=unapproveOutInvoice]' : {
                click : this.unapproveOutInvoice
            },

            // ----------------------------------------------------------------
            'stockoutcostview' : {
                afterrender : function(panel) {
                    outCostGrid = panel.down('grid');
                    outCostForm = panel.down('#stockOutCost_form');
                    // 设置只能选择、检索，不能增加删除
                },
                beforehide : this.updateInvoiceTotalPrice
            },

            'stockoutcostview button[action=confirmInvoiceHeader]' : {
                click : this.confirmInvoiceHeader
            },

            // stock_in_cost save
            'stockoutcostview button[action=saveStockOutCost]' : {
                click : this.saveStockOutCost
            },

            // stock_in_cost delete
            'stockoutcostview button[action=deleteStockOutCost]' : {
                click : this.deleteStockOutCost
            },

            // stock_in_cost choose ware
            'stockoutcostview button[action=chooseWare]' : {
                click : function(btn) {
                    // 加载弹窗相关的controller
                    if (!wareWindow) {
                        wareWindow = Ext.widget('warewindow');
                        var WareControllerName = "drp.app.controller.resources.WareController";
                        if (!Ext.ClassManager.isCreated(WareControllerName)) {
                            var mainController = this.application.getController("drp.base.controller.MainController");
                            mainController.application.getController(WareControllerName).init();
                        }
                    }
                    wareWindow.show();
                }
            },

            // -----------------------------------------------------------
            'warewindow' : {
                afterrender : function(panel) {
                    // 设置只能选择、检索，不能增加删除
                    panel.down('toolbar').setVisible(false);
                }
            },
            'warewindow gridpanel' : {
                itemcontextmenu : function(view, record, item, index, e) {
                    // 禁用浏览器自带的右键菜单
                    e.preventDefault();
                    e.stopEvent();

                    var wareName = record.data.name;
                    Ext.create('Ext.menu.Menu', {
                        minWidth : 0,
                        width : 62 + (wareName.length) * 13,
                        items : [{
                            text : '选择<font color="red">' + wareName + '</font>',
                            icon : 'resources/images/icons/ok.png',
                            listeners : {
                                click : function(item) {
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

    // 出库单-查询
    searchStockOutInvoice : function(btn) {
        var store = invoiceGrid.getStore();
        var form = btn.up("form");
        store.filters.clear();
        store.filter([{
            property : "startDate",
            value : Ext.Date.format(form.down("#startDate_filter").getValue(), 'Y-m-d')
        }, {
            property : "endDate",
            value : Ext.Date.format(form.down("#endDate_filter").getValue(), 'Y-m-d')
        }, {
            property : "minTotal",
            value : form.down("#minTotal_filter").getValue()
        }, {
            property : "maxTotal",
            value : form.down("#maxTotal_filter").getValue()
        }, {
            property : "wareName",
            value : form.down("#wareName_filter").getValue()
        }, {
            property : "receiveManName",
            value : form.down("#receiveManName_filter").getValue()
        }, {
            property : "regulatorName",
            value : form.down("#regulatorName_filter").getValue()
        }, {
            property : "wareKeeperName",
            value : form.down("#wareKeeperName_filter").getValue()
        }, {
            property : "managerName",
            value : form.down("#managerName_filter").getValue()
        }]);
    },

    // 入库商品-删除
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

    // 入库商品-提交保存
    saveStockOutCost : function(btn) {
        var modelName = "drp.app.model.projects.costs.StockOutCostModel";
        var form = btn.up("form").getForm();
        if (form.isValid()) {
            var formBean = form.getValues();
            var model = Ext.create(modelName, formBean);
            if (formBean.id) {
                model.set("ware", null);
                model.set("invoice", null);
            } else {
                model.set("ware", {
                    id : formBean['wareId']
                });
                model.set("invoice", {
                    id : currentInvoice.data.id
                });
            }
            if (formBean.unitPrice == "") {
                model.set("unitPrice", 0);
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

    // 出库单-新增
    showCreateOutInvoiceForm : function() {
        if (!outInvoiceCostWin) {
            outInvoiceCostWin = Ext.widget('stockoutcostview');
        }
        var store = outInvoiceCostWin.down("gridpanel").getStore();
        // 在弹出新建出库单的页面之前，需要做三部分工作：清空store、合价设置为0
        currentInvoice = null;
        store.removeAll(false);
        outInvoiceCostWin.down('#addStockOutCost_btn').setDisabled(true);
        outInvoiceCostWin.down('#totalPrice_stockOutCost_df').setValue(0);
        outInvoiceCostWin.down('#header_stockOutCost_form').getForm().reset();
        outInvoiceCostWin.down('#stockOutCost_form').getForm().reset();

        outInvoiceCostWin.setTitle("新增出库单");
        outInvoiceCostWin.show();
    },

    showUpdateOutInvoiceForm : function(grid, record, item, index) {
        currentInvoice = record;// 在弹出更新的窗口时，保存选中的invoice
        var invoiceData = record.data;
        var costWin = null;

        // 1.非材料员登陆的，只提供预览
        // 2.若是材料员，则pass=true的和已经通过审核的，只提供预览
        if (user.type != "WAREKEEPER") {
            if (!invoiceCostWin) {
                invoiceCostWin = Ext.widget('stockoutcostshowview');
            }
            costWin = invoiceCostWin;
            invoiceCostWin.setTitle("查看出库单");
        } else {
            if (!outInvoiceCostWin) {
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

        costWin.down('#header_stockOutCost_form').loadRecord(record);

        // 设置bottom form
        var managerName = costWin.down('#managerName_df');
        var wareKeeperName = costWin.down('#wareKeeperName_df');
        var regulatorName = costWin.down('#regulatorName_df');
        managerName.setValue(record.data['manager']);
        wareKeeperName.setValue(record.data['wareKeeper']);
        regulatorName.setValue(record.data['regulator']);

        costWin.show();
    },

    // 出库单-删除
    deleteOutInvoice : function(btn) {
        me.deleteBatchModel(btn, invoiceGrid, "出库单", "/invoices/out/deleteBatch");
    },

    // 出库单-更新总价
    updateInvoiceTotalPrice : function(panel) {
        panel.down('#chooseWare_stockOutCost_btn').setDisabled(true);
        var totalPrice_stockOutCost = panel.down('#totalPrice_stockOutCost_df').getValue();
        if (!currentInvoice) {
            return;
        }
        if (currentInvoice.data.totalPrice == totalPrice_stockOutCost) {
            return;
        }

        currentInvoice.set("forDate", panel.down('#forDate_stockOutInvoice_df').getValue());
        currentInvoice.set("code", panel.down('#code_stockOutInvoice_tf').getValue());
        currentInvoice.set("totalPrice", totalPrice_stockOutCost);

        currentInvoice.save({
            success : function(response, operation) {
                invoiceGrid.getStore().load();
            },
            failure : function(response, operation) {
                Ext.Msg.alert("失败!", operation.request.scope.reader.jsonData["message"]);
            }
        });
    },

    confirmInvoiceHeader : function(btn) {
        var modelName = "drp.app.model.projects.invoices.StockOutInvoiceModel";
        var form = btn.up("form").getForm();
        if (form.isValid()) {
            var formBean = form.getValues();
            var model = Ext.create(modelName, formBean);
            model.save({
                success : function(response, operation) {
                    invoiceGrid.getStore().load();
                    var reader = operation.request.scope.reader;
                    currentInvoice = Ext.create(modelName, {
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

    models : ["drp.app.model.projects.invoices.StockOutInvoiceModel", "drp.app.model.projects.costs.StockOutCostModel", "drp.app.model.resources.WareModel"],
    stores : ["drp.app.store.projects.invoices.StockOutInvoiceStore", "drp.app.store.projects.costs.StockOutCostStore", "drp.app.store.resources.WareStore",
            "drp.app.store.resources.VendorStore", "drp.app.store.users.ManagerStore", "drp.app.store.users.WareKeeperStore", "drp.app.store.users.RegulatorStore"],
    views : ["drp.app.view.projects.invoices.StockOutInvoiceView", "drp.app.view.projects.costs.StockOutCostView", "drp.app.view.projects.costs.StockOutCostShowView",
            "drp.app.view.resources.WareView", "drp.app.view.resources.WareWindow", "drp.app.view.resources.WareViewForm"]
});