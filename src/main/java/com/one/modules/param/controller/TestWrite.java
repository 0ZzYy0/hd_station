package com.one.modules.param.controller;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.Calendar;

public class TestWrite {
    public static String destDir = "E:\\dataCollect\\111";  
	public static int count = 0;
	public static void main(String[] args) throws Exception{
/*		// TODO Auto-generated method stub
		String fileName = "D:\\a.txt";
		try {
			FileWriter fw = new FileWriter(fileName);
			for(int i = 0;i<= 30000000;i++) {
				fw.write(i+"X,"+i+"Y"+"\r\n");
			}

			fw.close();
		}catch(Exception e) {
			
		}*/
		String realPath = "E:\\dataCollect\\通道8";
        File file = new File(realPath);  
        handleFile(file);
	}
	
    /** 
     * 遍历每一个文件... 
     * @param file 
     * @throws Exception 
     */  
    public static void handleFile(File file) throws Exception{  
        File[] files = file.listFiles();
        for(File f : files){  
            if(f.isDirectory()){  
                handleFile(f);  
            }else{
                copyFile(f);
                count++;
            }  
        }  
    }  
      
    /** 
     * 复制一个文件 
     * @param file 
     * @throws Exception 
     */  
    public static void copyFile(File file) throws Exception{  
      String oldFileName = file.getName();  
      Calendar now = Calendar.getInstance();  
      String mill = Long.toString(now.getTimeInMillis());
      String newFileName = mill + oldFileName;
        
      FileReader reader = new FileReader(file.getAbsolutePath());  
      FileWriter writer = new FileWriter(destDir + "\\" + newFileName);  
        
      int ch;  
      while((ch = reader.read()) != -1){  
          writer.write(ch);  
      }  

      writer.write(","+Integer.toString(count));
      
      reader.close();  
      writer.close();  

    } 

}
