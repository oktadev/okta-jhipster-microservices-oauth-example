package com.okta.developer.store.config;

import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableFeignClients(basePackages = "com.okta.developer.store")
public class FeignConfiguration {

}
