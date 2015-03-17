Ext.define('drp.widget.TreeComboBox', {
    extend : 'Ext.form.field.ComboBox',
    alias : 'widget.treecombobox',
    id : 'treecomboboxid',

    textProperty : 'text',
    model : '',
    displayField : '',
    customLable : null,
    initComponent : function() {
        var me = this;
        Ext.apply(this, {
            editable : false,
            queryMode : 'local',
            select : Ext.emptyFn
        });

        this.displayField = this.displayField || 'text', this.treeid = Ext.String.format('tree-combobox-{0}', Ext.id());
        this.tpl = Ext.String.format('<div id="{0}"></div>', this.treeid);

        var store = Ext.create('Ext.data.TreeStore', {
            root : {
                expanded : true
            },
            defaultRootId : '',
            model : me.model

        });
        this.tree = Ext.create('Ext.tree.Panel', {
            rootVisible : false,
            autoScroll : true,
            expanded : true,
            height : 200,
            // displayField : 'name',
            displayField : me.displayField,
            store : store

        });
        if (me.customLable) {
            var rootnode = store.getRootNode();
            var noneOption = {
                id : -1,
                leaf:false,
                loaded : true
            };
            noneOption[this.displayField] = me.customLable;
            rootnode.appendChild(noneOption);
        }

        this.tree.on('itemclick', function(view, record) {
            me.setValue(record);
            me.collapse();
        });
        me.on('expand', function() {
            if (!this.tree.rendered) {
                this.tree.render(this.treeid);
            }
        });

        this.callParent(arguments);
    }
});