Ext.define("wms.app.model.resources.WareModel", {
    extend : "wms.app.model.AbstractModel",
    fields : [{
        name : "name"// 名称
    }, {
        name : "brand"// 品牌
    }, {
        name : "model"//规格
    }, {
        name : "unit"// 单位
    }, {
        name : "vendor.id",
        persist : false
    }, {
        name : "vendor.name",
        persist : false
    }, {
        name : 'note'// 备注
    }, {
        name : 'countOfInCosts',// 关联的入库单数量
        type: 'int',
        persist : false
    }, {
        name : 'countOfOutCosts',// 关联的出库单数量
        type: 'int',
        persist : false
    }, {
    	name : 'countOfInventories',// 关联的盘点表的数量
    	typr : 'int',
        persist : false
    }],
    proxy : {
        type : 'rest',
        url : ctx+'/ware',
        reader : {
            type : "json",
            root : "data",
            successProperty : 'success',
            totalProperty : 'total'
        },
        writer : {
            type : "json"
        },
        listeners : {
            exception : function(proxy, response, operation) {
                Ext.MessageBox.show({
                    title : '系统出现异常',
                    msg : operation.getError(),
                    icon : Ext.MessageBox.ERROR,
                    buttons : Ext.Msg.OK
                });
            }
        }
    }
});