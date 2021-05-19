package com.coafor.proiect.repository;

import com.coafor.proiect.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User,Long> {
    User findFirstByFirstNameAndLastName(String firstName, String lastName);
    User findUserByEmail(String email);
    User findUserByPhone(String phone);
    List<User> findAllByEmail(String email);
    List<User> findAllByPhone(String phone);
}
