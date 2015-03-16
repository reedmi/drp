package com.originspark.drp.controllers.projects;

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

import com.originspark.drp.authority.AuthRoleGroup;
import com.originspark.drp.authority.RoleEnum;
import com.originspark.drp.controllers.AbstractController;
import com.originspark.drp.models.projects.Project;
import com.originspark.drp.models.users.AbstractUser;
import com.originspark.drp.models.users.MaterialKeeper;
import com.originspark.drp.models.users.ProjectManager;
import com.originspark.drp.models.users.WareKeeper;
import com.originspark.drp.util.SessionUtil;
import com.originspark.drp.util.json.FilterRequest;
import com.originspark.drp.util.mapper.projects.ProjectMapper;
import com.originspark.drp.web.models.projects.ProjectUI;

@Controller
@RequestMapping("project")
@AuthRoleGroup(type={RoleEnum.LEADER})
public class ProjectController extends AbstractController {
    
    private Logger logger = Logger.getLogger(ProjectController.class);
	
	private ProjectMapper mapper = new ProjectMapper();
	
	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	public String create(@RequestBody ProjectUI data,HttpServletRequest request) {
		/**
		 * TODO 表单数据验证
		 */
	    Project system = mapper.toPersistenceBean(data);
	    if(system == null){
	        return failure("创建失败");
	    }
	
	    //如果添加的是系统，则不添加项目经理，库管和材管
	    if(data.getParentId() != null){
	        
	        Project project = projectService.getReferance(Project.class, data.getParentId());
	        if(project == null){
	            return failure("所属项目不能为空！");
	        }
	        
	        system.setProject(project);
	        
	        projectService.save(system);
            return ok("创建成功");
	    }else{
	        
	        if(data.getProjectManager() != null){
	            ProjectManager projectManager = (ProjectManager) userService.findById(AbstractUser.class, data.getProjectManager());
	            if(projectManager == null){
	                return failure("项目经理不能为空！");
	            }
	            system.setProjectManager(projectManager);;
	        }
	        
            if(data.getWareKeeper() != null){
                WareKeeper wareKeeper = (WareKeeper) userService.findById(AbstractUser.class, data.getWareKeeper());
                if(wareKeeper == null){
                    return failure("库管员不能为空不能为空！");
                }
                system.setWareKeeper(wareKeeper);;
            }
	        
	        if(data.getMaterialKeeper() != null){
	            MaterialKeeper materialKeeper = (MaterialKeeper) userService.findById(AbstractUser.class, data.getMaterialKeeper());
                if(materialKeeper == null){
                    return failure("材料员不能为空！");
                }
                system.setMaterialKeeper(materialKeeper);;
            }
	        
	        system.setCreatedByUserName(SessionUtil.getCurrentUserName(request));
	        
	        projectService.save(system);
	        return ok("添加成功");
	    }
	        
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public String delete(@PathVariable Long id) {
		Project project = projectService.findById(Project.class, id);
		
		if(!project.getSystems().isEmpty()){
		    return failure("请先删除该项目下属的系统！");
		}
		
		if(!project.getInInvoices().isEmpty()){
		    return failure("请先删除该系统下属的入库单！");
		}
		
		if(!project.getOutInvoices().isEmpty()){
		    return failure("请先删除该系统下属的出库单！");
		}
		
		projectService.delete(project);
		return ok("删除成功");
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public String update(@PathVariable Long id, @RequestBody ProjectUI data,HttpServletRequest request) {

		Project existingProject = projectService.findById(Project.class, id);
		if (existingProject == null) {
			return failure("您要修改的项目不存在");
		}

		if(data.getId() != id){
		    return failure("数据错误，修改失败");
		}

		//修改的是system
		if(data.getParentId() != null){
            
            Project project = projectService.getReferance(Project.class, data.getParentId());
            if(project == null){
                return failure("所属项目不能为空！");
            }
            
            existingProject.setProject(project);
        }else{
            
            if(data.getProjectManager() != null){
                ProjectManager projectManager = (ProjectManager) userService.findById(AbstractUser.class, data.getProjectManager());
                if(projectManager == null){
                    return failure("项目经理不能为空！");
                }
                existingProject.setProjectManager(projectManager);;
            }
            
            if(data.getWareKeeper() != null){
                WareKeeper wareKeeper = (WareKeeper) userService.findById(AbstractUser.class, data.getWareKeeper());
                if(wareKeeper == null){
                    return failure("库管员不能为空不能为空！");
                }
                existingProject.setWareKeeper(wareKeeper);;
            }
            
            if(data.getMaterialKeeper() != null){
                MaterialKeeper materialKeeper = (MaterialKeeper) userService.findById(AbstractUser.class, data.getMaterialKeeper());
                if(materialKeeper == null){
                    return failure("材料员不能为空！");
                }
                existingProject.setMaterialKeeper(materialKeeper);;
            }
        }

		existingProject.setName(data.getName());
		existingProject.setCode(data.getCode());
		existingProject.setCity(data.getCity());
		existingProject.setStartDate(data.getStartDate());
		existingProject.setEndDate(data.getEndDate());
		
		existingProject.setUpdatedByUserName(SessionUtil.getCurrentUserName(request));

		projectService.update(existingProject);
		
		return ok("修改成功");
	}
	
	@RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    @AuthRoleGroup(type={RoleEnum.MATERIALKEEPER,RoleEnum.WAREKEEPER,RoleEnum.PROJECTMANAGER})
    public String list(@RequestParam(required = false) String userType,@RequestParam(required = false)String userId) {

        List<FilterRequest> filters = new ArrayList<FilterRequest>();
        
        if(userType != null && userId != null){
            FilterRequest filter = new FilterRequest(userType,userId);
            filters.add(filter);
        }

        List<Project> data = projectService.treeViewData(filters);

        return ok(data);
    }
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    @AuthRoleGroup(type={RoleEnum.MATERIALKEEPER,RoleEnum.WAREKEEPER,RoleEnum.PROJECTMANAGER})
	public String view(@PathVariable Long id){
	    Project project = projectService.findById(Project.class, id);
	    return ok(project.getSystems());
	}
	
}
