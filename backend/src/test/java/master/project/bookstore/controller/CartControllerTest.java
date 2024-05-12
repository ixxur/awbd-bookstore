package master.project.bookstore.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import master.project.bookstore.entity.Cart;
import master.project.bookstore.entity.User;
import master.project.bookstore.dto.CartItemDto;
import master.project.bookstore.service.CartService;
import master.project.bookstore.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CartControllerTest {
    private MockMvc mockMvc;

    @InjectMocks
    private CartController cartController;

    @Mock
    private SecurityContext securityContext;
    @Mock
    private UserService userService;
    @Mock
    private CartService cartService;
    @Mock
    private ObjectMapper objectMapper;
    @Mock
    private Authentication authentication;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(cartController).build();
        SecurityContextHolder.setContext(securityContext);
        objectMapper = new ObjectMapper();
    }

    @Test
    public void addToCartByUserId_AuthenticatedUser_Success() throws Exception {
        Long userId = 1L;
        String username = "user";
        String password = "user";
        String email = "user1@example.com";
        String role = "ROLE_USER";
        CartItemDto cartItemDto = new CartItemDto();
        cartItemDto.setBookId(1);
        cartItemDto.setQuantity(1);
        cartItemDto.setTitle("Lalaland");

        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn(username);
        when(userService.getUserById(userId)).thenReturn(new User(username, password, email, role));

        mockMvc.perform(post("/users/" + userId + "/cart")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(cartItemDto)))
                .andExpect(status().isOk());

        verify(cartService).addToCartByUserIdAndBookId(userId, cartItemDto.getBookId().longValue(), cartItemDto.getQuantity());
    }

    @Test
    public void addToCartByUserId_NonAuthenticatedUser_AccessDenied() throws Exception {
        Long userId = 1L;
        String username = "user";
        String password = "user";
        String email = "user1@example.com";
        String role = "ROLE_USER";
        CartItemDto cartItemDto = new CartItemDto();
        cartItemDto.setBookId(1);
        cartItemDto.setQuantity(1);
        cartItemDto.setTitle("Lalaland");

        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn(username);
        when(userService.getUserById(userId)).thenReturn(new User("nonExistentUser", password, email, role));

        mockMvc.perform(post("/users/" + userId + "/cart")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(cartItemDto)))
                .andExpect(status().isForbidden())
                .andExpect(content().string("Access denied"));

        verifyNoInteractions(cartService);
    }

    @Test
    public void getCartByUserId_AuthenticatedUser_Success() throws Exception {
        Long userId = 1L;
        String username = "user";
        String password = "user";
        String email = "user1@example.com";
        String role = "ROLE_USER";
        Cart cart = new Cart();
        cart.setId(1L);
        User user = new User(username, password, email, role);
        cart.setUser(user);
        user.setCart(cart);

        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn(username);
        when(userService.getUserById(userId)).thenReturn(user);

        mockMvc.perform(get("/users/" + userId + "/cart")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(cart)))
                .andExpect(status().isOk());
    }

    @Test
    public void getCartByUserId_NonAuthenticatedUser_AccessDenied() throws Exception {
        Long userId = 1L;
        String username = "unauthenticatedUser";

        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn(username);
        when(userService.getUserById(userId)).thenReturn(new User("user", "password", "email@example.com", "ROLE_USER"));

        mockMvc.perform(get("/users/" + userId + "/cart"))
                .andExpect(status().isForbidden())
                .andExpect(content().string("Access denied"));
    }
}
