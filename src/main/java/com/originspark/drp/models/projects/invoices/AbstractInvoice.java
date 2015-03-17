package com.originspark.drp.models.projects.invoices;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.originspark.drp.models.AbstractModel;

/**
 *  单据
 */
@MappedSuperclass
public abstract class AbstractInvoice extends AbstractModel{

    private static SimpleDateFormat forYearMonthFormatter = new SimpleDateFormat("yyyy-MM");

    /**
     * 编号
     */
    private String code;

    /**
     * 日期
     */
    @Temporal(TemporalType.DATE)
    private Date forDate;

    @JsonIgnore
    @Column(columnDefinition = "char(7)", nullable = false)
    private String forYearMonth;

    /**
     * 汇总价格
     */
    @Column(precision = 15, scale = 2, nullable = false)
    private BigDecimal totalPrice = BigDecimal.ZERO;

    /**
     * 负责人
     */
    private String manager;

    /**
     * 库管
     */
    private String wareKeeper;

    /**
     * 经手人
     */
    private String regulator;

    public static enum COLUMNS {
        STARTDATE,ENDDATE,CODE,
        MINTOTAL,MAXTOTAL,PROJECT,SYSTEM,
        WARENAME,RECEIVEMANNAME,
        REGULATORNAME,WAREKEEPERNAME,MANAGERNAME
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getManager() {
        return manager;
    }

    public void setManager(String manager) {
        this.manager = manager;
    }

    public String getWareKeeper() {
        return wareKeeper;
    }

    public void setWareKeeper(String wareKeeper) {
        this.wareKeeper = wareKeeper;
    }

    public String getRegulator() {
        return regulator;
    }

    public void setRegulator(String regulator) {
        this.regulator = regulator;
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

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    @Override
    public String toString() {
        return super.toString()+", code="+code+", forDate="+forDate+", totalPrice="+totalPrice;
    }
}