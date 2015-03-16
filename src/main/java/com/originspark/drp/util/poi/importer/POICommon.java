package com.originspark.drp.util.poi.importer;


import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.FormulaEvaluator;

public class POICommon {

    public static double getCellValueAsNumber(Cell cell, FormulaEvaluator evaluator) {
        if (cell == null) {
            return 0;
        } else if (cell.getCellType() == Cell.CELL_TYPE_NUMERIC) {
            return cell.getNumericCellValue();
        } else if (cell.getCellType() == Cell.CELL_TYPE_FORMULA) {
            return evaluator.evaluate(cell).getNumberValue();
        } else if (cell.getCellType() == Cell.CELL_TYPE_STRING) {
            try {
                return Double.parseDouble(cell.getStringCellValue().trim());
            } catch (Exception e) {
                //Logger.error("Parse cell value to double failed " + cell.getStringCellValue(), e);
            }
        }
        return 0;
    }

    public static String getCellValueAsString(Cell cell, FormulaEvaluator evaluator) {
        if (cell == null) {
            return "";
        } else if (cell.getCellType() == Cell.CELL_TYPE_NUMERIC) {
            return cell.getNumericCellValue() + "";
        } else if (cell.getCellType() == Cell.CELL_TYPE_FORMULA) {
            return evaluator.evaluate(cell).getNumberValue() + "";
        } else if (cell.getCellType() == Cell.CELL_TYPE_STRING) {
            return cell.getStringCellValue().trim();
        }
        return "";
    }
}