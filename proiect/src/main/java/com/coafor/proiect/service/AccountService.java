package com.coafor.proiect.service;

import com.coafor.proiect.model.Account;
import com.coafor.proiect.model.Appointment;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface AccountService {
    Account addClientAccount(String username, String password, String firstName, String lastName, int age, String phone, String email);
    Account addAdminAccount(String username, String password, String firstName,String lastName,int age, String phone, String email);
    Account updateUsername(Account account,String username);
    Account updatePassword(Account account, String password);
    void deleteAccount(Account account);
    Account findByUsername(String username);
    Account findByFirstNameAndLastName(String firstName,String lastName);
    List<Account> findAll();
    Account findById(String id);
    Account addAppointment(Account account, Appointment appointment);

}
