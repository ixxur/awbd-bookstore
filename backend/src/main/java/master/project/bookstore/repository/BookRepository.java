package master.project.bookstore.repository;

import master.project.bookstore.entity.Author;
import master.project.bookstore.entity.Book;
import master.project.bookstore.entity.Genre;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository <Book, Long>{
    Optional<Book> findByTitle(String title);
    Optional<Book> findById (Long id);
    Optional<List<Book>> findByAuthor(Optional<Author> author);
    Optional<List<Book>> findByGenre(Optional<Genre> genre);
    Page<Book> findAll(Pageable pageable);
}
