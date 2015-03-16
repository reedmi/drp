package com.originspark.drp.models.users;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Inheritance;


/**
 * 领导，即系统管理员
 */
@Entity
@Inheritance
@DiscriminatorValue("Leader")
public class Leader extends AbstractUser{
	
    @Override
    public String toString() {
        return "Leader(系统管理员) => ["+super.toString()+"]";
    }
    
}
