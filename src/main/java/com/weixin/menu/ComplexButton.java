package com.weixin.menu;

import com.weixin.menu.Button;

/**
 * 复合类型的按钮
 * 
 * @author zy
 * @date 2015-08-03
 */
public class ComplexButton extends Button {
	private Button[] sub_button;

	public Button[] getSub_button() {
		return sub_button;
	}

	public void setSub_button(Button[] sub_button) {
		this.sub_button = sub_button;
	}
}
