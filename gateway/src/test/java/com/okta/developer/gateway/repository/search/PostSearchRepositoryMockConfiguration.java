package com.okta.developer.gateway.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of PostSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class PostSearchRepositoryMockConfiguration {

    @MockBean
    private PostSearchRepository mockPostSearchRepository;

}
