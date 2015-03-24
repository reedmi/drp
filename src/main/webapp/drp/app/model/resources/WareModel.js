Ext.define("drp.app.model.resources.WareModel", {
    extend : "drp.app.model.AbstractModel",
    fields : [{
        name : "name"// 品名
    }, {
        name : "brand"// 品牌
    }, {
        name : "model"//规格
    }, {
        name : "unit"// 单位
    }, {
        name : 'produceOn'// 生产日期
    }, {
        name : 'storage'// 保质期
    }, {
        name : "category.id",
        persist : false
    }, {
        name : "category.name",
        persist : false
    }, {
        name : "vendor.id",
        persist : false
    }, {
        name : "vendor.contactMan",
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
        url : 'ware',
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