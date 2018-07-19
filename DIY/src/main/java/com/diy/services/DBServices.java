package com.diy.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.diy.util.HibernateUtil;

public class DBServices {

	public static void create(Object obj) {
		Session session = HibernateUtil.getSessionFactory().openSession();
		Transaction transaction = session.beginTransaction();
		session.save(obj);
		transaction.commit();
		session.close();
	}

	public static void update(Object obj) {
		Session session = HibernateUtil.getSessionFactory().openSession();
		Transaction transaction = session.beginTransaction();
		session.update(obj);
		transaction.commit();
		session.close();
	}

	public static List<Object> get(String queryStr) {
		List<Object> resultSet = new ArrayList<>();
		Session session = HibernateUtil.getSessionFactory().openSession();
		Transaction transaction = session.beginTransaction();
		for (Object obj : session.createQuery(queryStr).list()) {
			resultSet.add(obj);
		}
		transaction.commit();
		session.close();
		return resultSet;
	}

	public static List<Object> getLimitData(String queryStr, int Limitsize) {

		List<Object> resultSet = new ArrayList<>();
		Session session = HibernateUtil.getSessionFactory().openSession();
		Transaction transaction = session.beginTransaction();
		Query qry = session.createQuery(queryStr);
		qry.setMaxResults(Limitsize);
		for (Object obj : qry.list()) {
			resultSet.add(obj);
		}
		transaction.commit();
		session.close();
		return resultSet;
	}

	@SuppressWarnings("unchecked")
	public static List<HashMap<String, Object>> getNativeQueryResult(String queryStr) {
		List<HashMap<String, Object>> resultSet = new ArrayList<>();
		Session session = HibernateUtil.getSessionFactory().openSession();
		Transaction transaction = session.beginTransaction();
		SQLQuery query = session.createSQLQuery(queryStr);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		for (Object obj : query.list()) {
			HashMap<String, Object> map = (HashMap<String, Object>) obj;
			resultSet.add(map);
		}
		transaction.commit();
		session.close();
		return resultSet;
	}
	
	public static Object checkObjectExists(String className,String email, String phone) {
		String qryStr = "FROM " + className + " u WHERE u.email = '" + email +"' OR u.phone = '" + phone +"'";
				
		List<Object> list = DBServices.get(qryStr);
		return (list != null && list.size()>0) ? list.get(0) : null;
	}

}
