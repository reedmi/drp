/**
 * @author allenjin
 */
Ext.define("wms.app.model.projects.ProjectModel", {
    extend : "wms.app.model.AbstractModel",
    fields : [{
        name : "name"// 项目名称
    }, {
        name : "code"// 项目编号
    }, {
        name : "city"//项目所在城市
    }, {
        name : "startDate"// 开工时间
    }, {
        name : "endDate"// 竣工时间
    }, {
        name : "projectName",
        persist : false
    }, {
    	name : 'projectManager',
    	type : 'auto'
    }, {
    	name : 'wareKeeper',
    	type : 'auto'
    }, {
    	name : 'materialKeeper',
    	type : 'auto'
    }],
    proxy : {
        type : 'rest',
        url : ctx+'/project',
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