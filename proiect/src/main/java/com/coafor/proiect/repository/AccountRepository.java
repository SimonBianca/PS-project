package com.coafor.proiect.repository;

import com.coafor.proiect.model.Account;
import com.coafor.proiect.model.Appointment;
import com.coafor.proiect.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends CrudRepository<Account,Long> {
    Account findFirstByUsername(String username);
    Account findFirstByUser(User user);
    Account findFirstById(Long id);
    List<Account> findAllByUsername(String username);
    Account findByAppointmentsContaining(Appointment appointment);
}
