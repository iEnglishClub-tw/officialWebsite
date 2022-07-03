package idv.victor.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/")
public class HomeController {
    @Autowired
    private MessageSource messageSource;
    @RequestMapping(value = "", method = {RequestMethod.GET})
    public String homepage(){
        return "index";
    }

    @RequestMapping(value = "FAQ", method = {RequestMethod.GET})
    public String FAQPage(){
        return "FAQ";
    }

}
