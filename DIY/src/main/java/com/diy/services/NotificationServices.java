package com.diy.services;

import java.io.IOException;
import java.io.Serializable;
import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ByteArrayEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;

import com.diy.util.VEMSUtil;
import com.google.gson.Gson;

public class NotificationServices {

	public static String androidPushUrl = "https://fcm.googleapis.com/fcm/send";//"https://android.googleapis.com/gcm/send";
	public static String apiKey = "AAAAgwxkMK4:APA91bFsUaUkdnOyjHs5SByq8hYPP4Vu53VxT0fK-j3d_9jff8FuiPxntgLVk3Vbhzz734qiTWTrPEuwJnCmuPmZqITBcBbpyqTt25IpN4vCJotQJpBaE8xdhomc_h3k2AeN4e3J-UdMm5lK_Ou8iltuvkjPV5fn6g";

	public static String sendNotificationToAndroidDevices(String deviceToken, String notIfMsg) {
		HashMap<String, Object> extraParam = new HashMap<>();
		Content c = new Content();
		List<String> tokenList = new ArrayList<>();
		//fyZ9fOoIgBs:APA91bF8v9IVyFlIadP0MpuWXZV5jqma1XwcOwn8ZXUJhRoekkTjc57aell_N-WlPEtcupPWfk8XA1x8ayTththW9b5OHoPcT5MN6ozi7wbrpdOtfg5SoZ_MSFp6RqxkVgSed902MCgT
		tokenList.add(deviceToken);
		c.setRegistrationIDs(tokenList);
		extraParam.put("notificationID", VEMSUtil.genRandomString(6));
		extraParam.put("notificationMessage", notIfMsg);
		c.setData(extraParam);
		return sendToGCM(apiKey, c);
	}

	private static String sendToGCM(String apiKey, Content content) {
		String mresult = "Notification Initiated";
		final CloseableHttpClient httpClient = HttpClientBuilder.create().build();
		HttpPost httpPost = new HttpPost();
		try {
			httpPost.setURI(new URI(androidPushUrl));
			httpPost.addHeader("Content-Type", "application/json");
			httpPost.addHeader("Authorization", "key=" + apiKey);
			httpPost.setEntity(new ByteArrayEntity(new Gson().toJson(content).toString().getBytes("UTF8")));

			HttpResponse response = httpClient.execute(httpPost);
			mresult = EntityUtils.toString(response.getEntity());
			System.out.println("result........" + mresult);

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (httpClient != null) {
				try {
					httpClient.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
				httpPost.releaseConnection();
			}
		}
		return mresult;
	}
}

//Class to send data to GCM Server in Proper format.
class Content implements Serializable {

	private static final long serialVersionUID = 1L;
	private List<String> registration_ids;

	public List<String> getRegistrationIDs() {
		return this.registration_ids;
	}

	public void setRegistrationIDs(List<String> registrationIDs) {
		this.registration_ids = registrationIDs;
	}

	private HashMap<String, Object> data;

	public void addRegId(String regId) {
		if (this.registration_ids == null) {
			this.registration_ids = new LinkedList<String>();
		}
		this.registration_ids.add(regId);
	}

	public HashMap<String, Object> getData() {
		return this.data;
	}

	public void setData(HashMap<String, Object> data) {
		this.data = data;
	}
}
