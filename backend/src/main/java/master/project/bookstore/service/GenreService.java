package master.project.bookstore.service;

import master.project.bookstore.repository.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenreService {
    @Autowired
    private GenreRepository genreRepository;

    public List<String> getGenres () {
        List<String> genres = genreRepository.findNames();
        if(!genres.isEmpty())
            return genres;
        else return null;
    }
}
