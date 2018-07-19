package com.diy.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.diy.model.eo.EOObject;
import com.diy.model.eo.EOUser;
import com.diy.model.hp.HPLogin;
import com.diy.services.DBServices;
import com.diy.util.JSONUtil;
import com.diy.util.VEMSUtil;

@Path("/auth")
public class AuthController {

	@POST
	@Path("/loginUser")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response loginUser(HashMap<String, String> map) throws Exception {

		String usrName = map.get("usrName");
		String password = map.get("password");
		String url = "failure";
		boolean isEmail = (usrName.indexOf('@') != -1) ? true : false;
		String qryStr = "FROM EOUser u WHERE " + (isEmail ? " upper(u.email)" : "u.phone") + " = '"
				+ usrName.toUpperCase() + "'";

		List<Object> list = DBServices.get(qryStr);

		if (list.size() == 0) {
			return Response.status(401).entity(JSONUtil.objectToJson(url)).build();
		}
		url = this.pswdAuthentication((EOObject) list.get(0), password);

		if (url.equals("failure")) {
			return Response.status(401).entity(JSONUtil.objectToJson(url)).build();
		}
		HPLogin hpLogin = new HPLogin(url, usrName);

		EOUser eoUser = (EOUser) list.get(0);
		hpLogin.userKey = eoUser.primaryKey;
		hpLogin.firstName = eoUser.firstName;
		hpLogin.dbRole = eoUser.lkRole.roleName;
		System.out.println("HPLogin : " + hpLogin);
		return Response.status(200).entity(JSONUtil.objectToJson(hpLogin)).build();
	}

	public String pswdAuthentication(EOObject eoObj, String password) {

		EOUser eoObject = (EOUser) eoObj;
		if ((eoObject.password).equals(password)) {

			if (eoObject.isUserVerified) {
				Map<String, Object> map = new HashMap<>();

				DBServices.update(EOObject.updateObject(eoObject, map));
				// Send Home URL
				return VEMSUtil.properties.getProperty(VEMSUtil.BASE_URL) + "/VGST/home#/dashboard";
			} else {
				// send Change Password URL
				return VEMSUtil.properties.getProperty(VEMSUtil.BASE_URL) + "/VGST/changePassword";
			}
		} else {
			return "failure";
		}
	}
}
