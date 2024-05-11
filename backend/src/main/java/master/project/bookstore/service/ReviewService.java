package master.project.bookstore.service;

import master.project.bookstore.dto.ReviewDto;
import master.project.bookstore.entity.Book;
import master.project.bookstore.entity.Order;
import master.project.bookstore.entity.Review;
import master.project.bookstore.entity.User;
import master.project.bookstore.repository.BookRepository;
import master.project.bookstore.repository.OrderRepository;
import master.project.bookstore.repository.ReviewRepository;
import master.project.bookstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;
    public Review createReview(ReviewDto reviewDto) {
        Book book = bookRepository.findByTitle(reviewDto.getBookTitle())
                .orElseThrow(() -> new RuntimeException("Book not found"));

        User user = userRepository.findByUsername(reviewDto.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Review review = new Review();
        review.setBook(book);
        review.setUser(user);
        review.setRating(reviewDto.getRating());
        review.setComment(reviewDto.getComment());
        review.setCreatedAt(new Date());

        return reviewRepository.save(review);
    }
    public Review addReviewToOrder(ReviewDto reviewDto) {
        Optional<Book> book = bookRepository.findById(reviewDto.getBookId().longValue());
//                .orElseThrow(() -> new RuntimeException("Book not found"));

        Optional<User> user = userRepository.findById(reviewDto.getUserId().longValue());
//                .orElseThrow(() -> new RuntimeException("User not found"));
        Order order = orderRepository.findByIdAndByUserId(reviewDto.getOrderId().longValue(), reviewDto.getUserId().longValue());

        Review review = new Review();
        if(book.isPresent() && user.isPresent() && order != null) {
            review.setBook(book.get());
            review.setUser(user.get());
            review.setRating(reviewDto.getRating());
            review.setComment(reviewDto.getComment());
            review.setCreatedAt(new Date());
        }

        return reviewRepository.save(review);
    }
    public List<Review> getReviewsByBookTitle(String title) {
        return reviewRepository.findByBookTitle(title);
    }
    public List<Review> getReviewsByBookId(Long bookId) { return reviewRepository.findByBookId(bookId);}
    public List<Review> getReviews() {
        return reviewRepository.findAll();
    }
    public void deleteReview(Long reviewId) {
        if (!reviewRepository.existsById(reviewId)) {
            throw new RuntimeException("Review not found with ID: " + reviewId);
        }
        reviewRepository.deleteById(reviewId);
    }
}
