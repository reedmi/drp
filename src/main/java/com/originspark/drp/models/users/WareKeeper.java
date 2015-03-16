package com.originspark.drp.models.users;


import java.util.List;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.originspark.drp.models.projects.Project;


/**
 *  仓库管理员
 */
@Entity
@Inheritance
@DiscriminatorValue("WareKeeper")
public class WareKeeper extends AbstractUser {
    
    @JsonIgnore
    @OneToMany(mappedBy="wareKeeper")
    private List<Project> projects;

	public List<Project> getProjects() {
        return projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }

	@Override
	public String toString() {
	    return "WareKeeper(库管员) => ["+super.toString()+"]";
	}
}
