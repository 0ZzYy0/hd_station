package com.weixin.util;

import java.util.Date;
import java.util.Map;
import javax.servlet.ServletContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.weixin.pojo.Ticket;
import com.weixin.pojo.Token;

public class TokenThread implements Runnable {
	private static Logger log = LoggerFactory.getLogger(TokenThread.class);
	
	public ServletContext application;

	public static Token accessToken = null;
	
	public static Ticket jsTicket = null;
	
	public TokenThread(ServletContext application){
		this.application = application;
	}
	public void run() {
        while (true) {
            try {
            	Map<String, String> map = (Map) this.application.getAttribute("wxConfigMap");
            	
            	//Map applicationCache = new HashMap();
    			//applicationCache.put("accessToken", accessToken);
    			//applicationCache.put("accessToken_time", new Date());
    			//applicationCache.put("jsTicket", CommonUtil.getJSTicket(accessToken).getTicket());
            	
            	accessToken = CommonUtil.getToken(map.get("APPID"), map.get("APP_SECRECT"));
            	jsTicket = CommonUtil.getJSTicket(accessToken);
            	
            	//accessToken、accessToken获取时间、jsTicket放入application中
    			this.application.setAttribute("accessToken", accessToken);
    			this.application.setAttribute("accessToken_time", new Date());
    			this.application.setAttribute("jsTicket", jsTicket);
    			
                if (null != accessToken) {
                    log.info("获取access_token成功，有效时长{}秒 token:{}", accessToken.getExpiresIn(), accessToken.getAccessToken());
                    System.out.println(String.format("获取access_token成功，有效时长%s秒 token:%s", accessToken.getExpiresIn(), accessToken.getAccessToken()));
                    // 休眠7000秒
                    //Thread.sleep((accessToken.getExpiresIn() - 200) * 1000);
                    Thread.sleep((accessToken.getExpiresIn() - 200) * 1000);
                } else {
                    // 如果access_token为null，60秒后再获取    
                    Thread.sleep(60 * 1000);    
                }
            } catch (InterruptedException e) {
                try {    
                    Thread.sleep(60 * 1000);    
                } catch (InterruptedException e1) {
                    log.error("{}", e1);
                    System.out.println(String.format("获取access_token失败，%s",e1)); 
                }    
                log.error("{}", e);
                System.out.println(String.format("获取access_token失败，%s",e)); 
            }
        }
    }
}
