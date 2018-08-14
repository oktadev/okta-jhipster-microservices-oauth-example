package com.okta.developer.blog.config;

import org.springframework.boot.autoconfigure.security.oauth2.resource.AuthoritiesExtractor;
import org.springframework.boot.autoconfigure.security.oauth2.resource.PrincipalExtractor;
import org.springframework.boot.autoconfigure.security.oauth2.resource.ResourceServerProperties;
import org.springframework.boot.autoconfigure.security.oauth2.resource.UserInfoTokenServices;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.okta.developer.blog.security.oauth2.CachedUserInfoTokenServices;
import com.okta.developer.blog.security.oauth2.SimpleAuthoritiesExtractor;
import com.okta.developer.blog.security.oauth2.SimplePrincipalExtractor;

@Configuration
public class OAuth2TokenServicesConfiguration {

    private static final String OAUTH2_PRINCIPAL_ATTRIBUTE = "preferred_username";
    private static final String OAUTH2_AUTHORITIES_ATTRIBUTE = "roles";

    private final ResourceServerProperties resourceServerProperties;

	public OAuth2TokenServicesConfiguration(ResourceServerProperties resourceServerProperties) {
		this.resourceServerProperties = resourceServerProperties;
	}

    @Bean
    public UserInfoTokenServices userInfoTokenServices(PrincipalExtractor principalExtractor, AuthoritiesExtractor authoritiesExtractor) {
        UserInfoTokenServices userInfoTokenServices =
            new CachedUserInfoTokenServices(resourceServerProperties.getUserInfoUri(), resourceServerProperties.getClientId());

        userInfoTokenServices.setPrincipalExtractor(principalExtractor);
        userInfoTokenServices.setAuthoritiesExtractor(authoritiesExtractor);
        return userInfoTokenServices;
    }
    @Bean
    public PrincipalExtractor principalExtractor() {
        return new SimplePrincipalExtractor(OAUTH2_PRINCIPAL_ATTRIBUTE);
    }

    @Bean
    public AuthoritiesExtractor authoritiesExtractor() {
        return new SimpleAuthoritiesExtractor(OAUTH2_AUTHORITIES_ATTRIBUTE);
    }
}
