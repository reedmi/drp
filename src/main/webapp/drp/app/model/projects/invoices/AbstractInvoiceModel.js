Ext.define("drp.app.model.projects.invoices.AbstractInvoiceModel", {
    extend : "drp.app.model.AbstractModel",
    fields : [{
        name : "code"
    }, {
        name : "forDate"
    }, {
        name : 'manager'
    }, {
        name : 'wareKeeper'
    }, {
        name : 'regulator'
    }, {
        name : "receiveMan"
    }, {
        name : "totalPrice",
        type : "number"
    }, {
        name : "costCount",
        type : "int",
        persist : false
    }]
});