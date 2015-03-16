package com.originspark.drp.service.projects.costs;

import java.util.List;
import java.util.Map;

import com.originspark.drp.dao.BaseDAO;
import com.originspark.drp.models.projects.costs.StockOutCost;
import com.originspark.drp.util.json.FilterRequest;

public interface StockOutCostService extends BaseDAO<StockOutCost> {
    List<StockOutCost> pagedDataSet(int start, int limit, List<FilterRequest> filters);

    Long pagedDataCount(List<FilterRequest> filters);

    Map<String, String> validate();
}
