package com.diy.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.diy.model.hp.HPMsgTempl;

public class DataUtil {

	public HPMsgTempl msgTemplData;
	public static final String GEN_MAIL_TEMPL = "data/genericMail.txt";
	public static final String EMAIL_BODY_TEXT = "data/emailTempl.json";

	private volatile static DataUtil factory;

	public static DataUtil factory() {
		if (factory == null) {
			synchronized (DataUtil.class) {
				if (factory == null) {
					factory = new DataUtil();
				}
			}
		}
		return factory;
	}

	public void loadData() {
		String jsonContent = this.readFile(DataUtil.EMAIL_BODY_TEXT, true);
		//System.out.println("JSON CONTET : " + jsonContent);
		this.msgTemplData = (HPMsgTempl) JSONUtil.jsonToObject(jsonContent, HPMsgTempl.class);

	}

	public String readFile(String fileName, boolean resourceFile) {
		try {
			File file;
			if (resourceFile) {
				ClassLoader classLoader = this.getClass().getClassLoader();
				file = new File(classLoader.getResource(fileName).getFile());
			} else {
				file = new File(fileName);
			}
			FileReader fr = new FileReader(file);
			BufferedReader br = new BufferedReader(fr);
			try {
				StringBuilder sb = new StringBuilder();
				String line = br.readLine();

				while (line != null) {
					sb.append(line);
					line = br.readLine();
				}
				return sb.toString();
			} finally {
				fr.close();
				br.close();
			}
		} catch (Exception e) {
		}
		return "";
	}

	public String messageFormat(Matcher matcher, String messageString, Map<String, Object> replacements) {
		StringBuffer buffer = new StringBuffer();
		if (matcher == null) {
			Pattern pattern = Pattern.compile("\\{\\{(.+?)\\}\\}"); // Create a
																	// pattern
																	// for
																	// {{anyKey}}
			matcher = pattern.matcher(messageString);
		}
		while (matcher.find()) {
			Object replacement = replacements.get(matcher.group(1));
			if (replacement != null) {
				matcher.appendReplacement(buffer, "");
				buffer.append(replacement);
			}
		}
		matcher.appendTail(buffer);
		return buffer.toString();
	}

}
