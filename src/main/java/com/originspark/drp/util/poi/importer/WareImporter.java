package com.originspark.drp.util.poi.importer;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.FormulaEvaluator;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;

import com.originspark.drp.models.resources.Vendor;
import com.originspark.drp.models.resources.Ware;

public class WareImporter {

    public static List<Ware> importExcel(File input) throws Exception {
        
        List<Ware> wares = new ArrayList<Ware>();

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

                String name = POICommon.getCellValueAsString(row.getCell(0), evaluator);
                String brand = POICommon.getCellValueAsString(row.getCell(1), evaluator);
                String model = POICommon.getCellValueAsString(row.getCell(2), evaluator);
                String unit = POICommon.getCellValueAsString(row.getCell(3), evaluator);
                String vendorName = POICommon.getCellValueAsString(row.getCell(4), evaluator);
                
                Ware ware = new Ware();
                ware.setName(name);
                ware.setBrand(brand);
                ware.setModel(model);
                ware.setUnit(unit);
                
                if(vendorName != null && !vendorName.trim().equals("")){
                    Vendor vendor =new Vendor();
                    vendor.setName(vendorName);
                    ware.setVendor(vendor);
                }
                
                wares.add(ware);
                
            } catch (Exception e) {
                // error
                continue;
            }
        }
        return wares;
    }

}
