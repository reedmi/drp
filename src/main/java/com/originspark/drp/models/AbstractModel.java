package com.originspark.drp.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

import com.sun.istack.internal.NotNull;

@MappedSuperclass
public abstract class AbstractModel {

	@Id
	@GeneratedValue
	private Long id;

	/**
	 * 维护信息：记录创建日期
	 */
	@NotNull
	@Column(name="createOn")
	private Date createOn;

	/**
	 * 维护信息：记录创建者
	 */
	@Column(name="createdByUserName",length=10)
	private String createdByUserName;

	/**
	 * 维护信息：记录更新日期
	 */
	@NotNull
	@Column(name="updateOn")
	private Date updateOn;

	/**
	 * 维护信息：记录更新者
	 */
	@Column(name="updatedByUserName",length=10)
	private String updatedByUserName;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getCreateOn() {
		return createOn;
	}

	public void setCreateOn(Date createOn) {
		this.createOn = createOn;
	}

	public String getCreatedByUserName() {
		return createdByUserName;
	}

	public void setCreatedByUserName(String createdByUserName) {
		this.createdByUserName = createdByUserName;
	}

	public Date getUpdateOn() {
		return updateOn;
	}

	public void setUpdateOn(Date updateOn) {
		this.updateOn = updateOn;
	}

	public String getUpdatedByUserName() {
		return updatedByUserName;
	}

	public void setUpdatedByUserName(String updatedByUserName) {
		this.updatedByUserName = updatedByUserName;
	}

	@PrePersist
	private void prePersist() {
		createOn = new Date();
		updateOn = createOn;
	}

	@PreUpdate
	private void preUpdate(){
		updateOn = new Date();
	}
	
	@Override
	public String toString() {
	    return "id="+id+", updateOn="+updateOn;
	}
}