package src.web4spring;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, unique = true, name = "login")
    private String name;

    @Column(nullable = false, name = "password")
    private String password;

    // Обязательный пустой конструктор для JPA
    public User() {
    }

    // Публичный конструктор для удобства
    public User(String name, String password) {
        this.name = name;
        this.password = password;
    }

    // Геттеры и сеттеры
    public void setName(String name) {
        this.name = name;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }

    public int getId() {
        return id;
    }
}
