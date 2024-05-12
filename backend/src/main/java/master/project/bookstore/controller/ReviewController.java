package master.project.bookstore.controller;

import master.project.bookstore.dto.ReviewDto;
import master.project.bookstore.entity.Review;
import master.project.bookstore.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;
    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(ReviewController.class);

    @PostMapping
    public ResponseEntity<?> createReview(@RequestBody ReviewDto reviewDto) {
        try {
            Review review = reviewService.createReview(reviewDto);
            log.info("Review created");
            return ResponseEntity.ok(review);
        } catch (Exception e) {
            log.error("Error: ", e.getMessage());
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllReviews(){
        try {
            List<Review> reviews = reviewService.getReviews();
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            log.error("Error: ", e.getMessage());
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable Long reviewId) {
        try {
            reviewService.deleteReview(reviewId);
            log.info("Review with id " + reviewId + " successfully deleted.");
            return ResponseEntity.ok().body("Review deleted successfully");
        } catch (Exception e) {
            log.error("Error: ", e.getMessage());
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}
