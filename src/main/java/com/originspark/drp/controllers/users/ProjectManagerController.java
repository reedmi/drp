package com.originspark.drp.controllers.users;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

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
import com.originspark.drp.controllers.AbstractController;
import com.originspark.drp.models.users.AbstractUser;
import com.originspark.drp.models.users.ProjectManager;
import com.originspark.drp.util.enums.Status;
import com.originspark.drp.util.json.IdsJson;
import com.originspark.drp.util.json.FilterRequest;
import com.originspark.drp.util.json.JsonUtils;

@Controller
@RequestMapping("projectManager")
@AuthRoleGroup(type={RoleEnum.LEADER})
public class ProjectManagerController extends AbstractController{
    
    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public String create(@RequestBody ProjectManager projectManager) {
    	projectManager.setPassword("123456");
        userService.save(projectManager);
        return ok("创建成功");
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public String delete(@PathVariable Long id) {
        AbstractUser projectManager = userService.findById(AbstractUser.class, id);
        projectManager.setStatus(Status.DESTORYED);
        userService.update(projectManager);
        return ok("注销成功");
    }
    @RequestMapping(value= "/deleteBatch",method = RequestMethod.GET)
    @ResponseBody
	public String deleteBatch(HttpServletRequest request){
		 String data = request.getParameter("data");
		 ObjectMapper mapper = new ObjectMapper();
		 IdsJson json=null;
		   try {
	            json = mapper.readValue(data, IdsJson.class);
	        } catch (Exception e) {
	            return failure("提交数据有误");
	        }
		   if(json == null){
		        return failure("没有需要审核的数据");
		    }
		   for(long id:json.getIds()){
			   AbstractUser projectManager = userService.findById(AbstractUser.class, id);
			   projectManager.setStatus(Status.DESTORYED);
		       userService.update(projectManager);
		   }
		return ok("注销成功");
	}
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public String update(@PathVariable Long id, @RequestBody ProjectManager projectManager) {

        ProjectManager existingProjectManager = (ProjectManager)userService.findById(AbstractUser.class, id);
        if (existingProjectManager == null) {
            return failure("您要更新的项目经理不存在");
        }

        existingProjectManager.setName(projectManager.getName());
        existingProjectManager.setCode(projectManager.getCode());
        existingProjectManager.setGender(projectManager.getGender());
        existingProjectManager.setPhone(projectManager.getPhone());
        existingProjectManager.setAddress(projectManager.getAddress());
        existingProjectManager.setEmail(projectManager.getEmail());
        existingProjectManager.setStatus(projectManager.getStatus());
        
        
        userService.update(existingProjectManager);
        return ok("更新成功");
    }

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public String list(@RequestParam int start, @RequestParam int limit,@RequestParam(required = false) Object filter) {

        List<FilterRequest> filters = new ArrayList<FilterRequest>();
        
        filters.add(new FilterRequest("type", "ProjectManager"));

        if (filter != null) {
            filters.addAll(JsonUtils.getListFromJsonArray(filter));
        }

        List<AbstractUser> data = userService.pagedDataSet(start, limit,filters);
        Long count = userService.pagedDataCount(filters);

        return ok(data, count);
    }

    
    
}
