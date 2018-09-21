package com.okta.developer.blog.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of BlogSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class BlogSearchRepositoryMockConfiguration {

    @MockBean
    private BlogSearchRepository mockBlogSearchRepository;

}
