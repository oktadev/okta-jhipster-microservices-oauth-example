package com.okta.developer.blog.domain;

import java.util.Set;

public class User {

    private final String login;

    private final String firstName;

    private final String lastName;

    private final String email;

    private final String langKey;

    private final String imageUrl;

    private final boolean activated;

    private final Set<String> authorities;

    public User(String login, String firstName, String lastName, String email, String langKey,
        String imageUrl, boolean activated, Set<String> authorities) {

        this.login = login;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.langKey = langKey;
        this.imageUrl = imageUrl;
        this.activated = activated;
        this.authorities = authorities;
    }

    public String getLogin() {
        return login;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getLangKey() {
        return langKey;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public boolean isActivated() {
        return activated;
    }

    public Set<String> getAuthorities() {
        return authorities;
    }
}
