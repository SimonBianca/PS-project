package com.coafor.proiect.controller;

import com.coafor.proiect.model.Account;
import com.coafor.proiect.model.User;
import com.coafor.proiect.repository.AccountRepository;
import com.coafor.proiect.repository.UserRepository;
import com.coafor.proiect.service.AccountService;
import com.coafor.proiect.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("")
public class UserController {
    @Autowired
    public AccountService accountService;

    @PostMapping("/login")
    public ResponseEntity getAccountByLogin(@RequestBody Account accountRequest){
        Account account=accountService.findByUsername(accountRequest.getUsername());
        if(account!=null && account.getPassword().equals(accountRequest.getPassword())){
            return ResponseEntity.ok().body(account);
        }
        return ResponseEntity.ok().body(null);
    }

    @PostMapping("/register")
    public ResponseEntity createAccount(@RequestBody Account accountRequest){
        User user=accountRequest.getUser();
        String role=user.getRole();
        Account accountCreated=null;
        if("ADMIN".equals(role)){
            accountCreated=accountService.addAdminAccount(accountRequest.getUsername(),accountRequest.getPassword(),user.getFirstName(),
                    user.getLastName(),user.getAge(),user.getPhone(),user.getEmail());
        }
        else if("CLIENT".equals(role)) {
            accountCreated=accountService.addClientAccount(accountRequest.getUsername(), accountRequest.getPassword(), user.getFirstName(),
                    user.getLastName(), user.getAge(), user.getPhone(), user.getEmail());
        }
        return ResponseEntity.ok().body(accountCreated);
    }
}
