
Ext.define('wms.widget.AlertWin', {
    extend : 'Ext.window.Window',
    alias : 'widget.alertwin',
    closeAction : 'hide',
    hideMode : 'offsets',
    modal : true,
    resizable : false,
    constrainHeader : true,
    cls : Ext.baseCSSPrefix + 'message-box',
    width : 800,
    height : 450,
    minWidth : 0,
    maxWidth : 1200,
    minHeight : 0,
    maxHeight : 900,
    layout : {
        type : 'fit'
    },
    style : {
        padding : '6px',
        overflow : 'hidden'
    },
    initComponent : function() {
        this.callParent();
    },
    onShow : function() {
        this.callParent(arguments);
        this.center();
    },
    hide : function() {
        var me = this;
        me.dd.endDrag();
        me.callParent(arguments);
    },
    alert : function(title, msg, pan, wid, hei, fn) {
        if (pan) {
            pan.border = 0;
            var panform=pan.down('form');
            if(panform){
                panform.border=0;
            }
            var width, height;
            width = pan.width ? pan.width : wid;
            height = pan.height ? pan.height : hei;
            pan.setWidth(width);
            pan.setHeight(height);
            this.setTitle(title);
            this.setWidth(width+20);
            this.setHeight(height+60);
            this.removeAll(false);
            this.add(pan);
            this.show();
        }
    }
}, function() {
    AlertWin = new this();
});