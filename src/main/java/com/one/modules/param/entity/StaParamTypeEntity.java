package com.one.modules.param.entity;

public class StaParamTypeEntity {
	
	private String typeId;
	private String deptId;
	private String groupId;
	private String typeCode;
	private String typeName;
	private String typeSource;
	private String remark;

	public String getTypeId() {
		return typeId;
	}

	public void setTypeId(String typeId) {
		this.typeId = typeId;
	}

	public String getDeptId() {
		return deptId;
	}

	public void setDeptId(String deptId) {
		this.deptId = deptId;
	}

	public String getGroupId() {
		return groupId;
	}

	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}

	public String getTypeCode() {
		return typeCode;
	}

	public void setTypeCode(String typeCode) {
		this.typeCode = typeCode;
	}

	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	public String getTypeSource() {
		return typeSource;
	}

	public void setTypeSource(String typeSource) {
		this.typeSource = typeSource;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Override
	public String toString() {
		return "StaParamTypeEntity [typeId=" + typeId + ", deptId=" + deptId + ", groupId=" + groupId + ", typeCode=" + typeCode + ", typeName=" + typeName + ", typeSource="
				+ typeSource + ", remark=" + remark + "]";
	}

}
