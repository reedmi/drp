package com.originspark.drp.util.extjs.menu.models;

public class Item {
    
    private String title;
    private String titleAlign="center";
    private boolean autoScroll=true;
    private SubItems[] items;
    
    public Item(String title, SubItems[] items) {
        super();
        this.title = title;
        this.items = items;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getTitleAlign() {
        return titleAlign;
    }
    public void setTitleAlign(String titleAlign) {
        this.titleAlign = titleAlign;
    }
    public boolean isAutoScroll() {
        return autoScroll;
    }
    public void setAutoScroll(boolean autoScroll) {
        this.autoScroll = autoScroll;
    }
    public SubItems[] getItems() {
        return items;
    }
    public void setItems(SubItems[] items) {
        this.items = items;
    }
    
    
}
