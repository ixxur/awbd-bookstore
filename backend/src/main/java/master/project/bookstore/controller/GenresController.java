package master.project.bookstore.controller;

import master.project.bookstore.service.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/genres")
public class GenresController {
    @Autowired
    private GenreService genreService;
    @GetMapping
    public ResponseEntity<List<String>> getAllGenres() {
        return ResponseEntity.ok(genreService.getGenres());
    }
}
