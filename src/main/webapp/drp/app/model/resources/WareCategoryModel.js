Ext.define("drp.app.model.resources.WareCategoryModel", {
    extend : "drp.app.model.AbstractModel",
    fields : [{
        name : "name"
    }, {
        name : "code"
    }],
    proxy : {
        type : 'rest',
        url : 'wares/categories',
        reader : {
            type : "json",
            root : "data",
            successProperty : 'success'
        },
        writer : {
            type : "json"
        },
        listeners : {
            exception : function(proxy, response, operation) {
                Ext.MessageBox.show({
                    title : '错误',
                    msg : "数据加载错误，请尝试刷新页面",
                    icon : Ext.MessageBox.ERROR,
                    buttons : Ext.Msg.OK
                });
            }
        }
    }
});