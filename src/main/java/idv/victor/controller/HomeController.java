package idv.victor.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

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

    @RequestMapping(value = "showSchedule", method = {RequestMethod.GET,RequestMethod.POST})
    @ResponseBody
    public String queryFromCalendar(@RequestParam("perpage") int perpage){
        return "" ;
    }

}
