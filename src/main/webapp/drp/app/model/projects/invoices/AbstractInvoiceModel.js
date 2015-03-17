Ext.define("drp.app.model.projects.invoices.AbstractInvoiceModel", {
    extend : "drp.app.model.AbstractModel",
    fields : [{
        name : "code"
    }, {
        name : "forDate"
    }, {
        name : "system"
    }, {
        name : "system.id",
        persist : false
    }, {
        name : "system.projectName",
        persist : false
    }, {
        name : "system.name",
        persist : false
    }, {
        name : "totalPrice",
        type : "number"
    }, {
        name : "materialKeeperName",
        persist : false
    }, {
        name : "wareKeeperName",
        persist : false
    }, {
        name : "projectManagerName",
        persist : false
    }, {
        name : "wareKeeperAuditState",
        persist : false
    }, {
        name : "materialKeeperAuditState",
        persist : false
    }, {
        name : "projectManagerAuditState",
        persist : false
    }, {
        name : "pass",
        type : "boolean"
    }, {
        name : "costCount",
        type : "int",
        persist : false
    }]
});