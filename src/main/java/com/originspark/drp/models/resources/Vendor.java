package com.originspark.drp.models.resources;


import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.originspark.drp.models.AbstractModel;

/**
 *  供应商
 */
@Entity
@Table(name="vendors")
public class Vendor extends AbstractModel{

	/**
	 * 名称
	 */
	private String name;
	
    /**
     * 地址
     */
    private String address;
    
    /**
     * 联系电话
     */
    private String phone;
    
    /**
     * 联系人
     */
    @Column(name="contactMan")
    private String contactMan;
    
    /**
     * 营业执照：注册编号
     */
    @Column(name="registrationNumber")
    private String registrationNumber; 

    /**
     * 营业执照：承包范围
     */
    @Column(name="registrationRange")
    private String registrationRange;
    
    /**
     * 营业执照：开户行
     */
    @Column(name="registrationBank")
    private String registrationBank;
    
    /**
     * 营业执照：税号
     */
    @Column(name="taxNumber")
    private String taxNumber;
    
    /**
     * 营业执照：组织机构代码证
     */
    @Column(name="orgCodeCertificate")
    private String orgCodeCertificate;
    
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

	public String getRegistrationNumber() {
		return registrationNumber;
	}

	public void setRegistrationNumber(String registrationNumber) {
		this.registrationNumber = registrationNumber;
	}

	public String getRegistrationRange() {
		return registrationRange;
	}

	public void setRegistrationRange(String registrationRange) {
		this.registrationRange = registrationRange;
	}

	public String getRegistrationBank() {
		return registrationBank;
	}

	public void setRegistrationBank(String registrationBank) {
		this.registrationBank = registrationBank;
	}

	public String getTaxNumber() {
		return taxNumber;
	}

	public void setTaxNumber(String taxNumber) {
		this.taxNumber = taxNumber;
	}

	public String getOrgCodeCertificate() {
		return orgCodeCertificate;
	}

	public void setOrgCodeCertificate(String orgCodeCertificate) {
		this.orgCodeCertificate = orgCodeCertificate;
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
