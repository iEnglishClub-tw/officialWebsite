package idv.victor.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;

/**
 * ErrorPageController 是一個處理網站錯誤頁面的控制器。
 * 它根據不同的 HTTP 狀態碼顯示相應的錯誤頁面。
 */
@Controller
public class ErrorPageController implements ErrorController {

    /**
     * 處理錯誤頁面的請求，根據 HTTP 狀態碼返回對應的錯誤頁面模板。
     *
     * @param request 當前的 HttpServletRequest 對象，用於獲取錯誤狀態碼
     * @return 錯誤頁面模板名稱
     */
    @RequestMapping(value = "/error")
    public String errorPagePath(HttpServletRequest request) {
        Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);

        if (status != null) {
            Integer statusCode = Integer.valueOf(status.toString());

            if (statusCode == HttpStatus.NOT_FOUND.value()) {
                return "errorPage-404";
            } else if (statusCode == HttpStatus.INTERNAL_SERVER_ERROR.value()) {
                return "errorPage-500";
            }
        }
        return "errorPage";
    }
}
