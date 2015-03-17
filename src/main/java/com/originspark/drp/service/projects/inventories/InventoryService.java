package com.originspark.drp.service.projects.inventories;

import java.util.List;

import com.originspark.drp.dao.BaseDAO;
import com.originspark.drp.web.models.projects.inventories.CurrentInventoryUI;

public interface InventoryService extends BaseDAO {

    List<CurrentInventoryUI> pagedCurrentInventories(int start, int limit);

    Long pagedCurrentInventoriesCount();
}
