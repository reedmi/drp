package com.originspark.drp.service.users;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.originspark.drp.dao.BaseDAO;
import com.originspark.drp.models.User;
import com.originspark.drp.util.json.FilterRequest;

public interface UserService extends BaseDAO<User>{

    List<User> pagedDataSet(int start, int limit,List<FilterRequest> filters);

    Long pagedDataCount(List<FilterRequest> filters);

    Map<String, String> validate();

}
