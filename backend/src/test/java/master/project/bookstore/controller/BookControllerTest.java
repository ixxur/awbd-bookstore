package master.project.bookstore.controller;

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
import static org.junit.jupiter.api.Assertions.assertEquals;
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
        // Mocking
        Page<Book> bookPage = mock(Page.class);
        when(bookService.getAllBooks(0, 10, "title")).thenReturn(bookPage);

        // Test
        ResponseEntity<Page<Book>> response = bookController.getAllBooks(0, 10, "title");

        // Assertions
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(bookPage, response.getBody());
    }

//    @Test
//    public void getBookById_ExistingBook_ReturnsBook() {
//        // Mocking
//        Long bookId = 1L;
//        Book book = mock(Book.class);
//        when(bookService.getBookById(bookId)).thenReturn(Optional.ofNullable(book));
//
//        // Test
//        ResponseEntity response = bookController.getBookById(bookId);
//
//        // Assertions
//        assertEquals(200, response.getStatusCodeValue());
//        assertEquals(book, response.getBody());
//    }
}
