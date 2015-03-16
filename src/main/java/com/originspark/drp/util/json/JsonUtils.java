package com.originspark.drp.util.json;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonUtils {

    public static List<FilterRequest> getListFromJsonArray(Object data) {

        List<FilterRequest> values = new ArrayList<FilterRequest>();
        
        try {
            ObjectMapper mapper = new ObjectMapper();
            values = mapper.readValue(data.toString(), new TypeReference<List<FilterRequest>>() {});
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        
        for(int i=0;i<values.size();i++){
            FilterRequest filter = values.get(i);
            String value = filter.getValue();
            if(value==null || value.trim().equals("")){
                values.remove(i);
                i--;
            }
        }
        
        return values;
    }
}
