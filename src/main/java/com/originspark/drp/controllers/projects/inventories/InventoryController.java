package com.originspark.drp.controllers.projects.inventories;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.originspark.drp.controllers.BaseController;
import com.originspark.drp.util.FileUtil;
import com.originspark.drp.util.poi.exporter.MonthendInventoryGenerator;
import com.originspark.drp.web.models.projects.inventories.CurrentInventoryUI;
import com.originspark.drp.web.models.projects.inventories.Ware;

@Controller
@RequestMapping("project")
public class InventoryController extends BaseController {
    
    /*@RequestMapping(value = "/{id}/inventories/current", method = RequestMethod.GET)
    @ResponseBody
    @AuthRoleGroup(type={RoleEnum.WAREKEEPER,RoleEnum.PROJECTMANAGER,RoleEnum.LEADER})
    public String currentInventories(@PathVariable Long id){
        
        Project project = projectService.findById(id);
        
        if(project == null){
            return failure("你所查询的项目不存在");
        }
        
        List<CurrentInventoryUI> inventories = new ArrayList<CurrentInventoryUI>();
        
        //如果是项目
        if(project.getProject() == null){
            for(Project system : project.getSystems()){
                inventories.addAll(projectService.getCurrentInventories(system.getId()));
            }
            return ok(inventories);
        }
        
        inventories.addAll(projectService.getCurrentInventories(id));
        return ok(inventories);
    }
    
    @ResponseBody
    @RequestMapping(value = "/{id}/inventories/monthend", method = RequestMethod.GET)
    @AuthRoleGroup(type={RoleEnum.PROJECTMANAGER,RoleEnum.LEADER})
    public String menthendInventories(@PathVariable Long id,@RequestParam String formonth){
        
        Project project = projectService.findById(id);
        
        if(project == null){
            return failure("你所查询的项目不存在");
        }
        
        List<Ware> inventories = new ArrayList<Ware>();
        
        //如果是项目
        if(project.getProject() == null){
            for(Project system : project.getSystems()){
                inventories.addAll(projectService.getMonthEndInventories(system.getId(),formonth));
            }
            return ok(inventories);
        }
        
        inventories.addAll(projectService.getMonthEndInventories(id,formonth));
        
        return ok(inventories);
    }
    
    @RequestMapping(value = "/{id}/inventories/monthend/export", method = RequestMethod.GET)
    public void exportMonthendInventory(@PathVariable Long id,@RequestParam String formonth,HttpServletRequest request, HttpServletResponse response){
        
        Project system = projectService.findById(id);
        
        List<Ware> inventories = projectService.getMonthEndInventories(system.getId(),formonth);
        
        //因为使用createTempFile(),所以会生成默认的名称后缀，所以加下划线分割
        String fileName = formonth +"_";
        File file = MonthendInventoryGenerator.generate(fileName, inventories, FileUtil.getResourcesPath(request));
        
        if (file != null) {
            try {
                response.setContentType("application/x-excel;charset=UTF-8");
                response.setHeader("content-Disposition", "attachment;filename=" + file.getName());// "attachment;filename=test.xls"
                
                InputStream is = new FileInputStream(file);
                IOUtils.copyLarge(is, response.getOutputStream());
            } catch (IOException ex) {
                throw new RuntimeException("IOError writing file to output stream");
            }
        }
    }*/
}
