Ext.define("drp.app.model.resources.WareCostModel", {
    extend : "drp.app.model.resources.WareModel",
    proxy : {
        type : 'rest',
        url : 'ware',
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