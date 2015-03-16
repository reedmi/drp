package com.originspark.drp.util.mapper.projects;

import com.originspark.drp.models.projects.Project;
import com.originspark.drp.web.models.projects.ProjectUI;

public class ProjectMapper {

    public Project toPersistenceBean(ProjectUI uiBean) {
        
        Project project = null;
        
        if(uiBean != null){
            project = new Project();
            
            project.setId(uiBean.getId());
            project.setName(uiBean.getName());
            project.setCode(uiBean.getCode());
            project.setCity(uiBean.getCity());
            project.setStartDate(uiBean.getStartDate());
            project.setEndDate(uiBean.getEndDate());
            
        }

        return project;
    }
    
}
