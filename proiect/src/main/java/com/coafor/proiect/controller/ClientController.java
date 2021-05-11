package com.coafor.proiect.controller;

import com.coafor.proiect.model.Account;
import com.coafor.proiect.model.Appointment;
import com.coafor.proiect.model.Service;
import com.coafor.proiect.model.User;
import com.coafor.proiect.service.AccountService;
import com.coafor.proiect.service.AppointmentService;
import com.coafor.proiect.service.ServiceService;
import com.coafor.proiect.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
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

    @Autowired
    public AppointmentService appointmentService;

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

    @PostMapping("/appointment")
    public ResponseEntity addAppointment(@RequestBody Appointment appointment){
        Appointment app=appointmentService.addAppointment(appointment.getDate(),appointment.getAccount(),appointment.getServices());
        return ResponseEntity.ok().body(app);
    }

    @GetMapping("/old-appointments")
    public ResponseEntity getOldAppointments(@RequestParam String id, String status){
        Account account=accountService.findById(id);
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.HOUR,0);
        cal.set(Calendar.MINUTE,0);
        cal.set(Calendar.SECOND,0);
        cal.set(Calendar.HOUR_OF_DAY,0);
        cal.add(Calendar.DATE,-1);
        Date date = cal.getTime();
        return ResponseEntity.status(HttpStatus.OK).body(appointmentService.findAllByAccountAndDateIsLessThanAndStatus(account,date,status));
    }

    @GetMapping("/future-appointments")
    public ResponseEntity getFutureAppointments(@RequestParam String id, String status){
        Account account=accountService.findById(id);
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.HOUR,0);
        cal.set(Calendar.MINUTE,0);
        cal.set(Calendar.SECOND,0);
        cal.set(Calendar.HOUR_OF_DAY,0);
        cal.add(Calendar.DATE,-1);
        Date date = cal.getTime();
        return ResponseEntity.status(HttpStatus.OK).body(appointmentService.findAllByAccountAndDateIsGreaterThanEqualAndStatus(account,date,status));
    }

    @GetMapping("/on-waiting-appointments")
    public ResponseEntity getoOnWaitingAppointments(@RequestParam String id, String status){
        Account account=accountService.findById(id);
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.HOUR,0);
        cal.set(Calendar.MINUTE,0);
        cal.set(Calendar.SECOND,0);
        cal.set(Calendar.HOUR_OF_DAY,0);
        cal.add(Calendar.DATE,-1);
        Date date = cal.getTime();
        return ResponseEntity.status(HttpStatus.OK).body(appointmentService.findAllByAccountAndDateIsGreaterThanEqualAndStatus(account,date,status));
    }

    @PutMapping("/on-waiting-appointments/accept")
    public ResponseEntity acceptAppointment(@RequestBody Appointment appointment) throws ParseException {
        Appointment app=appointmentService.acceptAppointment(appointment);
        return ResponseEntity.ok().body(app);
    }

    @PutMapping("/on-waiting-appointments/refuse")
    public ResponseEntity refuseAppointment(@RequestBody Appointment appointment){
        Appointment app=appointmentService.refuseAppointment(appointment);
        return ResponseEntity.ok().body(app);
    }


}
