package com.originspark.drp.util;

import java.io.File;
import java.io.FilenameFilter;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import com.originspark.drp.authority.AuthRoleGroup;
import com.originspark.drp.authority.RoleEnum;

public class AuthUtil {
    
    private static Set<String> classNames = new HashSet<String>();
    
    @SuppressWarnings({"rawtypes", "unchecked"})
    public static Map<RoleEnum,Set<String>> initAuth(final String packageName) {
        //初始化获取所有的controller.class
        getClassNamesByPackage(packageName);
        
        try {
            Map<RoleEnum,Set<String>> auths = new HashMap<RoleEnum, Set<String>>();
            
            for(String className : classNames){
                Class clazz = Class.forName(className);
                //先检查类是否被标记了annotation=AuthRoleGroup
                if(clazz.isAnnotationPresent(AuthRoleGroup.class)){
                    AuthRoleGroup roleGroup = (AuthRoleGroup) clazz.getAnnotation(AuthRoleGroup.class);
                    RoleEnum[] types = roleGroup.type();
                    for(RoleEnum role : types){
                        
                        Set<String> actions = auths.get(role);
                        if(actions==null) {
                            actions = new HashSet<String>();
                            auths.put(role, actions);
                        }
                        //检查该类的每个方法
                        Method[] methods = clazz.getDeclaredMethods();
                        for(Method method : methods){
                            actions.add(className+"."+method.getName());
                            //判断该方法上是否有额外的权限限制说明
                            if(method.isAnnotationPresent(AuthRoleGroup.class)){
                                AuthRoleGroup roleGroup2 = method.getAnnotation(AuthRoleGroup.class);
                                RoleEnum[] types2 = roleGroup2.type();
                                for(RoleEnum role2 : types2){
                                    Set<String> actions2 = auths.get(role2);
                                    if(actions2 == null) {
                                        actions2 = new HashSet<String>();
                                        auths.put(role2, actions2);
                                    }
                                    actions2.add(className+"."+method.getName());
                                }
                            }
                        }
                    }
                }
            }
            return auths;
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return null;
    }
    
    
    /**
     * 根据所给的包名遍历获取下属的所有class
     * @param packageName
     */
    private static void getClassNamesByPackage(final String packageName) {
        String packageRealName = packageName.replace(".", "/");
        String packagePath = AuthUtil.class.getClassLoader().getResource(packageRealName).getPath();
        File file = new File(packagePath);
        file.list(new FilenameFilter() {
            @Override
            public boolean accept(File dir, String name) {
                if(name.endsWith(".class")){
                    String className = name.substring(0,name.lastIndexOf(".class"));
                    classNames.add(packageName + "." + className);
                    return true;
                }else{
                    getClassNamesByPackage(packageName+"."+name);
                    return false;
                }
            }
        });
    }
}
