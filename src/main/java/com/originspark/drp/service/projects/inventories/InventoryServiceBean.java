package com.originspark.drp.service.projects.inventories;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Query;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.originspark.drp.dao.BaseDAOSupport;
import com.originspark.drp.web.models.projects.inventories.CurrentInventoryUI;

@SuppressWarnings("rawtypes")
@Transactional
@Service
public class InventoryServiceBean extends BaseDAOSupport implements InventoryService {

    // 实时入库量统计
    final String CURRENT_IN_SQL = "(SELECT DISTINCT(ware) as wid, sum(quantity) as incount, SUM(total) as outcome FROM cost_stock_in GROUP BY ware) as t1";
    // 实时出库量统计
    final String CURRENT_OUT_SQL = "(SELECT DISTINCT(ware) as wid, sum(quantity) as outcount, SUM(total) as income FROM cost_stock_out GROUP BY ware) as t2";
    // 实时库存量统计
    final String CURRENT_SUM_SQL = "SELECT t3.name, t3.model, t3.unit, t3.brand, t1.outcome, t1.incount, t2.income, t2.outcount FROM "
            + CURRENT_IN_SQL + " LEFT JOIN " + CURRENT_OUT_SQL + " ON t1.wid = t2.wid"
            + " JOIN wares as t3 WHERE t1.wid = t3.id";
    // 实时库存量总数计算
    final String CURRENT_COUNT = "SELECT COUNT(DISTINCT(ware)) FROM cost_stock_in";


    @SuppressWarnings("unchecked")
    @Override
    public List<CurrentInventoryUI> pagedCurrentInventories(int start, int limit) {
        Query query = em.createNativeQuery(CURRENT_SUM_SQL);
        List<Object[]> res;
        if (start >= 0 && limit > 0) {
            res = query.setFirstResult(start).setMaxResults(limit).getResultList();
        } else {
            res = query.getResultList();
        }
        List<CurrentInventoryUI> currentInventories = new ArrayList<CurrentInventoryUI>();

        Object[] objAry;
        for (int i = 0, length = res.size(); i < length; i++) {
            CurrentInventoryUI inventory = new CurrentInventoryUI();
            objAry = res.get(i);
            inventory.setName(objAry[0] + "");
            inventory.setModel(objAry[1] + "");
            inventory.setUnit(objAry[2] + "");
            inventory.setBrand(objAry[3] + "");
            inventory.setOutcome(objAry[4] == null ? BigDecimal.ZERO : (BigDecimal) objAry[4]);
            inventory.setIncount(objAry[5] == null ? 0L : ((BigDecimal) objAry[5]).longValue());
            inventory.setIncome(objAry[6] == null ? BigDecimal.ZERO : (BigDecimal) objAry[6]);
            inventory.setOutcount(objAry[7] == null ? 0L : ((BigDecimal) objAry[7]).longValue());
            currentInventories.add(inventory);
        }

        return currentInventories;
    }

    @Override
    public Long pagedCurrentInventoriesCount() {
        Query query = em.createNativeQuery(CURRENT_COUNT);
        BigInteger count = (BigInteger) query.getSingleResult();
        return count.longValue();
    }

}
