package com.originspark.drp.models.projects.costs;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.originspark.drp.models.AbstractModel;

@MappedSuperclass
public abstract class AbstractCost extends AbstractModel {

    private static SimpleDateFormat forYearMonthFormatter = new SimpleDateFormat("yyyy-MM");

    /**
     * 该字段和对应invoice的时间字段保持一致，为冗余字段，
     * 只为简化盘点计算，forYearMonth同理
     * 日期：年-月-日
     */
    @Temporal(TemporalType.DATE)
    private Date forDate;

    /**
     * 日期：年-月
     */
    @JsonIgnore
    @Column(columnDefinition = "char(7)", nullable = false)
    private String forYearMonth;

    /**
     * 单价
     */
    @Column(name="unitPrice", precision = 10, scale = 3, nullable = true)
    private BigDecimal unitPrice = BigDecimal.ZERO;

    /**
     * 数量
     */
    @Column(name="quantity", precision = 10, scale = 0, nullable = false)
    private BigDecimal quantity = BigDecimal.ZERO;

    /**
     * 合价
     */
    private BigDecimal total = BigDecimal.ZERO;

    public static enum COLUMNS {
        INVOICE
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        if(unitPrice == null){
            this.unitPrice = BigDecimal.ZERO;
        }
        this.unitPrice = unitPrice;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public Date getForDate() {
        return forDate;
    }

    public void setForDate(Date forDate) {
        this.forDate = forDate;
        if (forDate != null) {
            setForYearMonth(forYearMonthFormatter.format(forDate));
        }
    }

    public String getForYearMonth() {
        return forYearMonth;
    }

    public void setForYearMonth(String forYearMonth) {
        this.forYearMonth = forYearMonth;
    }

    @Override
    public String toString() {
        return super.toString()+", unitPrice="+unitPrice+", quantity="+quantity;
    }

    @PrePersist
    public void prePersist(){
        if(getUnitPrice() == null || getQuantity() == null){
            setTotal(BigDecimal.ZERO);
        }
        setTotal(getUnitPrice().multiply(getQuantity()));
    }

    @PreUpdate
    public void PreUpdate(){
        if(getUnitPrice() == null || getQuantity() == null){
            setTotal(BigDecimal.ZERO);
        }
        setTotal(getUnitPrice().multiply(getQuantity()));
    }
}
