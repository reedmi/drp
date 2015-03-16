package com.originspark.drp.models.projects.invoices;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.originspark.drp.models.AbstractModel;
import com.originspark.drp.models.projects.Project;
import com.originspark.drp.util.enums.AuditState;
import com.sun.istack.internal.NotNull;

/**
 *  单据
 */
@MappedSuperclass
public abstract class AbstractInvoice extends AbstractModel{
    
    private static SimpleDateFormat forYearMonthFormatter = new SimpleDateFormat("yyyy-MM");
    
    /**
     * 编号
     */
    private String code;
    
	/**
	 * 所属系统
	 */
	@NotNull
	@ManyToOne
	private Project system;
	
    /**
     * 日期
     */
    @Temporal(TemporalType.DATE)
    private Date forDate;
    
    @JsonIgnore
    @NotNull
    @Column(columnDefinition = "char(7)", nullable = false)
    private String forYearMonth;
    
    /**
     * 汇总价格
     */
    @Column(precision = 15, scale = 2, nullable = false)
    private BigDecimal totalPrice = BigDecimal.ZERO;
    
    /**
     * 材料员姓名
     */
    private String materialKeeperName;
    
    /**
     * 库管员姓名
     */
    private String wareKeeperName;
    
    /**
     * 项目经理姓名
     */
    private String projectManagerName;
    
    /**
     * 库管审核状态
     */
    @Enumerated(EnumType.STRING)
    private AuditState wareKeeperAuditState;
    
    /**
     * 材料管理员审核状态
     */
    @Enumerated(EnumType.STRING)
    private AuditState materialKeeperAuditState;
    
    /**
     * 项目经理审核状态
     */
    @Enumerated(EnumType.STRING)
    private AuditState projectManagerAuditState;
    
    /**
     * 单据的状态，当项目经理通过之后，就设置为pass=true
     */
    private Boolean pass;
    
    public static enum COLUMNS {
        STARTDATE,ENDDATE,CODE,
        MINTOTAL,MAXTOTAL,PROJECT,SYSTEM,
        WARENAME,RECEIVEMANNAME,
        MATERIALKEEPERNAME,WAREKEEPERNAME,PROJECTMANAGERNAME,
        MATERIALKEEPERID,WAREKEEPERID,PROJECTMANAGERID,
        MATERIALKEEPERAUDITSTATE,WAREKEEPERAUDITSTATE,PROJECTMANAGERAUDITSTATE
    }
    
	public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Project getSystem() {
        return system;
    }

    public void setSystem(Project system) {
        this.system = system;
    }

    public Date getForDate() {
		return forDate;
	}

	public void setForDate(Date forDate) {
		this.forDate = forDate;
		if (forDate != null) {
            setForYearMonth(forYearMonthFormatter.format(forDate));
        }
	}
	
	public String getMaterialKeeperName() {
        return materialKeeperName;
    }

    public void setMaterialKeeperName(String materialKeeperName) {
        this.materialKeeperName = materialKeeperName;
    }

    public String getWareKeeperName() {
        return wareKeeperName;
    }

    public void setWareKeeperName(String wareKeeperName) {
        this.wareKeeperName = wareKeeperName;
    }

    public String getProjectManagerName() {
        return projectManagerName;
    }

    public void setProjectManagerName(String projectManagerName) {
        this.projectManagerName = projectManagerName;
    }

    public String getForYearMonth() {
        return forYearMonth;
    }

    public void setForYearMonth(String forYearMonth) {
        this.forYearMonth = forYearMonth;
    }

    public BigDecimal getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(BigDecimal totalPrice) {
		this.totalPrice = totalPrice;
	}

    public AuditState getWareKeeperAuditState() {
        return wareKeeperAuditState;
    }

    public void setWareKeeperAuditState(AuditState wareKeeperAuditState) {
        this.wareKeeperAuditState = wareKeeperAuditState;
    }

    public AuditState getMaterialKeeperAuditState() {
        return materialKeeperAuditState;
    }

    public void setMaterialKeeperAuditState(AuditState materialKeeperAuditState) {
        this.materialKeeperAuditState = materialKeeperAuditState;
    }
    
    public AuditState getProjectManagerAuditState() {
        return projectManagerAuditState;
    }

    public void setProjectManagerAuditState(AuditState projectManagerAuditState) {
        this.projectManagerAuditState = projectManagerAuditState;
    }
    
    public Boolean getPass() {
        return pass;
    }

    public void setPass(Boolean pass) {
        if(pass == null){
            this.pass = false;
        }else{
            this.pass = pass;
        }
    }

    @PrePersist
    private void prePersist() {
        setWareKeeperAuditState(AuditState.UNAUDITED);
        setMaterialKeeperAuditState(AuditState.UNAUDITED);
        setProjectManagerAuditState(AuditState.UNAUDITED);
    }
    
    @Override
    public String toString() {
        return super.toString()+", code="+code+", forDate="+forDate+", totalPrice="+totalPrice+", system.name="+system.getName();
    }
}