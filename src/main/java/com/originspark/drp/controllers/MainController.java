package com.originspark.drp.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class MainController {

    @RequestMapping("index")
    public String index(){
        return "index";
    }
    
    @RequestMapping(value="main",method=RequestMethod.GET)
    public String main(){
        return "main";
    }
}
