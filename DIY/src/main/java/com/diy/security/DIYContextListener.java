package com.diy.security;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class DIYContextListener implements ServletContextListener {

	@Override
	public void contextInitialized(ServletContextEvent contextEvent) {
		DIYApplicationObject.factory().startApplication();
	}

	@Override
	public void contextDestroyed(ServletContextEvent contextEvent) {
		DIYApplicationObject.factory().closeApplication();
	}
}
