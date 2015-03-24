Ext.define("drp.app.model.projects.invoices.StockInInvoiceModel", {
    extend : "drp.app.model.projects.invoices.AbstractInvoiceModel",
    proxy : {
        type : 'rest',
        url : 'invoices/in',
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