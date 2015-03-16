package com.originspark.drp.util.json;

import java.io.IOException;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.module.SimpleModule;

public class Jackson {

	private static ObjectMapper mapper = new ObjectMapper();
	private static SimpleModule module = new SimpleModule();

	static {
		module.addSerializer(BigDecimal.class, new CombinedPriceSerializer());
		mapper.registerModule(module);
		mapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
	}
	
	public static String toJson(Object obj) {
        try {
            return mapper.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
        	System.out.println("==========Jackson exception==========");
        	e.printStackTrace();
            return null;
        }
    }

}

//所有的关于价格的信息都会保留两位有效数字
// http://stackoverflow.com/questions/11319445/java-to-jackson-json-serialization-money-fields
class CombinedPriceSerializer extends JsonSerializer<BigDecimal> {
	@Override
	public void serialize(BigDecimal value, JsonGenerator jgen,
			SerializerProvider provider) throws IOException,
			JsonProcessingException {
		jgen.writeString(value.setScale(2, BigDecimal.ROUND_HALF_UP).toString());
	}
}
