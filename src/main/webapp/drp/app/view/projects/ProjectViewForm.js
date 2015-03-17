/**
 * @author allenjin
 */
Ext.define("drp.app.view.projects.ProjectViewForm", {
    extend : 'Ext.panel.Panel',
    alias : 'widget.projectviewform',
    author : '100%',
    autoScroll : true,
    items : [{
        xtype : 'form',
        items : [{
            xtype : 'textfield',
            hidden : true,
            name : 'id'
        }, {
            xtype : 'textfield',
            anchor : '95%',
            margin : '5 0 0 5',
            name : 'name',
            allowBlank : false,
            fieldLabel : '项目名称<font color="red">*</font>'
        }, {
            xtype : 'textfield',
            anchor : '95%',
            margin : '5 0 0 5',
            name : 'code',
            allowBlank : false,
            fieldLabel : '项目编号<font color="red">*</font>'
        }, {
            xtype : 'combobox',
            anchor : '90%',
            margin : '5 0 0 5',
            allowBlank : false,
            editable : false,
            itemId : 'projectManager_cb',
            name : 'projectManager.id',
            displayField :"name",
            valueField :"id",
            fieldLabel : '项目经理<font color="red">*</font>',
            store : Ext.create("Ext.data.Store",{
                model : 'drp.app.model.users.ProjectManagerModel',
                autoLoad : false
            }),
            listeners : {
                afterrender : function(cb){
                    var store = cb.getStore();
                    store.filters.clear();
                    store.filter([ {
                        property : "status",
                        value : "ACTIVE"
                    }]);
                }
            }
        }, {
            xtype : 'combobox',
            anchor : '90%',
            margin : '5 0 0 5',
            allowBlank : false,
            editable : false,
            itemId : 'wareKeeper_cb',
            name : 'wareKeeper.id',
            displayField :"name",
            valueField :"id",
            fieldLabel : '库管员<font color="red">*</font>',
            store : Ext.create("Ext.data.Store",{
                model : 'drp.app.model.users.WareKeeperModel',
                autoLoad : false
            }),
            listeners : {
                afterrender : function(cb){
                    var store = cb.getStore();
                    store.filters.clear();
                    store.filter([ {
                        property : "status",
                        value : "ACTIVE"
                    }]);
                }
            }
        }, {
            xtype : 'combobox',
            anchor : '90%',
            margin : '5 0 0 5',
            allowBlank : false,
            editable : false,
            itemId : 'materialKeeper_cb',
            name : 'materialKeeper.id',
            displayField :"name",
            valueField :"id",
            fieldLabel : '材料员<font color="red">*</font>',
            store : Ext.create("Ext.data.Store",{
                model : 'drp.app.model.users.MaterialKeeperModel',
                autoLoad : false
            }),
            listeners : {
                afterrender : function(cb){
                    var store = cb.getStore();
                    store.filters.clear();
                    store.filter([ {
                        property : "status",
                        value : "ACTIVE"
                    }]);
                }
            }
        }, {
            xtype : 'textfield',
            anchor : '70%',
            margin : '5 0 0 5',
            name : 'city',
            fieldLabel : '城市'
        }, {
            xtype : 'datefield',
            anchor : '70%',
            margin : '5 0 0 5',
            name : 'startDate',
            format:'Y-m-d',
            editable : false,
            fieldLabel : '开工时间'
        },{
            xtype : 'datefield',
            anchor : '70%',
            margin : '5 0 0 5',
            name : 'endDate',
            format:'Y-m-d',
            editable : false,
            fieldLabel : '竣工时间'
        }, {
            xtype : 'fieldcontainer',
            height : 30,
            anchor : '95%',
            margin : '5 0 10 5',
            style : 'text-align:center',
            items : [{
                xtype : 'button',
                margin : '5 0 0 5',
                action : 'submitProjectForm',
                width: 80,
                formBind : true,
                text : '确认'
            }, {
                xtype : 'button',
                margin : '5 0 0 5',
                action : 'closeProjectForm',
                width: 80,
                text : '取消'
            }]
        }]
    }]
});
