package idv.victor.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * HomeController 是一個處理首頁及其他頁面請求的控制器。
 * 它處理首頁、常見問題頁面及日程查詢的請求。
 */
@Controller
@RequestMapping("/")
public class HomeController {

    @Autowired
    private MessageSource messageSource;

    /**
     * 處理首頁的 GET 請求，返回首頁模板。
     *
     * @return 首頁模板名稱 "index"
     */
    @RequestMapping(value = "", method = {RequestMethod.GET})
    public String homepage() {
        return "index";
    }

    /**
     * 處理常見問題頁面的 GET 請求，返回 FAQ 頁面模板。
     *
     * @return 常見問題頁面模板名稱 "FAQ"
     */
    @RequestMapping(value = "FAQ", method = {RequestMethod.GET})
    public String FAQPage() {
        return "FAQ";
    }

    /**
     * 處理日程查詢的 GET 和 POST 請求，根據請求參數返回日程數據。
     *
     * @param perpage 每頁顯示的日程數量
     * @return 返回查詢的日程數據（目前為空字串）
     * @deprecated
     */
    @RequestMapping(value = "showSchedule", method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public String queryFromCalendar(@RequestParam("perpage") int perpage) {
        return "";
    }
}
