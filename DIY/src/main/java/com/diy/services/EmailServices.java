package com.diy.services;

import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import com.diy.model.hp.HPMsgObject;
import com.diy.util.DataUtil;

public class EmailServices {

	public static final String fromEmailId = "visioneeringtechnology@gmail.com";
	public static final String fromPassword = "visioneering123*";

	@SuppressWarnings("unchecked")
	public static void sendEmail(Map<String, Object> valueMap) {

		Session session = Session.getDefaultInstance(getProperties(), new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(fromEmailId, fromPassword);
			}
		});
		try {
			List<String> toEmails = (List<String>) valueMap.get("toEmails");
			List<String> ccEmails = (List<String>) valueMap.get("ccEmails");
			List<String> bccEmails = (List<String>) valueMap.get("bccEmails");
			InternetAddress[] toEmailIds = new InternetAddress[toEmails.size()];
			for (int i = 0; i < toEmails.size(); i++) {
				toEmailIds[i] = new InternetAddress(toEmails.get(i));
			}
			InternetAddress[] ccEmailIds = null;
			InternetAddress[] bccEmailIds = null;
			if (ccEmails != null && ccEmails.size() > 0) {
				ccEmailIds = new InternetAddress[ccEmails.size()];
				for (int i = 0; i < ccEmails.size(); i++) {
					ccEmailIds[i] = new InternetAddress(ccEmails.get(i));
				}
			}
			if (bccEmails != null && bccEmails.size() > 0) {
				bccEmailIds = new InternetAddress[bccEmails.size()];
				for (int i = 0; i < bccEmails.size(); i++) {
					bccEmailIds[i] = new InternetAddress(bccEmails.get(i));
				}
			}
			Transport.send(mailObject(valueMap, session, toEmailIds, ccEmailIds, bccEmailIds));
			System.out.println("Mail Sent Successfully");
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}

	public static Properties getProperties() {
		Properties prop = System.getProperties();
		prop.put("mail.smtp.host", "smtp.gmail.com");
		prop.put("mail.smtp.socketFactory.port", "465");
		prop.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
		prop.put("mail.smtp.auth", "true");
		prop.put("mail.smtp.port", "465");

		return prop;
	}

	public static Message mailObject(Map<String, Object> valueMap, Session session, InternetAddress[] toEmailIds, InternetAddress[] ccEmailIds, InternetAddress[] bccEmailIds) {
		Message msg = new MimeMessage(session);
		System.out.println("MAP : " + DataUtil.factory().msgTemplData.msdIdObjectMap());
		System.out.println("ID VALUE : " + String.valueOf(valueMap.get("msgTemplID")));
		HPMsgObject msgTempl = DataUtil.factory().msgTemplData.msdIdObjectMap().get(String.valueOf(valueMap.get("msgTemplID")));
		System.out.println("************** " + msgTempl);
		System.out.println("************** " + msgTempl.emailTmplStr);

		String genericTemp = DataUtil.factory().messageFormat(null, DataUtil.factory().readFile(DataUtil.GEN_MAIL_TEMPL, true), valueMap);
		System.out.println("GENERIC TEMP : " + genericTemp);
		String msgTemplate = DataUtil.factory().messageFormat(null, msgTempl.emailTmplStr, valueMap);
		System.out.println("************** " + msgTemplate);
		genericTemp = genericTemp.replace("#{bodyText}", msgTemplate);
		System.out.println("GENERIC TEMP : " + genericTemp);
		//		if (valueMap.containsKey("clientLogo")) {
		//			System.out.println("clientLogo : "+String.valueOf(valueMap.get("clientLogo")));
		//			genericTemp = genericTemp.replace("#{clientLogo}", String.valueOf(valueMap.get("clientLogo")));
		//		}
		if (valueMap.containsKey("clientAddress")) {
			genericTemp = genericTemp.replace("#{clientAddress}", String.valueOf(valueMap.get("clientAddress")));
		}
		if (valueMap.containsKey("privacyMessgae")) {
			genericTemp = genericTemp.replace("#{privacyMessgae}", String.valueOf(valueMap.get("privacyMessgae")));
		}
		System.out.println("GENERIC TEMPL : " + genericTemp);
		try {
			//			msg.setFrom(new InternetAddress("raghwendra.sharan@gmail.com", "Raghwendra"));
			msg.setRecipients(Message.RecipientType.TO, toEmailIds);
			if (ccEmailIds != null && ccEmailIds.length > 0) {
				msg.setRecipients(Message.RecipientType.CC, ccEmailIds);
			}
			if (bccEmailIds != null && bccEmailIds.length > 0) {
				msg.setRecipients(Message.RecipientType.BCC, bccEmailIds);
			}
			msg.setSubject(msgTempl.subject);
			//msg.setText(genericTemp);
			//msg.setContent(genericTemp, "text/html; charset=utf-8");
			MimeMultipart multipart = new MimeMultipart("related");
			BodyPart messageBodyPart = new MimeBodyPart();
			//String htmlText = "<H1>Hello</H1><img src=\"cid:image\">";
			messageBodyPart.setContent(genericTemp, "text/html");
			// add it
			multipart.addBodyPart(messageBodyPart);
			// second part (the image)
			messageBodyPart = new MimeBodyPart();
			DataSource fds = new FileDataSource(String.valueOf(valueMap.get("clientLogo")));
			messageBodyPart.setDataHandler(new DataHandler(fds));
			messageBodyPart.setHeader("Content-ID", "<image>");
			// add image to the multipart
			multipart.addBodyPart(messageBodyPart);
			// put everything together
			msg.setContent(multipart);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return msg;
	}
}