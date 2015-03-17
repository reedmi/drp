package com.originspark.drp.service.resources;

import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.originspark.drp.dao.BaseDAOSupport;
import com.originspark.drp.models.resources.WareCategory;

@Transactional
@Service("wareCategoryService")
public class WareCategoryServiceBean extends BaseDAOSupport<WareCategory> implements
        WareCategoryService {

    @Override
    public List<WareCategory> treeViewData() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<WareCategory> dataQuery = cb.createQuery(WareCategory.class);

        Root<WareCategory> category = dataQuery.from(WareCategory.class);

        dataQuery.select(category);

        dataQuery.where(cb.isNull(category.get("parent")));

        return em.createQuery(dataQuery).getResultList();
    }

}
