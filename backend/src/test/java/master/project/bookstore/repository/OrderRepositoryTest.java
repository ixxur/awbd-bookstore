package master.project.bookstore.repository;

import master.project.bookstore.entity.Order;
import master.project.bookstore.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.junit.Assert.*;

@DataJpaTest
@ActiveProfiles("h2")
public class OrderRepositoryTest {
    @Autowired
    private OrderRepository orderRepository;

    @Test
    public void findByUsername_ExistingUsername_ReturnsOrders() {
        User user = new User();
        user.setUsername("ana");
        user.setId(3L);

        Order order = new Order();
        order.setUser(user);

        List<Order> foundOrders = orderRepository.findByUserId(3L);

        assertTrue(foundOrders.isEmpty());
    }

    @Test
    public void findByUsername_NonExistingUsername_ReturnsEmptyList() {
        List<Order> foundOrders = orderRepository.findByUsername("nonexistinguser");

        assertTrue(foundOrders.isEmpty());
    }
}
