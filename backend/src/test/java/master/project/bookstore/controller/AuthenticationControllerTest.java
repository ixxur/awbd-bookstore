package master.project.bookstore.controller;
import com.fasterxml.jackson.databind.ObjectMapper;
import master.project.bookstore.dto.UserRegistrationDto;
import master.project.bookstore.entity.User;
import master.project.bookstore.exception.UserAlreadyExistsException;
import master.project.bookstore.service.UserService;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("h2")
public class AuthenticationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private UserService userService;
    @MockBean
    private BCryptPasswordEncoder passwordEncoder;

    @Before
    public void setUp() {
        passwordEncoder = new BCryptPasswordEncoder();
    }

    @InjectMocks
    private AuthenticationController authenticationController;

    @Test
    public void testRegisterUser_UserAlreadyExists() throws Exception {
        UserRegistrationDto registrationDto = new UserRegistrationDto();
        registrationDto.setEmail("user1@example.com");
        registrationDto.setUsername("user");
        registrationDto.setPassword("password");

        when(userService.registerNewUser("user1@example.com", "user", "password"))
                .thenThrow(UserAlreadyExistsException.class);

        mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(registrationDto)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Error: Username is already taken"));

        verify(userService, times(0)).registerNewUser(
                registrationDto.getEmail(),
                registrationDto.getUsername(),
                registrationDto.getPassword()
        );
    }

    @Test
    public void testAuthentication() throws Exception {
        String username = "user";

        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, Collections.emptyList());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = new User();
        user.setUsername(username);

        when(userService.findUserByUsername(username)).thenReturn(user);

        mockMvc.perform(get("/auth/login"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.parseMediaType("text/plain;charset=UTF-8")));
    }

    private String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
