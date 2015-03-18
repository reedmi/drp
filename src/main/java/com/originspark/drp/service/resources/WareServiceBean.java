package com.originspark.drp.service.resources;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.originspark.drp.dao.BaseDAOSupport;
import com.originspark.drp.models.resources.Ware;
import com.originspark.drp.models.resources.Ware.COLUMNS;
import com.originspark.drp.util.json.FilterRequest;

@Transactional
@Service
public class WareServiceBean extends BaseDAOSupport<Ware> implements WareService {

    @Override
    public List<Ware> pagedDataSet(int start, int limit,
            List<FilterRequest> filters) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Ware> dataQuery = cb.createQuery(Ware.class);

        Root<Ware> ware = dataQuery.from(Ware.class);

        dataQuery.select(ware);

        Predicate[] predicates = toPredicates(em,cb, ware, filters);

        if (predicates != null) {
            dataQuery.where(cb.and(predicates));
        } 
        
        dataQuery.orderBy(cb.desc(ware.get("id")));

        return em.createQuery(dataQuery).setFirstResult(start)
                .setMaxResults(limit).getResultList();
    }

    @Override
    public Long pagedDataCount(List<FilterRequest> filters) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        Root<Ware> ware = countQuery.from(Ware.class);
        countQuery.select(cb.count(ware));

        Predicate[] predicates = toPredicates(em,cb, ware, filters);

        if (predicates != null) {
            countQuery.where(cb.and(predicates));
        } 

        return em.createQuery(countQuery).getSingleResult();
    }

    public static Predicate[] toPredicates(EntityManager em,CriteriaBuilder cb, Root<Ware> ware,
            List<FilterRequest> filters) {
        List<Predicate> criteria = new ArrayList<Predicate>();

        try {
            for (FilterRequest filter : filters) {
                
                COLUMNS column = COLUMNS.valueOf(filter.getProperty()
                        .toUpperCase());
                
                String value = filter.getValue();
                
                switch (column) {
                case NAME:
                    if(value != null && !value.equals("")){
                        criteria.add(cb.like(ware.<String>get("name"), "%"+value+"%"));
                    }
                    break;
                case BRAND:
                    if(value != null && !value.equals("")){
                        criteria.add(cb.like(ware.<String>get("brand"), "%"+value+"%"));
                    }
                    break;
                case MODEL:
                    if(value != null && !value.equals("")){
                        criteria.add(cb.like(ware.<String>get("model"), "%"+value+"%"));
                    }
                    break;
                case UNIT:
                    if(value != null && !value.equals("")){
                        criteria.add(cb.like(ware.<String>get("unit"), "%"+value+"%"));
                    }
                    break;
                case VENDOR:
                    if(value != null && !value.equals("")){
                        criteria.add(cb.like(ware.get("vendor").<String>get("name"), "%"+value+"%"));
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
    public Map<String, String> validate(Ware ware) {
        
        Map<String, String> validations = new HashMap<String,String>();
        
        String name = ware.getName();
        if(name == null || name.trim().equals("")){
            validations.put("name", "名称不能为空");
        }
        
        String unit = ware.getUnit();
        if(unit == null || unit.trim().equals("")){
            validations.put("unit", "单位不能为空");
        }
        
        return validations;
    }

    @Override
    public boolean have(Ware ware) {
        String jpql = "from Ware where name =:name and model =:model and unit =:unit and brand =:brand and category =:category and vendor =:vendor";
        TypedQuery<Ware> query = em.createQuery(jpql, Ware.class)
                .setParameter("name", ware.getName())
                .setParameter("model", ware.getModel())
                .setParameter("unit", ware.getUnit())
                .setParameter("brand", ware.getBrand())
                .setParameter("category", ware.getCategory())
                .setParameter("vendor", ware.getVendor());

        List<Ware> wares = query.getResultList();
        if(wares.isEmpty()){
            return false;
        }
        return true;
    }

    @SuppressWarnings("unchecked")
    public static List<BigInteger> getWaresBySystem(EntityManager em,Long id) {
        String sql = "SELECT id FROM wares WHERE id in ("
                       + " SELECT csi.ware"
                       + " FROM cost_stock_in csi,invoice_stock_in isi"
                       + " WHERE csi.invoice = isi.id and isi.system = ? )";
        Query query = em.createNativeQuery(sql);
        query.setParameter(1, id);
        
        List<BigInteger> res = query.getResultList();
        List<BigInteger> ids = new ArrayList<BigInteger>();
        
        for (int i = 0, length = res.size(); i < length; i++) {
            ids.add(res.get(i));
        }
        
        return ids;
    }

}
