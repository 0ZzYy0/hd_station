package com.weixin.util;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.ezmorph.object.DateMorpher;
import net.sf.ezmorph.object.NumberMorpher;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.util.JSONUtils;

import org.apache.commons.beanutils.PropertyUtils;

public class JsonUtil {

	/**
	 * 将传入的list对象转换为JSON字符串
	 * @param list
	 * @return
	 */
	public static String parseArrayToJSONString(List list)
	{
		String jsonString = null;
		JSONArray ja = JSONArray.fromObject(list);
		jsonString = ja.toString();
		return jsonString;
	}
	/**
	 * 将传入的map对象转换为JSON字符串
	 * @param list
	 * @return
	 */
	public static String parseMapToJSONString(Map map)
	{
		String jsonString = null;
		JSONArray ja = JSONArray.fromObject(map);
		jsonString = ja.toString();
		return jsonString;
	}
	/**
	 * 将传入的map对象转换为JSON字符串
	 * @param list
	 * @return
	 */
	public static String parseObjectToJSONString(Object obj)
	{
		String jsonString = null;
		JSONArray ja = JSONArray.fromObject(obj);
		jsonString = ja.toString();
		return jsonString;
	}
	
	/**
	 * 将JSON字符串转换为指定对象list
	 * @param list
	 * @return
	 */
	public static Object parseJSONStringToBean(String jsonString, Class pojoClass){

		JSONArray jsonArray = JSONArray.fromObject(jsonString);
		JSONObject jsonObject;
		Object pojoValue;
		jsonObject = jsonArray.getJSONObject(0);
		pojoValue = JSONObject.toBean(jsonObject,pojoClass);
		return pojoValue;
	}
	/**
	 * 将JSON字符串转换为指定对象list
	 * @param list
	 * @return
	 */
	public static List parseJSONStringToArray(String jsonString, Class pojoClass){
		
		JSONArray jsonArray = JSONArray.fromObject(jsonString);
		JSONObject jsonObject;
		Object pojoValue;
		
		List list = new ArrayList();
		for ( int i = 0 ; i<jsonArray.size(); i++){
			jsonObject = jsonArray.getJSONObject(i);
			pojoValue = JSONObject.toBean(jsonObject,pojoClass);
			list.add(pojoValue);
		}
		return list;
	}
	/**
	 * 将JSON字符串转换为指定对象list,指定list对象类型
	 * @param list
	 * @return
	 */
	public static Map parseJSONStringToArray(String jsonString, Class pojoClass,Map classMap ){

		JSONArray jsonArray = JSONArray.fromObject(jsonString);
		JSONObject jsonObject;
		Object pojoValue;
		Map map = new HashMap();
		jsonObject = jsonArray.getJSONObject(0);
		pojoValue = JSONObject.toBean(jsonObject,pojoClass,classMap);
		map= (HashMap)pojoValue;
		
		return map;
	}
	/**
	 * 将JSON字符串转换为指定对象list
	 * @param list
	 * @return
	 * @throws ClassNotFoundException 
	 */
	public static List parseJSONStringToArray(String jsonString, String pojoClassName) throws ClassNotFoundException{

		if(jsonString!=null && !"".equals(jsonString)){
			JSONArray jsonArray = JSONArray.fromObject(jsonString);
			JSONObject jsonObject;
			Object pojoValue;
	
			List list = new ArrayList();
			for ( int i = 0 ; i<jsonArray.size(); i++){
				jsonObject = jsonArray.getJSONObject(i);
				pojoValue = JSONObject.toBean(jsonObject,Class.forName(pojoClassName));
				list.add(pojoValue);
			}
			return list;
		}else{
			return null;
		}
	}
	
	/**
	 * 将JSON字符串转换为指定对象list
	 * @param list
	 * @return
	 * @throws ClassNotFoundException 
	 * @throws NoSuchMethodException 
	 * @throws InvocationTargetException 
	 * @throws IllegalAccessException 
	 */
	public static Object getObjectFromJSONStringArray(String jsonString, String pojoClassName,String keyName,String keyValue,boolean getLast) throws ClassNotFoundException, IllegalAccessException, InvocationTargetException, NoSuchMethodException{
		if(jsonString!=null && !"".equals(jsonString)){
			try{
				JSONArray jsonArray = JSONArray.fromObject(jsonString);
				JSONObject jsonObject;
				Object pojoValue = null;
				for ( int i = 0 ; i<jsonArray.size(); i++){
					jsonObject = jsonArray.getJSONObject(i);
					Object returnPo = JSONObject.toBean(jsonObject,Class.forName(pojoClassName));
					Object value = PropertyUtils.getProperty(returnPo, keyName);
					String objValue = value.toString();
					if(keyValue.equals(objValue))
					{
						pojoValue = returnPo;
						if(!getLast)
							return returnPo;
					}
				}
				return pojoValue;
			}
			catch(Exception e)
			{
				return null;
			}
			
		}else{
			return null;
		}
	}
	public static void main(String args[])
	{
		try {
			Map ma =new HashMap();
			List a = new ArrayList();
			List list21  = new ArrayList();
			list21.add(1);
			list21.add(1);
			a.add(list21);
			ma.put("list21", list21);
			List list22  = new ArrayList();
			list22.add(1);
			list22.add(1);
			a.add(list22);
			ma.put("list22", list22);
			List list23  = new ArrayList();
			list23.add(1);
			list23.add(1);
			a.add(list23);
			ma.put("list23", list23);
			System.out.println(parseArrayToJSONString(a));
			System.out.println(parseMapToJSONString(ma));
			
		List list3  = new ArrayList();
		list3.add("3");
		list3.add("3");
		List list  = new ArrayList();
	//	list.add("1");
		
		Map map = new HashMap();
		map.put("1", list3);
		list.add(map);
		
		map = new HashMap();
		map.put("1", "map1");
		map.put("2", "map3");
		list.add(map);
		
		System.out.println(parseArrayToJSONString(list));
		List list2 = parseJSONStringToArray(parseArrayToJSONString(list),Map.class);
		for(int i=0;i<list2.size();i++){
			Object o = list2.get(i);
			System.out.println(o);
		}
		
		Map map2 = (HashMap)list2.get(1);
		System.out.println("1:"+map2.get("1"));
		System.out.println("1nul:"+map2.get(1));
		
		map2 = (HashMap)list2.get(0);
		System.out.println("2:"+map2.get("1"));
		System.out.println("2nul:"+map2.get(1));
		
		List list4 = (List)map2.get("1");
		System.out.println("list3:"+list3.get(0));
		
		list4 = (List)map2.get(1);
		System.out.println("list3null:"+list3.get(0));
		
		
//		JSONUtils.getMorpherRegistry().clear();
		JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(new String[] {"yyyy-MM-dd HH:mm:ss","yyyy-MM-dd"}) );		
		JSONUtils.getMorpherRegistry().registerMorpher(new NumberMorpher(Integer.class));
		JSONUtils.getMorpherRegistry().registerMorpher(new NumberMorpher(Long.class));
		JSONUtils.getMorpherRegistry().registerMorpher(new NumberMorpher(Double.class));
		String jsonStr = "[{\"processId\":\"f64b8046309cb69901309cd5e8770002\",\"enterUserId\":\"admin\",\"enterUserName\":\"?????\",\"productBoxId\":\"12\",\"PDate\":{\"month\":5,\"day\":5,\"year\":111,\"nanos\":0,\"seconds\":2,\"time\":1308301322000,\"date\":17,\"timezoneOffset\":0,\"hours\":9,\"minutes\":2},\"tableId\":\"\",\"remark\":\"\",\"processDirection\":1,\"statusNum\":6},{\"processId\":\"f64b8046309cb69901309cd75d350006\",\"enterUserId\":\"admin\",\"enterUserName\":\"?????\",\"productBoxId\":\"12\",\"PDate\":{\"month\":5,\"day\":5,\"year\":111,\"nanos\":0,\"seconds\":37,\"time\":1308301417000,\"date\":17,\"timezoneOffset\":0,\"hours\":9,\"minutes\":3},\"tableId\":\"\",\"remark\":\"\",\"processDirection\":-1,\"statusNum\":5},{\"processId\":\"f64b8046309c65b401309c68587e0002\",\"enterUserId\":\"admin\",\"enterUserName\":\"?????\",\"productBoxId\":\"12\",\"PDate\":{\"month\":5,\"day\":5,\"year\":111,\"nanos\":0,\"seconds\":22,\"time\":1308294142000,\"date\":17,\"timezoneOffset\":0,\"hours\":7,\"minutes\":2},\"tableId\":\"\",\"remark\":\"\",\"processDirection\":1,\"statusNum\":5},{\"processId\":\"f64b8046309c65b401309c6898750004\",\"enterUserId\":\"admin\",\"enterUserName\":\"?????\",\"productBoxId\":\"12\",\"PDate\":{\"month\":5,\"day\":5,\"year\":111,\"nanos\":0,\"seconds\":38,\"time\":1308294158000,\"date\":17,\"timezoneOffset\":0,\"hours\":7,\"minutes\":2},\"tableId\":\"\",\"remark\":\"\",\"processDirection\":0,\"statusNum\":5},{\"processId\":\"f64b8046309c65b401309c69195d0008\",\"enterUserId\":\"admin\",\"enterUserName\":\"?????\",\"productBoxId\":\"12\",\"PDate\":{\"month\":5,\"day\":5,\"year\":111,\"nanos\":0,\"seconds\":11,\"time\":1308294191000,\"date\":17,\"timezoneOffset\":0,\"hours\":7,\"minutes\":3},\"tableId\":\"\",\"remark\":\"\",\"processDirection\":1,\"statusNum\":6},{\"processId\":\"f64b8046309c65b401309c6af6a8000c\",\"enterUserId\":\"admin\",\"enterUserName\":\"?????\",\"productBoxId\":\"12\",\"PDate\":{\"month\":5,\"day\":5,\"year\":111,\"nanos\":0,\"seconds\":13,\"time\":1308294313000,\"date\":17,\"timezoneOffset\":0,\"hours\":7,\"minutes\":5},\"tableId\":\"\",\"remark\":\"\",\"processDirection\":-1,\"statusNum\":5},{\"processId\":\"f64b8046309c65b401309c6bea7e0010\",\"enterUserId\":\"admin\",\"enterUserName\":\"?????\",\"productBoxId\":\"12\",\"PDate\":{\"month\":5,\"day\":5,\"year\":111,\"nanos\":0,\"seconds\":16,\"time\":1308294376000,\"date\":17,\"timezoneOffset\":0,\"hours\":7,\"minutes\":6},\"tableId\":\"\",\"remark\":\"\",\"processDirection\":-1,\"statusNum\":4},{\"processId\":\"f64b8046309c65b401309c735aab0011\",\"enterUserId\":\"admin\",\"enterUserName\":\"?????\",\"productBoxId\":\"12\",\"PDate\":{\"month\":5,\"day\":5,\"year\":111,\"nanos\":0,\"seconds\":23,\"time\":1308294863000,\"date\":17,\"timezoneOffset\":0,\"hours\":7,\"minutes\":14},\"tableId\":\"\",\"remark\":\"\",\"processDirection\":1,\"statusNum\":5},{\"processId\":\"f64b804630b0bd3b0130b0e53730002d\",\"enterUserId\":\"admin\",\"enterUserName\":\"?????\",\"productBoxId\":\"12\",\"PDate\":{\"month\":5,\"day\":2,\"year\":111,\"seconds\":9,\"time\":1308637869000,\"date\":21,\"timezoneOffset\":0,\"hours\":6,\"minutes\":31},\"tableId\":\"\",\"remark\":\"\",\"processDirection\":1,\"statusNum\":6}]";
		
			Object obj = getObjectFromJSONStringArray(jsonStr,"com.hitzd.po.ProcessStatus","statusNum","6",true);
			System.out.println(obj);
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
