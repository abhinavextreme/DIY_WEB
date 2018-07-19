package com.diy.util;

import java.io.IOException;
import java.io.InputStream;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Random;
import java.util.UUID;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;

import com.diy.model.eo.EOImage;
import com.diy.model.eo.EOObject;
import com.diy.services.DBServices;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

public class VEMSUtil {

	public static long bytesToLong(byte[] bytes) {
		ByteBuffer buffer = ByteBuffer.allocate(Long.SIZE);
		buffer.put(bytes);
		buffer.flip();// need flip
		return buffer.getLong();
	}

	public static String getRandomPswd() {
		return String.valueOf((int) (100000 * new Random().nextDouble()));
	}

	public static byte[] decodeBase64(String string) {
		if (string.length() != 0) {
			try {
				return new BASE64Decoder().decodeBuffer(string);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	public static String encodeBase64(byte[] byteArray) {
		if (byteArray != null && byteArray.length > 0) {
			return new BASE64Encoder().encode(byteArray);
		}
		return null;
	}

	public static HashMap<String, Object> getValueMap(String _keys, Object... _values) {
		HashMap<String, Object> map = new HashMap<>();
		if (_values == null) {
			return new HashMap<>();
		}
		String[] keys = _keys.split("~");
		int count = keys.length;
		if (_values.length < count) {
			count = _values.length;
		}
		for (int i = 0; i < count; i++) {
			map.put(keys[i], _values[i]);
		}
		return map;
	}

	public static HashMap<String, String> getValueMapSMS(String _keys, String... _values) {
		HashMap<String, String> map = new HashMap<>();
		if (_values == null) {
			return new HashMap<>();
		}
		String[] keys = _keys.split("~");
		int count = keys.length;
		if (_values.length < count) {
			count = _values.length;
		}
		for (int i = 0; i < count; i++) {
			map.put(keys[i], _values[i]);
		}
		return map;
	}

	public static List<String> getList(String _values) {
		List<String> list = new ArrayList<>();
		if (_values == null) {
			return list;
		}
		String[] values = _values.split("~");
		int count = values.length;
		for (int i = 0; i < count; i++) {
			list.add(values[i]);
		}
		return list;
	}

	public static EOImage getAvitarImg(String entityName) {
		Map<String, Object> map = new HashMap<>();

		map.put("className", "EOImage");
		// map.put("detail",
		// DataUtil.factory().readFile("demoData/imgBase64.txt", true));
		map.put("detail", VEMSUtil.DEFAULT_IMG_BYTES);
		map.put("entityName", entityName);
		DBServices.create(EOObject.createObject(map));
		System.out.println("Img Object Created");
		EOImage eoImage = (EOImage) EOObject.getLatestObject("EOImage");
		eoImage.postSave(eoImage);
		return eoImage;
	}

	public static Properties properties = null;

	public static void loadFileConfiguration() {
		ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
		InputStream input = classLoader.getResourceAsStream("conf.properties");

		properties = new Properties();
		try {
			properties.load(input);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static String genRandomUUID() {
		return UUID.randomUUID().toString().replaceAll("-", "");
	}

	public static String genRandomString(int length) {
		StringBuilder buffer = new StringBuilder();
		while (buffer.length() < length) {
			buffer.append(genRandomUUID());
		}
		return buffer.substring(0, length);
	}

	public static byte[] HexToByte(String hexCOde) {
		return DatatypeConverter.parseHexBinary(hexCOde);
	}

	public static final String key = "1B¢8×ˆíÕHG_¿";

	public static String decryptLicense(byte[] byteCipherText) throws Exception {

		// AES defaults to AES/ECB/PKCS5Padding in Java 7

		Cipher aesCipher = Cipher.getInstance("AES");

		aesCipher.init(Cipher.DECRYPT_MODE, getDecryptionKey());

		byte[] bytePlainText = aesCipher.doFinal(byteCipherText);

		return new String(bytePlainText);

	}

	public static SecretKey getDecryptionKey() {
		SecretKey secretKey = new SecretKeySpec(key.getBytes(), "AES");
		return secretKey;
	}

	public static ArrayList<String> getMacAddressArray() {
		ArrayList<String> macArray = new ArrayList<>();
		try {
			Enumeration<NetworkInterface> nwInterfaceEnum = NetworkInterface.getNetworkInterfaces();
			while (nwInterfaceEnum.hasMoreElements()) {
				NetworkInterface nwInterface = nwInterfaceEnum.nextElement();
				byte[] mac = nwInterface.getHardwareAddress();
				if (mac == null)
					continue;
				StringBuilder sb = new StringBuilder();
				for (int i = 0; i < mac.length; i++) {
					sb.append(String.format("%02X%s", mac[i], (i < mac.length - 1) ? "-" : ""));
				}
				macArray.add(sb.toString());
			}
		} catch (SocketException e) {
			e.printStackTrace();
		}
		return macArray;
	}

	public static final String BASE_URL = "BaseUrl";

	/*public static final String clientLogo = "D:\\Ericsson\\VEMS\\src\\main\\resources\\data\\img\\VEMS.jpg";
	public static final String clientAddress = "FF 3&4, Omaxe Park Plaza, Shakti Khand 2, Indrapuram, Ghaziabad.";
	public static final String privacyMessgae = "*Confidential to VEMS";
	public static final String REGISTRATION = "REGISTRATION";
	public static final String FORGOT_PASSWORD = "FORGOT_PASSWORD";
	public static final String ABSENT = "ABSENT";*/
	public static final String DEFAULT_IMG_BYTES = "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";
}
