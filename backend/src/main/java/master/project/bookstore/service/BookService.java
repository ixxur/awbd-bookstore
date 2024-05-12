package master.project.bookstore.service;

import master.project.bookstore.entity.Author;
import master.project.bookstore.entity.Book;
import master.project.bookstore.entity.Genre;
import master.project.bookstore.repository.AuthorRepository;
import master.project.bookstore.repository.BookRepository;
import master.project.bookstore.repository.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class BookService {
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private AuthorRepository authorRepository;
    @Autowired
    private GenreRepository genreRepository;

    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(BookService.class);

    public List<Book> addBooks(List<Book> books) {
        List<Book> savedBooks = new ArrayList<>();
        for (Book book : books) {
            savedBooks.add(bookRepository.save(book));
        }
        log.info("Saved books {}", savedBooks);
        return savedBooks;
    }

//    public List<Book> listBooks() {
//        return bookRepository.findAll();
//    }
    public Page<Book> getAllBooks(int pageNumber, int pageSize, String sortBy) {
        return bookRepository.findAll(PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).ascending()));
    }
    public Optional<Book> getBook(String title) {
        Book book = bookRepository.findByTitle(title)
                .orElseThrow(() -> new RuntimeException("Book not found"));
        return Optional.ofNullable(book);
    }

    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }

    public Optional<List<Book>> findBooksByAuthor(Long authorId) {
        Optional<Author> author = authorRepository.findById(authorId);
        if(author.isPresent()) return bookRepository.findByAuthor(author);
        else return null;
    }

    public Optional<List<Book>> findBooksByGenre(Long genreId) {
        Optional<Genre> genre = genreRepository.findById(genreId);
        if(genre.isPresent()) {
            log.info("");
            return bookRepository.findByGenre(genre);}
        else return null;
    }

    public Optional<Book> findBooksByTitle(String title) {
        return bookRepository.findByTitle(title);
    }
    public String updateBookStock(Long bookId, int quantity) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));
        int newStock = book.getStock() - quantity;
        if (newStock < 0) {
            throw new RuntimeException("Insufficient stock for " + book.getTitle());
        }
        book.setStock(newStock);
        bookRepository.save(book);

        return "The updated stock for " + bookId + " is: " + book.getStock();
    }

    public String deleteBook(Long bookId) {
        Optional<Book> book = bookRepository.findById(bookId);
        if (book.isPresent()) {
            bookRepository.delete(book.get());
            return "Successfully delete item " + bookId;
        } else {
            throw new RuntimeException("Book with title " + bookId + " was not found");
        }
    }
}
