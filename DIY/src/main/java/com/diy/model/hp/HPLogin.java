package com.diy.model.hp;

public class HPLogin {
	public String url;
	public String userId;
	public String dbRole;
	public String token = "123456789";
	public Long userKey;
	public String firstName;

	public HPLogin(String url, String userId) {
		super();
		this.url = url;
		this.userId = userId;		
	}

	@Override
	public String toString() {
		return "HPLogin [url=" + url + ", token=" + token + "]";
	}
	
}
