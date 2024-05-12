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

//    @PostMapping("/add")
//    public ResponseEntity<?> addToCart(@PathVariable String username, @RequestBody CartItemDto cartItemDto) {
//        if (!isUserAuthenticated(username)) {
//            return ResponseEntity.status(403).body("Access denied");
//        }
//
//        try {
//            Cart updatedCart = cartService.addToCart(username, cartItemDto.getTitle(), cartItemDto.getQuantity());
//            return ResponseEntity.ok(updatedCart);
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
//        }
//    }

    @PostMapping
    public ResponseEntity<?> addToCartByUserId(@PathVariable Long userId, @RequestBody CartItemDto cartItemDto) {
        String username = userService.getUserById(userId).getUsername();

        try {
            Cart updatedCart = cartService.addToCartByUserIdAndBookId(userId, cartItemDto.getBookId().longValue(), cartItemDto.getQuantity());
            return ResponseEntity.ok(updatedCart);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

//    @GetMapping("/get-cart")
//    public ResponseEntity<?> getCart(@PathVariable String username) {
//        if (!isUserAuthenticated(username)) {
//            return ResponseEntity.status(403).body("Access denied");
//        }
//
//        try {
//            Cart cart = userService.getCartByUsername(username);
//            return ResponseEntity.ok(cart);
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
//        }
//    }

    @GetMapping
    public ResponseEntity<?> getCartByUserId(@PathVariable Long userId) {
        String username = userService.getUserById(userId).getUsername();


        try {
            Cart cart = userService.getCartByUsername(username);
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
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
            return ResponseEntity.ok("Cart emptied successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    private boolean isUserAuthenticated(String username) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return username.equals(auth.getName());
    }
}
