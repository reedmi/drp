package com.originspark.drp.service.resources;


import java.util.List;
import com.originspark.drp.dao.BaseDAO;
import com.originspark.drp.models.resources.WareCategory;

public interface WareCategoryService extends BaseDAO<WareCategory>{
    List<WareCategory> treeViewData();
}
