package com.originspark.drp.util.extjs.menu.models;

public class SubItems {
    
    private String xtype="treepanel";
    private boolean rootVisible = false;
    private String displayField = "text";
    private String margin = "0 0 0 0";
    private int border = 0;
    private TreeRoot root;
    
    public SubItems(TreeRoot root) {
        super();
        this.root = root;
    }
    public String getXtype() {
        return xtype;
    }
    public void setXtype(String xtype) {
        this.xtype = xtype;
    }
    public boolean isRootVisible() {
        return rootVisible;
    }
    public void setRootVisible(boolean rootVisible) {
        this.rootVisible = rootVisible;
    }
    public String getDisplayField() {
        return displayField;
    }
    public void setDisplayField(String displayField) {
        this.displayField = displayField;
    }
    public String getMargin() {
        return margin;
    }
    public void setMargin(String margin) {
        this.margin = margin;
    }
    public int getBorder() {
        return border;
    }
    public void setBorder(int border) {
        this.border = border;
    }
    public TreeRoot getRoot() {
        return root;
    }
    public void setRoot(TreeRoot root) {
        this.root = root;
    }
    
    
}
