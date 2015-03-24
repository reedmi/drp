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

    //TODO 将receiveMan、receiveAddress、receivePhone抽取为trader？
    /**
     * 联系地址
     */
    private String receiveAddress;

    /**
     * 联系电话
     */
    private String receivePhone;

    public List<StockOutCost> getCosts() {
        return costs;
    }

    public void setCosts(List<StockOutCost> costs) {
        this.costs = costs;
    }

    public String getReceiveAddress() {
        return receiveAddress;
    }

    public void setReceiveAddress(String receiveAddress) {
        this.receiveAddress = receiveAddress;
    }

    public String getReceivePhone() {
        return receivePhone;
    }

    public void setReceivePhone(String receivePhone) {
        this.receivePhone = receivePhone;
    }

    public int getCostCount(){
        return getCosts().size();
    }
}
