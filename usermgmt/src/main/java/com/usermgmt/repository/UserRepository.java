package com.usermgmt.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.usermgmt.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByActive(boolean active);
    List<User> findByNameContaining(String name);
}