Ext.define('drp.base.view.CenterView', {
    extend : 'Ext.tab.Panel',
    alias : 'widget.centerview',
    border : 0,
    bodyStyle : 'padding:0px',
    items : [{
        xtype : 'panel',
        title : '<center height=40>首页</center>',
        layout : 'border',
        items :[{
            xtype : 'image',
            region : "north",
            height : "80%",
            src : "resources/images/back.png"
        },{
            xtype : 'panel',
            region : "south",
            height : "20%",
            bodyStyle : {
                background : '#E8E3DB'
            },
            html : '<div id="box_footer" style="background: url('+'resources/images/footer/copgbg.gif);">'+
                '<div style="margin-left:210px;">'+
                  '<div style="line-height: 23px;"> '+
                    '<table width="1180" border="0" cellspacing="0" cellpadding="0" margin="10 0 10 30"><tbody><tr> '+
                        '<td width="170" height="100"> '+
                            '&nbsp; <img src="'+'resources/images/footer/company.png"></td> '+
                        '<td> '+
                            '地址：宁夏固原市经济开发区<br> '+
                            '电话：&nbsp; 15202698249&nbsp;  官网 ：http://originspark.com.cn&nbsp;   邮箱: originspark@163.com<br> '+
                            '页面版权所有：&nbsp; 宁夏奥睿星火网络技术有限责任公司&nbsp; 技术支持：&nbsp; 奥睿星火&nbsp;</td> '+
                    '</tr></tbody></table></div></div></div>'
        }]
    }]
});