package com.originspark.drp.web.models.projects.inventories;

import java.math.BigDecimal;


public class CurrentInventoryUI {
    
    private String wareName;
    private String wareBrand;
    private String wareModel;
    private String wareUnit;
    
    private BigDecimal currentStockIn;
    private BigDecimal currentStockOut;
    
    public String getWareName() {
        return wareName;
    }
    public void setWareName(String wareName) {
        this.wareName = wareName;
    }
    public String getWareBrand() {
        return wareBrand;
    }
    public void setWareBrand(String wareBrand) {
        this.wareBrand = wareBrand;
    }
    public String getWareModel() {
        return wareModel;
    }
    public void setWareModel(String wareModel) {
        this.wareModel = wareModel;
    }
    public String getWareUnit() {
        return wareUnit;
    }
    public void setWareUnit(String wareUnit) {
        this.wareUnit = wareUnit;
    }
    public BigDecimal getCurrentStockIn() {
        return currentStockIn;
    }
    public void setCurrentStockIn(BigDecimal currentStockIn) {
        this.currentStockIn = currentStockIn;
    }
    public BigDecimal getCurrentStockOut() {
        return currentStockOut;
    }
    public void setCurrentStockOut(BigDecimal currentStockOut) {
        this.currentStockOut = currentStockOut;
    }

    //json util
    public BigDecimal getCurrentStockRest(){
        return getCurrentStockIn().subtract(getCurrentStockOut());
    }
}
