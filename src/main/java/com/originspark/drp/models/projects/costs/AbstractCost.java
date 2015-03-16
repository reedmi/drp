package com.originspark.drp.models.projects.costs;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

import com.originspark.drp.models.AbstractModel;


@MappedSuperclass
public abstract class AbstractCost extends AbstractModel{
    
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
