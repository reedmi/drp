Ext.define("drp.app.model.projects.invoices.StockOutInvoiceModel", {
    extend : "drp.app.model.projects.invoices.AbstractInvoiceModel",
    fields : [{
        name : "receiveAddress"
    }, {
        name : "receivePhone"
    }],
    proxy : {
        type : 'rest',
        url : 'invoices/out',
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