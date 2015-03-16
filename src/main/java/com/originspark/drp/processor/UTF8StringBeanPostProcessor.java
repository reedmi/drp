package com.originspark.drp.processor;
import java.nio.charset.Charset;  
import java.util.ArrayList;  
import java.util.List;  
  
import org.springframework.beans.BeansException;  
import org.springframework.beans.factory.config.BeanPostProcessor;  
import org.springframework.http.MediaType;  
import org.springframework.http.converter.StringHttpMessageConverter;  
  
public class UTF8StringBeanPostProcessor implements BeanPostProcessor {  
  
    @Override  
    public Object postProcessAfterInitialization(Object bean, String beanName)  
            throws BeansException {  
        if(bean instanceof StringHttpMessageConverter){    
            MediaType mediaType = new MediaType("text", "plain", Charset.forName("UTF-8"));    
            List<MediaType> types = new ArrayList<MediaType>();    
            types.add(mediaType);    
            ((StringHttpMessageConverter) bean).setSupportedMediaTypes(types);    
        }    
        return bean;  
    }  
  
    @Override  
    public Object postProcessBeforeInitialization(Object bean, String beanName)  
            throws BeansException {  
        // do nothing  
        return bean;  
    }  
  
}  