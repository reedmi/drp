package com.originspark.drp.service.resources;


import java.util.List;
import java.util.Map;

import com.originspark.drp.dao.BaseDAO;
import com.originspark.drp.models.resources.Ware;
import com.originspark.drp.util.json.FilterRequest;

public interface WareService extends BaseDAO<Ware>{

	List<Ware> pagedDataSet(int start, int limit, List<FilterRequest> filters);
	
	Long pagedDataCount(List<FilterRequest> filters);
	
	Map<String, String> validate(Ware ware);
	
	//判断该商品是否已经存在
	boolean have(Ware ware);
	
}
