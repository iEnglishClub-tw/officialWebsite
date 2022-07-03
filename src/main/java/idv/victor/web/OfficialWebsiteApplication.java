package idv.victor.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages = "idv.victor")
@SpringBootApplication
public class OfficialWebsiteApplication {

	public static void main(String[] args) {
		SpringApplication.run(OfficialWebsiteApplication.class, args);
	}

}
