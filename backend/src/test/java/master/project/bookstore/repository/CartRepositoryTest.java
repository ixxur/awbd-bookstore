package master.project.bookstore.repository;

import master.project.bookstore.entity.Cart;
import master.project.bookstore.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@DataJpaTest
@ActiveProfiles("h2")
public class CartRepositoryTest {
    @Autowired
    private CartRepository cartRepository;

    @Test
    public void findByUserUsername_ExistingUsername_ReturnsCart() {
        User user = new User();
        user.setUsername("user");
        user.setId(1L);

        Cart cart = new Cart();
        cart.setUser(user);

        Optional<Cart> foundCart = cartRepository.findByUserUsername("user");

        assertTrue(foundCart.isPresent());
        assertEquals("user", foundCart.get().getUser().getUsername());
    }

    @Test
    public void findByUserUsername_NonExistingUsername_ReturnsEmptyOptional() {
        Optional<Cart> foundCart = cartRepository.findByUserUsername("nonexistinguser");

        assertTrue(foundCart.isEmpty());
    }
}
