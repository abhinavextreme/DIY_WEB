package com.diy.controller;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.diy.model.eo.EOImage;
import com.diy.model.eo.EOObject;
import com.diy.model.eo.EOUser;
import com.diy.model.hp.HPLogin;
import com.diy.services.DBServices;
import com.diy.util.JSONUtil;
import com.diy.util.VEMSUtil;

@Path("/ajaxRegistration")

public class RegistrationController {

	public static Logger logger = LoggerFactory.getLogger(RegistrationController.class);

	@POST
	@Path("/createUser")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response createUserObject(HashMap<String, Object> map)
			throws ClassNotFoundException, NoSuchMethodException, SecurityException, InstantiationException,
			IllegalAccessException, IllegalArgumentException, InvocationTargetException {

		String className = String.valueOf(map.get("className"));
		// String tempPswd = VEMSUtil.getRandomPswd();
		// map.put("password", tempPswd);
		Object dbObj = DBServices.checkObjectExists(className, (String) map.get("email"), (String) map.get("phone"));
		if (dbObj != null) {
			return Response.status(401).entity("failure").build();
		}

		EOImage eoImg = null;
		if (map.get("eoImage") == null) {// If image pk null then create default
											// img
			eoImg = VEMSUtil.getAvitarImg(className);
			map.put("eoImage", new Long(eoImg.primaryKey).intValue());
		}
		eoImg = (EOImage) EOObject.getObjectByPK("EOImage", (Integer) map.get("eoImage"));
		DBServices.create(EOObject.createObject(map));

		EOUser eoUser = (EOUser) EOObject.getLatestObject(className);
		eoImg.headerPk = eoUser.primaryKey;
		eoImg.postCreate(eoImg);

		return Response.status(201).entity(JSONUtil.objectToJson("Success")).build();
	}

	@POST
	@Path("/updateUser")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateUserObject(HashMap<String, Object> map)
			throws ClassNotFoundException, NoSuchMethodException, SecurityException, InstantiationException,
			IllegalAccessException, IllegalArgumentException, InvocationTargetException {

		String className = String.valueOf(map.get("className"));
		Integer pk = (Integer) map.get("primaryKey");

		EOObject eoObject = EOObject.updateObject(EOObject.getObjectByPK(className, pk), map);
		DBServices.update(eoObject);
		return Response.status(201).entity(JSONUtil.objectToJson("Success")).build();
	}

}
