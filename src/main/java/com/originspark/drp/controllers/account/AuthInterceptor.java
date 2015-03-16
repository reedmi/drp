package com.originspark.drp.controllers.account;

import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.originspark.drp.models.users.AbstractUser;

public class AuthInterceptor extends HandlerInterceptorAdapter {
    
	@SuppressWarnings("unchecked")
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
	    
		HttpSession session = request.getSession();
		HandlerMethod hm = null;
        try {
            hm = (HandlerMethod)handler;
        } catch (Exception e) {
            response.sendRedirect(request.getContextPath()+"/index");
            return false;
        }
		
		String mn = hm.getMethod().getName();
		if(mn.equals("index") || mn.equals("login")){
		    return true;
		}
		
		AbstractUser user = (AbstractUser)session.getAttribute("user");
		if(user == null) {
			response.sendRedirect(request.getContextPath()+"/index");
			return false;
		} else {
			Set<String> actions = (Set<String>)session.getAttribute("actions");
			String name = hm.getBean().getClass().getName()+"."+hm.getMethod().getName();
			if(!actions.contains(name)){
			    response.sendRedirect(request.getContextPath()+"/index");
			    return false;
			}
		}
		return true;
	}
}
