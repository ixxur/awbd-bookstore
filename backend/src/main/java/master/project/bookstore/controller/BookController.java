package master.project.bookstore.controller;

import master.project.bookstore.entity.Book;
import master.project.bookstore.entity.Review;
import master.project.bookstore.service.BookService;
import master.project.bookstore.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/books")
public class BookController {
    @Autowired
    private BookService bookService;
    @Autowired
    private ReviewService reviewService;

    @GetMapping()
    public ResponseEntity<Page<Book>> getAllBooks(@RequestParam(defaultValue = "0") int pageNumber,
                                                  @RequestParam(defaultValue = "10") int pageSize,
                                                  @RequestParam(defaultValue = "title") String sortBy) {
        Page<Book> books = bookService.getAllBooks(pageNumber, pageSize, sortBy);
        return ResponseEntity.ok().body(books);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<List<Book>> addBooks(@RequestBody List<Book> books) {
        List<Book> savedBooks = bookService.addBooks(books);
        return ResponseEntity.ok(savedBooks);
    }
//    @GetMapping("/{title}")
//    public ResponseEntity getBook(@PathVariable String title) {
//        return ResponseEntity.ok(bookService.getBook(title));
//    }

    @GetMapping("/{id}")
    public ResponseEntity getBookById(@PathVariable Long id) {
        if(bookService.getBookById(id).isPresent()) return ResponseEntity.ok(bookService.getBookById(id));
        else return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/reviews")
    public ResponseEntity getReviews(@PathVariable Long id) {
        if(bookService.getBookById(id).isPresent()) return ResponseEntity.ok(reviewService.getReviewsByBookId(id));
        else return ResponseEntity.notFound().build();
    }
//    @GetMapping
//    public ResponseEntity<List<Book>> listBooks() {
//        return ResponseEntity.ok(bookService.listBooks());
//    }

    @GetMapping("/author/{authorId}")
    public ResponseEntity<Optional<List<Book>>> getBooksByAuthor(@PathVariable Long authorId) {
        Optional<List<Book>> books = bookService.findBooksByAuthor(authorId);
        if(books.isPresent()) return ResponseEntity.ok(books);
        else return ResponseEntity.notFound().build();
    }

    @GetMapping("/genre/{genreId}")
    public ResponseEntity<Optional<List<Book>>> getBooksByGenre(@PathVariable Long genreId) {
        Optional<List<Book>> books = bookService.findBooksByGenre(genreId);
        if(books.isPresent()) return ResponseEntity.ok(books);
        else return ResponseEntity.notFound().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{bookId}/update")
    public ResponseEntity updateBookStock(@PathVariable Long bookId, @RequestBody int quantity) {
        String response = bookService.updateBookStock(bookId, quantity);
        return ResponseEntity.ok(response);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{bookId}/delete")
    public ResponseEntity deleteBook(@PathVariable Long bookId) {
        return ResponseEntity.ok(bookService.deleteBook(bookId));
    }
}
