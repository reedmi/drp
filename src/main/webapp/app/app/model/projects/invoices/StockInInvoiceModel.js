Ext.define("wms.app.model.projects.invoices.StockInInvoiceModel", {
    extend : "wms.app.model.projects.invoices.AbstractInvoiceModel",
    proxy : {
        type : 'rest',
        url : ctx+'/stockInInvoice',
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