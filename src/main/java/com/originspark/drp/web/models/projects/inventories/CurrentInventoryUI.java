package com.originspark.drp.web.models.projects.inventories;

import java.math.BigDecimal;

/**
 * 剩余量、盈利额会自动计算
 * @author ReedMi
 */
public class CurrentInventoryUI {

    private String name;
    private String brand;
    private String model;
    private String unit;

    private Long incount;// 入库量
    private Long outcount;// 出库量
    private BigDecimal income;// 收入
    private BigDecimal outcome;// 支出

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getBrand() {
        return brand;
    }
    public void setBrand(String brand) {
        this.brand = brand;
    }
    public String getModel() {
        return model;
    }
    public void setModel(String model) {
        this.model = model;
    }
    public String getUnit() {
        return unit;
    }
    public void setUnit(String unit) {
        this.unit = unit;
    }
    public Long getIncount() {
        return incount;
    }
    public void setIncount(Long incount) {
        this.incount = incount;
    }
    public Long getOutcount() {
        return outcount;
    }
    public void setOutcount(Long outcount) {
        this.outcount = outcount;
    }
    public BigDecimal getIncome() {
        return income;
    }
    public void setIncome(BigDecimal income) {
        this.income = income;
    }
    public BigDecimal getOutcome() {
        return outcome;
    }
    public void setOutcome(BigDecimal outcome) {
        this.outcome = outcome;
    }

    // 剩余量
    public Long getRestcount() {
        return getIncount() - getOutcount();
    }

    // 盈利
    public BigDecimal getProfit() {
        return getIncome().subtract(getOutcome());
    }
}
