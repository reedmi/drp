Ext.define("drp.app.controller.resources.VendorController", {
    extend : "drp.app.controller.AbstractController",

    vendorGrid : null,
    me : null,

    init : function() {

        me = this; 

        this.control({

            'vendorview' : {
                afterrender : function(panel) {
                    vendorGrid = panel.down('gridpanel');
                    vendorGrid.getStore().load();
                }
            },

            // 查询
            'vendorview button[action=searchVendor]' : {
                click : this.searchVendor
            },

            // 增加
            'vendorview button[action=addVendor]' : {
                click : this.showCreateVendorForm
            },

            // 更新
            'vendorview gridpanel' : {
                itemdblclick : this.showUpdateVendorForm
            },

            // 删除
            'vendorview button[action=deleteVendor]' : {
                click : this.deleteVendor
            },

            'vendorviewform button[action=submitVendorForm]' : {
                click : this.submitVendorForm
            },

            'vendorviewform button[action=closeVendorForm]' : {
                click : this.closeVendorForm
            }
        });
    },
    showCreateVendorForm : function(btn) {
        var vendorForm = Ext.widget("vendorviewform");
        AlertWin.alert('新增供应商', null, vendorForm, 500, 370);
    },

    showUpdateVendorForm : function(grid, record, item, index, e, eopts) {
        var vendorForm = Ext.widget("vendorviewform");
        if (!record) {
            me.showPromptsOnUpdate("供应商");
            return;
        } else {
            vendorForm.down('form').loadRecord(record);
            AlertWin.alert('修改供应商', null, vendorForm, 500, 370);
        }
    },

    deleteVendor : function(btn) {
        
        var count = 0;//记录关联的商品数量不为0的供应商数目
        
        var records = vendorGrid.getSelectionModel().getSelection();
        var ids = [];
        for(var i = 0,len = records.length;i<len;i++){
            var record = records[i].data;
            if(record.countOfWares==0){
                ids[i] = record.id;
            }else{
                count++;
            }
        }
        
        if(ids.length == 0){
            Ext.MessageBox.alert("提示","只允许删除供应商品数量为0的供应商");
            return;
        }
        
        var msg = "确定删除所选的供应商吗？";
        if(count > 0){
            msg += "(其中有<font color='red'>"+count+"</font>条数据将跳过，只允许删除供应商品数量为0的供应商)";
        }
        
        var data = new Object({ids : ids});
        
        Ext.MessageBox.confirm("提示", msg , function(btn) {
            if (btn == 'yes') {
                Ext.Ajax.request({
                    url : "vendor/deleteBatch",
                    method : "GET",
                    params : {
                        data : Ext.encode(data)
                    },
                    success : function(response, operation){
                        var resp = Ext.decode(response.responseText);
                        Ext.Msg.alert("成功!", resp.message);
                        vendorGrid.getStore().load();
                    },
                    failure : function(response, operation) {
                        Ext.Msg.alert("失败!", operation.request.scope.reader.jsonData["message"]);
                    }
                });
            }
        });
    },

    submitVendorForm : function(btn) {
        var modelName = "drp.app.model.resources.VendorModel";
        me.submitForm(btn, vendorGrid, modelName);
    },

    // 关闭表单窗口
    closeVendorForm : function(btn) {
        me.closeForm();
    },

    searchVendor : function(btn) {
        var store = vendorGrid.getStore();
        store.filters.clear();
        var form = btn.up("form");
        store.filter([ {
            property : "name",
            value : form.down("#vendorName_filter").getValue()
        }, {
            property : "address",
            value : form.down("#vendorAddress_filter").getValue()
        }, {
            property : "phone",
            value : form.down("#vendorPhone_filter").getValue()
        }, {
            property : "contactMan",
            value : form.down("#vendorContactMan_filter").getValue()
        } ]);
    },

    models : [ "drp.app.model.resources.VendorModel" ],
    stores : [ "drp.app.store.resources.VendorStore" ],
    views : [ "drp.app.view.resources.VendorView",
            "drp.app.view.resources.VendorViewForm" ]
});