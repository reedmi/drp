package com.originspark.drp.service.account;

import java.util.List;

import com.originspark.drp.models.User;

public interface AccountService{
    public List<User> validate(String username,String password);
}
