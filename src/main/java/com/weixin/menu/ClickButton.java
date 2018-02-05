package com.weixin.menu;



import com.weixin.menu.Button;

/**
 * click类型的按钮
 * 
 * @author zy
 * @date 2015-08-03
 */
public class ClickButton extends Button {
	private String type;
	private String key;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}
}