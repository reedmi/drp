package com.originspark.drp.service.projects.costs;
/**@author yestin*/

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.originspark.drp.dao.BaseDAOSupport;
import com.originspark.drp.models.projects.costs.StockOutCost;
import com.originspark.drp.models.projects.costs.AbstractCost.COLUMNS;
import com.originspark.drp.util.json.FilterRequest;

@Transactional
@Service("stockOutCostService")
public class StockOutCostServiceBean extends BaseDAOSupport<StockOutCost> implements
        StockOutCostService {

    @Override
    public List<StockOutCost> pagedDataSet(int start, int limit,
            List<FilterRequest> filters) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<StockOutCost> dataQuery = cb.createQuery(StockOutCost.class);

        Root<StockOutCost> stockOutCost = dataQuery.from(StockOutCost.class);

        dataQuery.select(stockOutCost);

        Predicate[] predicates = toPredicates(cb, stockOutCost, filters);

        if (predicates != null) {
            dataQuery.where(cb.and(predicates));
        }

        return em.createQuery(dataQuery).setFirstResult(start)
                .setMaxResults(limit).getResultList();
    }

    @Override
    public Long pagedDataCount(List<FilterRequest> filters) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        Root<StockOutCost> stockOutCost = countQuery.from(StockOutCost.class);
        countQuery.select(cb.count(stockOutCost));

        Predicate[] predicates = toPredicates(cb, stockOutCost, filters);

        if (predicates != null) {
            countQuery.where(cb.and(predicates));
        }

        return em.createQuery(countQuery).getSingleResult();
    }

    public static Predicate[] toPredicates(CriteriaBuilder cb, Root<StockOutCost> stockOutCost,
            List<FilterRequest> filters) {
        List<Predicate> criteria = new ArrayList<Predicate>();

        try {
            for (FilterRequest filter : filters) {
                
                COLUMNS column = COLUMNS.valueOf(filter.getProperty()
                        .toUpperCase());
                
                String value = filter.getValue();
                
                switch (column) {
                case INVOICE:
                    if(value != null && !value.equals("")){
                        criteria.add(cb.equal(stockOutCost.get("invoice").<Long>get("id"),Long.parseLong(value)));
                    }
                    break;
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        if (criteria.size() == 0) {
            return null;
        } else {
            Predicate[] predicates = new Predicate[criteria.size()];
            predicates = criteria.toArray(predicates);
            return predicates;
        }
    }

    @Override
    public Map<String, String> validate() {
        // TODO
        /**
         * 对ware的数据进行验证
         */
        return null;
    }

}
