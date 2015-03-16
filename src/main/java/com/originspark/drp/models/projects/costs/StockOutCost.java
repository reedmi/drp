package com.originspark.drp.models.projects.costs;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.originspark.drp.models.projects.invoices.StockOutInvoice;
import com.originspark.drp.models.resources.Ware;

@Entity
@Table(name="cost_stock_out")
public class StockOutCost extends AbstractCost {
    
    /**
     * 货品
     */
    @ManyToOne
    private Ware ware;
    
    @ManyToOne
    private StockOutInvoice invoice;
    
    public Ware getWare() {
        return ware;
    }

    public void setWare(Ware ware) {
        this.ware = ware;
    }

    public StockOutInvoice getInvoice() {
        return invoice;
    }

    public void setInvoice(StockOutInvoice invoice) {
        this.invoice = invoice;
    }
    
    @Override
    public String toString() {
        return "StockInCost(出库量) => ["+super.toString()+", invoice.id="+invoice.getId()+"]";
    }
}
