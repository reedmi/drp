package com.originspark.drp.util.extjs.menu.models;

public class TreeRoot {

    private boolean expanded = true;
    private Children[] children;
    
    public TreeRoot(Children[] children) {
        super();
        this.children = children;
    }
    public boolean isExpanded() {
        return expanded;
    }
    public void setExpanded(boolean expanded) {
        this.expanded = expanded;
    }
    public Children[] getChildren() {
        return children;
    }
    public void setChildren(Children[] children) {
        this.children = children;
    }
    
    
}
