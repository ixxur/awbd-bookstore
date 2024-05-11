package master.project.bookstore.repository;

import master.project.bookstore.entity.Cart;
import master.project.bookstore.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("select o from Order o where o.user.username = :username")
    List<Order> findByUsername(@Param("username") String username);

    @Query("select o from Order o where o.user.id = :userId")
    List<Order> findByUserId(@Param("userId") Long userId);
    @Query("select o from Order o where o.user.id = :userId and o.id = :id")
    Order findByIdAndByUserId(@Param("id") Long id, @Param("userId") Long userId);
}
