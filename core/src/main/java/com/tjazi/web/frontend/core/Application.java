package com.tjazi.web.frontend.core;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.tjazi")
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
