package com.weixin.util;

public class ConfigUtil {
	/**
	 * 服务号相关信息 114.215.171.5
	 */
//	 public final static String APPID = "wx7aca3939a74adfc1";//服务号的应用号
//	 public final static String APP_SECRECT = "f9ca4dbfa62697efbd38c42a2e39f9f2";//服务号的应用密码
	 
	 public final static String APPID = "wx0578448073d08b5d";//服务号的应用号
	 public final static String APP_SECRECT = "0aa3fcd0feebb0b42ac64860bd57507c";//服务号的应用密码
	 
	 public final static String TOKEN = "weixin";//服务号的配置token
	 public final static String MCH_ID = "1253947701";//商户号
	 public final static String API_KEY = "192006250b4c09247ec02edce69f6a2d";//API密钥
	 public final static String SIGN_TYPE = "MD5";//签名加密方式
	 public final static String CERT_PATH = "C:/cert/apiclient_cert.p12";//微信支付证书存放路径地址
	//微信支付统一接口的回调action
	 public final static String NOTIFY_URL = "http://www.yami168.com/web/ask_doctor/micro_consultation_room/paySuccessAction.do";
	//微信支付成功支付后跳转的地址
	 public final static String SUCCESS_URL = "http://114.215.171.5/web/ask_doctor/micro_consultation_room/paySuccess.do";
	 //oauth2授权时回调action
	 public final static String REDIRECT_URI = "http://14.117.25.80:8016/GoMyTrip/a.jsp?port=8016";
	/**
	 * 微信基础接口地址
	 */
	 //获取token接口(GET)
	 public final static String TOKEN_URL = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET";
	 //oauth2授权接口(GET)
	 public final static String OAUTH2_URL = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code";
	 //刷新access_token接口（GET）
	 public final static String REFRESH_TOKEN_URL = "https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=APPID&grant_type=refresh_token&refresh_token=REFRESH_TOKEN";
	// 菜单创建接口（POST）
	 public final static String MENU_CREATE_URL = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN";
	// 菜单查询（GET）
	 public final static String MENU_GET_URL = "https://api.weixin.qq.com/cgi-bin/menu/get?access_token=ACCESS_TOKEN";
	// 菜单删除（GET）
	public final static String MENU_DELETE_URL = "https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=ACCESS_TOKEN";
	/**
	 * 微信支付接口地址
	 */
	//微信支付统一接口(POST)
	public final static String UNIFIED_ORDER_URL = "https://api.mch.weixin.qq.com/pay/unifiedorder";
	//微信退款接口(POST)
	public final static String REFUND_URL = "https://api.mch.weixin.qq.com/secapi/pay/refund";
	//订单查询接口(POST)
	public final static String CHECK_ORDER_URL = "https://api.mch.weixin.qq.com/pay/orderquery";
	//关闭订单接口(POST)
	public final static String CLOSE_ORDER_URL = "https://api.mch.weixin.qq.com/pay/closeorder";
	//退款查询接口(POST)
	public final static String CHECK_REFUND_URL = "https://api.mch.weixin.qq.com/pay/refundquery";
	//对账单接口(POST)
	public final static String DOWNLOAD_BILL_URL = "https://api.mch.weixin.qq.com/pay/downloadbill";
	//短链接转换接口(POST)
	public final static String SHORT_URL = "https://api.mch.weixin.qq.com/tools/shorturl";
	//接口调用上报接口(POST)
	public final static String REPORT_URL = "https://api.mch.weixin.qq.com/payitil/report";
	
	/**
	 * 微信图片接口
	 */
	public final static String IMG_DOWN_URL = "http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=ACCESS_TOKEN&media_id=MEDIA_ID";
}
