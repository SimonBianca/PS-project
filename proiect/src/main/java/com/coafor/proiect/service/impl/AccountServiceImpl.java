package com.coafor.proiect.service.impl;

import com.coafor.proiect.model.Account;
import com.coafor.proiect.model.Admin;
import com.coafor.proiect.model.Client;
import com.coafor.proiect.model.User;
import com.coafor.proiect.repository.AccountRepository;
import com.coafor.proiect.repository.AdminRepository;
import com.coafor.proiect.repository.ClientRepository;
import com.coafor.proiect.repository.UserRepository;
import com.coafor.proiect.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private ClientRepository clientRepository;

    public Account addClientAccount(String username, String password, String firstName,String lastName,int age, String phone, String email){
        User user=userRepository.findUserByEmail(email);
        Account acc=accountRepository.findFirstByUsername(username);
        if(user==null && acc==null){
            Client client=new Client(firstName,lastName,age,phone,email);
            client=clientRepository.save(client);
            Account account=new Account(null,username,password,client,null);
            account=accountRepository.save(account);
            client.setAccount(account);
            clientRepository.save(client);
            return account;
        }
        return null;
    }

    public Account addAdminAccount(String username, String password, String firstName,String lastName,int age, String phone, String email) {
        User user=userRepository.findUserByEmail(email);
        Account acc=accountRepository.findFirstByUsername(username);
        if(user==null && acc==null) {
            Admin admin = new Admin(firstName, lastName, age, phone, email);
            admin = adminRepository.save(admin);
            Account account = new Account(null, username, password, admin, null);
            account = accountRepository.save(account);
            admin.setAccount(account);
            adminRepository.save(admin);
            return account;
        }
        return null;
    }

    public Account updateUsername(Account account,String username){
        Account updatedAccount=accountRepository.findById(account.getId()).get();
        updatedAccount.setUsername(username);
        return accountRepository.save(updatedAccount);
    }

    public Account updatePassword(Account account, String password){
        Account updatedAccount=accountRepository.findById(account.getId()).get();
        updatedAccount.setPassword(password);
        accountRepository.save(updatedAccount);
        return updatedAccount;
    }

    public void deleteAccount(Account account){
        userRepository.delete(account.getUser());
        accountRepository.delete(account);
    }

    public Account findByUsername(String username){
        return accountRepository.findFirstByUsername(username);
    }

    public Account findByFirstNameAndLastName(String firstName,String lastName){
        User user=userRepository.findFirstByFirstNameAndLastName(firstName,lastName);
        return accountRepository.findFirstByUser(user);
    }

    public List<Account> findAll(){
        return (List<Account>)accountRepository.findAll();
    }

    public Account findById(String id){
        Long toLong=Long.parseLong(id);
        return accountRepository.findFirstById(toLong);
    }

}
