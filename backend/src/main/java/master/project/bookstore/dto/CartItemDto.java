package master.project.bookstore.dto;

import org.springframework.data.relational.core.sql.In;

public class CartItemDto {
    private String title;
    private Integer bookId;
    private int quantity;

    public CartItemDto() {
    }

    public CartItemDto(String title, int quantity) {
        this.title = title;
        this.quantity = quantity;
    }

    public CartItemDto(Integer bookId, int quantity) {
        this.bookId = bookId;
        this.quantity = quantity;
    }

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "CartItemDto{" +
                "title='" + title + '\'' +
                ", quantity=" + quantity +
                '}';
    }
}
