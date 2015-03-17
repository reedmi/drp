package com.originspark.drp.models;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.originspark.drp.util.Blowfish;
import com.originspark.drp.util.enums.Gender;
import com.originspark.drp.util.enums.UserType;

@Entity
@Table(name="users")
public class User extends AbstractModel {

    @Enumerated(EnumType.STRING)
    private UserType type;

    /**
     * 编号
     */
    private String code;

    /**
     * 姓名
     */
    private String name;

    /**
     * 登录账号
     */
    private String username;

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

    public UserType getType() {
        return type;
    }

    public void setType(UserType type) {
        this.type = type;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        Blowfish bf = new Blowfish();
        String pwd = bf.encryptString(password);
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

    public static enum COLUMNS {
        TYPE, CODE, NAME, PHONE, ADDRESS, EMAIL, GENDER, STATUS
    }
}
