package com.one.mobile.login.controller;


import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.one.common.utils.ConfigConstant;
import com.one.mobile.login.config.WxStorageConfig;
import com.one.modules.sys.entity.SysUserEntity;
import com.one.modules.sys.service.SysConfigService;
import com.one.modules.sys.service.SysUserService;
import com.one.modules.sys.shiro.ShiroUtils;
import com.weixin.pojo.SNSUserInfo;
import com.weixin.pojo.WeixinOauth2Token;
import com.weixin.util.AdvancedUtil;

/**
 * 微信登录
 * 
 * @author zy
 * @email 553224182@qq.com
 * @date 2016年11月10日 下午1:15:31
 */
@Controller
public class SysMobileLoginController {
	
	@Autowired
	private SysUserService sysUserService;
    @Autowired
    private SysConfigService sysConfigService;
    
    private final static String KEY = ConfigConstant.WX_CONFIG_KEY;
    
	/**
	 * 用户授权登录业务处理
	 */
	@RequestMapping(value = "oAuth2")
	public String oAuth2(HttpServletResponse response,HttpServletRequest request)throws IOException {

		System.out.println("--------------------------oAuth2授权------------------------------");
		WxStorageConfig config = sysConfigService.getConfigObject(KEY, WxStorageConfig.class);

		String appid = config.getAppId();
		String appsecret = config.getAppSecrect();
		//String oAuth2Url = config.getoAuth2Url();
		
		if(!"".equals(appid) && !"".equals(appsecret)){
			String code = request.getParameter("code");
			if (code != null && !"".equals(code)){
				WeixinOauth2Token weixinOauth2Token = AdvancedUtil.getOauth2AccessToken(appid, appsecret, code);
				if(weixinOauth2Token!=null){
					String accessToken = weixinOauth2Token.getAccessToken();
					String openId = weixinOauth2Token.getOpenId();
					SNSUserInfo snsUserInfo = AdvancedUtil.getSNSUserInfo(accessToken, openId);

					if(snsUserInfo != null){
						SysUserEntity user = sysUserService.queryByUserName(openId);
						
						if(user != null){
							//用户存在
							Subject subject = ShiroUtils.getSubject();
							UsernamePasswordToken token = new UsernamePasswordToken(openId, "123456");
							subject.login(token);
						}else{
							//用户不存在
							//新增用户
							Subject subject = ShiroUtils.getSubject();
							UsernamePasswordToken token = new UsernamePasswordToken(openId, "123456");
							subject.login(token);
						}
					}
				}
			}
		}
		//跳转至患者首页
		return "redirect:modules/mobile/home.html";
		
	}
	
	
	/**
	 * 绑定
	 */
/*	@ResponseBody
	@RequestMapping(value = "/bindDoc")
	public R bindDoc(HttpServletResponse response,HttpServletRequest request,String username, String password)throws IOException {
		
		try{
			Subject subject = ShiroUtils.getSubject();
			UsernamePasswordToken token = new UsernamePasswordToken(username, password);
			subject.login(token);
		}catch (UnknownAccountException e) {
			return R.error(e.getMessage());
		}catch (IncorrectCredentialsException e) {
			return R.error("账号或密码不正确");
		}catch (LockedAccountException e) {
			return R.error("账号已被锁定,请联系管理员");
		}catch (AuthenticationException e) {
			return R.error("账户验证失败");
		}
		SNSUserInfo snsUserInfo = (SNSUserInfo) ShiroUtils.getSession().getAttribute("snsUserInfo");
		
		ShiroUtils.getUserEntity().setOpenId(snsUserInfo.getOpenId());
		ShiroUtils.getUserEntity().setNickName(snsUserInfo.getNickname());
		ShiroUtils.getUserEntity().setHeadImgUrl(snsUserInfo.getHeadImgUrl());
		
		SysUserEntity user = ShiroUtils.getUserEntity();
		
		sysUserService.updateWxInfo(user);
		return R.ok();
	}*/
}
