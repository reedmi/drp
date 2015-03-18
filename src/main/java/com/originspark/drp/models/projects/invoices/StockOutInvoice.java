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
     * 联系地址
     */
    private String address;

    public List<StockOutCost> getCosts() {
        return costs;
    }

    public void setCosts(List<StockOutCost> costs) {
        this.costs = costs;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getCostCount(){
        return getCosts().size();
    }
}
