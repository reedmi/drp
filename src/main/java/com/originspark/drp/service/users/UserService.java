package com.originspark.drp.service.users;

import java.util.List;
import java.util.Map;
import com.originspark.drp.dao.BaseDAO;
import com.originspark.drp.models.users.AbstractUser;
import com.originspark.drp.util.json.FilterRequest;

public interface UserService extends BaseDAO<AbstractUser>{
    
    List<AbstractUser> pagedDataSet(int start, int limit,List<FilterRequest> filters);
    
    Long pagedDataCount(List<FilterRequest> filters);
    
    Map<String, String> validate();
    
}
