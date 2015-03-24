package com.originspark.drp.controllers.projects.costs;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.originspark.drp.controllers.BaseController;
import com.originspark.drp.models.projects.costs.StockOutCost;
import com.originspark.drp.models.projects.invoices.StockOutInvoice;
import com.originspark.drp.service.projects.costs.StockOutCostService;
import com.originspark.drp.util.SessionUtil;
import com.originspark.drp.util.json.FilterRequest;
import com.originspark.drp.util.json.JsonUtils;

@Controller
@RequestMapping("stockOutCost")
public class StockOutCostController extends BaseController{

    @Autowired
    private StockOutCostService service;

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public String create(@RequestBody StockOutCost stockOutCost) {

        StockOutInvoice invoiceUI = stockOutCost.getInvoice();
        if(invoiceUI == null){
            return failure("所选出库单不能为空");
        }

        StockOutInvoice invoice = stockOutInvoiceService.findById(invoiceUI.getId());
        if(invoice == null){
            return failure("你所选择的入库单不存在，请重新选择");
        }

        //检查该商品是否已经存在 
        boolean have = false;
        for(StockOutCost cost : invoice.getCosts()){
            if(cost.getWare().getId() == stockOutCost.getWare().getId()){
                have = true;
                break;
            }
        }
        if(have){
            return failure("抱歉，不能重复添加商品");
        }

        stockOutCost.setForDate(invoice.getForDate());
        stockOutCost.setCreatedOn(new Date());
        stockOutCost.setCreatedBy(getCurrentUser().getName());
        stockOutCost.setUpdatedOn(new Date());
        service.save(stockOutCost);
        return ok("创建成功");
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public String delete(@PathVariable Long id) {
        StockOutCost stockOutCost = service.findById(StockOutCost.class, id);
        service.delete(stockOutCost);
        return ok("删除成功");
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public String update(@PathVariable Long id, @RequestBody StockOutCost stockOutCost,HttpServletRequest request) {

        StockOutCost existingStockOutCost = service.findById(StockOutCost.class, id);
        if (existingStockOutCost == null) {
            return failure("您要更新的商品不存在");
        }

        existingStockOutCost.setQuantity(stockOutCost.getQuantity());
        existingStockOutCost.setUnitPrice(stockOutCost.getUnitPrice());
        
        existingStockOutCost.setUpdatedBy(SessionUtil.getCurrentUserName(request));

        service.update(existingStockOutCost);
        return ok("更新成功");
    }

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public String list(@RequestParam int start, @RequestParam int limit,@RequestParam(required = false) Object filter) {

        List<FilterRequest> filters = new ArrayList<FilterRequest>();

        if (filter != null) {
            filters.addAll(JsonUtils.getListFromJsonArray(filter));
        }

        List<StockOutCost> data = service.pagedDataSet(start, limit,filters);
        Long count = service.pagedDataCount(filters);

        return ok(data, count);
    }
    
}
