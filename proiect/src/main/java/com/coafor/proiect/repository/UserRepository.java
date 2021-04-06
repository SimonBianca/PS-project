package com.coafor.proiect.repository;

import com.coafor.proiect.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User,Long> {
    User findFirstByFirstNameAndLastName(String firstName, String lastName);
    User findUserByEmail(String email);
}
