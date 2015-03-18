Ext.define("drp.app.model.resources.VendorModel", {
    extend : "drp.app.model.AbstractModel",
    fields : [ {
        name : "name"// 名称
    }, {
        name : "contactMan"// 联系人
    }, {
        name : "address"//地址
    }, {
        name : "phone"// 联系电话
    }, {
        name : "note"// 联系电话
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