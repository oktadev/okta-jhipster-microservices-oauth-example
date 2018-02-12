package com.okta.developer.store.web.rest;

import com.okta.developer.store.domain.User;
import com.okta.developer.store.web.rest.errors.InternalServerErrorException;

import com.codahale.metrics.annotation.Timed;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.*;
import java.util.stream.Collectors;

/**
 * REST controller for managing the current user's account.
 */
@RestController
@RequestMapping("/api")
public class AccountResource {

    private final Logger log = LoggerFactory.getLogger(AccountResource.class);

    /**
     * GET  /authenticate : check if the user is authenticated, and return its login.
     *
     * @param request the HTTP request
     * @return the login if the user is authenticated
     */
    @GetMapping("/authenticate")
    @Timed
    public String isAuthenticated(HttpServletRequest request) {
        log.debug("REST request to check if the current user is authenticated");
        return request.getRemoteUser();
    }

    /**
     * GET  /account : get the current user.
     *
     * @param principal the current user; resolves to null if not authenticated
     * @return the current user
     * @throws InternalServerErrorException 500 (Internal Server Error) if the user couldn't be returned
     */
    @GetMapping("/account")
    @Timed
    @SuppressWarnings("unchecked")
    public User getAccount(Principal principal) {
        return Optional.ofNullable(principal)
            .filter(it -> it instanceof OAuth2Authentication)
            .map(it -> ((OAuth2Authentication) it).getUserAuthentication())
            .map(authentication -> {
                    Map<String, Object> details = (Map<String, Object>) authentication.getDetails();
                    Boolean activated = false;
                    if (details.get("email_verified") != null) {
                        activated = (Boolean) details.get("email_verified");
                    }
                    return new User(
                        authentication.getName(),
                        (String) details.get("given_name"),
                        (String) details.get("family_name"),
                        (String) details.get("email"),
                        (String) details.get("langKey"),
                        (String) details.get("picture"),
                        activated,
                        authentication.getAuthorities().stream()
                            .map(GrantedAuthority::getAuthority)
                            .collect(Collectors.toSet())
                    );
                }
            )
            .orElseThrow(() -> new InternalServerErrorException("User could not be found"));
    }
}
