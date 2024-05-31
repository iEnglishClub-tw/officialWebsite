package idv.victor.config;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

import java.util.Locale;

/**
 * WebMvcConfig 是一個配置類，用於配置 Spring MVC 的相關設置。
 * 它包括語言解析器、語言切換攔截器及靜態資源處理。
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    /**
     * 配置默認的語言解析器。
     * 當請求中未包含語言信息時，設置默認語言為台灣中文 (zh_TW)。
     *
     * @return 設置了默認語言的 LocaleResolver 實例
     */
    @Bean
    public LocaleResolver localeResolver() {
        SessionLocaleResolver slr = new SessionLocaleResolver();
        slr.setDefaultLocale(Locale.TAIWAN);
        return slr;
    }

    /**
     * 配置語言切換攔截器。
     * 攔截器會檢查請求參數中的 "lang" 參數，並切換語言。
     *
     * @return 配置了參數名稱的 LocaleChangeInterceptor 實例
     */
    @Bean
    public LocaleChangeInterceptor localeChangeInterceptor() {
        LocaleChangeInterceptor lci = new LocaleChangeInterceptor();
        lci.setParamName("lang");
        return lci;
    }

    /**
     * 新增語言切換攔截器到攔截器註冊表中。
     * 攔截器會處理網站的語系切換。
     *
     * @param registry 攔截器註冊表
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(localeChangeInterceptor());
    }

    /**
     * 配置靜態資源處理。
     * 將 "/assets/**" 路徑的請求映射到 classpath 下的 "static" 目錄。
     *
     * @param registry 靜態資源註冊表
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/assets/**").addResourceLocations("classpath:/static/");
    }

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        // Do any additional configuration here
        return builder.build();
    }
}
