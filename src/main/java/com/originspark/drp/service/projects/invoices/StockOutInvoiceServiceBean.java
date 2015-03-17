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
import com.originspark.drp.models.projects.costs.StockOutCost;
import com.originspark.drp.models.projects.invoices.AbstractInvoice.COLUMNS;
import com.originspark.drp.models.projects.invoices.StockOutInvoice;
import com.originspark.drp.util.StringUtil;
import com.originspark.drp.util.enums.AuditState;
import com.originspark.drp.util.json.FilterRequest;

@Transactional
@Service
public class StockOutInvoiceServiceBean extends BaseDAOSupport<StockOutInvoice> implements
		StockOutInvoiceService {

	@Override
	public List<StockOutInvoice> pagedDataSet(int start, int limit,
			List<FilterRequest> filters) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<StockOutInvoice> dataQuery = cb.createQuery(StockOutInvoice.class);

		Root<StockOutInvoice> stockout = dataQuery.from(StockOutInvoice.class);

		dataQuery.select(stockout);
		
		StockOutCost[] outCosts = findByWareName(filters);
		if(outCosts == null){
		    return null;
		}

		List<Predicate[]> predicates = toPredicates(cb, stockout, filters, outCosts);
        
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

        dataQuery.orderBy(cb.desc(stockout.get("forDate")));
        
		return em.createQuery(dataQuery).setFirstResult(start)
				.setMaxResults(limit).getResultList();
	}

	@Override
	public Long pagedDataCount(List<FilterRequest> filters) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
		Root<StockOutInvoice> stockout = countQuery.from(StockOutInvoice.class);
		countQuery.select(cb.count(stockout));
		
		StockOutCost[] outCosts = findByWareName(filters);
        if(outCosts == null){
            return 0L;
        }

		List<Predicate[]> predicates = toPredicates(cb, stockout, filters, findByWareName(filters));
        
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
	
	public static List<Predicate[]> toPredicates(CriteriaBuilder cb, Root<StockOutInvoice> stockout,
        List<FilterRequest> filters, StockOutCost...costs) {
    
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
                            andCriteria.add(cb.greaterThanOrEqualTo(stockout.<Date>get("forDate"), startDate));
                        }
                        break;
                    case ENDDATE:
                        if (value != null && !value.equals("")) {
                            Date endDate = StringUtil.String2Date(value);
                            andCriteria.add(cb.lessThanOrEqualTo(stockout.<Date>get("forDate"), endDate));
                        }
                        break;
                    case PROJECT:
                        if (value != null && !value.equals("")) {
                            andCriteria.add(cb.like(stockout.get("system").get("project").<String>get("name"), "%" + value + "%"));
                        }
                        break;
                    case SYSTEM:
                        if (value != null && !value.equals("")) {
                            andCriteria.add(cb.like(stockout.get("system").<String>get("name"), "%" + value + "%"));
                        }
                        break;
                    case MINTOTAL:
                        if (value != null && !value.equals("")) {
                            BigDecimal minTotal = StringUtil.String2BigDecimal(value);
                            andCriteria.add(cb.greaterThanOrEqualTo(stockout.<BigDecimal>get("totalPrice"), minTotal));
                        }
                        break;
                    case MAXTOTAL:
                        if (value != null && !value.equals("")) {
                            BigDecimal maxTotal = StringUtil.String2BigDecimal(value);
                            andCriteria.add(cb.lessThanOrEqualTo(stockout.<BigDecimal>get("totalPrice"), maxTotal));
                        }
                        break;
                    case MATERIALKEEPERNAME:
                        if (value != null && !value.equals("")) {
                            andCriteria.add(cb.like(stockout.<String>get("materialKeeperName"), "%" + value + "%"));
                        }
                        break;
                    case WAREKEEPERNAME:
                        if (value != null && !value.equals("")) {
                            andCriteria.add(cb.like(stockout.<String>get("wareKeeperName"), "%" + value + "%"));
                        }
                        break;
                    case PROJECTMANAGERNAME:
                        if (value != null && !value.equals("")) {
                            andCriteria.add(cb.like(stockout.<String>get("projectManagerName"), "%" + value + "%"));
                        }
                        break;
                    case MATERIALKEEPERID:
                        if (value != null && !value.equals("")) {
                            andCriteria.add(cb.equal(stockout.get("system").get("project").get("materialKeeper").<Long>get("id"), Long.valueOf(value)));
                        }
                        break;
                    case WAREKEEPERID:
                        if (value != null && !value.equals("")) {
                            andCriteria.add(cb.equal(stockout.get("system").get("project").get("wareKeeper").<Long>get("id"), Long.valueOf(value)));
                        }
                        break;
                    case PROJECTMANAGERID:
                        if (value != null && !value.equals("")) {
                            andCriteria.add(cb.equal(stockout.get("system").get("project").get("projectManager").<Long>get("id"), Long.valueOf(value)));
                        }
                        break;
                    case MATERIALKEEPERAUDITSTATE:
                        if (value != null && !value.equals("")) {
                            andCriteria.add(cb.equal(stockout.get("materialKeeperAuditState"),AuditState.valueOf(value)));
                        }
                        break;
                    case WAREKEEPERAUDITSTATE:
                        if (value != null && !value.equals("")) {
                            andCriteria.add(cb.equal(stockout.get("wareKeeperAuditState"),AuditState.valueOf(value)));
                        }
                        break;
                    case PROJECTMANAGERAUDITSTATE:
                        if (value != null && !value.equals("")) {
                            andCriteria.add(cb.equal(stockout.get("projectManagerAuditState"),AuditState.valueOf(value)));
                        }
                        break;
                    case RECEIVEMANNAME :
                        if (value != null && !value.equals("")) {
                            andCriteria.add(cb.like(stockout.<String>get("receiveMan"),"%" + value + "%"));
                        }    
                        break;
                    case WARENAME:
                        if (value != null && !value.equals("")) {
                            //因为一个出库单中的商品是不可以重复的，所以一个商品对应一个cost，只要判断这个cost is member of invoice即可
                            for(int i=0,len=costs.length; i<len;i++){
                                orCriteria.add(cb.isMember(costs[i],stockout.<List<StockOutCost>>get("costs")));
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
    public StockOutInvoice findById(Long id) {
        return em.find(StockOutInvoice.class, id);
    }
    
    private StockOutCost[] findByWareName(List<FilterRequest> filters){
        for(FilterRequest filter : filters){
            COLUMNS column = COLUMNS.valueOf(filter.getProperty().toUpperCase());
            String value = filter.getValue();
            if(column == COLUMNS.WARENAME){
                TypedQuery<StockOutCost> query = em.createQuery("from StockOutCost cost where cost.ware.name like :name",StockOutCost.class);
                query.setParameter("name", "%"+value+"%");
                List<StockOutCost> outcosts = query.getResultList();
                if(outcosts.isEmpty()){
                    return null;
                }
                return outcosts.toArray(new StockOutCost[0]);
            }
        }
        return new StockOutCost[0];
    }
}
