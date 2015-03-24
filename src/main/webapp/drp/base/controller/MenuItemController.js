Ext.define("drp.base.controller.MenuItemController", {
    tabs : new Array(0, 0, 0, 0, 0),
    addFunItem : function(funInfo, self, custom) {
        if (funInfo) {
            var mainView = funInfo.mainView;
            var funPanel = mainView.down(funInfo.funViewXtype);
            if(custom&&custom.refreshOnOpen){
              funPanel = null;
            }
            
            if (!funPanel) {
                var ControllerName = funInfo.funController;
                if (ControllerName) {
                    if (!Ext.ClassManager.isCreated(ControllerName)){
                        self.application.getController(ControllerName).init();
                    }
                }

                if (custom) {
                    funPanel = Ext.create(funInfo.funViewName, custom);
                } else {
                    var viewName = funInfo.funViewName;
                    funPanel = Ext.create(viewName);
                }
                // 先看看数组是否满了，不满添加新的tab
                var flag = false; // tab没满是false
                for ( var j = 0; j < 5; j++) {
                    if (!this.tabs[j]) {
                        this.tabs[j] = funPanel;
                        mainView.add(funPanel);
                        flag = true;
                        break;
                    }
                }
                // 如果tabs满了，删掉最前面的一个，后面跟上，新的tab添加到数组末尾
                if (!flag) {
                    mainView.remove(this.tabs[0]);
                    for ( var i = 0; i < 4; i++) {
                        this.tabs[i] = this.tabs[i + 1];
                    }
                    this.tabs[4] = funPanel;
                    mainView.add(funPanel);
                }
                mainView.setActiveTab(funPanel);
            } else {
                mainView.setActiveTab(funPanel);
            }
        }
    }
});