package com.originspark.drp.models.projects.invoices;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.originspark.drp.models.projects.costs.StockOutCost;


/**
 *  出库单
 */
@Entity
@Table(name="invoice_stock_out")
public class StockOutInvoice extends AbstractInvoice{

    /**
     * 商品列表
     */
    @JsonIgnore
    @OneToMany(mappedBy="invoice")
    private List<StockOutCost> costs;

    /**
     * 领用人
     */
    private String receiveMan;

    public List<StockOutCost> getCosts() {
        return costs;
    }

    public void setCosts(List<StockOutCost> costs) {
        this.costs = costs;
    }

    public String getReceiveMan() {
        return receiveMan;
    }

    public void setReceiveMan(String receiveMan) {
        this.receiveMan = receiveMan;
    }
    
    public int getCostCount(){
        return getCosts().size();
    }
    
    @Override
    public String toString() {
        return "StockInInvoice(出库单) => ["+super.toString()+", receiveMan="+receiveMan+"]";
    }
}
