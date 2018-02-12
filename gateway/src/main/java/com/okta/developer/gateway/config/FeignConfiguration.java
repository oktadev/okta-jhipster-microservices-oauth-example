package com.okta.developer.gateway.config;

import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableFeignClients(basePackages = "com.okta.developer.gateway")
public class FeignConfiguration {

}
