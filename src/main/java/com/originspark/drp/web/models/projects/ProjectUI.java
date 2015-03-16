package com.originspark.drp.web.models.projects;

import java.util.Date;

public class ProjectUI {
    
    private Long id;
    private String name;
    private String code;
    private String city;
    private Date startDate;
    private Date endDate;
    private Long parentId;
    private boolean leaf;
    private Long projectManager;
    private Long wareKeeper;
    private Long materialKeeper;
    
    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
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
    public Long getParentId() {
        return parentId;
    }
    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }
    public boolean isLeaf() {
        return leaf;
    }
    public void setLeaf(boolean leaf) {
        this.leaf = leaf;
    }
    public Long getProjectManager() {
        return projectManager;
    }
    public void setProjectManager(Long projectManager) {
        this.projectManager = projectManager;
    }
    public Long getWareKeeper() {
        return wareKeeper;
    }
    public void setWareKeeper(Long wareKeeper) {
        this.wareKeeper = wareKeeper;
    }
    public Long getMaterialKeeper() {
        return materialKeeper;
    }
    public void setMaterialKeeper(Long materialKeeper) {
        this.materialKeeper = materialKeeper;
    }
    
}
