package master.project.bookstore.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import master.project.bookstore.service.ReviewService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@ExtendWith(MockitoExtension.class)
public class ReviewControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Mock
    private ReviewService reviewService;

    @InjectMocks
    private ReviewController reviewController;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(reviewController).build();
    }
    @Test
    @WithMockUser(username = "admin", roles = "ADMIN")
    void testDeleteReview_Admin_Success() throws Exception {
        Long reviewId = 1L;

        doNothing().when(reviewService).deleteReview(reviewId);

        mockMvc.perform(delete("/reviews/" + reviewId))
                .andExpect(status().isOk())
                .andExpect(content().string("Review deleted successfully"));

        verify(reviewService).deleteReview(reviewId);
    }
}
