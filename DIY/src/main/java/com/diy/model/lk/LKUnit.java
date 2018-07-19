package com.diy.model.lk;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.diy.model.eo.EOObject;

@Entity
@Table(name = "LKUNIT")
@SequenceGenerator(name = "LKUNIT_SEQ", initialValue = 1, allocationSize = 1, sequenceName = "LKUNIT_SEQ")

public class LKUnit extends EOObject {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "LKUNIT_SEQ")
	@Column(name = "PRIMARY_KEY")
	public long primaryKey;

	@Column(name = "UNIT_TYPE")
	public String unitType;

	@Column(name = "UNIT_DESC")
	public String unitDesc;

	@Column(name = "IS_ACTIVE")
	public boolean isActive;

	public LKUnit() {
	}

	public LKUnit(String unitType, String unitDesc, boolean isActive) {
		super();
		this.unitType = unitType;
		this.unitDesc = unitDesc;
		this.isActive = isActive;
	}
}
