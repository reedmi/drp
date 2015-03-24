package com.originspark.drp.models.projects.inventories;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.originspark.drp.models.resources.Ware;

@Entity
@Table(name="inventories_monthend")
public class MonthendInventory {
    
    @Id
    @GeneratedValue
    private Long id;

    /**
     * 年月
     */
    @Column(columnDefinition = "char(7)", nullable = false)
    private String forYearMonth;
    
    /**
     * 商品
     */
    @ManyToOne
    private Ware ware;
    
    /**
     * 上月结存
     */
    @Column(name="lastMonthLeft", precision = 10, scale = 0, nullable = false)
    private BigDecimal lastMonthLeft;
    
    /**
     * 本月入库数量
     */
    @Column(name="monthIn", precision = 10, scale = 0, nullable = false)
    private BigDecimal monthIn;
    
    /**
     * 本月出库数量
     */
    @Column(name="monthOut", precision = 10, scale = 0, nullable = false)
    private BigDecimal monthOut;
    
    /**
     * 本月结存数量
     */
    @Column(name="monthLeft", precision = 10, scale = 0, nullable = false)
    private BigDecimal monthLeft;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getForYearMonth() {
        return forYearMonth;
    }

    public void setForYearMonth(String forYearMonth) {
        this.forYearMonth = forYearMonth;
    }

    public Ware getWare() {
        return ware;
    }

    public void setWare(Ware ware) {
        this.ware = ware;
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

    public BigDecimal getMonthLeft() {
        return lastMonthLeft.add(monthIn).subtract(monthOut);
    }

    public void setMonthLeft(BigDecimal monthLeft) {
        this.monthLeft = monthLeft;
    }

    public BigDecimal getLastMonthLeft() {
        return lastMonthLeft;
    }

    public void setLastMonthLeft(BigDecimal lastMonthLeft) {
        this.lastMonthLeft = lastMonthLeft;
    }

}
