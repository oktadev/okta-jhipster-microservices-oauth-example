package com.okta.developer.store.security.oauth2;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.http.AccessTokenRequiredException;
import org.springframework.security.oauth2.client.resource.UserRedirectRequiredException;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class AuthorizationHeaderUtil {

    private final Logger log = LoggerFactory.getLogger(getClass());

    private final OAuth2RestTemplate oAuth2RestTemplate;

    public AuthorizationHeaderUtil(OAuth2RestTemplate oAuth2RestTemplate) {
		this.oAuth2RestTemplate = oAuth2RestTemplate;
	}

    public Optional<String> getAuthorizationHeaderFromOAuth2Context() {
        OAuth2AccessToken previousAccessToken = oAuth2RestTemplate.getOAuth2ClientContext().getAccessToken();
        if (previousAccessToken == null) {
            return Optional.empty();
        } else {
            OAuth2AccessToken accessToken;
            try {
                // Get the token from OAuth2ClientContext and refresh it if necessary
                accessToken = oAuth2RestTemplate.getAccessToken();
            } catch (UserRedirectRequiredException e) {
                // It's a refresh failure (because previous token wasn't null)
                // If it's an AJAX Request, this sends a 401 error
                throw new AccessTokenRequiredException("Refreshing access token failed",null);
            }

            String tokenType = accessToken.getTokenType();
            if (!StringUtils.hasText(tokenType)) {
                tokenType = OAuth2AccessToken.BEARER_TYPE;
            }
            String authorizationHeaderValue = String.format("%s %s", tokenType, accessToken.getValue());
            return Optional.of(authorizationHeaderValue);
        }
    }
}
