package com.originspark.drp.util.extjs.menu.controllers;

import java.util.ArrayList;
import java.util.List;

import com.originspark.drp.util.extjs.menu.models.Children;
import com.originspark.drp.util.extjs.menu.models.Item;
import com.originspark.drp.util.extjs.menu.models.SubItems;
import com.originspark.drp.util.extjs.menu.models.TreeRoot;

public class ExtMenuController {

    // 实时库存
    static final Children menu_current_inventory = new Children(fontBlod("实时库存"), "menu_current_inventory");
    // 月末盘点
    static final Children menu_monthend_inventory = new Children(fontBlod("月末盘点"), "menu_monthend_inventory");
    // 入库
    static final Children menu_stockin = new Children(fontBlod("入库单管理"), "menu_stockin");
    // 出库
    static final Children menu_stockout = new Children(fontBlod("出库单管理"), "menu_stockout");
    // 项目
    static final Children menu_project = new Children(fontBlod("项目管理"), "menu_project");
    // 材料员
    static final Children menu_materialkeeper = new Children(fontBlod("材料员"), "menu_materialkeeper");
    // 库管员
    static final Children menu_warekeeper = new Children(fontBlod("库管员"), "menu_warekeeper");
    // 项目经理
    static final Children menu_projectmanager = new Children(fontBlod("项目经理"), "menu_projectmanager");
    // 领导
    static final Children menu_leader = new Children(fontBlod("系统管理员"), "menu_leader");
    // 商品
    static final Children menu_ware = new Children(fontBlod("商品"), "menu_ware");
    // 供应商
    static final Children menu_vendor = new Children(fontBlod("供应商"), "menu_vendor");
    // 修改密码
    static final Children menu_update_password = new Children(fontBlod("修改密码"), "menu_update_password");


    public static List<Item> getMenusByUserType(String type) {

        if (type.equals("Leader")) {
            return createLeaderMenus();
        } else if (type.equals("ProjectManager")) {
            return createProjectManagerMenus();
        } else if (type.equals("WareKeeper")) {
            return createWareKeeperMenus();
        } else if (type.equals("MaterialKeeper")) {
            return createMaterialKeeperMenus();
        } else {
            return null;
        }

    }

    private static List<Item> createMaterialKeeperMenus() {
        return createProjectManagerMenus();
    }

    private static List<Item> createWareKeeperMenus() {
        List<Item> items = new ArrayList<Item>();
        
        items.add(buildInventories(menu_current_inventory));
        items.add(buildDefaultInvoices());
        items.add(buildDefaultDetails());
        
        return items;
    }

    private static List<Item> createProjectManagerMenus() {
        List<Item> items = new ArrayList<Item>();
        
        items.add(buildDefaultInventories());
        items.add(buildDefaultInvoices());
        items.add(buildSystems(menu_ware,menu_vendor));
        items.add(buildDefaultDetails());
        
        return items;
    }

    private static List<Item> createLeaderMenus() {
        List<Item> items = new ArrayList<Item>();
        
        items.add(buildDefaultInventories());
        items.add(buildDefaultInvoices());
        items.add(buildDefaultSystems());
        items.add(buildDefaultDetails());
        
        return items;
    }

    // =====库存查看
    private static Item buildDefaultInventories() {
        return buildInventories(menu_current_inventory,menu_monthend_inventory);
    }
    
    private static Item buildInventories(Children... children) {
        TreeRoot root_inventories = new TreeRoot(children);

        SubItems items_inventories = new SubItems(root_inventories);

        Item item_inventories = new Item(fontBlod("库存查看"), new SubItems[] {
            items_inventories
        });

        return item_inventories;
    }

    // =====出入库管理
    private static Item buildDefaultInvoices(){
        return buildInvoices(menu_stockin,menu_stockout);
    }
    
    private static Item buildInvoices(Children... children) {
        TreeRoot root_invoices = new TreeRoot(children);

        SubItems items_invoices = new SubItems(root_invoices);

        Item item_invoices = new Item(fontBlod("出入库管理"), new SubItems[] {
            items_invoices
        });

        return item_invoices;
    }

    //=====系统管理
    private static Item buildDefaultSystems(){
        return buildSystems(menu_project,buildDefaultUsers(),buildDefaultWares());
    }
    
    private static Item buildSystems(Children... children) {
         TreeRoot root_system = new TreeRoot(children);
        
         SubItems items_system = new SubItems(root_system);
        
         Item item_system = new Item(fontBlod("系统管理"), new SubItems[]{items_system});
        
         return item_system;
    }

    private static Children buildDefaultUsers() {
        return buildUsers(menu_materialkeeper,menu_warekeeper,menu_projectmanager,menu_leader);
    }
    
    private static Children buildUsers(Children... children) {
        return new Children(fontBlod("用户管理"), children);
    }
    
    private static final Children buildDefaultWares(Children... children) {
        return buildWares(menu_ware,menu_vendor);
    }

    private static final Children buildWares(Children... children) {
        return new Children(fontBlod("商品管理"), children);
    }
    
    //=====个人信息设置
    private static Item buildDetails(Children... children) {
        TreeRoot root_detail = new TreeRoot(children);
       
        SubItems items_detail = new SubItems(root_detail);
       
        Item item_detail = new Item(fontBlod("个人信息设置"), new SubItems[]{items_detail});
       
        return item_detail;
   }
    
    private static Item buildDefaultDetails(){
        return buildDetails(menu_update_password);
    }

    private static String fontBlod(String text) {
        return "<span style='font-weight:bold'>" + text + "</span>";
    }
    
}
