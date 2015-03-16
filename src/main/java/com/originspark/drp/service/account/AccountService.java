package com.originspark.drp.service.account;

import java.util.List;

import com.originspark.drp.models.users.AbstractUser;

public interface AccountService{
	
		public List<AbstractUser> validate(String username,String password);
}
