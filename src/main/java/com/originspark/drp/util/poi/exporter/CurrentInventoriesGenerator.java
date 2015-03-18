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
import com.originspark.drp.web.models.projects.inventories.CurrentInventoryUI;
public class CurrentInventoriesGenerator {

    /**
     * 生成月末盘点表的excel
     * 
     * @param fileName 文件名：项目名称_系统名称_2014-02_月末盘点
     * @param inventories
     * @param resourcePath 代指目录/WebContent/resources
     * @return
     */
    public static File generate(String fileName, List<CurrentInventoryUI> inventories, String resourcePath) {

        try {
            // Open excel template
            InputStream inp = new FileInputStream(FileUtils.getFile(resourcePath + "/document_templates/currentInventory.xls"));

            Workbook wb = WorkbookFactory.create(inp);
            Sheet mainSheet = wb.getSheetAt(0);

            // This is used as a pointer
            MutableInt currentRow = new MutableInt(1);

            for (CurrentInventoryUI inventory : inventories) {
                Row row = mainSheet.createRow(currentRow.intValue());
                row.createCell(0, Cell.CELL_TYPE_STRING).setCellValue(inventory.getName());
                row.createCell(1, Cell.CELL_TYPE_STRING).setCellValue(inventory.getModel());
                row.createCell(2, Cell.CELL_TYPE_STRING).setCellValue(inventory.getUnit());
                row.createCell(3, Cell.CELL_TYPE_STRING).setCellValue(inventory.getIncount());
                row.createCell(4, Cell.CELL_TYPE_STRING).setCellValue(inventory.getOutcount() + "");
                row.createCell(5, Cell.CELL_TYPE_STRING).setCellValue(inventory.getRestcount() + "");
                row.createCell(6, Cell.CELL_TYPE_STRING).setCellValue(inventory.getIncome() + "");
                row.createCell(7, Cell.CELL_TYPE_STRING).setCellValue(inventory.getOutcome() + "");
                row.createCell(8, Cell.CELL_TYPE_STRING).setCellValue(inventory.getProfit() + "");
                currentRow.increment();
            }
            File dir = new File(resourcePath + "/upload");
            if (!dir.exists()) {
                dir.mkdir();
            }
            File output = File.createTempFile(fileName, ".xls", dir);
            FileOutputStream fos = new FileOutputStream(output);
            wb.write(fos);
            fos.close();
            return output;
        } catch (Exception e) {
            return null;
        }
    }
}
