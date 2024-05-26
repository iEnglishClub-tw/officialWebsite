package idv.victor.config;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.CookieLocaleResolver;

import java.util.Locale;

/**
 * I18nConfigs 是一個配置類，用於配置應用程序的國際化支持。
 * 它包括消息資源和語言解析器的配置。
 */
@Configuration
public class I18nConfigs {

    /**
     * 配置消息資源。
     * 消息資源文件位於 "i18n/messages" 路徑，並使用 UTF-8 編碼。
     *
     * @return 配置了基礎名稱和編碼的 ResourceBundleMessageSource 實例
     */
    @Bean(name = "messageSource")
    public MessageSource messageSource() {
        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
        messageSource.setBasenames("i18n/messages");
        messageSource.setDefaultEncoding("UTF-8");
        return messageSource;
    }
}
