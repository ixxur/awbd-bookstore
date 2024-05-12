package master.project.bookstore.controller;

import master.project.bookstore.dto.ReviewDto;
import master.project.bookstore.entity.Order;
import master.project.bookstore.entity.Review;
import master.project.bookstore.service.OrderService;
import master.project.bookstore.service.ReviewService;
import master.project.bookstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private UserService userService;
    @Autowired
    private ReviewService reviewService;
    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(OrderController.class);
    @PostMapping("users/{userId}/order")
    public ResponseEntity<?> createOrder(@PathVariable Long userId) {
        try {
            String username = userService.getUserById(userId).getUsername();
            Order order = orderService.createOrder(username);
            log.error("Order with id " + order.getId() + " successfully created");
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            log.error("Error: ", e.getMessage());
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getAllOrders() {
        try {
            List<Order> orders = orderService.getAllOrders();
            log.info("Orders retrieved for all users");
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            log.error("Error: ", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/users/{userId}/orders")
    public ResponseEntity<?> getOrders(@PathVariable Long userId) {
        String username  = userService.getUserById(userId).getUsername();

        try {
            List<Order> orders = orderService.getOrders(username);
            log.info("Orders retrieved successfully for user " + userId);
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            log.error("Error: ", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/users/{userId}/orders/{orderId}")
    public ResponseEntity<?> getOrder(@PathVariable Long userId, @PathVariable Long orderId) {
        String username  = userService.getUserById(userId).getUsername();
        if (!isUserAuthenticated(username)) {
            return ResponseEntity.status(403).body("Access denied");
        }
        try {
            Order order = orderService.getOrderByIdAndByUserId(orderId, userId);
            log.info("Order " + orderId + " retrieved successfully for user " + userId);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            log.error("Error: ", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/users/{userId}/orders/{orderId}/review")
    public ResponseEntity<?> addReview(@RequestBody ReviewDto reviewDto){
        try {
            String username = userService.getUserById(reviewDto.getUserId().longValue()).getUsername();
            if(!isUserAuthenticated(username)) return ResponseEntity.status(403).body("Access denied");

            Review review = reviewService.addReviewToOrder(reviewDto);
            return ResponseEntity.ok(review);
        } catch (Exception e){
            log.error("Error: ", e.getMessage());
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    private boolean isUserAuthenticated(String username) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return username.equals(auth.getName());
    }
}
