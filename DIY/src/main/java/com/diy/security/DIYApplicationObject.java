package com.diy.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.diy.util.DataUtil;
import com.diy.util.EOObjectUtil;
import com.diy.util.HibernateUtil;
import com.diy.util.VEMSUtil;

public class DIYApplicationObject {

	public static Logger logger = LoggerFactory.getLogger(DIYApplicationObject.class);
	private volatile static DIYApplicationObject factory;

	public static DIYApplicationObject factory() {
		if (factory == null) {
			synchronized (DIYApplicationObject.class) {
				if (factory == null) {
					factory = new DIYApplicationObject();
				}
			}
		}
		return factory;
	}

	public void startApplication() {
		this.loadApplicationSetups();
		//absentMail();
	}

	private void loadApplicationSetups() {
		DataUtil.factory().loadData();
		VEMSUtil.loadFileConfiguration();
		logger.info("IN APPLICATION STARTUP");
		HibernateUtil.getSessionFactory();
		logger.info("DB LOADED...");
		EOObjectUtil.LoadAllEntityClassJson();
		logger.info("ENTITY LOADED...");
	}

	public void closeApplication() {
		logger.info("IN APPLICATION CLOSE");
		HibernateUtil.closeSessionFactory();
	}

}
