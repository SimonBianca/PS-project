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
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    public AccountService accountService;

    @Autowired
    public ServiceService serviceService;

    @Autowired
    public UserService userService;

    @GetMapping("/accounts")
    public ResponseEntity getAllAccounts(){
        List<Account> accounts=accountService.findAll();
        return ResponseEntity.ok().body(accounts);
    }

    @GetMapping("/services")
    public ResponseEntity getAllServices(){
        List<Service> services=serviceService.findAll();
        return ResponseEntity.ok().body(services);
    }

    @PutMapping("/services/name")
    public ResponseEntity updateName(@RequestBody Service service){
        Service serv=serviceService.updateName(service,service.getName());
        return ResponseEntity.ok().body(serv);
    }

    @PutMapping("/services/price")
    public ResponseEntity updatePrice(@RequestBody Service service){
        return ResponseEntity.ok().body(serviceService.updatePrice(service,service.getPrice()));
    }

    @PutMapping("/services/duration")
    public ResponseEntity updateDuration(@RequestBody Service service){
        return ResponseEntity.ok().body(serviceService.updateDuration(service,service.getDuration()));
    }

    @DeleteMapping("/services/delete/{id}")
    public ResponseEntity deleteService(@PathVariable Long id){
        Service s=serviceService.findById(id);
        serviceService.deleteService(s);
        return ResponseEntity.ok().body(null);
    }

    @PostMapping("/services/add")
    public ResponseEntity addService(@RequestBody Service service){
        Service s=serviceService.addService(service.getName(),service.getPrice(),service.getDuration());
        return ResponseEntity.ok().body(s);
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
