package com.weixin.menu;

import com.weixin.menu.Button;

/**
 * view类型的按钮
 * 
 * @author zy
 * @date 2015-08-03
 */
public class ViewButton extends Button {
	private String type;
	private String url;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
}
