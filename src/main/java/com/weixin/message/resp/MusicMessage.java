package com.weixin.message.resp;

import com.weixin.message.resp.BaseMessage;
import com.weixin.message.resp.Music;

/**
 * 音乐消息
 * 
 * @author zy
 * @date 2015-08-03
 */
public class MusicMessage extends BaseMessage {
	// 音乐
	private Music Music;

	public Music getMusic() {
		return Music;
	}

	public void setMusic(Music music) {
		Music = music;
	}
}
