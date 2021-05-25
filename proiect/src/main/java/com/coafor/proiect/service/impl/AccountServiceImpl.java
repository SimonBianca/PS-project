package com.coafor.proiect.service.impl;

import com.coafor.proiect.dto.AppointmentsDTO;
import com.coafor.proiect.model.*;
import com.coafor.proiect.repository.AccountRepository;
import com.coafor.proiect.repository.AdminRepository;
import com.coafor.proiect.repository.ClientRepository;
import com.coafor.proiect.repository.UserRepository;
import com.coafor.proiect.service.AccountService;
import com.coafor.proiect.service.AppointmentService;
import com.coafor.proiect.utils.exporter.FileExporter;
import com.coafor.proiect.utils.exporter.XMLFileExporter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

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

    @Autowired
    private AppointmentService appointmentService;

    public Account addClientAccount(String username, String password, String firstName,String lastName,int age, String phone, String email){
        User user=userRepository.findUserByEmail(email);
        User user2=userRepository.findUserByPhone(phone);
        Account acc=accountRepository.findFirstByUsername(username);
        if(user==null && acc==null && user2==null ){
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
        User user2=userRepository.findUserByPhone(phone);
        if(user==null && acc==null && user2==null) {
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
        if(accountRepository.findAllByUsername(username).size()>=1){
            updatedAccount.setUsername("");
            accountRepository.save(updatedAccount);
            return null;
        }
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

    public Account addAppointment(Account account, Appointment appointment){
        List<Appointment> appointments=account.getAppointments();
        appointments.add(appointment);
        account.setAppointments(appointments);
        return accountRepository.save(account);
    }

    public Account findByAppointmentsContaining(Appointment appointment){
        return (Account) accountRepository.findByAppointmentsContaining(appointment);
    }

    @Override
    public List<Appointment> getAppointmentsByUsername(String username) {
        Account account=accountRepository.findFirstByUsername(username);
        if(account==null){
            return null;
        }
        List<Appointment> appointments=account.getAppointments();
        List<Appointment> acceptedAppointments=appointments.stream().
                filter(p->p.getStatus().equals("ACCEPTED")).collect(Collectors.toList());
        return acceptedAppointments;
    }

    @Override
    public String exportOldAppointments(String accountID) {
        Account account=this.findById(accountID);
        FileExporter fileExporter=new XMLFileExporter();
        AppointmentsDTO appointmentsDTO=new AppointmentsDTO();
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.HOUR,0);
        cal.set(Calendar.MINUTE,0);
        cal.set(Calendar.SECOND,0);
        cal.set(Calendar.HOUR_OF_DAY,0);
        cal.add(Calendar.DATE,-1);
        Date date = cal.getTime();
        List<Appointment> appointments=appointmentService.findAllByAccountAndDateIsLessThanAndStatus(account,date,"ACCEPTED");
        appointmentsDTO.setAppointments(appointments);
        return fileExporter.exportData(appointmentsDTO);
    }


}
