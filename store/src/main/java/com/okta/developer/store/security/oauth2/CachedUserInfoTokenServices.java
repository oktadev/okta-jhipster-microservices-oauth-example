package com.okta.developer.store.security.oauth2;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.security.oauth2.resource.UserInfoTokenServices;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.common.exceptions.InvalidTokenException;
import org.springframework.security.oauth2.provider.OAuth2Authentication;

public class CachedUserInfoTokenServices extends UserInfoTokenServices {

    private final Logger log = LoggerFactory.getLogger(UserInfoTokenServices.class);

    public CachedUserInfoTokenServices(String userInfoEndpointUrl, String clientId) {
        super(userInfoEndpointUrl, clientId);
    }

    @Override
    @Cacheable("oAuth2Authentication")
    public OAuth2Authentication loadAuthentication(String accessToken) throws AuthenticationException, InvalidTokenException {
        log.debug("Getting user information from OpenID Connect server");
        return super.loadAuthentication(accessToken);
    }
}
