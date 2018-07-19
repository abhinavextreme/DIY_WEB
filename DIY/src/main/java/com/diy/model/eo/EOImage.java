package com.diy.model.eo;

import java.io.File;
import java.io.IOException;
import java.util.Map;

import javax.imageio.stream.FileImageOutputStream;
import javax.imageio.stream.ImageOutputStream;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

import com.diy.services.DBServices;
import com.diy.util.VEMSUtil;

/**
 * EO Image Entity - saving image into db and write into file
 * @author Sunil Rai
 *
 */

@Entity
@Table(name = "EOIMAGE")
@SequenceGenerator(name = "EOIMAGE_SEQ", initialValue = 1, allocationSize = 1, sequenceName = "EOIMAGE_SEQ")
@JsonIgnoreProperties("detail")
public class EOImage extends EOObject {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "EOIMAGE_SEQ")
	@Column(name = "PRIMARY_KEY")
	public long primaryKey;

	@Column(name = "ENTITY_NAME")
	public String entityName;

	@Column(name = "IMAGE_URL")
	public String imageUrl;
	
	@Column(name = "TYPE")
	public String type;

	@Column(name = "HEADER_PK")
	public Long headerPk;

	@Column(name = "IMAGE_DETAIL")
	public byte[] detail;

	@Column(name = "SAVE_NO")
	public int saveNo = 0;

	//public String imageStorePath =  System.getProperty("user.dir")+seperator+"src"+seperator+"main"+seperator+"resources"+seperator+"data"+seperator+"img";
	//public String imageStorePath = "D:\\dataTFD\\img";
	public String imageStorePath = System.getProperty( "catalina.base" )+seperator+"webapps"+seperator+"ImgData";
	public static final String seperator = System.getProperty("file.separator");
	
	public EOImage(){}
	
	public static EOImage createEO(Map<String, Object> map) {
		String detailStr = map.get("detail").toString(); 
		String detail = detailStr.substring(detailStr.indexOf(',') + 1);
		map.remove("detail");
		map.put("detail",detail);
		String typee = filterType((String)map.get("type"));
		map.put("type", typee);
		DBServices.create(EOObject.createObject(map));
		System.out.println("Object Created");
		EOImage eoImage = (EOImage)EOObject.getLatestObject("EOImage");
		eoImage.postSave(eoImage);
		return eoImage;
	}
	
	public EOImage update(Map<String, Object> map) {
		String detailStr = map.get("detail").toString();
		String detail = detailStr.substring(detailStr.indexOf(',') + 1);
		map.remove("detail");
		map.put("detail", detail);
		String typee = map.get("type")==null?"":filterType((String)map.get("type"));
		map.put("type", typee);
		DBServices.update(EOObject.updateObject(this, map));
		System.out.println("Object updated");
		this.postSave(this);
		return this;
	}

	public void uploadImage(int saveNo) {
		System.out.println("-----------UPLOAD IMAGE-----------");
		try {
			if (this.detail != null) {
				//BufferedImage imag = ImageIO.read(new ByteArrayInputStream(this.detail));								
				this.imageUrl = this.imageName();
		        String relativePath = this.imageStorePath+seperator+this.imageUrl;
				File imageFIle = new File(relativePath);
				File parentDir = imageFIle.getParentFile();
			        if(! parentDir.exists()) {
			        	parentDir.mkdirs();
			        }
			    // convert byte array back to BufferedImage
				String byts = new String(this.detail);
				byte [] decoded = VEMSUtil.decodeBase64(byts);
				ImageOutputStream out = new FileImageOutputStream(new File(relativePath));
				out.write(decoded);
				out.close();
				
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public String imgUrl() {
		return this.imageStorePath + this.imageUrl;
	}

	public String imageName() {
		if(type != null && "doc".equals(type)){
			return this.entityName + "_" + this.primaryKey + "_" + this.saveNo + ".doc";
		}
		if(type != null && "docx".equals(type)){
			return this.entityName + "_" + this.primaryKey + "_" + this.saveNo + ".docx";
		}
		if(type != null && "pdf".equals(type)){
			System.err.println("WORKIMG :::::: "+this.entityName + "_" + this.primaryKey + "_" + this.saveNo + ".pdf");
			return this.entityName + "_" + this.primaryKey + "_" + this.saveNo + ".pdf";
		}
		else
		return this.entityName + "_" + this.primaryKey + "_" + this.saveNo + ".png";
	}
	
	public static String filterType(String type) {
		if(type != null && "application/msword".equals(type)){
			return "doc";
		}
		if(type != null && "application/vnd.openxmlformats-officedocument.wordprocessingml.document".equals(type)){
			return "docx";
		}
		if(type != null && "application/pdf".equals(type)){
			return "pdf";
		}
		return "png";
	}
	
	public void postSave(EOImage eoImage) {
		System.out.println("In POST SAVE");
		super.postSave();
		eoImage.saveNo++;
		eoImage.uploadImage(eoImage.saveNo);
		eoImage.postCreate(eoImage);
	}

	public void postSaveWithoutCommit() {
		super.postSave();
		this.saveNo++;
		this.uploadImage(this.saveNo);
	}

	public byte[] getDecodedDetail() {
		if (this.detail == null) {
			return new byte[0];
		}
		return VEMSUtil.decodeBase64(new String(this.detail));
	}

}
