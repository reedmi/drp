package com.originspark.drp.models.users;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.originspark.drp.models.AbstractModel;
import com.originspark.drp.util.Blowfish;
import com.originspark.drp.util.enums.Gender;
import com.originspark.drp.util.enums.Status;

@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type", discriminatorType = DiscriminatorType.STRING)
public class AbstractUser extends AbstractModel{
    
    @Column(name = "type", updatable = false, insertable = false)
    private String type;

    /**
     * 编号
     */
    private String code;
    
    /**
     * 姓名
     */
    private String name;
    
    /**
     * 密码
     */
    @JsonIgnore
    private String password;
    
    /**
     * 联系电话
     */
    private String phone;
    
    /**
     * 地址
     */
    private String address;
    
    /**
     * 电子邮件
     */
    private String email;
    
    /**
     * 性别
     */
    @Enumerated(EnumType.STRING)
    private Gender gender;
    
    /**
     * 状态
     */
    @Enumerated(EnumType.STRING)
    private Status status;
    
    public static enum COLUMNS {
        TYPE,CODE,NAME,PHONE,ADDRESS,EMAIL,GENDER,STATUS
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
    	Blowfish bf=new Blowfish();
    	String pwd=bf.encryptString(password);
        this.password = pwd;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }
    
    public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
    
    @Override
    public String toString() {
        return super.toString()+", code="+code+", name="+name+", phone="+phone+", address="+address+", email="+email
                +", gender="+gender+", status"+status;
    }
}
