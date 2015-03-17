package com.originspark.drp.service.projects.invoices;

import java.util.List;
import java.util.Map;

import com.originspark.drp.dao.BaseDAO;
import com.originspark.drp.models.projects.invoices.StockOutInvoice;
import com.originspark.drp.util.json.FilterRequest;

public interface StockOutInvoiceService extends BaseDAO<StockOutInvoice> {

    List<StockOutInvoice> pagedDataSet(int start, int limit, List<FilterRequest> filters);
    
    Long pagedDataCount(List<FilterRequest> filters);
    
    Map<String, String> validate();
    
    StockOutInvoice findById(Long id);
}
