Ext.define('wms.base.view.CenterView', {
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
            src : ctx+"/resources/images/back.png"
        },{
        	xtype : 'panel',
            region : "south",
            height : "20%",
            bodyStyle : {
		        background : '#E8E3DB'
		    },
		    html : '<div id="box_footer" style="background: url('+ctx+'/resources/images/footer/copgbg.gif);">'+
				'<div style="margin-left:210px;">'+
				  '<div style="line-height: 23px;"> '+
					'<table width="1180" border="0" cellspacing="0" cellpadding="0" margin="10 0 10 30"><tbody><tr> '+
						'<td width="170" height="100"> '+
							'&nbsp; <img src="'+ctx+'/resources/images/footer/company.gif"></td> '+
						'<td> '+
							'地址(ADD)：济南市二环东路7151号港澳花园综合楼<br> '+
							'电话(TEL)：(0531) 85599617 85599618 传真(FAX)：(0531) 85599615 E-MAIL： wavetek@sdwavetek.com<br> '+
							'页面版权所有&nbsp; 山东华埠特克智能机电工程有限公司&nbsp;</td> '+
					'</tr></tbody></table></div></div></div>'
        }]
    }]
});