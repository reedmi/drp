package com.originspark.drp.service.projects;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.originspark.drp.dao.BaseDAO;
import com.originspark.drp.models.projects.Project;
import com.originspark.drp.util.json.FilterRequest;
import com.originspark.drp.web.models.projects.inventories.CurrentInventoryUI;
import com.originspark.drp.web.models.projects.inventories.Ware;

@Service
public interface ProjectService extends BaseDAO<Project>{
	List<Project> treeViewData(List<FilterRequest> filters);
	
	Map<String, String> validate();
	
	Project findById(Long id);
	
	List<CurrentInventoryUI> getCurrentInventories(Long systemId);
	
	List<Ware> getMonthEndInventories(Long systemId,String formonth);
}
