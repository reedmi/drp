package com.originspark.drp.models.resources;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.originspark.drp.models.AbstractModel;

/**
 * 销售商
 */
@Entity
@Table(name="traders")
public class Trader extends AbstractModel {

    /**
     * 名称
     */
    private String name;

    /**
     * 联系电话
     */
    private String phone;

    /**
     * 地址
     */
    private String address;

    /**
     * 联系人
     */
    @Column(name="contactMan")
    private String contactMan;

    /**
     * 备注
     */
    private String note;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContactMan() {
        return contactMan;
    }

    public void setContactMan(String contactMan) {
        this.contactMan = contactMan;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
