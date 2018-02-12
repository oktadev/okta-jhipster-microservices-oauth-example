package com.okta.developer.blog.client;

import com.okta.developer.blog.security.oauth2.AuthorizationHeaderUtil;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;

public class TokenRelayRequestInterceptor implements RequestInterceptor {

    public static final String AUTHORIZATION = "Authorization";

    @Override
    public void apply(RequestTemplate template) {
        if (AuthorizationHeaderUtil.getAuthorizationHeader().isPresent()) {
            template.header(AUTHORIZATION, AuthorizationHeaderUtil.getAuthorizationHeader().get());
        }
    }
}
