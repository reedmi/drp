package com.originspark.drp.models.resources;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.originspark.drp.models.AbstractModel;
import com.originspark.drp.models.projects.costs.StockInCost;
import com.originspark.drp.models.projects.costs.StockOutCost;
import com.originspark.drp.models.projects.inventories.MonthendInventory;

/**
 * 产品
 */
@Entity
@Table(name = "wares")
public class Ware extends AbstractModel {

    /**
     * 品名
     */
    private String name;

    /**
     * 品牌
     */
    private String brand;

    /**
     * 规格
     */
    private String model;

    /**
     * 单位
     */
    private String unit;

    /**
     * 生产日期
     */
    @Temporal(TemporalType.DATE)
    private Date produceOn;

    /**
     * 保质期
     */
    private String storage;

    /**
     * 备注
     */
    private String note;

    @ManyToOne
    private WareCategory category;

    /**
     * 供应商
     */
    @ManyToOne
    private Vendor vendor;

    @JsonIgnore
    @OneToMany(mappedBy="ware")
    private List<StockInCost> inCosts;

    @JsonIgnore
    @OneToMany(mappedBy="ware")
    private List<StockOutCost> outCosts;

    @JsonIgnore
    @OneToMany(mappedBy="ware")
    private List<MonthendInventory> inventories;

    public static enum COLUMNS {
        NAME, BRAND, MODEL, UNIT, VENDOR
    }

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

    public Date getProduceOn() {
        return produceOn;
    }

    public void setProduceOn(Date produceOn) {
        this.produceOn = produceOn;
    }

    public String getStorage() {
        return storage;
    }

    public void setStorage(String storage) {
        this.storage = storage;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public WareCategory getCategory() {
        return category;
    }

    public void setCategory(WareCategory category) {
        this.category = category;
    }

    public Vendor getVendor() {
        return vendor;
    }

    public void setVendor(Vendor vendor) {
        this.vendor = vendor;
    }

    public List<StockInCost> getInCosts() {
        return inCosts;
    }

    public void setInCosts(List<StockInCost> inCosts) {
        this.inCosts = inCosts;
    }

    public List<StockOutCost> getOutCosts() {
        return outCosts;
    }

    public void setOutCosts(List<StockOutCost> outCosts) {
        this.outCosts = outCosts;
    }

    public List<MonthendInventory> getInventories() {
        return inventories;
    }

    public void setInventories(List<MonthendInventory> inventories) {
        this.inventories = inventories;
    }

    @Override
    public String toString() {
        return "Ware(商品) => [" + super.toString() + ", name=" + name + ", brand=" + brand + ", model=" + model + ", unit=" + unit + "]";
    }

    @JsonProperty("vendor")
    public Map<String, Object> getVendorUI() {
        Map<String, Object> vendorUI = new HashMap<String, Object>();
        Vendor vendor = getVendor();
        if (vendor != null) {
            vendorUI.put("id", vendor.getId());
            vendorUI.put("name", vendor.getName());
        }
        return vendorUI;
    }

    public int getCountOfInCosts(){
        return getInCosts().size();
    }
    
    public int getCountOfOutCosts(){
        return getOutCosts().size();
    }
    
    public int getCountOfInventories(){
        return getInventories().size();
    }
}
