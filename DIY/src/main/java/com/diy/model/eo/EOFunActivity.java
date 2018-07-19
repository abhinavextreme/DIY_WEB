package com.diy.model.eo;

import java.util.LinkedList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonBackReference;

@Entity
@Table(name = "EO_FUN_ACTIVITY")
@SequenceGenerator(name = "EO_FUN_ACTIVITY_SEQ", initialValue = 1, allocationSize = 1, sequenceName = "EO_FUN_ACTIVITY_SEQ")
public class EOFunActivity extends EOObject {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "EO_FUN_ACTIVITY_SEQ")
	@Column(name = "PRIMARY_KEY")
	public long primaryKey;

	@Column(name = "ACTIVITY_NAME")
	public String activityName;

	@ManyToOne
	@JoinColumn(name = "FK_EOUSER_ID", nullable = false)
	@JsonBackReference
	public EOUser eoUser;

	@ManyToMany(fetch = FetchType.EAGER)
	public List<EOImage> eoActivityImagesArray = new LinkedList<>();

	public EOFunActivity() {

	}

	public EOFunActivity(String activityName, EOUser eoUser, List<EOImage> eoActivityImagesArray) {
		super();
		this.activityName = activityName;
		this.eoUser = eoUser;
		this.eoActivityImagesArray = eoActivityImagesArray;
	}

}