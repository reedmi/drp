Ext.define("drp.app.model.resources.VendorModel", {
    extend : "drp.app.model.AbstractModel",
    fields : [ {
        name : "name",// 名称
        type : "string"
    }, {
        name : "contactMan",// 联系人
        type : "string"
    }, {
        name : "address",//地址
        type : "string"
    }, {
        name : "phone",// 联系电话
        type : "string"
    }, {
        name : 'countOfWares',// 产品供应数量
        type : 'int',
        persist : false
    }],
    proxy : {
        type : 'rest',
        url : 'vendor',
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