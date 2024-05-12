package master.project.bookstore.controller;

import master.project.bookstore.entity.Author;
import master.project.bookstore.entity.Genre;
import master.project.bookstore.service.ReviewService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.mockito.BDDMockito.*;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import master.project.bookstore.entity.Book;
import master.project.bookstore.service.BookService;
import org.springframework.web.context.WebApplicationContext;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("h2")
public class BookControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @MockBean
    private BookService bookService;

    @MockBean
    private ReviewService reviewService;

//    @Test
//    @WithMockUser(roles = "USER")
//    public void testGetAllBooks() throws Exception {
//        // Prepare mock data
//        List<Book> books = Arrays.asList(new Book(), new Book());
//        Page<Book> bookPage = new PageImpl<>(books);
//
//        // Mock service method
//        when(bookService.getAllBooks(anyInt(), anyInt(), anyString())).thenReturn(bookPage);
//
//        // Perform GET request
//        mockMvc.perform(get("/books"))
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andExpect(jsonPath("$.content", hasSize(2)));
//    }

//    @Test
//    @WithMockUser(roles = "ADMIN")
//    public void testAddBooks() throws Exception {
//        // Prepare mock data
//        Book book = new Book();
//        book.setTitle("title");
//        book.setAuthor(new Author());
//        book.setGenre(new Genre());
//        book.setIsbn("888i-8i8596");
//        book.setPrice(BigDecimal.valueOf(12.50));
//        book.setPublicationYear(1960);
//        book.setStock(23);
//        List<Book> booksToAdd = Arrays.asList(book);
//        List<Book> savedBooks = Arrays.asList(book);
//
//        // Mock service method
//        when(bookService.addBooks(booksToAdd)).thenReturn(savedBooks);
//
//        // Perform POST request
//        mockMvc.perform(post("/books")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(asJsonString(booksToAdd))
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andExpect(jsonPath("$", hasSize(2)));
//    }
//    private String asJsonString(final Object obj) {
//        try {
//            return new ObjectMapper().writeValueAsString(obj);
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }
}
