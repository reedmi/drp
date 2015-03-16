package com.originspark.drp.util.enums;

/**
 * 审核状态
 */
public enum AuditState {
    UNAUDITED ,//未审核
	APPROVED,//合格通过
	UNAPPROVED//不合格退回，当库管或者项目经理选择失败退回后，材料员的审核状态更改为UNAPPROVED
}
