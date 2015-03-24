/**
 * @author reed mi
 */
Ext.define("drp.app.view.projects.SystemViewForm", {
    extend : 'Ext.panel.Panel',
    alias : 'widget.systemviewform',
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
            hidden : true,
            itemId : 'projectId',
            name : 'parentId'
        }, {
            xtype : 'displayfield',
            margin : '5 0 0 5',
            anchor : '100%',
            itemId : 'projectName',
            fieldLabel : '项目名称<font color="red">*</font>'
        }, {
            xtype : 'textfield',
            anchor : '95%',
            margin : '5 0 0 5',
            name : 'name',
            allowBlank : false,
            fieldLabel : '系统名称<font color="red">*</font>'
        }, {
            xtype : 'textfield',
            anchor : '95%',
            margin : '5 0 0 5',
            name : 'code',
            allowBlank : false,
            fieldLabel : '系统编号<font color="red">*</font>'
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
                action : 'submitSystemForm',
                width: 80,
                formBind : true,
                text : '确认'
            }, {
                xtype : 'button',
                margin : '5 0 0 5',
                action : 'closeSystemForm',
                width: 80,
                text : '取消'
            }]
        }]
    }]
});
