Ext.define('wms.app.controller.projects.inventories.MonthendInventoryController', {
    extend : 'Ext.app.Controller',
    
    monthendInventoryGrid : null,
    projectId : null,
    systemSelected : null,
    
    
    init : function() {
        me = this;
        this.control({
            
            'monthendinventoryview' : {
                afterrender : function(panel) {
                    systemSelected = false;
                    
                    monthendInventoryGrid = panel.down('gridpanel');
                    monthendInventoryGrid.setDisabled(true);
                    
                    if(user.type != "MaterialKeeper"){
                        monthendInventoryGrid.down('#exportExcel_btn').setVisible(false);
                    }
                }
            },
            
            'monthendinventoryview > treepanel' : {
                select : function(treepanel, record){
                    monthendInventoryGrid.setDisabled(false);
                    //判断选择的是否为系统
                    if(record.isLeaf()){
                        systemSelected = true;
                    }else{
                        systemSelected = false;
                    }
                    
                    projectId = record.data.id;
                    var _url = ctx + "/project/"+projectId+"/inventories/monthend";
                    var store = monthendInventoryGrid.getStore();
                    store.getProxy().url = _url;
                    Ext.apply(store.proxy.extraParams, {
                        formonth : monthendInventoryGrid.down("monthfield").getSubmitValue()
                    });
                    store.load();
                },
                afterrender : function(treepanel){
                    var store = treepanel.getStore();
                    Ext.apply(store.proxy.extraParams, {
                        userType : user.type,
                        userId : user.id
                    });
                    store.load({
                        node : store.getRootNode()
                    });
                }
            },
            
            'monthendinventoryview monthfield' : {
                select : function(monthfield) {
                    
                    if(!monthfield.isValid()){
                        Ext.Msg.alert("提示", "请选择正确的日期");
                        return;
                    }
                    
                    var store = monthendInventoryGrid.getStore();
                    Ext.apply(store.proxy.extraParams, {
                        formonth : monthfield.getSubmitValue()
                    });
                    store.load();
                }
            },
            
            'monthendinventoryview button[action=exportExcel]' : {
                click : function(btn){
                    if(!systemSelected){
                        Ext.Msg.alert("提示", "请选择左侧的系统，并导出盘点表");
                        return;
                    }
                    var formonth = btn.up('monthendinventoryview').down('monthfield').getSubmitValue();
                    document.location = ctx+"/project/"+projectId+"/inventories/monthend/export?formonth="+formonth;
                }
            }
        });
    },
    
    views : ['wms.app.view.projects.inventories.MonthendInventoryView','wms.widget.MonthField'],
    models :['wms.app.model.projects.ProjectModel','wms.app.model.projects.inventories.MonthEndInventoryModel'],
    stores : ['wms.app.store.projects.inventories.MonthEndInventoryStore']
});