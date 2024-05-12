package master.project.bookstore.controller;

import master.project.bookstore.entity.Review;
import master.project.bookstore.service.ReviewService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.mockito.BDDMockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import master.project.bookstore.entity.Book;
import master.project.bookstore.service.BookService;

@ExtendWith(MockitoExtension.class)
public class BookControllerTest {
    private MockMvc mockMvc;

    @Mock
    private BookService bookService;

    @Mock
    private ReviewService reviewService;

    @InjectMocks
    private BookController bookController;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(bookController).build();
    }

    @Test
    public void getAllBooks_ReturnsPageOfBooks() {
        Page<Book> bookPage = mock(Page.class);
        when(bookService.getAllBooks(0, 10, "title")).thenReturn(bookPage);

        ResponseEntity<Page<Book>> response = bookController.getAllBooks(0, 10, "title");

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(bookPage, response.getBody());
    }

    @Test
    public void getBookById_ExistingBook_ReturnsBook() {
        Long bookId = 1L;

        Book book = new Book();
        book.setId(bookId);
        book.setTitle("Sample Book");

        when(bookService.getBookById(bookId)).thenReturn(Optional.of(book));

        ResponseEntity response = bookController.getBookById(bookId);

        assertEquals(200, response.getStatusCodeValue());

        assertNotNull(response.getBody());
        assertTrue(response.getBody() instanceof Optional);

        Optional<Book> bodyOptional = (Optional<Book>) response.getBody();
        assertTrue(bodyOptional.isPresent());
        assertEquals(book.getTitle(), bodyOptional.get().getTitle());
    }

    @Test
    public void getBookById_NonExistingBook_ReturnsNotFound() {
        Long bookId = 1L;
        when(bookService.getBookById(bookId)).thenReturn(Optional.empty());

        ResponseEntity response = bookController.getBookById(bookId);

        assertEquals(404, response.getStatusCodeValue());
        assertTrue(response.getBody() == null);
    }

    @Test
    public void getReviews_ExistingBook_ReturnsReviews() {
        Long bookId = 1L;
        List<Review> reviews = mock(List.class);
        when(bookService.getBookById(bookId)).thenReturn(Optional.of(new Book()));
        when(reviewService.getReviewsByBookId(bookId)).thenReturn(reviews);

        ResponseEntity response = bookController.getReviews(bookId);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(reviews, response.getBody());
    }
}
