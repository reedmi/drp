package com.originspark.drp.controllers;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.originspark.drp.authority.AuthRoleGroup;
import com.originspark.drp.authority.RoleEnum;
import com.originspark.drp.models.users.AbstractUser;
import com.originspark.drp.util.Blowfish;
import com.originspark.drp.util.SessionUtil;
import com.originspark.drp.util.json.PasswordJson;

@Controller
@RequestMapping("profile")
@AuthRoleGroup(type={RoleEnum.MATERIALKEEPER,RoleEnum.WAREKEEPER,RoleEnum.PROJECTMANAGER,RoleEnum.LEADER})
public class ProfileController extends AbstractController {

    @RequestMapping(value="/updatepassword",method = RequestMethod.GET)
    @ResponseBody
    public String updatePassword(@RequestParam String  data,HttpServletRequest request){
        
        ObjectMapper mapper = new ObjectMapper();
        try {
            PasswordJson json = mapper.readValue(data,PasswordJson.class);
            
            if(!json.getNewpwd().equals(json.getNewpwdagain())){
                return failure("修改失败，密码两次输入不一致");
            }
            
            AbstractUser user = SessionUtil.getCurrentUser(request);
            Blowfish bf=new Blowfish();
            if(!json.getPwd().equals(bf.decryptString(user.getPassword()))){
                return failure("修改失败，请输入正确的原始密码");
            }
            
            user.setPassword(json.getNewpwd());
            userService.update(user);
            
        } catch (Exception e) {
            e.printStackTrace();
            return failure("系统出现异常，修改失败");
        } 
        
        return ok("密码修改成功");
    }
}
