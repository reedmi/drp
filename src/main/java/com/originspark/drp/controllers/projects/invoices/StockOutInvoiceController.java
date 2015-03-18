package com.originspark.drp.controllers.projects.invoices;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.originspark.drp.models.projects.invoices.StockOutInvoice;
import com.originspark.drp.util.json.FilterRequest;
import com.originspark.drp.util.json.IdsJson;
import com.originspark.drp.util.json.JsonUtils;

@Controller
@RequestMapping("invoices/out")
public class StockOutInvoiceController extends AbstractInvoiceController {

    private Logger logger = Logger.getLogger(StockOutInvoiceController.class);

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public String create(@RequestBody StockOutInvoice invoice) {
        invoice.setCreatedBy(getCurrentUser().getName());
        StockOutInvoice savedInvoice = stockOutInvoiceService.save(invoice);
        return ok("信息确认成功", savedInvoice.getId());
    }

    @RequestMapping(value = "/deleteBatch", method = RequestMethod.GET)
    @ResponseBody
    public String deleteBatch(HttpServletRequest request) {
        String data = request.getParameter("data");
        ObjectMapper mapper = new ObjectMapper();
        IdsJson json = null;

        try {
            json = mapper.readValue(data, IdsJson.class);
        } catch (Exception e) {
            return failure("提交数据有误");
        }
        
        if (json == null) {
            return failure("没有需要审核的数据");
        }
        
        for (Long id : json.getIds()) {
            if(id == null){
                continue;
            }
            StockOutInvoice invoice = stockOutInvoiceService.findById(StockOutInvoice.class, id);
            if (invoice != null && invoice.getCosts().isEmpty()) {
                stockOutInvoiceService.delete(invoice);
                logger.info(">删除成功：" + invoice.toString());
            }
        }
        return ok("删除成功(注释：部分合价不为0的入库单已忽略)");
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public String update(@PathVariable Long id, @RequestBody StockOutInvoice invoice) {
        StockOutInvoice existingInvoice = stockOutInvoiceService.findById(StockOutInvoice.class, id);
        if (existingInvoice == null) {
            return failure("您要更新的出库单不存在");
        }
        existingInvoice.setForDate(invoice.getForDate());
        existingInvoice.setCode(invoice.getCode());
        existingInvoice.setTotalPrice(invoice.getTotalPrice());
        existingInvoice.setUpdatedBy(getCurrentUser().getName());
        stockOutInvoiceService.update(existingInvoice);
        return ok("更新成功", existingInvoice.getId());
    }

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public String list(@RequestParam int start, @RequestParam int limit, @RequestParam(required = false) Object filter) {

        List<FilterRequest> filters = new ArrayList<FilterRequest>();

        if (filter != null) {
            filters.addAll(JsonUtils.getListFromJsonArray(filter));
        }
        
        List<StockOutInvoice> data = stockOutInvoiceService.pagedDataSet(start, limit, filters);
        Long count = stockOutInvoiceService.pagedDataCount(filters);

        return ok(data, count);
    }
}
