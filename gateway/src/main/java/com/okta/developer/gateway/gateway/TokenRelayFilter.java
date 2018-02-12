package com.okta.developer.gateway.gateway;

import com.okta.developer.gateway.security.oauth2.AuthorizationHeaderUtil;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import org.springframework.stereotype.Component;

@Component
public class TokenRelayFilter extends ZuulFilter {

    public static final String AUTHORIZATION_HEADER = "Authorization";

    @Override
    public Object run() {
        RequestContext ctx = RequestContext.getCurrentContext();
        // Add specific authorization headers for OAuth2
        if (AuthorizationHeaderUtil.getAuthorizationHeader().isPresent()) {
            ctx.addZuulRequestHeader(AUTHORIZATION_HEADER,
                AuthorizationHeaderUtil.getAuthorizationHeader().get());

        }
        return null;
    }

    @Override
    public boolean shouldFilter() {
        return true;
    }

    @Override
    public String filterType() {
        return "pre";
    }

    @Override
    public int filterOrder() {
        return 10000;
    }
}
