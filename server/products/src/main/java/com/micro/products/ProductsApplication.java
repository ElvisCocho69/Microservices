package com.micro.products;

import io.swagger.v3.oas.annotations.ExternalDocumentation;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditAwareImpl")
@OpenAPIDefinition(
		info = @Info(
				title = "Products microservice REST API Documentation",
				description = "API for managing products",
				version = "v1",
				contact = @Contact(
						name = "Edson",
						email = "edsonuj40@gmail.com",
						url = "https://www.sitioweb.com"
				),
				license = @License(
						name = "Apache 2.4",
						url = "https://www.sitioweb.com"
				)
		),
		externalDocs = @ExternalDocumentation(
				description = "API for managing products",
				url = "https://www.sitioweb.com/swagger-ui.html"
		)
)
public class ProductsApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProductsApplication.class, args);
	}

}