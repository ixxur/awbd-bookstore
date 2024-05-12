package master.project.bookstore.service;

import master.project.bookstore.entity.Author;
import master.project.bookstore.entity.Book;
import master.project.bookstore.entity.Genre;
import master.project.bookstore.repository.AuthorRepository;
import master.project.bookstore.repository.BookRepository;
import master.project.bookstore.repository.GenreRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BookServiceTest {

    @Mock
    private BookRepository bookRepository;

    @Mock
    private AuthorRepository authorRepository;

    @Mock
    private GenreRepository genreRepository;

    @InjectMocks
    private BookService bookService;

    @Test
    void addBooks() {
        List<Book> booksToAdd = new ArrayList<>();
        Book book = new Book();
        book.setId(1L);
        book.setAuthor(new Author());
        book.setGenre(new Genre());
        book.setTitle("Jungle Book");
        book.setStock(10);
        book.setDescription("lorem ipsum");
        book.setIsbn("jhfjefkwuebkfjwr");
        book.setPrice(BigDecimal.valueOf(12.99));
        book.setPublicationYear(1946);
        booksToAdd.add(book);
        when(bookRepository.saveAll(booksToAdd)).thenReturn(booksToAdd);

        List<Book> savedBooks = bookService.addBooks(booksToAdd);

        assertEquals(booksToAdd.size(), savedBooks.size());
        verify(bookRepository, times(1)).saveAll(booksToAdd);
    }

    @Test
    void getBookById() {
        Long id = 1L;
        Book expectedBook = new Book();
        expectedBook.setId(1L);
        expectedBook.setAuthor(new Author());
        expectedBook.setGenre(new Genre());
        expectedBook.setTitle("Jungle Book");
        expectedBook.setStock(10);
        expectedBook.setDescription("lorem ipsum");
        expectedBook.setIsbn("jhfjefkwuebkfjwr");
        expectedBook.setPrice(BigDecimal.valueOf(12.99));
        expectedBook.setPublicationYear(1946);
        when(bookRepository.findById(id)).thenReturn(Optional.of(expectedBook));

        Optional<Book> resultBook = bookService.getBookById(id);

        assertTrue(resultBook.isPresent());
        assertEquals(expectedBook, resultBook.get());
        verify(bookRepository, times(1)).findById(id);
    }

    @Test
    void updateBookStock_EnoughStock() {
        Long bookId = 1L;
        int currentStock = 10;
        int quantityToReduce = 3;
        Book book = new Book();
        book.setId(bookId);
        book.setStock(currentStock);
        when(bookRepository.findById(bookId)).thenReturn(Optional.of(book));

        String result = bookService.updateBookStock(bookId, quantityToReduce);

        assertEquals("The updated stock for " + bookId + " is: " + (currentStock - quantityToReduce), result);
        assertEquals(currentStock - quantityToReduce, book.getStock());
        verify(bookRepository, times(1)).findById(bookId);
        verify(bookRepository, times(1)).save(book);
    }

    @Test
    void updateBookStock_InsufficientStock() {
        Long bookId = 1L;
        int currentStock = 2;
        int quantityToReduce = 3;
        Book book = new Book();
        book.setId(bookId);
        book.setStock(currentStock);
        when(bookRepository.findById(bookId)).thenReturn(Optional.of(book));

        assertThrows(RuntimeException.class, () -> bookService.updateBookStock(bookId, quantityToReduce));
        assertEquals(currentStock, book.getStock());
        verify(bookRepository, times(1)).findById(bookId);
        verify(bookRepository, never()).save(book);
    }

    @Test
    void updateBookStock_BookNotFound() {
        Long bookId = 1L;
        when(bookRepository.findById(bookId)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> bookService.updateBookStock(bookId, 5));
        verify(bookRepository, times(1)).findById(bookId);
        verify(bookRepository, never()).save(any());
    }
}