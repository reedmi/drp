package com.originspark.drp.util;

import javax.servlet.http.HttpServletRequest;

public class FileUtil {

    public static String RESOURCES_PATH = "/resources";
    public static String UPLOAD_PATH = "/resources/upload";
    public static String DOCUMENT_TEMPLATES_PATH = "/resources/document_templates";
    
    public static String getResourcesPath(HttpServletRequest request) {
        String path = request.getSession().getServletContext().getRealPath(RESOURCES_PATH);
        return path;
    }

    public static String getUploadPath(HttpServletRequest request) {
        String path = request.getSession().getServletContext().getRealPath(UPLOAD_PATH);
        return path;
    }

    public static String getTemplatePath(HttpServletRequest request) {
        String path = request.getSession().getServletContext().getRealPath(DOCUMENT_TEMPLATES_PATH);
        return path;
    }
}
