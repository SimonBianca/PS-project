package com.coafor.proiect.service;

import com.coafor.proiect.model.Admin;
import com.coafor.proiect.model.Client;
import com.coafor.proiect.model.User;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan
public interface UserService {
    User updateUserFirstName(User user, String firstName);
    User updateUserLastName(User user, String lastName);
    User updateUserAge(User user, int age);
    User updateUserPhone(User user, String phone);
    User updateUserEmail(User user, String email);
    void deleteUser(User user);
    Admin addAdminUser(String firstName, String lastName, int age, String phone, String email);
    Client addClientUser(String firstName, String lastName, int age, String phone, String email);
}
