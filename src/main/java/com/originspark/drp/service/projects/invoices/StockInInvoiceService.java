package com.originspark.drp.service.projects.invoices;

import java.util.List;
import java.util.Map;

import com.originspark.drp.dao.BaseDAO;
import com.originspark.drp.models.projects.invoices.StockInInvoice;
import com.originspark.drp.util.json.FilterRequest;

public interface StockInInvoiceService extends BaseDAO<StockInInvoice> {

	List<StockInInvoice> pagedDataSet(int start, int limit, List<FilterRequest> filters);
	
	Long pagedDataCount(List<FilterRequest> filters);
	
	Map<String, String> validate();
	
	StockInInvoice findById(Long id);
}
