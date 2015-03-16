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
import com.originspark.drp.models.users.Leader;
import com.originspark.drp.util.enums.Status;
import com.originspark.drp.util.json.IdsJson;
import com.originspark.drp.util.json.FilterRequest;
import com.originspark.drp.util.json.JsonUtils;

@Controller
@RequestMapping("leader")
@AuthRoleGroup(type={RoleEnum.LEADER})
public class LeaderController extends AbstractController {

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public String create(@RequestBody Leader leader) {
    	leader.setPassword("123456");
        userService.save(leader);
        return ok("创建成功");
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public String delete(@PathVariable Long id) {
        AbstractUser leader = userService.findById(AbstractUser.class, id);
        leader.setStatus(Status.DESTORYED);
        userService.update(leader);
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
			   AbstractUser leader = userService.findById(AbstractUser.class, id);
			   leader.setStatus(Status.DESTORYED);
		       userService.update(leader);
		   }
		return ok("注销成功");
	}
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public String update(@PathVariable Long id, @RequestBody Leader leader) {

        AbstractUser existingLeader = userService.findById(AbstractUser.class, id);
        if (existingLeader == null) {
            return failure("您要更新的领导不存在");
        }

        existingLeader.setName(leader.getName());
        existingLeader.setCode(leader.getCode());
        existingLeader.setGender(leader.getGender());
        existingLeader.setPhone(leader.getPhone());
        existingLeader.setAddress(leader.getAddress());
        existingLeader.setEmail(leader.getEmail());
        existingLeader.setStatus(leader.getStatus());
        
        
        userService.update(existingLeader);
        return ok("更新成功");
    }

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public String list(@RequestParam int start, @RequestParam int limit,@RequestParam(required = false) Object filter) {

        List<FilterRequest> filters = new ArrayList<FilterRequest>();
        
        filters.add(new FilterRequest("type", "Leader"));

        if (filter != null) {
            filters.addAll(JsonUtils.getListFromJsonArray(filter));
        }

        List<AbstractUser> data = userService.pagedDataSet(start, limit,filters);
        Long count = userService.pagedDataCount(filters);

        return ok(data, count);
    }
    
}
