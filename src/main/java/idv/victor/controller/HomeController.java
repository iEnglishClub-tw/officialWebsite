package idv.victor.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.Objects;

/**
 * HomeController 是一個處理首頁及其他頁面請求的控制器。
 * 它處理首頁、常見問題頁面及日程查詢的請求。
 */
@Controller
@RequestMapping("/")
public class HomeController {

    @Autowired
    private MessageSource messageSource;

    @Value("${google.calendar.id}")
    private String calendarId;

    @Value("${google.calendar.apikey}")
    private String apiKey;

    @Autowired
    private RestTemplate restTemplate;

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
     * @param page 每頁顯示的日程數量
     * @param size
     * @param pageToken
     * @return 返回查詢的日程數據（目前為空字串）
     * @deprecated
     */
    @RequestMapping(value = "/api/events", method = {RequestMethod.GET})
    @ResponseBody
    public Map<String, Object> queryFromCalendar(@RequestParam int page,
        @RequestParam int size,
        @RequestParam(required = false) String pageToken) {
        LocalDate startDate = LocalDate.now();
        LocalDate endDate = startDate.plusYears(1).minusDays(1);

        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'");
        String startDateTime = startDate.atStartOfDay().format(dateTimeFormatter);
        String endDateTime = endDate.atTime(23, 59, 59).format(dateTimeFormatter);

        String url = "https://www.googleapis.com/calendar/v3/calendars/" + calendarId + "/events"
                     + "?key=" + apiKey
                     + "&timeMin=" + startDateTime
                     + "&timeMax=" + endDateTime
                     + "&maxResults=" + size
                     + (pageToken != null ? "&pageToken=" + pageToken : "")
                     + "&orderBy=startTime&singleEvents=true";

        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
        return response.getBody();
    }
}
