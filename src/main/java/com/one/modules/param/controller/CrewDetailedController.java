package com.one.modules.param.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.one.common.utils.R;
import com.one.modules.param.service.StaParamService;

/**
 * 微信登录
 * 
 * @author cxt
 * @email 11298406119@qq.com
 * @date 2018年08月23日 下午1:15:31
 */
@Controller
@RequestMapping("crewDetailed")
public class CrewDetailedController {
	@Autowired
	private StaParamService staParamService;

	@ResponseBody
	@RequestMapping(value = "/getDetailed")
	public List<Map<String, Object>> getNewestDetailed(String deptId, String groupId) throws IOException {
		Map<String, Object> paraMap = new HashMap<String, Object>();
		paraMap.put("deptId", deptId);
		paraMap.put("groupId", groupId);
		List<Map<String, Object>> dataList = staParamService.getNewestDetailed(paraMap);
		return dataList;
	}
}
