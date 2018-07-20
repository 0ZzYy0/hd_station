package com.one.modules.param.controller;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;

public class TestRead {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		List aa = new ArrayList();
		String fileName="E:\\data_1.txt";
		String line = "";
		try {
			BufferedReader fd = new BufferedReader(new FileReader(fileName));
			line = fd.readLine();
			while (line != null) {
				System.out.println(line);
				aa.add(line);
				line = fd.readLine();
			}
			fd.close();
		}catch(Exception e) {
			
		}
	}

}
