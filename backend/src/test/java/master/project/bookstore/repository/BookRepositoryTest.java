package master.project.bookstore.repository;

import master.project.bookstore.entity.Author;
import master.project.bookstore.entity.Book;
import master.project.bookstore.entity.Genre;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@DataJpaTest
@ActiveProfiles("h2")
public class BookRepositoryTest {
    @Autowired
    private BookRepository bookRepository;

    @Test
    public void findById_ExistingId_ReturnsBook() {
        Book book = new Book();
        book.setId(1L);
        book.setTitle("Harry Potter and the Sorcerer-s Stone");
        book.setAuthor(new Author(1L,"J.K. Rowling", "British"));
        book.setGenre(new Genre(1L, "Fantasy"));

        Optional<Book> foundBook = bookRepository.findById(1L);

        assertTrue(foundBook.isPresent());
        assertEquals("Harry Potter and the Sorcerer-s Stone", foundBook.get().getTitle());
    }

    @Test
    public void findById_NonExistingId_ReturnsEmptyOptional() {
        Optional<Book> foundBook = bookRepository.findById(100L);
        assertTrue(foundBook.isEmpty());
    }
}
