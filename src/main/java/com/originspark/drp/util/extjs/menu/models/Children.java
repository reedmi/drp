package com.originspark.drp.util.extjs.menu.models;

public class Children {

    private String text;
    private String id;
    private boolean leaf;
    private Children[] children;
    
    public Children(String text, String id, boolean leaf) {
        super();
        this.text = text;
        this.id = id;
        this.leaf = leaf;
    }
    
    public Children(String text, String id) {
        super();
        this.text = text;
        this.id = id;
        this.leaf = true;
    }
    
    public Children(String text) {
        super();
        this.text = text;
        this.id = null;
        this.leaf = false;
    }
    
    public Children(String text,Children[] children) {
        super();
        this.text = text;
        this.id = null;
        this.leaf = false;
        this.children = children;
    }
    
    public String getText() {
        return text;
    }
    public void setText(String text) {
        this.text = text;
    }
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public boolean isLeaf() {
        return leaf;
    }
    public void setLeaf(boolean leaf) {
        this.leaf = leaf;
    }
    public Children[] getChildren() {
        return children;
    }
    public void setChildren(Children[] children) {
        this.children = children;
    }
    
}
