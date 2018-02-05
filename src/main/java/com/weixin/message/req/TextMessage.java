package com.weixin.message.req;

import com.weixin.message.req.BaseMessage;

/**
 * 文本消息
 * 
 * @author zy
 * @date 2015-08-03
 */
public class TextMessage extends BaseMessage {
	// 消息内容
	private String Content;

	public String getContent() {
		return Content;
	}

	public void setContent(String content) {
		Content = content;
	}
}
