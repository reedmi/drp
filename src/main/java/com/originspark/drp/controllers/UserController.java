package com.originspark.drp.controllers;

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
import com.originspark.drp.models.User;
import com.originspark.drp.util.enums.Status;
import com.originspark.drp.util.json.FilterRequest;
import com.originspark.drp.util.json.IdsJson;
import com.originspark.drp.util.json.JsonUtils;

@Controller
@RequestMapping("users")
public class UserController extends BaseController {

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public String create(@RequestBody User user) {
        user.setPassword("123456");
        userService.save(user);
        return ok("创建成功");
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public String delete(@PathVariable Long id) {
        User leader = userService.findById(User.class, id);
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
               User leader = userService.findById(User.class, id);
               leader.setStatus(Status.DESTORYED);
               userService.update(leader);
           }
        return ok("注销成功");
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public String update(@PathVariable Long id, @RequestBody User user) {

        User existingLeader = userService.findById(User.class, id);
        if (existingLeader == null) {
            return failure("您要更新的领导不存在");
        }

        existingLeader.setName(user.getName());
        existingLeader.setCode(user.getCode());
        existingLeader.setGender(user.getGender());
        existingLeader.setPhone(user.getPhone());
        existingLeader.setAddress(user.getAddress());
        existingLeader.setEmail(user.getEmail());
        existingLeader.setStatus(user.getStatus());

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

        List<User> data = userService.pagedDataSet(start, limit,filters);
        Long count = userService.pagedDataCount(filters);

        return ok(data, count);
    }
}
