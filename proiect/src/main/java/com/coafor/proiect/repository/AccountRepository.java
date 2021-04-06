package com.coafor.proiect.repository;

import com.coafor.proiect.model.Account;
import com.coafor.proiect.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends CrudRepository<Account,Long> {
    Account findFirstByUsername(String username);
    Account findFirstByUser(User user);
    Account findFirstById(Long id);
}
