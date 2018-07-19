import java.io.IOException;
import java.math.BigInteger;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Locale;
import java.util.Random;
import java.util.concurrent.TimeUnit;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;

import com.diy.util.VEMSUtil;
import com.google.common.primitives.Longs;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

public class EncryptTest {

	public static void main(String args[]) throws Exception {
		Random rand = new Random();
		String str = String.format("%08d", rand.nextInt(10000));
		String plainText = str+"02-17-7C-5A-F7-E0"+str;
		System.out.println(plainText);
        SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd");
		Date date = new Date();
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.DATE, 380);
		String s = format.format(calendar.getTime());
		Date getDate = format.parse(s);
		long expireDateMili = getDate.getTime();
		byte[] expireDateMiliByte = Longs.toByteArray(expireDateMili);
		String expiryDateEncrypt = VEMSUtil.encodeBase64(expireDateMiliByte);
		
		byte[] decoded = VEMSUtil.decodeBase64(expiryDateEncrypt);
		long decodedDate = Longs.fromByteArray(decoded);
		
		System.out.println("decodedDate-->" + decodedDate);
		
		long currDate = System.currentTimeMillis();
		System.out.println("currDate-->" + currDate);
		long diffInMillies = Math.abs(decodedDate - currDate);
		long seconds = diffInMillies / 1000;
		long minutes = seconds / 60;
		long hours = minutes / 60;
		long days = hours / 24;
		String time = days + ":" + hours % 24 + ":" + minutes % 60 + ":" + seconds % 60;
		System.out.println("time" + time);
		// used to convert the time difference from long to days
		long diff = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
		System.out.println("diff-->" + diff);
		
		
		//String sText = plainText.substring(8, 25);
		//System.out.println(sText);
		SecretKey key = getSecretEncryptionKey();
		System.out.println(new String(key.getEncoded()));
		byte[] cipherText = encryptLisence(plainText, getDecryptionKey());
		System.out.println("Encrypted Text "+new String(cipherText));
		System.out.println("Encrypted Text (Hex Form):"+bytesToHex(cipherText));
		byte [] bytes = DatatypeConverter.parseHexBinary(bytesToHex(cipherText));
		System.out.println("Decrypted Text "+new String(bytes));
		//SecretKey decKey = getDecryptionKey(key.getEncoded());
		String dec= decryptLicense(cipherText, getDecryptionKey());
		System.out.println(dec);
	
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

	public static String encrypte(String password) {
		String key = "Bar12345Bar12345"; // 128 bit key
		// Create key and cipher
		Key aesKey = new SecretKeySpec(key.getBytes(), "AES");
		Cipher cipher;
		try {
			cipher = Cipher.getInstance("AES");
			// encrypt the text
			cipher.init(Cipher.ENCRYPT_MODE, aesKey);
			byte[] encrypted = cipher.doFinal(password.getBytes());
			return new String(encrypted);
		} catch (NoSuchAlgorithmException | NoSuchPaddingException | IllegalBlockSizeException | BadPaddingException
				| InvalidKeyException e) {
			e.printStackTrace();
		}
		return null;
	}

	public static String decrypte(String encPassword) {
		// decrypt the text
		String key = "Bar12345Bar12345"; // 128 bit key
		// Create key and cipher
		Key aesKey = new SecretKeySpec(key.getBytes(), "AES");
		Cipher cipher;
		try {
			cipher = Cipher.getInstance("AES");
			cipher.init(Cipher.DECRYPT_MODE, aesKey);
			String decrypted = new String(cipher.doFinal(encPassword.getBytes()));
			return decrypted;
		} catch (NoSuchAlgorithmException | NoSuchPaddingException | IllegalBlockSizeException | BadPaddingException
				| InvalidKeyException e) {
			e.printStackTrace();
		}
		return null;
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

	public static String md5Encrypt(String password) {
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			byte[] messageDigest = md.digest((password + "!@#$").getBytes());
			BigInteger number = new BigInteger(1, messageDigest);
			String hashtext = number.toString(16);
			// Now we need to zero pad it if you actually want the full 32
			// chars.
			while (hashtext.length() < 32) {
				hashtext = "0" + hashtext;
			}
			return hashtext;
		} catch (NoSuchAlgorithmException e) {
			throw new RuntimeException(e);
		}
	}
	//For License encryption
	
	 public static SecretKey getSecretEncryptionKey() throws Exception{

	        KeyGenerator generator = KeyGenerator.getInstance("AES");

	        generator.init(128); // The AES key size in number of bits

	        SecretKey secKey = generator.generateKey();
	        return secKey;

	    }
	 
	 public static SecretKey getDecryptionKey() {
		 String key = "1B¢8×ˆíÕHG_¿";
		 SecretKey secretKey = new SecretKeySpec(key.getBytes(), "AES");
		 return secretKey;
	}
	 
	    public static byte[] encryptLisence(String plainText, SecretKey key) throws Exception{

	        // AES defaults to AES/ECB/PKCS5Padding in Java 7
	    	
	        Cipher aesCipher = Cipher.getInstance("AES");

	        aesCipher.init(Cipher.ENCRYPT_MODE, key);

	        byte[] byteCipherText = aesCipher.doFinal(plainText.getBytes());

	        return byteCipherText;

	    }	     


	    public static String decryptLicense(byte[] byteCipherText, SecretKey key) throws Exception {

	        // AES defaults to AES/ECB/PKCS5Padding in Java 7

	        Cipher aesCipher = Cipher.getInstance("AES");

	        aesCipher.init(Cipher.DECRYPT_MODE, key);

	        byte[] bytePlainText = aesCipher.doFinal(byteCipherText);

	        return new String(bytePlainText);

	    }
	    
	    private static String  bytesToHex(byte[] hash) {	    	
	        return DatatypeConverter.printHexBinary(hash);

	    }
	    

}
