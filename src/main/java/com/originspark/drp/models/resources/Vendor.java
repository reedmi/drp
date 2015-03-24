package com.originspark.drp.models.resources;


import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.originspark.drp.models.AbstractModel;

/**
 * 供应商
 */
@Entity
@Table(name="vendors")
public class Vendor extends AbstractModel{

    /**
     * 联系人
     */
    @Column(name="contactMan")
    private String contactMan;

    /**
     * 联系电话
     */
    private String phone;

    /**
     * 公司名称
     */
    private String name;

    /**
     * 公司地址
     */
    private String address;

    /**
     * 备注
     */
    private String note;

    /**
     * 商品
     */
    @JsonIgnore
    @OneToMany(mappedBy="vendor")
    private List<Ware> wares;

    public static enum COLUMNS {
        NAME,ADDRESS,PHONE,CONTACTMAN
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
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

    public List<Ware> getWares() {
        return wares;
    }

    public void setWares(List<Ware> wares) {
        this.wares = wares;
    }

    public int getCountOfWares(){
        return getWares().size();
    }
}
