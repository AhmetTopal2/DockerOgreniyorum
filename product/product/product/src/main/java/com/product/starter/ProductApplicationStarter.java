package com.product.starter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = {"com.product"})
@EntityScan(basePackages = {"com.product"})
@ComponentScan(basePackages = {"com.product"})
public class ProductApplicationStarter {

	public static void main(String[] args) {
		SpringApplication.run(ProductApplicationStarter.class, args);
	}

}
