Ext.define('drp.util.CommonMethod', {
    callBackMsg : function(operation) {
        return operation.request.scope.reader.jsonData["message"];
    }
});