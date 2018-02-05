package com.weixin.util;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.ConnectException;
import java.net.URL;
import java.security.MessageDigest;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;
import java.util.Random;
import java.util.Set;
import java.util.SortedMap;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;

import net.sf.json.JSONException;
import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.weixin.pojo.Ticket;
import com.weixin.pojo.Token;

/**
 * 通用工具类
 * 
 * @author zy
 * @date 2015-08-03
 */
public class CommonUtil {
	private static Logger log = LoggerFactory.getLogger(CommonUtil.class);

	// 凭证获取（GET）
	public final static String token_url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET";
	// JSAPI凭证获取（GET）
	public final static String js_ticket_url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=APPTOKEN&type=jsapi";
	 public static String httpsRequestS(String requestUrl, String requestMethod, String outputStr) {
         try {
             // 创建SSLContext对象，并使用我们指定的信任管理器初始化
            TrustManager[] tm = { new MyX509TrustManager() };
             SSLContext sslContext = SSLContext.getInstance("SSL", "SunJSSE");
             sslContext.init(null, tm, new java.security.SecureRandom());
             // 从上述SSLContext对象中得到SSLSocketFactory对象
            SSLSocketFactory ssf = sslContext.getSocketFactory();
             URL url = new URL(requestUrl);
             HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
             conn.setSSLSocketFactory(ssf);
             conn.setDoOutput(true);
             conn.setDoInput(true);
             conn.setUseCaches(false);
             // 设置请求方式（GET/POST）
            conn.setRequestMethod(requestMethod);
             conn.setRequestProperty("content-type", "application/x-www-form-urlencoded");
             // 当outputStr不为null时向输出流写数据
            if (null != outputStr) {
                 OutputStream outputStream = conn.getOutputStream();
                 // 注意编码格式
                outputStream.write(outputStr.getBytes("UTF-8"));
                 outputStream.close();
             }
             // 从输入流读取返回内容
            InputStream inputStream = conn.getInputStream();
             InputStreamReader inputStreamReader = new InputStreamReader(inputStream, "utf-8");
             BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
             String str = null;
             StringBuffer buffer = new StringBuffer();
             while ((str = bufferedReader.readLine()) != null) {
                 buffer.append(str);
             }
             // 释放资源
            bufferedReader.close();
             inputStreamReader.close();
             inputStream.close();
             inputStream = null;
             conn.disconnect();
             return buffer.toString();
         } catch (ConnectException ce) {
             log.error("连接超时：{}", ce);
         } catch (Exception e) {
             log.error("https请求异常：{}", e);
         }
         return null;
     }
	/**
	 * 发送https请求
	 * 
	 * @param requestUrl
	 *            请求地址
	 * @param requestMethod
	 *            请求方式（GET、POST）
	 * @param outputStr
	 *            提交的数据
	 * @return JSONObject(通过JSONObject.get(key)的方式获取json对象的属性值)
	 */
	public static JSONObject httpsRequest(String requestUrl,
			String requestMethod, String outputStr) {
		JSONObject jsonObject = null;
		try {
			// 创建SSLContext对象，并使用我们指定的信任管理器初始化
			TrustManager[] tm = { new MyX509TrustManager() };
			SSLContext sslContext = SSLContext.getInstance("SSL", "SunJSSE");
			sslContext.init(null, tm, new java.security.SecureRandom());
			// 从上述SSLContext对象中得到SSLSocketFactory对象
			SSLSocketFactory ssf = sslContext.getSocketFactory();

			URL url = new URL(requestUrl);
			HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
			conn.setSSLSocketFactory(ssf);

			conn.setDoOutput(true);
			conn.setDoInput(true);
			conn.setUseCaches(false);
			// 设置请求方式（GET/POST）
			conn.setRequestMethod(requestMethod);

			// 当outputStr不为null时向输出流写数据
			if (null != outputStr) {
				OutputStream outputStream = conn.getOutputStream();
				// 注意编码格式
				outputStream.write(outputStr.getBytes("UTF-8"));
				outputStream.close();
			}

			// 从输入流读取返回内容
			InputStream inputStream = conn.getInputStream();
			InputStreamReader inputStreamReader = new InputStreamReader(
					inputStream, "utf-8");
			BufferedReader bufferedReader = new BufferedReader(
					inputStreamReader);
			String str = null;
			StringBuffer buffer = new StringBuffer();
			while ((str = bufferedReader.readLine()) != null) {
				buffer.append(str);
			}

			// 释放资源
			bufferedReader.close();
			inputStreamReader.close();
			inputStream.close();
			inputStream = null;
			conn.disconnect();
			jsonObject = JSONObject.fromObject(buffer.toString());
		} catch (ConnectException ce) {
			log.error("连接超时：{}", ce);
		} catch (Exception e) {
			log.error("https请求异常：{}", e);
		}
		return jsonObject;
	}

	/**
	 * 获取接口访问凭证
	 * 
	 * @param appid
	 *            凭证
	 * @param appsecret
	 *            密钥
	 * @return
	 */
	public static Token getToken(String appid, String appsecret) {
		Token token = null;
		String requestUrl = token_url.replace("APPID", appid).replace(
				"APPSECRET", appsecret);
		// 发起GET请求获取凭证
		JSONObject jsonObject = httpsRequest(requestUrl, "GET", null);

		if (null != jsonObject) {
			try {
				token = new Token();
				token.setAccessToken(jsonObject.getString("access_token"));
				token.setExpiresIn(jsonObject.getInt("expires_in"));
			} catch (JSONException e) {
				token = null;
				// 获取token失败
				log.error("获取token失败 errcode:{} errmsg:{}",
						jsonObject.getInt("errcode"),
						jsonObject.getString("errmsg"));
			}
		}
		return token;
	}

	/**
	 * URL编码（utf-8）
	 * 
	 * @param source
	 * @return
	 */
	public static String urlEncodeUTF8(String source) {
		String result = source;
		try {
			result = java.net.URLEncoder.encode(source, "utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return result;
	}

	/**
	 * 根据内容类型判断文件扩展名
	 * 
	 * @param contentType
	 *            内容类型
	 * @return
	 */
	public static String getFileExt(String contentType) {
		String fileExt = "";
		if ("image/jpeg".equals(contentType))
			fileExt = ".jpg";
		else if ("audio/mpeg".equals(contentType))
			fileExt = ".mp3";
		else if ("audio/amr".equals(contentType))
			fileExt = ".amr";
		else if ("video/mp4".equals(contentType))
			fileExt = ".mp4";
		else if ("video/mpeg4".equals(contentType))
			fileExt = ".mp4";
		return fileExt;
	}

	/**
	 * 获取接口访问凭证
	 * 
	 * @param appid
	 *            凭证
	 * @param appsecret
	 *            密钥
	 * @return
	 */
	public static Ticket getJSTicket(Token token) {
		Ticket jsticket = null;
		String requestUrl = js_ticket_url.replace("APPTOKEN",
				token.getAccessToken());
		// 发起GET请求获取凭证
		JSONObject jsonObject = httpsRequest(requestUrl, "GET", null);

		if (null != jsonObject) {
			try {
				jsticket = new Ticket();
				jsticket.setTicket(jsonObject.getString("ticket"));
				jsticket.setExpiresIn(jsonObject.getInt("expires_in"));
			} catch (JSONException e) {
				jsticket = null;
				// 获取token失败
				log.error("获取token失败 errcode:{} errmsg:{}",
						jsonObject.getInt("errcode"),
						jsonObject.getString("errmsg"));
			}
		}
		return jsticket;
	}

	public static String getRandomString(int length) {
		StringBuffer buffer = new StringBuffer(
				"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
		StringBuffer sb = new StringBuffer();
		Random random = new Random();
		int range = buffer.length();
		for (int i = 0; i < length; i++) {
			sb.append(buffer.charAt(random.nextInt(range)));
		}
		return sb.toString();
	}

	private static String byteArrayToHexString(byte b[]) {
		StringBuffer resultSb = new StringBuffer();
		for (int i = 0; i < b.length; i++)
			resultSb.append(byteToHexString(b[i]));
		return resultSb.toString();

	}

	private static String byteToHexString(byte b) {
		int n = b;
		if (n < 0)
			n += 256;
		int d1 = n / 16;
		int d2 = n % 16;
		return hexDigits[d1] + hexDigits[d2];
	}

	public static String MD5Encode(String origin, String charsetname) {
		String resultString = null;
		try {
			resultString = new String(origin);
			MessageDigest md = MessageDigest.getInstance("MD5");
			if (charsetname == null || "".equals(charsetname))
				resultString = byteArrayToHexString(md.digest(resultString
				.getBytes()));
			else
				resultString = byteArrayToHexString(md.digest(resultString
				.getBytes(charsetname)));

		} catch (Exception exception) {
		}
		return resultString;
	}
	
	/***
	 * 获取微信配置信息
	 * @param filePath
	 * @return Map
	 */
	public static Map getConfig(String filePath) {
		HashMap<String,String> map=new HashMap();
		try {
			Properties config = new Properties();
			if(filePath.indexOf("%20")!=-1)
				filePath = filePath.replaceAll("%20", " ");
			FileInputStream fis = new FileInputStream(filePath);
			config.load(fis);
			for(Object key : config.keySet()){
				map.put((String)key, (String)config.get(key));
			}
			fis.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return map;
	}	
	
	private static final String hexDigits[] = { "0", "1", "2", "3", "4", "5",
	"6", "7", "8", "9", "a", "b", "c", "d", "e", "f" };
	


}