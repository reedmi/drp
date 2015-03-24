Ext.define("drp.app.model.projects.inventories.CurrentInventoryModel", {
    extend : "Ext.data.Model",
    fields : [{
        name : "name"
    }, {
        name : "brand"
    }, {
        name : "model"
    }, {
        name : "unit"
    }, {
        name : "incount",
        type : 'int'
    }, {
        name : "outcount",
        type : 'int'
    }, {
        name : "restcount",
        type : 'int'
    }, {
        name : "income"
    }, {
        name : "outcome"
    }, {
        name : "profit"
    }],
    proxy : {
        type : 'ajax',
        url : 'inventories/current',
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