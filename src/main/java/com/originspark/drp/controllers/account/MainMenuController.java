package com.originspark.drp.controllers.account;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.originspark.drp.authority.RoleEnum;
import com.originspark.drp.authority.AuthRoleGroup;
import com.originspark.drp.controllers.AbstractController;
import com.originspark.drp.util.SessionUtil;
import com.originspark.drp.util.extjs.menu.controllers.ExtMenuController;

@Controller
@RequestMapping("menu")
@AuthRoleGroup(type={RoleEnum.MATERIALKEEPER,RoleEnum.WAREKEEPER,RoleEnum.PROJECTMANAGER,RoleEnum.LEADER})
public class MainMenuController extends AbstractController{
    
    @RequestMapping(value="/login",method = RequestMethod.GET)
    @ResponseBody
    public String createMenusByUserType(HttpServletRequest request){
        String userType = SessionUtil.getCurrentUser(request).getType();
        return ok(ExtMenuController.getMenusByUserType(userType));
    }
    
}
