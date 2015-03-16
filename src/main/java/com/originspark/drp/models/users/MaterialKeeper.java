package com.originspark.drp.models.users;


import java.util.List;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.originspark.drp.models.projects.Project;

/**
 *  材料员
 */
@Entity
@Inheritance
@DiscriminatorValue("MaterialKeeper")
public class MaterialKeeper extends AbstractUser{
    
    @JsonIgnore
    @OneToMany(mappedBy="materialKeeper")
    private List<Project> projects;

	public List<Project> getProjects() {
        return projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }

	@Override
	public String toString() {
	    return "MaterialKeeper(材料员) => ["+super.toString()+"]";
	}
}
