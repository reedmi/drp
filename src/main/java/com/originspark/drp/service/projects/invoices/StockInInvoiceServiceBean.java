package com.originspark.drp.service.projects.invoices;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.originspark.drp.dao.BaseDAOSupport;
import com.originspark.drp.models.projects.costs.StockInCost;
import com.originspark.drp.models.projects.invoices.AbstractInvoice.COLUMNS;
import com.originspark.drp.models.projects.invoices.StockInInvoice;
import com.originspark.drp.util.StringUtil;
import com.originspark.drp.util.enums.AuditState;
import com.originspark.drp.util.json.FilterRequest;

@Transactional
@Service
public class StockInInvoiceServiceBean extends BaseDAOSupport<StockInInvoice> implements
        StockInInvoiceService {

    @Override
    public List<StockInInvoice> pagedDataSet(int start, int limit,
            List<FilterRequest> filters) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<StockInInvoice> dataQuery = cb.createQuery(StockInInvoice.class);

        Root<StockInInvoice> stockin = dataQuery.from(StockInInvoice.class);

        dataQuery.select(stockin);
        
        StockInCost[] inCosts = findByWareName(filters);
        if(inCosts == null){
            return null;
        }

        List<Predicate[]> predicates = toPredicates(cb, stockin, filters, inCosts);
        
        if (predicates != null) {
            Predicate[] andPredicates = predicates.get(0);
            Predicate[] orPredicates = predicates.get(1);
            if(andPredicates.length != 0 && orPredicates.length == 0){
                dataQuery.where(cb.and(andPredicates));
            }else if(andPredicates.length == 0 && orPredicates.length != 0){
                dataQuery.where(cb.or(orPredicates));
            }else{
                dataQuery.where(cb.and(andPredicates),cb.or(orPredicates));
            }
        }
        
        dataQuery.orderBy(cb.desc(stockin.get("forDate")));

        return em.createQuery(dataQuery).setFirstResult(start)
                .setMaxResults(limit).getResultList();
    }

    @Override
    public Long pagedDataCount(List<FilterRequest> filters) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        Root<StockInInvoice> stockin = countQuery.from(StockInInvoice.class);
        countQuery.select(cb.count(stockin));
        
        StockInCost[] inCosts = findByWareName(filters);
        if(inCosts == null){
            return 0L;
        }

        List<Predicate[]> predicates = toPredicates(cb, stockin, filters, findByWareName(filters));
        
        if (predicates != null) {
            Predicate[] andPredicates = predicates.get(0);
            Predicate[] orPredicates = predicates.get(1);
            if(andPredicates.length != 0 && orPredicates.length == 0){
                countQuery.where(cb.and(andPredicates));
            }else if(andPredicates.length == 0 && orPredicates.length != 0){
                countQuery.where(cb.or(orPredicates));
            }else{
                countQuery.where(cb.and(andPredicates),cb.or(orPredicates));
            }
        }

        return em.createQuery(countQuery).getSingleResult();
    }

    public static List<Predicate[]> toPredicates(CriteriaBuilder cb, Root<StockInInvoice> stockin,
            List<FilterRequest> filters, StockInCost...costs) {
        
        List<Predicate> andCriteria= new ArrayList<Predicate>();
        List<Predicate> orCriteria= new ArrayList<Predicate>();

        try {
            for (FilterRequest filter : filters) {

                COLUMNS column = COLUMNS.valueOf(filter.getProperty()
                        .toUpperCase());

                String value = filter.getValue();

                switch (column) {
                    case STARTDATE:
                        if (value != null && !value.equals("")) {
                            Date startDate = StringUtil.String2Date(value);
                            andCriteria.add(cb.greaterThanOrEqualTo(stockin.<Date>get("forDate"), startDate));
                        }
                        break;
                    case ENDDATE:
                        if (value != null && !value.equals("")) {
                            Date endDate = StringUtil.String2Date(value);
                            andCriteria.add(cb.lessThanOrEqualTo(stockin.<Date>get("forDate"), endDate));
                        }
                        break;
                    case PROJECT:
                        if (value != null && !value.equals("")) {
                            andCriteria.add(cb.like(stockin.get("system").get("project").<String>get("name"), "%" + value + "%"));
                        }
                        break;
                    case SYSTEM:
                        if (value != null && !value.equals("")) {
                            andCriteria.add(cb.like(stockin.get("system").<String>get("name"), "%" + value + "%"));
                        }
                        break;
                    case MINTOTAL:
                        if (value != null && !value.equals("")) {
                            BigDecimal minTotal = StringUtil.String2BigDecimal(value);
                            andCriteria.add(cb.greaterThanOrEqualTo(stockin.<BigDecimal>get("totalPrice"), minTotal));
                        }
                        break;
                    case MAXTOTAL:
                        if (value != null && !value.equals("")) {
                            BigDecimal maxTotal = StringUtil.String2BigDecimal(value);
                            andCriteria.add(cb.lessThanOrEqualTo(stockin.<BigDecimal>get("totalPrice"), maxTotal));
                        }
                        break;
                    case MATERIALKEEPERNAME:
                        if (value != null && !value.equals("")) {
                            andCriteria.add(cb.like(stockin.<String>get("materialKeeperName"), "%" + value + "%"));
                        }
                        break;
                    case WAREKEEPERNAME:
                        if (value != null && !value.equals("")) {
                            andCriteria.add(cb.like(stockin.<String>get("wareKeeperName"), "%" + value + "%"));
                        }
                        break;
                    case PROJECTMANAGERNAME:
                        if (value != null && !value.equals("")) {
                            andCriteria.add(cb.like(stockin.<String>get("projectManagerName"), "%" + value + "%"));
                        }
                        break;
                    case MATERIALKEEPERID:
                        if (value != null && !value.equals("")) {
                            andCriteria.add(cb.equal(stockin.get("system").get("project").get("materialKeeper").<Long>get("id"), Long.valueOf(value)));
                        }
                        break;
                    case WAREKEEPERID:
                        if (value != null && !value.equals("")) {
                            andCriteria.add(cb.equal(stockin.get("system").get("project").get("wareKeeper").<Long>get("id"), Long.valueOf(value)));
                        }
                        break;
                    case PROJECTMANAGERID:
                        if (value != null && !value.equals("")) {
                            andCriteria.add(cb.equal(stockin.get("system").get("project").get("projectManager").<Long>get("id"), Long.valueOf(value)));
                        }
                        break;
                    case MATERIALKEEPERAUDITSTATE:
                        if (value != null && !value.equals("")) {
                            andCriteria.add(cb.equal(stockin.get("materialKeeperAuditState"),AuditState.valueOf(value)));
                        }
                        break;
                    case WAREKEEPERAUDITSTATE:
                        if (value != null && !value.equals("")) {
                            andCriteria.add(cb.equal(stockin.get("wareKeeperAuditState"),AuditState.valueOf(value)));
                        }
                        break;
                    case PROJECTMANAGERAUDITSTATE:
                        if (value != null && !value.equals("")) {
                            andCriteria.add(cb.equal(stockin.get("projectManagerAuditState"),AuditState.valueOf(value)));
                        }
                        break;
                    case WARENAME:
                        if (value != null && !value.equals("")) {
                            //因为一个入库单中的商品是不可以重复的，所以一个商品对应一个cost，只要判断这个cost is member of invoice即可
                            for(int i=0,len=costs.length; i<len;i++){
                                orCriteria.add(cb.isMember(costs[i],stockin.<List<StockInCost>>get("costs")));
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        if (andCriteria.isEmpty() && orCriteria.isEmpty()) {
            return null;
        } else{
            List<Predicate[]> criteria = new ArrayList<Predicate[]>();
            criteria.add(andCriteria.toArray(new Predicate[0]));
            criteria.add(orCriteria.toArray(new Predicate[0]));
            return criteria;
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

    @Override
    public StockInInvoice findById(Long id) {
        return em.find(StockInInvoice.class, id);
    }
    
    private StockInCost[] findByWareName(List<FilterRequest> filters){
        for(FilterRequest filter : filters){
            COLUMNS column = COLUMNS.valueOf(filter.getProperty().toUpperCase());
            String value = filter.getValue();
            if(column == COLUMNS.WARENAME){
                TypedQuery<StockInCost> query = em.createQuery("from StockInCost cost where cost.ware.name like :name",StockInCost.class);
                query.setParameter("name", "%"+value+"%");
                List<StockInCost> incosts = query.getResultList();
                if(incosts.isEmpty()){
                    return null;
                }
                return incosts.toArray(new StockInCost[0]);
            }
        }
        return new StockInCost[0];
    }
}
