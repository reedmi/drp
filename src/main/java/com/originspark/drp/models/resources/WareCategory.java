package com.originspark.drp.models.resources;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.originspark.drp.models.AbstractModel;

/**
 * 商品类别
 * @author ReedMi
 */
@Entity
@Table(name = "ware_categories")
public class WareCategory extends AbstractModel {

    private String name;

    private String code;

    @ManyToOne
    private WareCategory parent;

    @OneToMany(mappedBy = "parent")
    private List<WareCategory> chidren;

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

    public WareCategory getParent() {
        return parent;
    }

    public void setParent(WareCategory parent) {
        this.parent = parent;
    }

    public List<WareCategory> getChidren() {
        return chidren;
    }

    public void setChidren(List<WareCategory> chidren) {
        this.chidren = chidren;
    }

    public boolean getLoaded() {
        if (getChidren().isEmpty()) {
            return true;
        }
        return false;
    }
}
