package com.originspark.drp.util;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class StringUtil {


    static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

    public static Date String2Date(String str) throws ParseException {
        return sdf.parse(str);
    }


    public static BigDecimal String2BigDecimal(String str) {
        return BigDecimal.valueOf(Double.parseDouble(str));
    }

    /**
     * 通过年月获取上一个月的年月
     * 
     * @param thisMonth="2014-02"/"2014-01"
     * @return "2014-01"/"2013-12"
     */
    public static String getPreMonth(String thisMonth) {

        String yearMonth[] = thisMonth.split("-");

        int month = Integer.parseInt(yearMonth[1]);
        if (month > 1) {
            return yearMonth[0] + "-" + String.format("%02d", month - 1);
        }

        int year = Integer.parseInt(yearMonth[0]);
        return (year - 1) + "-12";
    }
}
