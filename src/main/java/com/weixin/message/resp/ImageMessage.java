package com.weixin.message.resp;

import com.weixin.message.resp.BaseMessage;
import com.weixin.message.resp.Image;

/**
 * 图片消息
 * 
 * @author zy
 * @date 2015-08-03
 */
public class ImageMessage extends BaseMessage {
	// 图片
	private Image Image;

	public Image getImage() {
		return Image;
	}

	public void setImage(Image image) {
		Image = image;
	}
}
