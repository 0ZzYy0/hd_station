package com.one.modules.param.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

public class Test {

	public static void main(String[] args) {
		String returnStr = "";	
		Map<String,List> resultMap = new HashMap<String,List>();
		List<String> xList = new ArrayList<String>();
		List<Map> yList = new ArrayList<Map>();

		List<String> yList1 = new ArrayList<String>();
		List<String> yList2 = new ArrayList<String>();
		Map<String,List> yMap1 = new HashMap<String,List>();
		Map<String,List> yMap2 = new HashMap<String,List>();
		String str = "0.000000,0.000922,1,0;0.010000,-0.000922,1,1;0.020000,-0.000614,1,2;0.030000,0.001382,1,3;0.000000,0.000922,2,0;0.010000,-0.000922,2,1;0.020000,-0.000614,2,2;0.030000,0.001382,2,3";
		String[] strList = str.split(";");
		for (int i=0;i<strList.length;i++) {
			String temp = strList[i];
			String[] tempArray = temp.split(",");

			xList.add(tempArray[0]);
			switch (tempArray[2]) {
			case "1":
				yList1.add(tempArray[1]);
				break;
			case "2":
				yList2.add(tempArray[1]);
				break;
				
			default:
				break;
			}
		}
		
		yMap1.put("yList1",yList1);
		yMap2.put("yList2",yList2);
		yList.add(yMap1);
		yList.add(yMap2);
		
		resultMap.put("dataX", xList);
		resultMap.put("dataY", yList);
		JSONObject data = JSONObject.fromObject(resultMap);
		returnStr = data.toString();
		System.out.println(returnStr);
		// TODO Auto-generated method stub
//		List<Map> paramList = new ArrayList<Map>();
//		for (int i=0;i<=6;i++) {
//			Map<String,String> map = new HashMap<String,String>();
//			map.put("isTarget", Integer.toString(i));
//			paramList.add(map);
//		}
//		
//		String returnStr = "";
//		List<List> returnList = new ArrayList<List>();
//		Map<String,List> resultMap = new HashMap<String,List>();
//		
//		for (int i= 0;i<paramList.size();i++) {
//			List<Map> tempList = new ArrayList<Map>();
//			
//			Map<String,String> paramStartMap = new HashMap<String,String>();
//			Map<String,String> paramEndmap = new HashMap<String,String>();
//			
//			Map<String,String> startMap = new HashMap<String,String>();
//			Map<String,String> endMap = new HashMap<String,String>();
//		    
//			paramStartMap = paramList.get(i);
//			if (i == (paramList.size()-1)) {
//				while (paramList.size() % 2 == 0) {
//					paramEndmap = paramList.get(i+1);
//				}
//			} else {
//				paramEndmap = paramList.get(i+1);
//			}
//
//			startMap.put("name","目标");
//			startMap.put("xAxis",paramStartMap.get("isTarget"));
//		    if (!paramEndmap.isEmpty()) {
//		    	endMap.put("xAxis",paramEndmap.get("isTarget"));
//		    }
//		    
//		    tempList.add(startMap);
//		    tempList.add(endMap); 
//		    
//		    returnList.add(tempList);
//		    i++;
//		}
//
// 	    resultMap.put("sign", returnList);
//		JSONObject data = JSONObject.fromObject(resultMap);
//		returnStr = data.toString();
//		
//		System.out.println(returnStr);
	}

}
