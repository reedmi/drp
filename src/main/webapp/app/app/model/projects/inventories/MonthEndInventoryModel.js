Ext.define("wms.app.model.projects.inventories.MonthEndInventoryModel", {
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
        name : "lastMonthLeft",
        type:"int"
    }, {
        name : "monthIn",
        type:"int"
    }, {
        name : "monthOut",
        type:"int"
    }, {
    	name : "monthLeft",
    	type:"int"
    }],
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