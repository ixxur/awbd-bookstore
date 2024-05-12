package master.project.bookstore.controller;

import master.project.bookstore.dto.CartItemDto;
import master.project.bookstore.entity.Cart;
import master.project.bookstore.service.CartService;
import master.project.bookstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users/{userId}/cart")
public class CartController {
    @Autowired
    private CartService cartService;
    @Autowired
    private UserService userService;
    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(CartController.class);

    @PostMapping
    public ResponseEntity<?> addToCartByUserId(@PathVariable Long userId, @RequestBody CartItemDto cartItemDto) {
        String username = userService.getUserById(userId).getUsername();

        try {
            Cart updatedCart = cartService.addToCartByUserIdAndBookId(userId, cartItemDto.getBookId().longValue(), cartItemDto.getQuantity());
            log.info("Cart updated successfully");
            return ResponseEntity.ok(updatedCart);
        } catch (Exception e) {
            log.error("Error: ", e.getMessage());
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getCartByUserId(@PathVariable Long userId) {
        String username = userService.getUserById(userId).getUsername();

        try {
            Cart cart = userService.getCartByUsername(username);
            log.info("Cart successfully retrieved for user " + userId);
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            log.error("Error: ", e.getMessage());
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    @PostMapping("/empty")
    public ResponseEntity<?> emptyCart(@PathVariable Long userId) {
        try {
            String username = userService.getUserById(userId).getUsername();
            if (!isUserAuthenticated(username)) {
                return ResponseEntity.status(403).body("Access denied");
            }
            cartService.emptyCart(username);
            log.info("Cart emptied successfully for user "+ userId);
            return ResponseEntity.ok("Cart emptied successfully");
        } catch (Exception e) {
            log.error("Error: ", e.getMessage());
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    private boolean isUserAuthenticated(String username) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return username.equals(auth.getName());
    }
}
