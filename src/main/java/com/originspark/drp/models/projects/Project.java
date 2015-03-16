package com.originspark.drp.models.projects;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.originspark.drp.models.AbstractModel;
import com.originspark.drp.models.projects.invoices.StockInInvoice;
import com.originspark.drp.models.projects.invoices.StockOutInvoice;
import com.originspark.drp.models.users.MaterialKeeper;
import com.originspark.drp.models.users.ProjectManager;
import com.originspark.drp.models.users.WareKeeper;

@Entity
@Table(name = "projects")
public class Project extends AbstractModel {

    /**
     * 项目名称
     */
    private String name;

    /**
     * 项目编号
     */
    private String code;

    /**
     * 项目所在城市
     */
    private String city;

    /**
     * 开工时间
     */
    @Temporal(TemporalType.DATE)
    @Column(name = "startDate")
    private Date startDate;

    /**
     * 竣工时间
     */
    @Temporal(TemporalType.DATE)
    @Column(name = "endDate")
    private Date endDate;

    @JsonIgnore
    @ManyToOne
    private Project project;

    @JsonIgnore
    @OneToMany(mappedBy = "project")
    private List<Project> systems;

    @ManyToOne
    private ProjectManager projectManager;

    @ManyToOne
    private WareKeeper wareKeeper;

    @ManyToOne
    private MaterialKeeper materialKeeper;

    @JsonIgnore
    @OneToMany(mappedBy = "system")
    private List<StockInInvoice> inInvoices;

    @JsonIgnore
    @OneToMany(mappedBy = "system")
    private List<StockOutInvoice> outInvoices;

    public static enum COLUMNS {
        PROJECTMANAGER, WAREKEEPER, MATERIALKEEPER,LEADER
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public List<Project> getSystems() {
        return systems;
    }

    public void setSystems(List<Project> systems) {
        this.systems = systems;
    }

    public ProjectManager getProjectManager() {
        return projectManager;
    }

    public void setProjectManager(ProjectManager projectManager) {
        this.projectManager = projectManager;
    }

    public WareKeeper getWareKeeper() {
        return wareKeeper;
    }

    public void setWareKeeper(WareKeeper wareKeeper) {
        this.wareKeeper = wareKeeper;
    }

    public MaterialKeeper getMaterialKeeper() {
        return materialKeeper;
    }

    public void setMaterialKeeper(MaterialKeeper materialKeeper) {
        this.materialKeeper = materialKeeper;
    }

    public List<StockInInvoice> getInInvoices() {
        return inInvoices;
    }

    public void setInInvoices(List<StockInInvoice> inInvoices) {
        this.inInvoices = inInvoices;
    }

    public List<StockOutInvoice> getOutInvoices() {
        return outInvoices;
    }

    public void setOutInvoices(List<StockOutInvoice> outInvoices) {
        this.outInvoices = outInvoices;
    }

    @Override
    public String toString() {
        return "Project(项目) => [" + super.toString() + ", code=" + code + ", name=" + name + ", materialKeeper.id=" + materialKeeper.getId()
                + ", wareKeeper.id=" + wareKeeper.getId() + ", projectManager.id=" + projectManager.getId() + "]";
    }
    
    public String getMaterialKeeperName(){
        if(getProject() == null){
            return null;
        }
        return getProject().getMaterialKeeper().getName();
    }
    
    public String getWareKeeperName(){
        if(getProject() == null){
            return null;
        }
        return getProject().getWareKeeper().getName();
    }
    
    public String getProjectManagerName(){
        if(getProject() == null){
            return null;
        }
        return getProject().getProjectManager().getName();
    }

    // json util getters
    public boolean getLeaf() {
        if (getProject() == null) {
            return false;
        }
        return true;
    }

    public boolean getLoaded() {
        if (getSystems().isEmpty()) {
            return true;
        }
        return false;
    }

    public String getProjectName() {
        Project project = getProject();
        if (project == null) {
            return null;
        }
        return project.getName();
    }
}
