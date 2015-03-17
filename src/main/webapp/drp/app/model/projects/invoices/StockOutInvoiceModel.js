Ext.define("drp.app.model.projects.invoices.StockOutInvoiceModel", {
    extend : "drp.app.model.projects.invoices.AbstractInvoiceModel",
    fields : [{
        name : "receiveMan"
    } ],
    proxy : {
        type : 'rest',
        url : 'stockOutInvoice',
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