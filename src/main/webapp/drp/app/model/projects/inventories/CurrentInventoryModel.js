Ext.define("drp.app.model.projects.inventories.CurrentInventoryModel", {
    extend : "Ext.data.Model",
    fields : [{
        name : "wareName"
    }, {
        name : "wareBrand"
    }, {
        name : "wareModel"
    }, {
        name : "wareUnit"
    }, {
        name : "currentStockIn",
        type : 'int'
    }, {
        name : "currentStockOut",
        type : 'int'
    }, {
        name : "currentStockRest",
        type : 'int'
    } ],
    proxy : {
        type : 'ajax',
        reader : {
            type : "json",
            root : "data",
            successProperty : 'success',
            totalProperty : 'total'
        },
        writer : {
            type : "json"
        }
    }
});