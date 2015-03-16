package com.originspark.drp.authority;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

/**
 * @author ReedMi
 *  1.类上标记AuthRoleType.*,则表明该类的所有方法都可以被访问
 *  2.方法上标记AuthRoleType.*,则表明该方法可以被访问
 */

@Retention(RetentionPolicy.RUNTIME)
public @interface AuthRoleGroup {
    
    public RoleEnum[] type();
    
}
