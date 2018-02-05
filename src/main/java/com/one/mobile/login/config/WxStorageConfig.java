package com.one.mobile.login.config;

import java.io.Serializable;

/**
 * 微信配置信息
 * @author zy
 * @email 553224182@qq.com
 * @date 2017-03-25 16:12
 */
public class WxStorageConfig implements Serializable {
    private static final long serialVersionUID = 1L;

    private String appId;

    private String appSecrect;
    
    private String oAuth2Url;

	public String getAppId() {
		return appId;
	}

	public void setAppId(String appId) {
		this.appId = appId;
	}

	public String getAppSecrect() {
		return appSecrect;
	}

	public void setAppSecrect(String appSecrect) {
		this.appSecrect = appSecrect;
	}

	public String getoAuth2Url() {
		return oAuth2Url;
	}

	public void setoAuth2Url(String oAuth2Url) {
		this.oAuth2Url = oAuth2Url;
	}
    
    

}
