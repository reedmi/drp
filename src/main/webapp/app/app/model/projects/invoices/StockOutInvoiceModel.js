Ext.define("wms.app.model.projects.invoices.StockOutInvoiceModel", {
    extend : "wms.app.model.projects.invoices.AbstractInvoiceModel",
    fields : [{
        name : "receiveMan"
    } ],
    proxy : {
        type : 'rest',
        url : ctx+'/stockOutInvoice',
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