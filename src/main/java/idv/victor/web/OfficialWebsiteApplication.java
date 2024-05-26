package idv.victor.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * Spring Boot 主程式，可以從這邊執行網頁應用程式
 */
@ComponentScan(basePackages = "idv.victor")
@SpringBootApplication
public class OfficialWebsiteApplication {

	public static void main(String[] args) {
		SpringApplication.run(OfficialWebsiteApplication.class, args);
	}

}
