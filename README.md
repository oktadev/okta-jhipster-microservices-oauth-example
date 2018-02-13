# Hip Microservices with JHipster and OAuth

This example shows how to create a microservices architecture with [JHipster](http://www.jhipster.tech) and secure it using [Okta](https://developer.okta.com).

<!--
Please read [Develop a Microservices Architecture with JHipster and OAuth]() for a tutorial that shows you how to build this application.
-->

**Prerequisites:** [Java 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html),  [Node.js](https://nodejs.org/), and [Docker](https://docs.docker.com/install/).

> [Okta](https://developer.okta.com/) has Authentication and User Management APIs that reduce development time with instant-on, scalable user infrastructure. Okta's intuitive API and expert support make it easy for developers to authenticate, manage and secure users and roles in any application.

* [Getting Started](#getting-started)
* [Help](#help)
* [Links](#links)
* [License](#license)

## Getting Started

To install this example application, run the following commands:

```bash
git clone git@github.com:oktadeveloper/okta-jhipster-microservices-oauth-example.git
cd okta-jhipster-microservices-oauth-example
```

This will get a copy of the project installed locally. To build all the projects as Docker images, run the following command in the `gateway`, `blog`, and `store` directories:
 
```bash
mvn package -Pprod -DskipTests dockerfile:build
```

JHipster ships with [Keycloak](https://keycloak.org) configured for OAuth by default. To configure your apps to work with Okta, you'll first need to [create a free developer account](https://developer.okta.com/signup/). After doing so, you'll get your own Okta domain, that has a name like `https://dev-123456.oktapreview.com`. 

### Create an OIDC Application on Okta

Create an OIDC App in Okta to get a client ID and secret. This basically means you're "registering" your application with Okta. Log in to your Okta Developer account and navigate to **Applications** > **Add Application**. Click **Web** and click the **Next** button. Give the app a name you’ll remember (e.g., `JHipster Microservices`), and specify `http://localhost:8080` as a Base URI and `http://localhost:8080/login` as a Login Redirect URI. Click **Done** and make note of your client ID and client secret values.

In order for the roles coming from Okta to match the default roles in JHipster, you'll need to create them. Create a `ROLE_ADMIN` and `ROLE_USER` group (**Users** > **Groups** > **Add Group**) and add users to them. You can use the account you signed up with, or create a new user (**Users** > **Add Person**). Navigate to **API** > **Authorization Servers**, click the **Authorization Servers** tab and edit the default one. Click the **Claims** tab and **Add Claim**. Name it `roles`, and include it in the ID Token. Set the value type to `Groups` and set the filter to be a Regex of `.*`.

Set the values for your Okta authorization server, client ID, and client secret as environment variables.

```bash
export SECURITY_OAUTH2_CLIENT_ACCESS_TOKEN_URI="https://{yourOktaDomain}.com/oauth2/default/v1/token"
export SECURITY_OAUTH2_CLIENT_USER_AUTHORIZATION_URI="https://{yourOktaDomain}.com/oauth2/default/v1/authorize"
export SECURITY_OAUTH2_RESOURCE_USER_INFO_URI="https://{yourOktaDomain}.com/oauth2/default/v1/userinfo"
export SECURITY_OAUTH2_RESOURCE_TOKEN_INFO_URI="https://{yourOktaDomain}.com/oauth2/default/v1/introspect"
export SECURITY_OAUTH2_CLIENT_CLIENT_ID="{clientId}"
export SECURITY_OAUTH2_CLIENT_CLIENT_SECRET="{clientSecret}"
```

Then cd into the `docker-compose` directory and run:

```
docker-compose up -d
```

It can take a while to start all 14 containers, so now might be a good time to take a break, or go on a run. You can use Docker's [Kitematic](https://kitematic.com/) to watch the status of your images as they start. After all your containers are running, you should be able to log in with your credentials at `http://localhost:8080`.

## Links

This example uses the following libraries provided by open source:

* [JHipster](http://www.jhipster.tech)
* [Spring Security OAuth](http://projects.spring.io/spring-security-oauth/)

## Help

Please post any questions as comments on the [blog post](), or visit our [Okta Developer Forums](https://devforum.okta.com/). You can also email developers@okta.com if would like to create a support ticket.

## License

Apache 2.0, see [LICENSE](LICENSE).