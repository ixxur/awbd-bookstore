package master.project.bookstore.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import master.project.bookstore.dto.UserRegistrationDto;
import master.project.bookstore.entity.User;
import master.project.bookstore.exception.UserAlreadyExistsException;
import master.project.bookstore.service.BookService;
import master.project.bookstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    private UserService userService;
    @Autowired
    private ObjectMapper objectMapper;
    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(AuthenticationController.class);

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserRegistrationDto registrationDto) {
        try {
            User user = userService.registerNewUser(registrationDto.getEmail(),
                    registrationDto.getUsername(),
                    registrationDto.getPassword());
            log.info("User registered successfully");
            return ResponseEntity.ok("User registered successfully");
        } catch (UserAlreadyExistsException e) {
            log.error("Error: ", e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/login")
    public ResponseEntity<String> testAuthentication() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = authentication.getName();
        String currentUserRole = authentication.getAuthorities().toString();

        User user = userService.findUserByUsername(currentUserName);

        try {
            String userJson = objectMapper.writeValueAsString(user);
            log.info("User authenticated: " + userJson);
            return ResponseEntity.ok(userJson);
        } catch (JsonProcessingException e) {
            log.error("Error: ", e.getMessage());
            return ResponseEntity.status(403).body("Wrong credentials.");
        }
    }
}
