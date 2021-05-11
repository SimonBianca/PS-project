package com.coafor.proiect.service.impl;

import com.coafor.proiect.model.Admin;
import com.coafor.proiect.model.Client;
import com.coafor.proiect.model.User;
import com.coafor.proiect.repository.AccountRepository;
import com.coafor.proiect.repository.AdminRepository;
import com.coafor.proiect.repository.ClientRepository;
import com.coafor.proiect.repository.UserRepository;
import com.coafor.proiect.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private ClientRepository clientRepository;

    public User updateUserFirstName(User user, String firstName){
        User updatedUser=userRepository.findById(user.getId()).get();
        updatedUser.setFirstName(firstName);
        userRepository.save(updatedUser);
        return updatedUser;
    }

    public User updateUserLastName(User user, String lastName){
        User updatedUser=userRepository.findById(user.getId()).get();
        updatedUser.setLastName(lastName);
        userRepository.save(updatedUser);
        return updatedUser;
    }

    public User updateUserAge(User user, int age){
        User updatedUser=userRepository.findById(user.getId()).get();
        updatedUser.setAge(age);
        userRepository.save(updatedUser);
        return updatedUser;
    }

    public User updateUserPhone(User user, String phone){
        User updatedUser=userRepository.findById(user.getId()).get();
        if(userRepository.findAllByPhone(phone).size()>=1){
            updatedUser.setPhone("");
            userRepository.save(updatedUser);
            return null;
        }
        updatedUser.setPhone(phone);
        userRepository.save(updatedUser);
        return updatedUser;
    }

    public User updateUserEmail(User user, String email){
        User updatedUser=userRepository.findById(user.getId()).get();
        if(userRepository.findAllByEmail(email).size()>=1){
            updatedUser.setPhone("");
            userRepository.save(updatedUser);
            return null;
        }
        updatedUser.setEmail(email);
        userRepository.save(updatedUser);
        return updatedUser;
    }

    public void deleteUser(User user){
        accountRepository.delete(user.getAccount());
        userRepository.delete(user);
    }

    public Admin addAdminUser(String firstName, String lastName, int age, String phone, String email){
        User user=userRepository.findUserByEmail(email);
        if(user==null){
            Admin admin = new Admin(firstName, lastName, age, phone, email);
            adminRepository.save(admin);
            return admin;
        }
        return null;
    }

    public Client addClientUser(String firstName,String lastName,int age, String phone, String email){
        User user=userRepository.findUserByEmail(email);
        if(user==null) {
            Client client = new Client(firstName, lastName, age, phone, email);
            clientRepository.save(client);
            return client;
        }
        return null;
    }
}
