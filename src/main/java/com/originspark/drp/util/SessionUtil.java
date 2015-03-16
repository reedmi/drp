package com.originspark.drp.util;
import javax.servlet.http.HttpServletRequest;

import com.originspark.drp.models.users.AbstractUser;

public class SessionUtil {

    //返回当前登陆的用户信息
    public static AbstractUser getCurrentUser(HttpServletRequest request){  
    	AbstractUser user=(AbstractUser) request.getSession().getAttribute("user");
        return user;
    }
    
    public static String getCurrentUserName(HttpServletRequest request){
        return getCurrentUser(request).getName();
    }
}
