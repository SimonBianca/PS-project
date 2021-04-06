package com.coafor.proiect.controller;

import com.coafor.proiect.model.Account;
import com.coafor.proiect.model.Service;
import com.coafor.proiect.model.User;
import com.coafor.proiect.service.AccountService;
import com.coafor.proiect.service.ServiceService;
import com.coafor.proiect.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/client")
public class ClientController {
    @Autowired
    public ServiceService serviceService;

    @Autowired
    AccountService accountService;

    @Autowired
    public UserService userService;

    @GetMapping("/services")
    public ResponseEntity getAllServices(){
        List<Service> services=serviceService.findAll();
        return ResponseEntity.ok().body(services);
    }

    @GetMapping("/details")
    public ResponseEntity getAccount(@RequestParam String id){
        return ResponseEntity.status(HttpStatus.OK).body(accountService.findById(id));
    }

    @PutMapping("/details/username")
    public ResponseEntity updateUsername(@RequestBody Account account){
        Account acc=accountService.updateUsername(account, account.getUsername());
        return ResponseEntity.ok().body(acc);
    }

    @PutMapping("/details/password")
    public ResponseEntity updatePassword(@RequestBody Account account){
        Account acc=accountService.updatePassword(account, account.getPassword());
        return ResponseEntity.ok().body(acc);
    }

    @PutMapping("/details/firstName")
    public ResponseEntity updateFirstName(@RequestBody User user){
        User usr=userService.updateUserFirstName(user,user.getFirstName());
        return ResponseEntity.ok().body(usr);
    }

    @PutMapping("/details/lastName")
    public ResponseEntity updateLastName(@RequestBody User user){
        User usr=userService.updateUserLastName(user,user.getLastName());
        return ResponseEntity.ok().body(usr);
    }

    @PutMapping("/details/email")
    public ResponseEntity updateEmail(@RequestBody User user){
        User usr=userService.updateUserEmail(user,user.getEmail());
        return ResponseEntity.ok().body(usr);
    }

    @PutMapping("/details/phone")
    public ResponseEntity updatePhone(@RequestBody User user){
        User usr=userService.updateUserPhone(user,user.getPhone());
        return ResponseEntity.ok().body(usr);
    }

    @PutMapping("/details/age")
    public ResponseEntity updateAge(@RequestBody User user){
        User usr=userService.updateUserAge(user,user.getAge());
        return ResponseEntity.ok().body(usr);
    }
}
