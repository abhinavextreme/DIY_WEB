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
@Table(name = "LKROLE")
@SequenceGenerator(name = "LKROLE_SEQ", initialValue = 1, allocationSize = 1, sequenceName = "LKROLE_SEQ")

public class LKRole extends EOObject {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "LKROLE_SEQ")
	@Column(name = "PRIMARY_KEY")
	public long primaryKey;

	@Column(name = "NAME")
	public String roleName;

	@Column(name = "IS_ACTIVE")
	public boolean isActive;

	public LKRole() {
		super();
	}

	public LKRole(String roleName, boolean isActive) {

		this.roleName = roleName;
		this.isActive = isActive;
	}

}
