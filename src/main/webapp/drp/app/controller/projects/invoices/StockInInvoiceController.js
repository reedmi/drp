/**
 * @author Yestin
 */
Ext.define("drp.app.controller.projects.invoices.StockInInvoiceController", {
    extend : "drp.app.controller.AbstractController",

    inInvoiceController : null,
    invoiceGrid : null,
    currentInvoice : null,
    inCostGrid : null,
    inCostForm : null,
    inInvoiceCostWin : null,//costWin默认是未创建的
    invoiceCostWin : null,
    wareWindow : null,

    init : function() {
        inInvoiceController = this;
        this.control({
            
            'stockininvoiceview' : {
                afterrender : function(panel) {
                    inInvoiceCostWin = false;
                    invoiceCostWin = false;
                    currentInvoice = null;
                    wareWindow= false;
                    invoiceGrid = panel.down('gridpanel');
//                    //只有材料员可以新建删除出库单
//                    if(user.type != "MaterialKeeper"){
//                        invoiceGrid.down('#addInInvoice_btn').setVisible(false);
//                        invoiceGrid.down('#deleteInInvoice_btn').setVisible(false);
//                    }
//                    if(user.type == "Leader"){
//                        invoiceGrid.down('#operationInInvoice_tb').setVisible(false);
//                    }
                }
            },
            
            //stock_in_invoice filter
            'stockininvoiceview > gridpanel' : {
                afterrender : this.buildFiltersByLoginUser,
                itemdblclick : this.showUpdateInInvoiceForm
            },
            
            //stock_in_invoice search
            'stockininvoiceview button[action=searchStockInInvoice]' : {
                click : this.searchStockInInvoice
            },

            //stock_in_invoice add
            'stockininvoiceview button[action=showAddInInvoiceUI]' : {
                click : this.showCreateInInvoiceForm
            },

            //stock_in_invoice delete
            'stockininvoiceview button[action=deleteInInvoice]' : {
                click : this.deleteInInvoice
            },

            //stock_in_invoice approve-submit
            'stockininvoiceview button[action=approveInInvoice]' : {
                click : this.approveInInvoice
            },
            
            //stock_in_invoice unapprove-submit
            'stockininvoiceview button[action=unapproveInInvoice]' : {
                click : this.unapproveInInvoice
            },

            //----------------------------------------------------------------
            'stockincostview' : {
                afterrender : function(panel) {
                    inCostGrid = panel.down('grid');
                    inCostForm = panel.down('#stockInCost_form');
                },
                beforehide : this.updateInvoiceTotalPrice
            },
            
            //stock_in_cost add system info
            'stockincostview button[action=addSystemInfo]' : {
                click : this.addSystemInfo
            },
            
            //stock_in_cost save
            'stockincostview button[action=saveStockInCost]' : {
                click : this.saveStockInCost
            },

            //stock_in_cost delete
            'stockincostview button[action=deleteStockInCost]' : {
                click : this.deleteStockInCost
            },
            
             //stock_in_cost choose ware
            'stockincostview button[action=chooseWare]' : {
                click : function(btn){
                    
                    // 加载弹窗相关的controller
                    if(!wareWindow){
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
            
            //-----------------------------------------------------------
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
                                    var costForm = inInvoiceCostWin.down('#stockInCost_form');
                                    costForm.down('#wareName_stockInCost_tf').setValue(record.data.name);
                                    costForm.down('#wareId_stockInCost_tf').setValue(record.data.id);
                                    costForm.down('#wareModel_stockInCost_tf').setValue(record.data.model);
                                    costForm.down('#wareUnit_stockInCost_tf').setValue(record.data.unit);
                                }
                            }
                        }]
                    }).showAt(e.getXY());
                }
            }

        });
    },
    
    //入库单-查询
    searchStockInInvoice : function(btn){
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
    
    //根据当前登录用户过滤入库单
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
    deleteStockInCost : function(btn) {
        inInvoiceController.deleteModel(btn, inCostGrid, "商品条目");
        var grid = inCostGrid;
        var name = "商品条目";
        var record = grid.getSelectionModel().getSelection()[0];
        if (!record) {
            inInvoiceController.showPromptsOnDelete(name);
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
    saveStockInCost : function(btn) {
        var modelName = "drp.app.model.projects.costs.StockInCostModel";
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
                    var store = inCostGrid.getStore();
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

    //入库单-新增
    showCreateInInvoiceForm : function() {
        if(!inInvoiceCostWin){
            inInvoiceCostWin = Ext.widget('stockincostview');
        }
        var store = inInvoiceCostWin.down("gridpanel").getStore();
        //在弹出新建入库单的页面之前，需要做三部分工作：清空store、合价设置为0
        currentInvoice = null;
        store.removeAll(false);
        inInvoiceCostWin.down('#addStockInCost_btn').setDisabled(true);
        inInvoiceCostWin.down('#totalPrice_stockInCost_df').setValue(0);
        inInvoiceCostWin.down('#systemInfo_stockInCost_form').getForm().reset();
        inInvoiceCostWin.down('#stockInCost_form').getForm().reset();
        //设置bottom toolbar
        var wareKeeperName = inInvoiceCostWin.down('#wareKeeperName_df');
        var materialKeeperName = inInvoiceCostWin.down('#materialKeeperName_df');
        var projectManagerName = inInvoiceCostWin.down('#projectManagerName_df');
        wareKeeperName.setValue("");
        materialKeeperName.setValue("");
        projectManagerName.setValue("");
        
        inInvoiceCostWin.setTitle("新增入库单");
        inInvoiceCostWin.show();
    },
    
    showUpdateInInvoiceForm : function( grid, record, item, index){
        currentInvoice = record;//在弹出更新的窗口时，保存选中的invoice
        var invoiceData = record.data;
        
        var costWin = null;
        //1.非材料员登陆的，只提供预览
        //2.若是材料员，则pass=true的和已经通过审核的，只提供预览
        if(user.type != "MaterialKeeper" || invoiceData.pass || invoiceData.materialKeeperAuditState =="APPROVED"){
            if(!invoiceCostWin){
                invoiceCostWin = Ext.widget('stockincostshowview');
            }
            costWin = invoiceCostWin;
            invoiceCostWin.setTitle("查看入库单");
            
        }else{
            if(!inInvoiceCostWin){
                inInvoiceCostWin = Ext.widget('stockincostview');
            }
            costWin = inInvoiceCostWin;
            costWin.down('#addStockInCost_btn').setDisabled(false);
            costWin.down('#stockInCost_form').getForm().reset();
            inInvoiceCostWin.setTitle("更新入库单");
        }
        
        var store = costWin.down("gridpanel").getStore();
        store.filters.clear();
        store.filter([{
            property : "invoice",
            value : currentInvoice.data.id
        }]);
        
        costWin.down('#systemInfo_stockInCost_form').loadRecord(record);
        
        //设置bottom form,包括材料员、库管员、项目经理的名字
        var materialKeeperName = costWin.down('#materialKeeperName_df');
        var wareKeeperName = costWin.down('#wareKeeperName_df');
        var projectManagerName = costWin.down('#projectManagerName_df');
        
        materialKeeperName.setValue(invoiceData['materialKeeperName']);
        wareKeeperName.setValue(invoiceData['wareKeeperName']);
        projectManagerName.setValue(invoiceData['projectManagerName']);
        
        costWin.show();
    },

    //入库单-删除
    deleteInInvoice : function(btn) {
        inInvoiceController.deleteBatchModel(btn,invoiceGrid,"入库单","/stockInInvoice/deleteBatch");
    },

    //入库单-更新总价
    updateInvoiceTotalPrice : function(panel){
        panel.down('#chooseWare_stockInCost_btn').setDisabled(true);
        var totalPrice_stockInCost = panel.down('#totalPrice_stockInCost_df').getValue();
        if(!currentInvoice){
            return;
        }
        if(currentInvoice.data.totalPrice == totalPrice_stockInCost){
            return;
        }
        
        currentInvoice.set("forDate",panel.down('#forDate_stockInInvoice_df').getValue());
        currentInvoice.set("code",panel.down('#code_stockInInvoice_tf').getValue());
        currentInvoice.set("totalPrice",totalPrice_stockInCost);
        currentInvoice.set("system", null);
        
        currentInvoice.save({
            success : function(response, operation) {
                invoiceGrid.getStore().load();
            },
            failure : function(response, operation) {
                Ext.Msg.alert("失败!", operation.request.scope.reader.jsonData["message"]);
            }
        });
    },

    approveInInvoice : function(btn){
        
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
            Ext.Msg.alert("提交退回", "该入库单已被提交或者还未添加商品");
            return;
        }
        
        var data = new Object({
            invoiceIds : ids,
            userType : user.type,
            userId : user.id,
            state : state
        });
        
        Ext.Ajax.request({
            url : "stockInInvoice/updateAuditState",
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
    
    unapproveInInvoice : function(){
        inInvoiceController.submitInInvoiceToAudit("UNAPPROVED");
    },
    
    addSystemInfo : function(btn){
        var modelName = "drp.app.model.projects.invoices.StockInInvoiceModel";
        var form = btn.up("form").getForm();
        if (form.isValid()) {
            var formBean = form.getValues();
            var model = Ext.create(modelName, formBean);
            
            model.set("system", {
                id : formBean['system.id']
            });
            
            model.save({
                success : function(response, operation){
                    invoiceGrid.getStore().load();
                    var reader = operation.request.scope.reader;
                    currentInvoice = Ext.create(modelName,{
                        id : reader.jsonData["object"]
                    });
                    btn.up("form").down('#id_stockInInvoice').setValue(reader.jsonData["object"]);
                    btn.up("stockincostview").down('#addStockInCost_btn').setDisabled(false);
                    Ext.Msg.alert("成功!", reader.jsonData["message"]);
                },
                failure : function(response, operation) {
                    Ext.Msg.alert("失败!", operation.request.scope.reader.jsonData["message"]);
                }
            });
        }
    },

    submitInInvoiceToAudit : function(state){
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
            url : "stockInInvoice/updateAuditState",
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
    
    models : ["drp.app.model.projects.invoices.StockInInvoiceModel",
              "drp.app.model.projects.costs.StockInCostModel", 
              "drp.app.model.resources.WareModel"],
    stores : ["drp.app.store.projects.invoices.StockInInvoiceStore", 
              "drp.app.store.projects.costs.StockInCostStore",
              "drp.app.store.projects.ProjectDataStore",
              "drp.app.store.resources.WareStore", 
              "drp.app.store.resources.VendorStore"],
    views : ["drp.app.view.projects.invoices.StockInInvoiceView", 
             "drp.app.view.projects.costs.StockInCostView",
             "drp.app.view.projects.costs.StockInCostShowView",
             "drp.app.view.resources.WareView",
             "drp.app.view.resources.WareWindow",
             "drp.app.view.resources.WareViewForm" ]
});