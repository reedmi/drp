Ext.define('drp.app.controller.projects.inventories.MonthendInventoryController', {
    extend : 'Ext.app.Controller',
    
    monthendInventoryGrid : null,
    projectId : null,
    systemSelected : null,
    init : function() {
        me = this;
        this.control({
            
            'monthendinventoryview' : {
                afterrender : function(panel) {
                    monthendInventoryGrid = panel.down('gridpanel');
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
                    var formonth = btn.up('monthendinventoryview').down('monthfield').getSubmitValue();
                    document.location = "project/"+projectId+"/inventories/monthend/export?formonth="+formonth;
                }
            }
        });
    },
    
    views : ['drp.app.view.projects.inventories.MonthendInventoryView','drp.widget.MonthField'],
    models :['drp.app.model.projects.inventories.MonthEndInventoryModel'],
    stores : ['drp.app.store.projects.inventories.MonthEndInventoryStore']
});