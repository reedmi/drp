Ext.define("wms.app.model.users.AbstractUserModel", {
    extend : "wms.app.model.AbstractModel",
    fields : [{
        name : "name"
    }, {
        name : "code"
    }, {
        name : "phone"
    }, {
        name : 'address'
    }, {
        name : "email"
    }, {
        name : "gender"
    }, {
        name : "status"
    }]
});