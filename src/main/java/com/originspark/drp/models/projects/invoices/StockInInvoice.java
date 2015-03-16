package com.originspark.drp.models.projects.invoices;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.originspark.drp.models.projects.costs.StockInCost;


/**
 *  入库单
 */
@Entity
@Table(name="invoice_stock_in")
public class StockInInvoice extends AbstractInvoice{

	/**
     * 商品采购列表
     */
	@JsonIgnore
    @OneToMany(mappedBy="invoice")
    private List<StockInCost> costs;

	public List<StockInCost> getCosts() {
		return costs;
	}

	public void setCosts(List<StockInCost> costs) {
		this.costs = costs;
	}
	
	public int getCostCount(){
	    return getCosts().size();
	}
	
	@Override
	public String toString() {
	    return "StockInInvoice(入库单) => ["+super.toString()+"]";
	}
}
