package com.originspark.drp.util.poi.exporter;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.mutable.MutableInt;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;

import com.originspark.drp.models.resources.Vendor;
import com.originspark.drp.models.resources.Ware;


public class WareGenerator {

    /**
     * 生成商品表的excel
     * 
     * @param fileName 
     * @param wares 
     * @param resourcePath 代指目录/WebContent/resources
     * @return
     */
    public static File generate(String fileName,List<Ware> wares,String resourcePath){
        
        try {
            // Open excel template
            InputStream inp = new FileInputStream(FileUtils.getFile( resourcePath + "/document_templates/ware.xls"));

            Workbook wb = WorkbookFactory.create(inp);
            Sheet mainSheet = wb.getSheetAt(0);

            // This is used as a pointer
            MutableInt currentRow = new MutableInt(1);

            for (Ware ware : wares) {
                Row row = mainSheet.createRow(currentRow.intValue());
                row.createCell(0, Cell.CELL_TYPE_STRING).setCellValue(ware.getName());
                row.createCell(1, Cell.CELL_TYPE_STRING).setCellValue(ware.getBrand());
                row.createCell(2, Cell.CELL_TYPE_STRING).setCellValue(ware.getModel());
                row.createCell(3, Cell.CELL_TYPE_STRING).setCellValue(ware.getUnit());
                Vendor vendor = ware.getVendor();
                row.createCell(4, Cell.CELL_TYPE_STRING).setCellValue(vendor==null?"":vendor.getName());
                currentRow.increment();
            }

            File output = File.createTempFile(fileName, ".xls", new File(resourcePath + "/upload"));
            FileOutputStream fos = new FileOutputStream(output);
            wb.write(fos);
            fos.close();
            return output;
        } catch (Exception e) {
            return null;
        }
    }
}
