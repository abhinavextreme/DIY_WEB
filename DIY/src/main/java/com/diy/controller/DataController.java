package com.diy.controller;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.diy.model.eo.EOImage;
import com.diy.model.eo.EOObject;
import com.diy.services.DBServices;
import com.diy.util.JSONUtil;

@Path("/ajax")
public class DataController {

	public static Logger logger = LoggerFactory.getLogger(DataController.class);

	@POST
	@Path("/createObject")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response createObject(HashMap<String, Object> map)
			throws ClassNotFoundException, NoSuchMethodException, SecurityException, InstantiationException,
			IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		DBServices.create(EOObject.createObject(map));
		return Response.status(201).entity(JSONUtil.objectToJson("Success")).build();

	}

	@POST
	@Path("/getObject")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getObjectFromDB(HashMap<String, String> map) {
		String className = map.get("objName");
		List<Object> objList = DBServices.get("From " + className);
		return Response.status(200).entity(JSONUtil.objectToJson(objList)).build();
	}

	@POST
	@Path("/updateObject")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateObject(HashMap<String, Object> map)
			throws ClassNotFoundException, NoSuchMethodException, SecurityException, InstantiationException,
			IllegalAccessException, IllegalArgumentException, InvocationTargetException {

		String className = (String) map.get("className");
		Integer pk = (Integer) map.get("primaryKey");
		DBServices.update(EOObject.updateObject(EOObject.getObjectByPK(className, pk), map));
		return Response.status(201).entity(JSONUtil.objectToJson("Success")).build();
	}

	@POST
	@Path("/createImgObject")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response createImgObject(HashMap<String, Object> map)
			throws ClassNotFoundException, NoSuchMethodException, SecurityException, InstantiationException,
			IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		System.out.println("MAP VALUE IN CONTROLLER : " + map);
		// map.put("entityName", "EOStaffUser");
		EOImage eoImage = EOImage.createEO(map);
		EOImage responseImgObj = new EOImage();
		responseImgObj.primaryKey = eoImage.primaryKey;
		System.err.println("Image Primary Key: " + responseImgObj.primaryKey);
		return Response.status(201).entity(JSONUtil.objectToJson(responseImgObj)).build();
	}

	@POST
	@Path("/updateImgObject")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateImgObject(Map<String, Object> map)
			throws ClassNotFoundException, NoSuchMethodException, SecurityException, InstantiationException,
			IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		String className = String.valueOf(map.get("className"));
		Integer pk = (Integer) map.get("primaryKey");
		EOImage eoObject = (EOImage) EOObject.getObjectByPK(className, pk);
		eoObject.update(map);
		EOImage responseImgObj = new EOImage();
		responseImgObj.primaryKey = eoObject.primaryKey;
		return Response.status(201).entity(JSONUtil.objectToJson(responseImgObj)).build();
	}
}