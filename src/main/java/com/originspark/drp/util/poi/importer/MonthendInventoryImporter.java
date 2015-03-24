package com.originspark.drp.util.poi.importer;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.FormulaEvaluator;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;

import com.originspark.drp.models.projects.inventories.MonthendInventory;
import com.originspark.drp.models.resources.Ware;

public class MonthendInventoryImporter {

    public static List<MonthendInventory> importExcel(File input) throws Exception {

        List<MonthendInventory> monthendInventories = new ArrayList<MonthendInventory>();

        InputStream in = new FileInputStream(input);

        Workbook wb = WorkbookFactory.create(in);
        Sheet mainSheet = wb.getSheetAt(0);
        FormulaEvaluator evaluator = wb.getCreationHelper().createFormulaEvaluator();

        int rowLength = mainSheet.getLastRowNum();

        for (int i = 1; i <= rowLength; i++) {
            try {

                Row row = mainSheet.getRow(i);
                if (row == null) {
                    continue;
                }

                //读取excel信息
                String name = POICommon.getCellValueAsString(row.getCell(0), evaluator);
                String brand = POICommon.getCellValueAsString(row.getCell(1), evaluator);
                String model = POICommon.getCellValueAsString(row.getCell(2), evaluator);
                String unit = POICommon.getCellValueAsString(row.getCell(3), evaluator);
                Double inQuantity = POICommon.getCellValueAsNumber(row.getCell(4), evaluator);
                Double outQuantity = POICommon.getCellValueAsNumber(row.getCell(5), evaluator);
                Double balance = POICommon.getCellValueAsNumber(row.getCell(6), evaluator);

                //构造商品信息
                Ware ware = new Ware();
                ware.setName(name);
                ware.setBrand(brand);
                ware.setModel(model);
                ware.setUnit(unit);

                //构造月末盘点信息
                MonthendInventory inventory = new MonthendInventory();
                inventory.setWare(ware);
                inventory.setMonthIn(BigDecimal.valueOf(inQuantity));
                inventory.setMonthOut(BigDecimal.valueOf(outQuantity));
                inventory.setMonthLeft(BigDecimal.valueOf(balance));

                monthendInventories.add(inventory);

            } catch (Exception e) {
                // error
                continue;
            }
        }
        return monthendInventories;
    }


}
