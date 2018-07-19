package com.diy.model.eo;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.ParameterizedType;
import java.util.List;
import java.util.Map;

import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.diy.services.DBServices;
import com.diy.util.EOObjectUtil;

@MappedSuperclass
@JsonSerialize
public class EOObject {

	public static EOObject createObject(Map<String, Object> map) {
		EOObject eoObject = null;
		try {
			String className = (String) map.get("className");
			Class<?> clazz = Class.forName("com.vgst.model.eo." + className);
			eoObject = (EOObject) clazz.newInstance();
			map.remove("className");
			for (Map.Entry<String, Object> entry : map.entrySet()) {
				if (entry.getValue() == null) {
					continue;
				}
				Class<?> clazzType = EOObjectUtil.entityMapWithAttrType.get(className).get(entry.getKey());
				System.err.println("Key :::: " + entry.getKey() + "  Value ::::::" + entry.getValue()+" Value type :::: "+entry.getValue().getClass().getName());
				Object obj = EOObjectUtil.getDefaultObject(clazzType) != null ? EOObjectUtil.getDefaultObject(clazzType) : clazzType.newInstance();
				Field field = EOObjectUtil.entityMapWithAttrField.get(className).get(entry.getKey());
				field.setAccessible(true);
				if (field.isAnnotationPresent(OneToMany.class) || field.isAnnotationPresent(ManyToMany.class)) {
					String queryStr = (String.valueOf(entry.getValue())).replace('[', '(').replace(']', ')');
					List<Object> objList = DBServices
							.get("From " + ((Class<?>) ((ParameterizedType) field.getGenericType()).getActualTypeArguments()[0]).getSimpleName() + " where primary_key in " + queryStr);
					field.set(eoObject, objList);
				} else if (field.isAnnotationPresent(OneToOne.class) || field.isAnnotationPresent(ManyToOne.class)) {
					List<Object> objList = DBServices.get("From " + field.getType().getSimpleName() + " where primary_key=" + entry.getValue());
					field.set(eoObject, objList.size() == 0 ? null : objList.get(0));
				} else if (obj instanceof java.lang.String) {
					field.set(eoObject, clazzType.getMethod("valueOf", Object.class).invoke(obj, entry.getValue()));
				} else if (obj instanceof java.lang.Boolean) {
					field.set(eoObject, entry.getValue());
				} else if (obj instanceof byte[]) {
					field.set(eoObject, String.valueOf(entry.getValue()).getBytes());
				} else if (obj instanceof Double) {
					field.set(eoObject, Double.parseDouble(String.valueOf(entry.getValue())));
				} else if (obj instanceof java.lang.Long) {
					field.set(eoObject, Long.parseLong(String.valueOf(entry.getValue())));
				} else if (obj instanceof java.lang.Integer) {
					field.set(eoObject, Integer.parseInt(String.valueOf(entry.getValue())));
				} else {
					field.set(eoObject, clazzType.getMethod("valueOf", String.class).invoke(obj, entry.getValue()));
				}
			}
		} catch (ClassNotFoundException | InstantiationException | IllegalAccessException | IllegalArgumentException | InvocationTargetException | NoSuchMethodException | SecurityException e) {
			e.printStackTrace();
		}
		return eoObject;
	}

	public void postSave() {

	}

	public void postCreate(EOObject eoObject) {
		DBServices.update(eoObject);
	}

	public static EOObject getLatestObject(String className) {
		return (EOObject) (DBServices.get("From " + className + " where primary_key = (select max(primaryKey) from " + className + ")")).get(0);
	}
	
	public static EOObject getLatestObjectConditional(String className,String condition) {
		List<Object> list = DBServices.get("From " + className + " where primary_key = (select max(primaryKey) from " + className + " where "+condition+" )");
		return list.size()>0?(EOObject) (list).get(0):null;
	}
	
	public static EOObject getAllLatestObjectConditional(String className,String condition) {
		List<Object> list = DBServices.get("From " + className + " where primary_key = (select max(primaryKey) from " + className + " where "+condition+" )");
		return list.size()>0?(EOObject) (list):null;
	}

	public static EOObject getObjectByPK(String className, Integer pk) {
		return (EOObject) (DBServices.get("From " + className + " where primary_key =" + pk)).get(0);
	}

	public static EOObject updateObject(EOObject eoObject, Map<String, Object> map) {
		String className = eoObject.getClass().getSimpleName();
		map.remove("primaryKey");
		map.remove("className");
		try {
			for (Map.Entry<String, Object> entry : map.entrySet()) {
				if (entry.getValue() == null) {
					continue;
				}
				Class<?> clazzType = EOObjectUtil.entityMapWithAttrType.get(className).get(entry.getKey());
				Object obj = EOObjectUtil.getDefaultObject(clazzType) != null ? EOObjectUtil.getDefaultObject(clazzType) : clazzType.newInstance();
				Field field = EOObjectUtil.entityMapWithAttrField.get(className).get(entry.getKey());
				field.setAccessible(true);
				if (field.isAnnotationPresent(OneToMany.class) || field.isAnnotationPresent(ManyToMany.class)) {
					String queryStr = (String.valueOf(entry.getValue())).replace('[', '(').replace(']', ')');
					List<Object> objList = DBServices
							.get("From " + ((Class<?>) ((ParameterizedType) field.getGenericType()).getActualTypeArguments()[0]).getSimpleName() + " where primary_key in " + queryStr);
					field.set(eoObject, objList);
				} else if (field.isAnnotationPresent(OneToOne.class) || field.isAnnotationPresent(ManyToOne.class)) {
					if (entry.getValue() == null || String.valueOf(entry.getValue()).length() == 0) {
						field.set(eoObject, null);
					} else {
						List<Object> objList = DBServices.get("From " + field.getType().getSimpleName() + " where primary_key=" + entry.getValue());
						field.set(eoObject, objList.size() == 0 ? null : objList.get(0));
					}
				} else if (obj instanceof java.lang.String) {
					field.set(eoObject, clazzType.getMethod("valueOf", Object.class).invoke(obj, entry.getValue()));
				} else if (obj instanceof java.lang.Boolean) {
					field.set(eoObject, entry.getValue());
				} else if (obj instanceof byte[]) {
					field.set(eoObject, String.valueOf(entry.getValue()).getBytes());
				} else if (obj instanceof Double) {
					field.set(eoObject, Double.parseDouble(String.valueOf(entry.getValue())));
				} else if (obj instanceof java.lang.Long) {
					field.set(eoObject, new Long((Integer) entry.getValue()));
				} else if (obj instanceof java.lang.Integer) {
					field.set(eoObject, Integer.parseInt(String.valueOf(entry.getValue())));
				} else {
					field.set(eoObject, clazzType.getMethod("valueOf", String.class).invoke(obj, entry.getValue()));
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return eoObject;
	}
	
	public static Long getMaxPK(String className) {
		return (Long) (DBServices.get("Select max(primaryKey) From " + className)).get(0);
	}

}
