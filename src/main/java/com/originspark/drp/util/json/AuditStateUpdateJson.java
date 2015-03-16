package com.originspark.drp.util.json;


import com.originspark.drp.util.enums.AuditState;

public class AuditStateUpdateJson {
    
    private Long invoiceIds[];
    
    private String userType;
    
    private Long userId;
    
    private AuditState state;

    public Long[] getInvoiceIds() {
        return invoiceIds;
    }

    public void setInvoiceIds(Long[] invoiceIds) {
        this.invoiceIds = invoiceIds;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public AuditState getState() {
        return state;
    }

    public void setState(AuditState state) {
        this.state = state;
    }
    
    
}
