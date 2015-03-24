package com.originspark.drp.controllers.resources;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.originspark.drp.controllers.BaseController;
import com.originspark.drp.models.resources.Vendor;
import com.originspark.drp.util.json.FilterRequest;
import com.originspark.drp.util.json.IdsJson;
import com.originspark.drp.util.json.JsonUtils;

@Controller
@RequestMapping("vendor")
public class VendorController extends BaseController {

    private Logger logger = Logger.getLogger(VendorController.class);

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public String create(@RequestBody Vendor vendor) {

        String contactMan = vendor.getContactMan();
        if (StringUtils.isEmpty(contactMan)) {
            return failure("联系人不能为空");
        }

        if (vendorService.have(vendor)) {
            return failure("该供应商已经存在，不可重复添加");
        }

        vendor.setCreatedBy(getCurrentUser().getName());
        vendorService.save(vendor);
        logger.info(">添加成功："+vendor.toString());

        return ok("创建成功");
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
        for (long id : json.getIds()) {
            Vendor vendor = vendorService.findById(Vendor.class, id);

            if (vendor != null && vendor.getWares().isEmpty()) {
                vendorService.delete(vendor);
                logger.info(">删除成功："+vendor.toString());
            }
        }
        return ok("删除成功");
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public String update(@PathVariable Long id, @RequestBody Vendor vendor,HttpServletRequest request) {

        Vendor existingVendor = vendorService.findById(Vendor.class, id);
        if (existingVendor == null) {
            return failure("您要更新的供应商不存在");
        }

        String contactMan = vendor.getContactMan();
        if (StringUtils.isEmpty(contactMan)) {
            return failure("联系人不能为空");
        }

        if (vendorService.have(vendor)) {
            return failure("该供应商已经存在，不可重复添加");
        }

        existingVendor.setName(vendor.getName());
        existingVendor.setContactMan(vendor.getContactMan());
        existingVendor.setAddress(vendor.getAddress());
        existingVendor.setPhone(vendor.getPhone());
        existingVendor.setNote(vendor.getNote());
        existingVendor.setUpdatedBy(getCurrentUser().getName());
        vendorService.update(existingVendor);

        return ok("更新成功");
    }

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public String list(@RequestParam int start, @RequestParam int limit, @RequestParam(required = false) Object filter) {

        List<FilterRequest> filters = new ArrayList<FilterRequest>();

        if (filter != null) {
            filters.addAll(JsonUtils.getListFromJsonArray(filter));
        }

        List<Vendor> data = vendorService.pagedDataSet(start, limit, filters);
        Long count = vendorService.pagedDataCount(filters);

        return ok(data, count);
    }
}
