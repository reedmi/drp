Ext.define("drp.base.controller.MainController", {
    extend : 'Ext.app.Controller',
    uses : ['drp.base.controller.MenuItemController'],
    _self : null,
    menuItemController : null,
    init : function() {

        _self = this;
        menuItemController = Ext.create("drp.base.controller.MenuItemController");

        this.control({
            'westview treepanel' : {
                itemclick : function(tree, record, item, index, e, eOpts) {
                    _self.itemSelect(tree, record, item, index, e, eOpts, this);
                }
            }
        });
    },

    itemSelect : function(tree, record, item, index, e, eOpts, self) {
        
        //获得centerview
        var mainView = tree.up("mainview").down("centerview");
        
        var itemViewXtype = null;
        var itemViewController = null;
        var itemViewName = null;
        
        //==========================库存管理========================================
        if(record.data["id"] == "menu_current_inventory"){
            itemViewXtype = "currentinventoryview";
            itemViewController = "drp.app.controller.projects.inventories.CurrentInventoryController";
            itemViewName = "drp.app.view.projects.inventories.CurrentInventoryView";
        }else if(record.data["id"] == "menu_monthend_inventory"){
            itemViewXtype = "monthendinventoryview";
            itemViewController = "drp.app.controller.projects.inventories.MonthendInventoryController";
            itemViewName = "drp.app.view.projects.inventories.MonthendInventoryView";
        }
        //==========================出入库管理=======================================
        else if(record.data["id"] == "menu_stockin"){//入库单
            itemViewXtype = "stockininvoiceview";
            itemViewController = "drp.app.controller.projects.invoices.StockInInvoiceController";
            itemViewName = "drp.app.view.projects.invoices.StockInInvoiceView";
        }else if(record.data["id"] == "menu_stockout"){//入库单
            itemViewXtype = "stockoutinvoiceview";
            itemViewController = "drp.app.controller.projects.invoices.StockOutInvoiceController";
            itemViewName = "drp.app.view.projects.invoices.StockOutInvoiceView";
        }
        //==============================用户管理====================================
        else if(record.data["id"] == "menu_manager"){//库管员
            itemViewXtype = "managerview";
            itemViewController = "drp.app.controller.users.ManagerController";
            itemViewName = "drp.app.view.users.MaterialKeeperView";
        }else if(record.data["id"] == "menu_warekeeper"){//负责人
            itemViewXtype = "warekeeperview";
            itemViewController = "drp.app.controller.users.WareKeeperController";
            itemViewName = "drp.app.view.users.WareKeeperView";
        }else if(record.data["id"] == "menu_regulator"){//经手人
            itemViewXtype = "regulatorview";
            itemViewController = "drp.app.controller.users.RegulatorController";
            itemViewName = "drp.app.view.users.RegulatorView";
        }
        //===============================项目管理=======================================
        else if(record.data["id"] == "menu_project"){
            itemViewXtype = "projectview";
            itemViewController = "drp.app.controller.projects.ProjectController";
            itemViewName = "drp.app.view.projects.ProjectView";
        }
        //================================商品管理======================================
        else if(record.data['id'] == 'menu_ware_category') {
            itemViewXtype = "warecategoryview";
            itemViewController = "drp.app.controller.resources.WareCategoryController";
            itemViewName = "drp.app.view.resources.WareCategoryView";
        }else if(record.data["id"] == "menu_ware") {//商品列表
            itemViewXtype = "wareview";
            itemViewController = "drp.app.controller.resources.WareController";
            itemViewName = "drp.app.view.resources.WareView";
        }else if(record.data["id"] == "menu_vendor"){//供应商
            itemViewXtype = "vendorview";
            itemViewController = "drp.app.controller.resources.VendorController";
            itemViewName = "drp.app.view.resources.VendorView";
        }
        //=================================个人信息设置======================================
        else if(record.data["id"] == "menu_update_password"){//修改密码
            itemViewXtype = "updatepasswordview";
            itemViewController = "drp.app.controller.UpdatePasswordController";
            itemViewName = "drp.app.view.UpdatePasswordView";
        }
        else{
            return;
        }

        _self.showNewItem(mainView, itemViewXtype, itemViewController, itemViewName, self);
    },

    showNewItem : function(mainView, itemViewXtype, itemViewController, itemViewName, which) {
        menuItemController.addFunItem({
            mainView : mainView,
            funViewXtype : itemViewXtype,
            funController : itemViewController,
            funViewName : itemViewName
        }, which);
    },

    views : ["drp.base.view.MainView", "drp.base.view.CenterView",
             "drp.base.view.WestView", "drp.base.view.NorthView",
             "drp.widget.AlertWin","drp.widget.TreeComboBox"]
});