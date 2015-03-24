package com.originspark.drp.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

import com.originspark.drp.util.enums.Status;

@MappedSuperclass
public abstract class AbstractModel {

    @Id
    @GeneratedValue
    private Long id;

    /**
     * 维护信息：记录创建日期
     */
    @Column(name = "createdOn", nullable = false)
    private Date createdOn;

    /**
     * 维护信息：记录创建者
     */
    @Column(name = "createdBy", length = 10)
    private String createdBy;

    /**
     * 维护信息：记录更新日期
     */
    @Column(name = "updatedOn", nullable = false)
    private Date updatedOn;

    /**
     * 维护信息：记录更新者
     */
    @Column(name = "updatedBy", length = 10)
    private String updatedBy;

    /**
     * 状态
     */
    @Enumerated(EnumType.STRING)
    private Status status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Date createdOn) {
        this.createdOn = createdOn;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Date getUpdatedOn() {
        return updatedOn;
    }

    public void setUpdatedOn(Date updatedOn) {
        this.updatedOn = updatedOn;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    @PrePersist
    private void prePersist() {
        createdOn = new Date();
        updatedOn = createdOn;
    }

    @PreUpdate
    private void preUpdate() {
        updatedOn = new Date();
    }

    @Override
    public String toString() {
        return "id=" + id + ", updateOn=" + updatedOn;
    }
}
