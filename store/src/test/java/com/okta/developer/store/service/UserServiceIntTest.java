package com.okta.developer.store.service;

import com.okta.developer.store.StoreApp;
import com.okta.developer.store.config.Constants;
import com.okta.developer.store.domain.User;
import com.okta.developer.store.repository.search.UserSearchRepository;
import com.okta.developer.store.repository.UserRepository;
import com.okta.developer.store.service.dto.UserDTO;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.junit4.SpringRunner;


import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

/**
 * Test class for the UserResource REST controller.
 *
 * @see UserService
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = StoreApp.class)
public class UserServiceIntTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    /**
     * This repository is mocked in the com.okta.developer.store.repository.search test package.
     *
     * @see com.okta.developer.store.repository.search.UserSearchRepositoryMockConfiguration
     */
    @Autowired
    private UserSearchRepository mockUserSearchRepository;

    private User user;

    @Before
    public void init() {
        userRepository.deleteAll();
        user = new User();
        user.setLogin("johndoe");
        user.setActivated(true);
        user.setEmail("johndoe@localhost");
        user.setFirstName("john");
        user.setLastName("doe");
        user.setImageUrl("http://placehold.it/50x50");
        user.setLangKey("en");
    }

    @Test
    public void assertThatAnonymousUserIsNotGet() {
        user.setId(Constants.ANONYMOUS_USER);
        user.setLogin(Constants.ANONYMOUS_USER);
        if (!userRepository.findOneByLogin(Constants.ANONYMOUS_USER).isPresent()) {
            userRepository.save(user);
        }
        final PageRequest pageable = PageRequest.of(0, (int) userRepository.count());
        final Page<UserDTO> allManagedUsers = userService.getAllManagedUsers(pageable);
        assertThat(allManagedUsers.getContent().stream()
            .noneMatch(user -> Constants.ANONYMOUS_USER.equals(user.getLogin())))
            .isTrue();
    }

}
