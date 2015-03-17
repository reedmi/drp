package com.originspark.drp.controllers.resources;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.originspark.drp.controllers.BaseController;
import com.originspark.drp.models.resources.Vendor;
import com.originspark.drp.models.resources.Ware;
import com.originspark.drp.util.FileUtil;
import com.originspark.drp.util.SessionUtil;
import com.originspark.drp.util.json.FilterRequest;
import com.originspark.drp.util.json.IdsJson;
import com.originspark.drp.util.json.JsonUtils;
import com.originspark.drp.util.poi.exporter.WareGenerator;
import com.originspark.drp.util.poi.importer.WareImporter;

@Controller
@RequestMapping("ware")
public class WareController extends BaseController {
    
    private Logger logger = Logger.getLogger(WareController.class);

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public String create(@RequestBody Ware ware,HttpServletRequest request) {
        
        //validation
        String name = ware.getName();
        if(name == null || name.trim().equals("")){
            logger.warn(">添加失败：商品名称不能为空");
            return failure("商品名称不能为空");
        }
        
        String unit = ware.getUnit();
        if(unit == null || unit.trim().equals("")){
            logger.warn(">添加失败：商品单位不能为空");
            return failure("商品单位不能为空");
        }
        
        if(wareService.have(ware)){
            logger.warn(">添加失败：该商品已存在，不能重复添加");
            return failure("该商品已存在，不能重复添加");
        }
        
        //save
        ware.setCreatedBy(SessionUtil.getCurrentUserName(request));
        
        Ware savedWare = wareService.save(ware);
        logger.info(">添加成功："+savedWare.toString());
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
            return failure("没有需要删除的数据");
        }
        for (long id : json.getIds()) {
            Ware ware = wareService.findById(Ware.class, id);
            
            if(ware != null && ware.getInCosts().isEmpty() && ware.getOutCosts().isEmpty() && ware.getInventories().isEmpty()){
                wareService.delete(ware);
                logger.info(">删除成功："+ware.toString());
            }
        }
        return ok("删除成功");
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public String update(@PathVariable Long id, @RequestBody Ware ware,HttpServletRequest request) {

        Ware existingWare = wareService.findById(Ware.class, id);
        
        //validation
        if (existingWare == null) {
            return failure("您要更新的商品不存在");
        }
        
        String name = ware.getName();
        if(name == null || name.trim().equals("")){
            logger.warn(">更新失败：商品名称不能为空");
            return failure("商品名称不能为空");
        }
        
        String unit = ware.getUnit();
        if(unit == null || unit.trim().equals("")){
            logger.warn(">更新失败：商品单位不能为空");
            return failure("商品单位不能为空");
        }
        
        if(wareService.have(ware)){
            logger.warn(">更新失败：该商品已存在，不能重复添加");
            return failure("该商品已存在，不能重复添加");
        }

        existingWare.setName(ware.getName());
        existingWare.setBrand(ware.getBrand());
        existingWare.setModel(ware.getModel());
        existingWare.setUnit(ware.getUnit());
        existingWare.setNote(ware.getNote());
        existingWare.setVendor(ware.getVendor());
        
        existingWare.setUpdatedBy(SessionUtil.getCurrentUserName(request));

        wareService.update(existingWare);
        logger.info(">更新成功："+existingWare.toString());
        return ok("更新成功");
    }

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public String list(@RequestParam int start, @RequestParam int limit, @RequestParam(required = false) Object filter, HttpServletRequest request) {
        
        List<FilterRequest> filters = new ArrayList<FilterRequest>();

        if (filter != null) {
            filters.addAll(JsonUtils.getListFromJsonArray(filter));
        }

        List<Ware> data = wareService.pagedDataSet(start, limit, filters);
        Long count = wareService.pagedDataCount(filters);

        return ok(data, count);
    }

    // 参考http://www.360doc.com/content/12/1219/17/7471983_255118342.shtml
    @RequestMapping(value = "/uploadExcel", method = RequestMethod.POST)
    public void uploadExcel(@RequestParam("attach") MultipartFile attach, HttpServletRequest request, HttpServletResponse response) throws IOException {

        // 保存文件
        String realpath = FileUtil.getUploadPath(request);
        File file = new File(realpath + "/" + attach.getOriginalFilename());
        FileUtils.copyInputStreamToFile(attach.getInputStream(), file);

        Map<String, Object> result = new HashMap<String, Object>(0);
        response.setContentType("text/html;charset=UTF-8");
        ObjectMapper mapper = new ObjectMapper();

        // 导入数据
        try {
            List<Ware> wares = WareImporter.importExcel(file);

            for (Ware ware : wares) {

                // 先判断供应商
                Vendor vendor = ware.getVendor();
                if (vendor != null) {
                    String name = vendor.getName();
                    Vendor foundVendor = vendorService.findByName(name);
                    if (foundVendor != null) {
                        ware.setVendor(foundVendor);
                    } else {
                        vendorService.save(vendor);
                        ware.setVendor(vendor);
                    }
                }

                if (wareService.have(ware)) {
                    continue;
                }

                wareService.save(ware);
            }

        } catch (Exception e) {
            e.printStackTrace();
            result.put("success", false);
            mapper.writeValue(response.getOutputStream(), result);
            return;
        }

        // 返回信息
        result.put("success", true);
        mapper.writeValue(response.getOutputStream(), result);
    }
    
    @RequestMapping(value = "/export", method = RequestMethod.GET)
    public void exportExcel(@RequestParam(required=true) String ids,HttpServletRequest request, HttpServletResponse response){
        
        String wareIds[] = ids.split(",");
        
        List<Ware> wares = new ArrayList<Ware>();
        
        for (String wareId : wareIds) {
            Long id = Long.valueOf(wareId);
            Ware ware = wareService.findById(Ware.class, id);
            wares.add(ware);
        }
        
        String fileName = "ware_";
        File file = WareGenerator.generate(fileName, wares, FileUtil.getResourcesPath(request));
        
        if (file != null) {
            try {
                response.setContentType("application/x-excel;charset=UTF-8");
                response.setHeader("content-Disposition", "attachment;filename=" + file.getName());// "attachment;filename=test.xls"
                
                InputStream is = new FileInputStream(file);
                IOUtils.copyLarge(is, response.getOutputStream());
            } catch (IOException ex) {
                logger.error("商品导出错误");
            }
        }
    }
}
