package com.originspark.drp.util;
import javax.servlet.http.HttpServletRequest;

import com.originspark.drp.models.User;

public class SessionUtil {

    //返回当前登陆的用户信息
    public static User getCurrentUser(HttpServletRequest request){  
        User user=(User) request.getSession().getAttribute("user");
        return user;
    }

    public static String getCurrentUserName(HttpServletRequest request){
        return getCurrentUser(request).getName();
    }
}
