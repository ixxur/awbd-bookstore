package master.project.bookstore.service;

import master.project.bookstore.entity.*;
import master.project.bookstore.repository.BookRepository;
import master.project.bookstore.repository.CartItemRepository;
import master.project.bookstore.repository.CartRepository;
import master.project.bookstore.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CartServiceTest {
    @Mock
    private CartRepository cartRepository;

    @Mock
    private CartItemRepository cartItemRepository;

    @Mock
    private BookRepository bookRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private CartService cartService;

    @Test
    void testUserHasCart_WhenCartExists() {
        String username = "ana";
        when(cartRepository.findByUserUsername(username)).thenReturn(Optional.of(new Cart()));

        boolean result = cartService.userHasCart(username);

        assertTrue(result);
        verify(cartRepository).findByUserUsername(username);
    }

    @Test
    void testUserHasCart_WhenCartDoesNotExist() {
        String username = "user";
        when(cartRepository.findByUserUsername(username)).thenReturn(Optional.empty());

        boolean result = cartService.userHasCart(username);

        assertFalse(result);
        verify(cartRepository).findByUserUsername(username);
    }

    @Test
    void addToCartByUserIdAndBookId_BookNotFound() {
        // Given
        Long userId = 1L;
        Long bookId = 2L;
        int quantity = 3;
        when(userRepository.findById(userId)).thenReturn(Optional.of(new User()));
        when(bookRepository.findById(bookId)).thenReturn(Optional.empty());

        // When & Then
        assertThrows(RuntimeException.class, () -> cartService.addToCartByUserIdAndBookId(userId, bookId, quantity));
        verify(userRepository, times(1)).findById(userId);
        verify(bookRepository, times(1)).findById(bookId);
        verify(cartItemRepository, never()).findByCartIdAndBookId(any(), any());
        verify(cartItemRepository, never()).save(any());
    }
//    @Test
//    void testAddToCart_NewItem() throws Exception {
//        Long userId = 1L;
//        Long bookId = 1L;
//        int quantity = 1;
//
//        User user = new User();
//        user.setId(userId);
//        Cart cart = new Cart();
//        cart.setId(4L);
//        cart.setUser(user);
//        user.setCart(cart);
//
//        Book book = new Book();
//        book.setId(12L);
//        book.setStock(10);
//
//        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
//        when(bookRepository.findById(bookId)).thenReturn(Optional.of(book));
//        when(cartRepository.findByUserId(userId)).thenReturn(Optional.empty());
//
//        cart = cartService.addToCartByUserIdAndBookId(userId, bookId, quantity);
//
//        assertNotNull(cart);
//        verify(cartItemRepository).save(ArgumentMatchers.any(CartItem.class));
//    }

    @Test
    void testAddToCart_NewItem() throws Exception {
        Long userId = 1L;
        Long bookId = 1L;
        int quantity = 1;

        User user = new User();
        user.setId(userId);
        Cart cart = new Cart();
        cart.setId(4L);
        cart.setUser(user);
        user.setCart(cart);

        Book book = new Book();
        book.setId(bookId);
        book.setStock(10);
        book.setAuthor(new Author());
        book.setGenre(new Genre());

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(bookRepository.findById(bookId)).thenReturn(Optional.of(book));
        when(cartItemRepository.findByCartIdAndBookId(cart.getId(), bookId)).thenReturn(Optional.empty());
        when(cartItemRepository.save(any(CartItem.class))).thenAnswer(invocation -> invocation.getArguments()[0]);

        cart = cartService.addToCartByUserIdAndBookId(userId, bookId, quantity);

        assertNotNull(cart);
        assertEquals(user.getCart(), cart);

        ArgumentCaptor<CartItem> captor = ArgumentCaptor.forClass(CartItem.class);
        verify(cartItemRepository).save(captor.capture());

        CartItem savedCartItem = captor.getValue();
        assertNotNull(savedCartItem);
        assertEquals(cart.getId(), savedCartItem.getCart().getId());
        assertEquals(bookId, savedCartItem.getBook().getId());
        assertEquals(quantity, savedCartItem.getQuantity());
    }


    @Test
    void testAddToCart_QuantityExceedsStock() {
        Long userId = 1L;
        Long bookId = 1L;
        int quantity = 20;

        User user = new User();
        Book book = new Book();
        book.setStock(10);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(bookRepository.findById(bookId)).thenReturn(Optional.of(book));

        Exception exception = assertThrows(Exception.class, () -> {
            cartService.addToCartByUserIdAndBookId(userId, bookId, quantity);
        });

        String expectedMessage = "Requested quantity exceeds book stock";
        String actualMessage = exception.getMessage();

        assertTrue(actualMessage.contains(expectedMessage));
    }

    @Test
    void testEmptyCart_Successful() {
        String username = "ruxi";
        User user = new User();
        Cart cart = new Cart();

        when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));
        when(cartRepository.findByUserUsername(username)).thenReturn(Optional.of(cart));

        cartService.emptyCart(username);

        verify(cartItemRepository).deleteAllByCartId(cart.getId());
    }

    @Test
    void testEmptyCart_UserNotFound() {
        String username = "user1234";
        when(userRepository.findByUsername(username)).thenReturn(Optional.empty());

        Exception exception = assertThrows(UsernameNotFoundException.class, () -> {
            cartService.emptyCart(username);
        });

        String expectedMessage = "User not found";
        String actualMessage = exception.getMessage();

        assertTrue(actualMessage.contains(expectedMessage));
    }
}
