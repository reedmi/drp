package com.originspark.drp.service.resources;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Service;

import com.originspark.drp.dao.BaseDAOSupport;
import com.originspark.drp.models.resources.Vendor;
import com.originspark.drp.models.resources.Ware;
import com.originspark.drp.models.resources.Vendor.COLUMNS;
import com.originspark.drp.util.json.FilterRequest;

@Service
public class VendorServiceBean extends BaseDAOSupport<Vendor> implements VendorService {

    @Override
    public List<Vendor> pagedDataSet(int start, int limit, List<FilterRequest> filters) {

        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Vendor> dataQuery = cb.createQuery(Vendor.class);

        Root<Vendor> vendor = dataQuery.from(Vendor.class);

        dataQuery.select(vendor);

        Predicate[] predicates = toPredicates(cb, vendor, filters);

        if (predicates != null) {
            dataQuery.where(cb.and(predicates));
        }

        return em.createQuery(dataQuery).
                setFirstResult(start).
                setMaxResults(limit).
                getResultList();
    }

    @Override
    public Long pagedDataCount(List<FilterRequest> filters) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        Root<Vendor> vendor = countQuery.from(Vendor.class);
        countQuery.select(cb.count(vendor));

        Predicate[] predicates = toPredicates(cb, vendor, filters);

        if (predicates != null) {
            countQuery.where(cb.and(predicates));
        }

        return em.createQuery(countQuery).getSingleResult();
    }

    public static Predicate[] toPredicates(CriteriaBuilder cb, Root<Vendor> vendor, List<FilterRequest> filters) {
        List<Predicate> criteria = new ArrayList<Predicate>();

        try {
            for (FilterRequest filter : filters) {

                COLUMNS column = COLUMNS.valueOf(filter.getProperty()
                        .toUpperCase());

                String value = filter.getValue();

                switch (column) {
                    case NAME:
                        if (value != null && !value.equals("")) {
                            criteria.add(cb.like(vendor.<String>get("name"), "%" + value + "%"));
                        }
                        break;
                    case ADDRESS:
                        if (value != null && !value.equals("")) {
                            criteria.add(cb.like(vendor.<String>get("address"), "%" + value + "%"));
                        }
                        break;
                    case PHONE:
                        if (value != null && !value.equals("")) {
                            criteria.add(cb.like(vendor.<String>get("phone"), "%" + value + "%"));
                        }
                        break;
                    case CONTACTMAN:
                        if (value != null && !value.equals("")) {
                            criteria.add(cb.like(vendor.<String>get("contactMan"), "%" + value + "%"));
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
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Vendor findByName(String name) {
        String jpql = "from Vendor where name = :name";
        TypedQuery<Vendor> query = em.createQuery(jpql, Vendor.class)
                .setParameter("name", name);
        List<Vendor> vendors = query.getResultList();
        if (vendors.isEmpty()) {
            return null;
        }
        return vendors.get(0);
    }

    @Override
    public boolean have(Vendor vendor) {
        String jpql = "from Vendor where name =:name and contactMan =:contactMan";
        TypedQuery<Vendor> query = em.createQuery(jpql, Vendor.class)
                .setParameter("name", vendor.getName())
                .setParameter("contactMan", vendor.getContactMan());

        List<Vendor> vendors = query.getResultList();
        if(vendors.isEmpty()){
            return false;
        }
        return true;
    }

}
