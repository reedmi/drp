package com.originspark.drp.service.projects;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.originspark.drp.dao.BaseDAOSupport;
import com.originspark.drp.models.projects.Project;
import com.originspark.drp.models.projects.Project.COLUMNS;
import com.originspark.drp.util.StringUtil;
import com.originspark.drp.util.json.FilterRequest;
import com.originspark.drp.web.models.projects.inventories.CurrentInventoryUI;
import com.originspark.drp.web.models.projects.inventories.Ware;

@Transactional
@Service
public class ProjectServiceBean extends BaseDAOSupport<Project> implements ProjectService {

    @Override
    public Map<String, String> validate() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public List<Project> treeViewData(List<FilterRequest> filters) {
        
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Project> dataQuery = cb.createQuery(Project.class);

        Root<Project> project = dataQuery.from(Project.class);

        dataQuery.select(project);

        Predicate[] predicates = toPredicates(cb, project, filters);

        if (predicates != null) {
            dataQuery.where(cb.and(predicates));
        }else{
            dataQuery.where(cb.isNull(project.get("project")));
        }
        
        return em.createQuery(dataQuery).getResultList();
    }

    public static Predicate[] toPredicates(CriteriaBuilder cb, Root<Project> project,
            List<FilterRequest> filters) {
        List<Predicate> criteria = new ArrayList<Predicate>();
        
        try {
            for (FilterRequest filter : filters) {

                COLUMNS column = COLUMNS.valueOf(filter.getProperty()
                        .toUpperCase());

                String value = filter.getValue();

                switch (column) {
                    case PROJECTMANAGER:
                        if (value != null && !value.equals("")) {
                            criteria.add(cb.equal(project.get("projectManager").<Long>get("id"),Long.parseLong(value)));
                        }
                        break;
                    case WAREKEEPER:
                        if (value != null && !value.equals("")) {
                            criteria.add(cb.equal(project.get("wareKeeper").<Long>get("id"),Long.parseLong(value)));
                        }
                        break;
                    case MATERIALKEEPER:
                        if (value != null && !value.equals("")) {
                            criteria.add(cb.equal(project.get("materialKeeper").<Long>get("id"),Long.parseLong(value)));
                        }
                        break;
                    case LEADER:
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
    
    public Project getReferance(Long id){
        return getReferance(Project.class, id);
    }

    @Override
    public Project findById(Long id){
        return findById(Project.class, id);
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<CurrentInventoryUI> getCurrentInventories(Long systemId) {
        
        String sql = "SELECT w.name,w.brand,w.model,w.unit,"
                + " cin.incount,cin.outcount"
                + " FROM wares as w,view_currentinventory cin"
                + " WHERE w.id = cin.ware AND cin.system = ?";
        
        Query query = em.createNativeQuery(sql);
        query.setParameter(1, systemId);
        
        List<Object[]> res = query.getResultList();
        
        List<CurrentInventoryUI> currentInventories = new ArrayList<CurrentInventoryUI>();
        
        Object[] objAry;
        for (int i = 0, length = res.size(); i < length; i++) {
            CurrentInventoryUI inventory = new CurrentInventoryUI();
            objAry = res.get(i);
            inventory.setWareName(objAry[0]+"");
            inventory.setWareBrand(objAry[1]+"");
            inventory.setWareModel(objAry[2]+"");
            inventory.setWareUnit(objAry[3]+"");
            inventory.setCurrentStockIn(objAry[4]==null?BigDecimal.ZERO:(BigDecimal)objAry[4]);
            inventory.setCurrentStockOut(objAry[5]==null?BigDecimal.ZERO:(BigDecimal)objAry[5]);
            currentInventories.add(inventory);
        }
        
        return currentInventories;
    }
    
    @SuppressWarnings("unchecked")
    public List<Ware> getMonthEndInventories(Long systemId,String formonth){
        
        String sql = "SELECT w.name,w.brand,w.model,w.unit,t1.incount-IFNULL(t1.outcount,0) as lastMonthLeft,t2.incount,t2.outcount"
                + " FROM wares w,"
                + " (SELECT * FROM view_monthendinventory WHERE formonth= ?) as t1"
                    + " RIGHT JOIN"
                + " (SELECT * FROM view_monthendinventory WHERE formonth= ?) as t2"
                    + " ON t1.system=t2.system AND t1.ware=t2.ware"
                + " WHERE w.id = t2.ware and t2.system = ?";
        
        Query query = em.createNativeQuery(sql);
        
        query.setParameter(1, StringUtil.getPreMonth(formonth));
        query.setParameter(2, formonth);
        query.setParameter(3, systemId);
        
        List<Object[]> res = query.getResultList();
        
        List<Ware> monthEndInventories = new ArrayList<Ware>();
        
        Object[] objAry;
        for (int i = 0, length = res.size(); i < length; i++) {
            Ware inventory = new Ware();
            objAry = res.get(i);
            inventory.setWareName(objAry[0]+"");
            inventory.setWareBrand(objAry[1]+"");
            inventory.setWareModel(objAry[2]+"");
            inventory.setWareUnit(objAry[3]+"");
            
            inventory.setLastMonthLeft(objAry[4]==null?BigDecimal.ZERO:(BigDecimal)objAry[4]);
            inventory.setMonthIn(objAry[5]==null?BigDecimal.ZERO:(BigDecimal)objAry[5]);
            inventory.setMonthOut(objAry[6]==null?BigDecimal.ZERO:(BigDecimal)objAry[6]);
            
            monthEndInventories.add(inventory);
        }
        
        return monthEndInventories;
        
    }
}
