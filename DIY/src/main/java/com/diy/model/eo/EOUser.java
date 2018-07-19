package com.diy.model.eo;

import java.sql.Date;
import java.util.LinkedList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonManagedReference;

import com.diy.model.lk.LKRole;

@Entity
@Table(name = "EOUSER")
@SequenceGenerator(name = "EOUSER_SEQ", initialValue = 1, allocationSize = 1, sequenceName = "EOUSER_SEQ")
public class EOUser extends EOObject {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "EOUSER_SEQ")
	@Column(name = "PRIMARY_KEY")
	public long primaryKey;

	@Column(name = "COMPANY_NAME")
	public String companyName;

	@Column(name = "FIRST_NAME")
	public String firstName;

	@Column(name = "MIDDLE_NAME")
	public String middleName;

	@Column(name = "LAST_NAME")
	public String lastName;

	@Column(name = "DATE_OF_BIRTH")
	public Date dob = new Date(System.currentTimeMillis());

	@Column(name = "PRIMARY_EMAIL")
	public String primaryEmail;

	@Column(name = "SECONDARY_EMAIL")
	public String secondaryEmail;

	@Column(name = "PHONE")
	public String phone;

	@Column(name = "ALTERNATE_PHONE")
	public String alternatePhone;

	@OneToOne(optional = true)
	public EOImage eoImage;

	@Column(name = "ADDRESS_LINE_1")
	public String addressLine1;

	@Column(name = "ADDRESS_LINE_2")
	public String addressLine2;

	@Column(name = "LANDMARK")
	public String landMark;

	@Column(name = "PINCODE")
	public String pinCode;

	@Column(name = "IS_USER_VERIFIED")
	public boolean isUserVerified = false;

	@Column(name = "PASSWORD", nullable = true)
	public String password;

	@Column(name = "DEVICE_TOKEN", nullable = true)
	public String deviceToken;

	@Column(name = "DEVICE_ID", nullable = true)
	public String deviceId;

	@OneToOne
	public LKRole lkRole;

	@OneToMany(mappedBy = "eoUser", cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
	@JsonManagedReference
	public List<EOFunActivity> eoFunActivityArray = new LinkedList<>();

	public EOUser() {
		// TODO Auto-generated constructor stub
	}

	public EOUser(String companyName, String firstName, String middleName, String lastName, Date dob,
			String primaryEmail, String secondaryEmail, String phone, String alternatePhone, EOImage eoImage,
			String addressLine1, String addressLine2, String landMark, String pinCode, boolean isUserVerified,
			String password, String deviceToken, String deviceId, LKRole lkRole,
			List<EOFunActivity> eoFunActivityArray) {
		super();
		this.companyName = companyName;
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.dob = dob;
		this.primaryEmail = primaryEmail;
		this.secondaryEmail = secondaryEmail;
		this.phone = phone;
		this.alternatePhone = alternatePhone;
		this.eoImage = eoImage;
		this.addressLine1 = addressLine1;
		this.addressLine2 = addressLine2;
		this.landMark = landMark;
		this.pinCode = pinCode;
		this.isUserVerified = isUserVerified;
		this.password = password;
		this.deviceToken = deviceToken;
		this.deviceId = deviceId;
		this.lkRole = lkRole;
		this.eoFunActivityArray = eoFunActivityArray;
	}

	public String getFullName() {
		String name = "";
		if (this.middleName != null) {
			name = name + firstName + " " + middleName + " " + lastName;
		} else {
			name = name + firstName + " " + lastName;
		}

		return name;
	}
}
