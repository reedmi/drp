package com.originspark.drp.web.models.projects.inventories;

import java.math.BigDecimal;


public class Ware {
    
    private String wareName;
    private String wareBrand;
    private String wareModel;
    private String wareUnit;
    
    private BigDecimal lastMonthLeft;
    private BigDecimal monthIn;
    private BigDecimal monthOut;
    
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
    public BigDecimal getLastMonthLeft() {
        return lastMonthLeft;
    }
    public void setLastMonthLeft(BigDecimal lastMonthLeft) {
        this.lastMonthLeft = lastMonthLeft;
    }
    public BigDecimal getMonthIn() {
        return monthIn;
    }
    public void setMonthIn(BigDecimal monthIn) {
        this.monthIn = monthIn;
    }
    public BigDecimal getMonthOut() {
        return monthOut;
    }
    public void setMonthOut(BigDecimal monthOut) {
        this.monthOut = monthOut;
    }
    //json util
    public BigDecimal getMonthLeft(){
        return lastMonthLeft.add(monthIn).subtract(monthOut);
    }
    
}
