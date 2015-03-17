package com.originspark.drp.models.projects.costs;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.originspark.drp.models.projects.invoices.StockInInvoice;
import com.originspark.drp.models.resources.Ware;


@Entity
@Table(name="cost_stock_in")
public class StockInCost extends AbstractCost {
    
    /**
     * 货品
     */
    @ManyToOne
    private Ware ware;

    @ManyToOne
    private StockInInvoice invoice;

    public Ware getWare() {
        return ware;
    }

    public void setWare(Ware ware) {
        this.ware = ware;
    }

    public StockInInvoice getInvoice() {
        return invoice;
    }

    public void setInvoice(StockInInvoice invoice) {
        this.invoice = invoice;
    }
    
    @Override
    public String toString() {
        return "StockInCost(入库量) => ["+super.toString()+", ware.id="+ware.getId()+", invoice.id="+invoice.getId()+"]";
    }
}
