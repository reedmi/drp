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
            src : "resources/images/back.jpg"
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
                        '<td width="120" height="100"> '+
                            '&nbsp; <img src="'+'resources/images/footer/company.png" width="100" height="20"></td> '+
                        '<td> '+
                            '技术支持：&nbsp;<a href="http://originspark.com.cn" style="text-decoration:none" target="_blank">宁夏奥睿星火网络技术</a>&nbsp; 电话：&nbsp; 15202698249&nbsp; 邮箱: <a href="mailto:originspark@163.com">originspark@163.com</a></td> '+
                    '</tr></tbody></table></div></div></div>'
        }]
    }]
});