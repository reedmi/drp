package com.originspark.drp.service.resources;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.originspark.drp.dao.BaseDAOSupport;
import com.originspark.drp.models.resources.WareCategory;

@Transactional
@Service
public class WareCategoryServiceBean extends BaseDAOSupport<WareCategory> implements
        WareCategoryService {

    @Override
    public List<WareCategory> treeViewData() {
        String sql = "from WareCategory where parent is null order by status asc, id desc";
        return em.createQuery(sql, WareCategory.class).getResultList();
    }

}
