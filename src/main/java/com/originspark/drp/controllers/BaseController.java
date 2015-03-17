package com.originspark.drp.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.originspark.drp.models.User;
import com.originspark.drp.service.projects.invoices.StockInInvoiceService;
import com.originspark.drp.service.projects.invoices.StockOutInvoiceService;
import com.originspark.drp.service.resources.VendorService;
import com.originspark.drp.service.resources.WareCategoryService;
import com.originspark.drp.service.resources.WareService;
import com.originspark.drp.service.users.UserService;
import com.originspark.drp.util.json.Jackson;

public class BaseController extends HandlerInterceptorAdapter {

    @Autowired
    protected UserService userService;

    @Autowired
    protected WareService wareService;

    @Autowired
    protected WareCategoryService wareCategoryService;

    @Autowired
    protected VendorService vendorService;

    @Autowired
    protected StockInInvoiceService stockInInvoiceService;

    @Autowired
    protected StockOutInvoiceService stockOutInvoiceService;

    private static final ThreadLocal<HttpServletRequest> REQUEST = new ThreadLocal<HttpServletRequest>();

    private static final ThreadLocal<HttpServletResponse> RESPONSE = new ThreadLocal<HttpServletResponse>();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        REQUEST.set(request);
        RESPONSE.set(response);
        return super.preHandle(request, response, handler);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        REQUEST.remove();
        RESPONSE.remove();
        if (ex != null) {
            response.sendError(500);
        }
        super.afterCompletion(request, response, handler, ex);
    }

    public HttpServletRequest request() {
        return REQUEST.get();
    }

    public HttpServletResponse response() {
        return RESPONSE.get();
    }

    public HttpSession session() {
        return request().getSession();
    }

    public User getCurrentUser() {
        return (User)session().getAttribute("user");
    }

    // 一般用于create、update、delete的返回值
    protected final static String ok(String message) {
        Map<String, Object> modelMap = new HashMap<String, Object>(2);
        modelMap.put("success", "true");
        modelMap.put("message", message);
        return Jackson.toJson(modelMap);
    }

    protected final static String ok(String message, Object object) {
        Map<String, Object> modelMap = new HashMap<String, Object>(3);
        modelMap.put("success", "true");
        modelMap.put("message", message);
        modelMap.put("object", object);
        return Jackson.toJson(modelMap);
    }

    // 一般用于list分页数据的返回值
    @SuppressWarnings("rawtypes")
    protected final static String ok(List items, Long total) {
        Map<String, Object> modelMap = new HashMap<String, Object>(3);
        modelMap.put("success", "true");
        modelMap.put("data", items);
        modelMap.put("total", total);
        return Jackson.toJson(modelMap);
    }

    // 一般用于list不分页的返回值
    @SuppressWarnings("rawtypes")
    protected final static String ok(List items) {
        Map<String, Object> modelMap = new HashMap<String, Object>(2);
        modelMap.put("success", "true");
        modelMap.put("data", items);
        return Jackson.toJson(modelMap);
    }

    // 失败信息的处理
    protected final static String failure(String message) {
        Map<String, Object> modelMap = new HashMap<String, Object>(2);
        modelMap.put("success", "false");
        modelMap.put("message", message);
        return Jackson.toJson(modelMap);
    }

}
