package com.originspark.drp.models.users;


import java.util.List;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.originspark.drp.models.projects.Project;

/**
 * 项目经理 
 */
@Entity
@Inheritance
@DiscriminatorValue("ProjectManager")
public class ProjectManager extends AbstractUser{
	
    @JsonIgnore
    @OneToMany(mappedBy="projectManager")
    private List<Project> projects;
    
	public List<Project> getProjects() {
        return projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }

	@Override
    public String toString() {
        return "ProjectManager(项目经理) => ["+super.toString()+"]";
    }
}
