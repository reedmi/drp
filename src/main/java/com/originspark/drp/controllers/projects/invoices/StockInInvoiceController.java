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
import com.originspark.drp.authority.RoleEnum;
import com.originspark.drp.authority.AuthRoleGroup;
import com.originspark.drp.models.projects.Project;
import com.originspark.drp.models.projects.invoices.StockInInvoice;
import com.originspark.drp.models.users.AbstractUser;
import com.originspark.drp.util.SessionUtil;
import com.originspark.drp.util.enums.AuditState;
import com.originspark.drp.util.json.AuditStateUpdateJson;
import com.originspark.drp.util.json.IdsJson;
import com.originspark.drp.util.json.FilterRequest;
import com.originspark.drp.util.json.JsonUtils;

@Controller
@RequestMapping("stockInInvoice")
@AuthRoleGroup(type={RoleEnum.MATERIALKEEPER})
public class StockInInvoiceController extends AbstractInvoiceController {
    
    private Logger logger = Logger.getLogger(StockInInvoiceController.class);

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public String create(@RequestBody StockInInvoice invoice,HttpServletRequest request) {
        
        Project systemUI = invoice.getSystem();
        if(systemUI == null){
            return failure("所选系统不能为空");
        }
        
        Project system = projectService.findById(systemUI.getId());
        if(system==null){
            return failure("你所选择的系统不存在，请重新选择");
        }
        
        invoice.setMaterialKeeperName(system.getMaterialKeeperName());
        invoice.setWareKeeperName(system.getWareKeeperName());
        invoice.setProjectManagerName(system.getProjectManagerName());
        
        String currentUserName = SessionUtil.getCurrentUserName(request);
        invoice.setCreatedByUserName(currentUserName);
        
        StockInInvoice savedInvoice = stockInInvoiceService.save(invoice);
        logger.info(">添加成功："+savedInvoice.toString());
        return ok("系统确认成功",savedInvoice.getId());
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public String update(@PathVariable Long id, @RequestBody StockInInvoice invoice,HttpServletRequest request) {

        StockInInvoice existingInvoice = stockInInvoiceService.findById(StockInInvoice.class, id);
        if (existingInvoice == null) {
            return failure("您要更新的入库单不存在");
        }

        Project systemUI = invoice.getSystem();
        if(systemUI != null){
            if(systemUI.getId() != null){
                Project system = projectService.findById(systemUI.getId());
                existingInvoice.setSystem(system);
            }
        }
        
        existingInvoice.setForDate(invoice.getForDate());
        existingInvoice.setCode(invoice.getCode());
        existingInvoice.setTotalPrice(invoice.getTotalPrice());
        
        existingInvoice.setUpdatedByUserName(SessionUtil.getCurrentUserName(request));

        stockInInvoiceService.update(existingInvoice);
        return ok("更新成功",existingInvoice.getId());
    }

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    @AuthRoleGroup(type={RoleEnum.WAREKEEPER,RoleEnum.PROJECTMANAGER,RoleEnum.LEADER})
    public String list(@RequestParam int start, @RequestParam int limit, @RequestParam(required = false) Object filter) {

        List<FilterRequest> filters = new ArrayList<FilterRequest>();

        if (filter != null) {
            filters.addAll(JsonUtils.getListFromJsonArray(filter));
        }

        List<StockInInvoice> data = stockInInvoiceService.pagedDataSet(start, limit, filters);
        Long count = stockInInvoiceService.pagedDataCount(filters);

        return ok(data, count);
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
            return failure("没有需要删除的数据");
        }
        
        for (Long id : json.getIds()) {
            if(id==null){
                continue;
            }
            StockInInvoice invoice = stockInInvoiceService.findById(StockInInvoice.class, id);
            
            if(invoice != null && invoice.getCosts().isEmpty()){
                stockInInvoiceService.delete(invoice);
                logger.info(">删除成功："+invoice.toString());
            }
            
        }
        return ok("删除成功(注释：部分合价不为0的入库单已忽略)");
    }

    @RequestMapping(value = "/updateAuditState", method = RequestMethod.GET)
    @ResponseBody
    @AuthRoleGroup(type={RoleEnum.WAREKEEPER,RoleEnum.PROJECTMANAGER})
    public String updateAuditStateByUser(HttpServletRequest request) {

        String data = request.getParameter("data");
        ObjectMapper mapper = new ObjectMapper();
        AuditStateUpdateJson json = null;
        try {
            json = mapper.readValue(data, AuditStateUpdateJson.class);
        } catch (Exception e) {
            return failure("提交数据有误");
        }

        if (json == null) {
            return failure("没有需要审核的数据");
        }

        // 对当前登录用户的验证
        AbstractUser user = SessionUtil.getCurrentUser(request);

        Long userId = json.getUserId();
        String userType = json.getUserType();

        if (user.getId() != userId || !user.getType().equals(userType)) {
            return failure("操作失败，无审核权限");
        }

        AuditState state = json.getState();

        for (Long id : json.getInvoiceIds()) {
            if(id == null){
                continue;
            }
            StockInInvoice inInvoice = stockInInvoiceService.findById(StockInInvoice.class, id);
            updateState(inInvoice, userType, state);
            stockInInvoiceService.update(inInvoice);
        }

        return ok("提交成功");
    }


}
