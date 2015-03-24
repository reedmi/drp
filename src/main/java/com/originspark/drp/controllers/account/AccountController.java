package com.originspark.drp.controllers.account;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
// import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.originspark.drp.controllers.BaseController;
import com.originspark.drp.models.User;
import com.originspark.drp.service.account.AccountService;
import com.originspark.drp.util.Blowfish;

@Controller
@RequestMapping("account")
public class AccountController extends BaseController {

    @Autowired
    private AccountService service;

    private Logger logger = Logger.getLogger(AccountController.class);

    @RequestMapping(value = "login", method = RequestMethod.POST)
    public ModelAndView login(@RequestParam("username") String username, @RequestParam("password") String password, HttpSession session) {
        ModelAndView mav = new ModelAndView();
        Blowfish bf = new Blowfish();
        List<User> users = service.validate(username, password);
        if (users.size() == 0) {
            mav.setViewName("index");
            mav.addObject("msg", "该用户不存在!");
        } else {
            int i;
            for (i = 0; i < users.size(); i++) {
                if (bf.decryptString(users.get(i).getPassword()).equals(password)) {
                    User user = users.get(i);
                    // 将当前登录用户的信息存入session
                    session.setAttribute("user", user);
                    mav.setViewName("redirect:/main");
                    logger.info("用户 " + user.getName() + " 登录系统，时间：" + new Date());
                    return mav;
                }
            }
            if (i == users.size()) {
                mav.setViewName("index");
                mav.addObject("msg", "密码错误!");
            }
        }
        return mav;
    }

    @RequestMapping(value = "logout")
    public String logout(HttpServletRequest request) {
        request.getSession().invalidate();
        return "redirect:/index";
    }
}
