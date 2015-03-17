Ext.define("drp.app.controller.resources.WareController", {
    extend : "drp.app.controller.AbstractController",

    wareGrid : null,
    me : null,

    init : function() {
        
        me = this; 

        this.control({

            'wareview' : {
                afterrender : function(panel) {
                    wareGrid = panel.down('gridpanel');
                    wareGrid.getStore().load();
                }
            },

            // 查询商品
            'wareview button[action=searchWare]' : {
                click : this.searchWare
            },

            // 新增商品
            'wareview button[action=addWare]' : {
                click : this.showCreateWareForm
            },

            // 更新商品
            'wareview gridpanel' : {
                itemdblclick : this.showUpdateWareForm
            },

            // 删除商品
            'wareview button[action=deleteWare]' : {
                click : this.deleteWare
            },

            'wareviewform button[action=submitWareForm]' : {
                click : this.submitWareForm
            },

            'wareviewform button[action=closeWareForm]' : {
                click : this.closeWareForm
            },
            
            // excel导入
            'wareview button[action=importExcel]' : {
                click : function(btn){
                    var uploadFileform = Ext.widget("uploadfileformview");
                    AlertWin.alert('导入商品', null, uploadFileform, 500, 120);
                }
            },
            
            // excel导出
            'wareview button[action=exportExcel]' : {
                click : function(btn){
        
                    var records = wareGrid.getSelectionModel().getSelection();
                    var count = records.length;
                    
                    if(count == 0){
                        Ext.MessageBox.alert("提示","请先选择要导出的商品");
                        return false;
                    }
                    
                    var ids = "";
                    for(var i = 0;i<count-1;i++){
                        var wareId = records[i].data.id;
                        ids += wareId+",";
                    }
                    ids += records[count-1].data.id;
                    
                    var msg = "你确定要导出已选择的"+count+"个商品吗？";
                    
                    Ext.MessageBox.confirm("提示", msg , function(btn) {
                        if (btn == 'yes') {
                            document.location = "ware/export?ids="+ids;
                        }
                    });
                }
            },
            
            'uploadfileformview button[action=submitExcel]' :{
                click : function(btn){
                    var view = btn.up('uploadfileformview');
                    var waitMsg = new Ext.LoadMask(view, {
                        msg : "数据导入中，请不要关闭刷新窗口..."
                    });
                    waitMsg.show();
                    btn.up('form').getForm().submit({
                        url : 'ware/uploadExcel',
                        method : "POST",
                        success : function(form, action){
                            waitMsg.hide();
                            AlertWin.hide();
                            Ext.MessageBox.alert('成功', '导入成功，请刷新查看');
                        },
                        failure : function(form, action){
                            waitMsg.hide();
                            Ext.MessageBox.alert('失败', '网络连接错误，请尝试重新上传');
                        }
                    });
                }
            },
            
            'uploadfileformview button[action=cancelExcel]' : {
                click : function(){
                    AlertWin.hide();
                }
            }

        });
    },

    showCreateWareForm : function(btn) {
        var wareForm = Ext.widget("wareviewform");
        AlertWin.alert('新增商品', null, wareForm, 500, 320);
    },

    showUpdateWareForm : function(grid, record, item, index, e, eopts) {
        var wareForm = Ext.widget("wareviewform");
        if (!record) {
            me.showPromptsOnUpdate("商品");
            return;
        } else {
            wareForm.down('form').loadRecord(record);
            AlertWin.alert('修改商品', null, wareForm, 500, 320);
        }
    },

    deleteWare : function(btn) {
        
        var count = 0;//记录关联的单据数量不为0的商品数目
        
        var records = wareGrid.getSelectionModel().getSelection();
        var ids = [];
        for(var i = 0,len = records.length;i<len;i++){
            var record = records[i].data;
            if(record.countOfInCosts==0 && record.countOfOutCosts==0 && record.countOfInventories==0){
                ids[i] = record.id;
            }else{
                count++;
            }
        }
        
        if(ids.length == 0){
            Ext.MessageBox.alert("提示","只允许删除关联单据数量均为0的商品");
            return;
        }
        
        var msg = "确定删除所选的商品吗？";
        if(count > 0){
            msg += "(其中有<font color='red'>"+count+"</font>条数据将跳过，只允许删除关联库单数量均为0的商品)";
        }
        
        var data = new Object({ids : ids});
        
        Ext.MessageBox.confirm("提示", msg , function(btn) {
            if (btn == 'yes') {
                Ext.Ajax.request({
                    url : "ware/deleteBatch",
                    method : "GET",
                    params : {
                        data : Ext.encode(data)
                    },
                    success : function(response, operation){
                        var resp = Ext.decode(response.responseText);
                        Ext.Msg.alert("成功!", resp.message);
                        wareGrid.getStore().load();
                    },
                    failure : function(response, operation) {
                        Ext.Msg.alert("失败!", operation.request.scope.reader.jsonData["message"]);
                    }
                });
            }
        });
    },

    submitWareForm : function(btn) {
        var modelName = "drp.app.model.resources.WareModel";
        var form = btn.up('form').getForm();
        if (form.isValid()) {
            var formBean = form.getValues();
            var model = Ext.create(modelName, formBean);

            //add extra field
            var vendorField = null;
            if(formBean['vendor.id']){
                vendorField = new Ext.data.Field({name:'vendor'});
                model.fields.add(vendorField);
                model.set("vendor",{
                    id : formBean['vendor.id']
                });
            }
            var categoryField = null;
            if(formBean['category.id']){
                categoryField = new Ext.data.Field({name:'category'});
                model.fields.add(categoryField);
                model.set("category",{
                    id : formBean['category.id']
                });
            }

            //save model
            me.saveModel(model, wareGrid);

            //remove extra field
            if(vendorField != null){
                model.fields.remove(vendorField);
            }
            if(categoryField != null){
                model.fields.remove(categoryField);
            }
        }
    },

    closeWareForm : function(btn) {
        me.closeForm();
    },

    searchWare : function(btn) {
        var store = wareGrid.getStore();
        store.filters.clear();
        var form = btn.up("form");
        store.filter([ {
            property : "name",
            value : form.down("#wareName_filter").getValue()
        }, {
            property : "vendor",
            value : form.down("#wareVendor_filter").getValue()
        }, {
            property : "brand",
            value : form.down("#wareBrand_filter").getValue()
        }, {
            property : "model",
            value : form.down("#wareModel_filter").getValue()
        }, {
            property : "unit",
            value : form.down("#wareUnit_filter").getValue()
        }]);
    },

    models : [ "drp.app.model.resources.WareModel", "drp.app.model.resources.WareCategoryModel" ],
    stores : [ "drp.app.store.resources.WareStore", "drp.app.store.resources.VendorStore"],
    views : [ "drp.app.view.resources.WareView", "drp.app.view.resources.WareViewForm","drp.widget.UploadFileForm" ]
});