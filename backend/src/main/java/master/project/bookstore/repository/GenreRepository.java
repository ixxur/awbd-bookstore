package master.project.bookstore.repository;

import master.project.bookstore.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface GenreRepository extends JpaRepository<Genre, Long> {
    @Query("SELECT g.name FROM Genre g")
    List<String> findNames();
    Optional<Genre> findById(Long id);
}
