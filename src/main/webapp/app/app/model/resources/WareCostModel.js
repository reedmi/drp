Ext.define("wms.app.model.resources.WareCostModel", {
    extend : "wms.app.model.resources.WareModel",
    proxy : {
        type : 'rest',
        url : ctx+'/ware',
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