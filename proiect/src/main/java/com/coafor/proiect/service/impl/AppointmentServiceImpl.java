package com.coafor.proiect.service.impl;

import com.coafor.proiect.model.Account;
import com.coafor.proiect.model.Appointment;
import com.coafor.proiect.model.Service;
import com.coafor.proiect.repository.AppointmentRepository;
import com.coafor.proiect.service.AccountService;
import com.coafor.proiect.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

@org.springframework.stereotype.Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private AccountService accountService;


    public Appointment addAppointment(Date date, Account account, List<Service> services){
        Appointment appointment=new Appointment(null,date,account,services,"WAITING");
        appointment=appointmentRepository.save(appointment);
        accountService.addAppointment(account,appointment);
        String username=account.getUsername();
        this.template.convertAndSend("/topic/socket/admin/", username+" has added a new appointment.");
        return appointment;
    }

    public void deleteAppointment(Appointment appointment){
        appointmentRepository.delete(appointment);
    }

    public Appointment findById(Long id){
        return appointmentRepository.findFirstById(id);
    }

    public List<Appointment> findAllByAccount(Account account){
        return (List<Appointment>)appointmentRepository.findAllByAccount(account);
    }

    public List<Appointment> findAllByDate(Date date){
        return (List<Appointment>)appointmentRepository.findAllByDate(date);
    }

    @Override
    public List<Appointment> findAllByAccountAndDateIsLessThanAndStatus(Account account, Date date,String status) {
        List<Appointment> appointments=(List<Appointment>)appointmentRepository.findAllByAccountAndStatusAndDateLessThan(account,status,date);
        for (Appointment item:appointments) {
            Account acc=accountService.findByAppointmentsContaining(item);
            if(acc.equals(account)){
                item.setAccount(acc);
                appointmentRepository.save(item);
            }
        }
        Collections.sort(appointments, new Comparator<Appointment>() {
            @Override
            public int compare(Appointment a1, Appointment a2) {
                return a1.getDate().compareTo(a2.getDate());
            }
        });
        return appointments;
    }

    @Override
    public List<Appointment> findAllByAccountAndDateIsGreaterThanEqualAndStatus(Account account, Date date,String status) {
        List<Appointment> appointments=(List<Appointment>)appointmentRepository.findAllByAccountAndStatusAndDateGreaterThanEqual(account,status,date);
        for (Appointment item:appointments) {
            Account acc=accountService.findByAppointmentsContaining(item);
            if(acc.equals(account)){
                item.setAccount(acc);
                appointmentRepository.save(item);
            }
        }
        Collections.sort(appointments, new Comparator<Appointment>() {
            @Override
            public int compare(Appointment a1, Appointment a2) {
                return a1.getDate().compareTo(a2.getDate());
            }
        });
        return appointments;
    }

    @Override
    public List<Appointment> findAllByDateIsLessThan(Date date) {
        List<Appointment> appointments=(List<Appointment>)appointmentRepository.findAllByDateIsLessThan(date);
        Collections.sort(appointments, new Comparator<Appointment>() {
            @Override
            public int compare(Appointment a1, Appointment a2) {
                return a1.getDate().compareTo(a2.getDate());
            }
        });
        return appointments;
    }

    @Override
    public List<Appointment> findAllByDateGreaterThanEqual(Date date) {
        List<Appointment> appointments=(List<Appointment>)appointmentRepository.findAllByDateGreaterThanEqual(date);
        for (Appointment item:appointments) {
            Account account=accountService.findByAppointmentsContaining(item);
            item.setAccount(account);
            appointmentRepository.save(item);
        }
        Collections.sort(appointments, new Comparator<Appointment>() {
            @Override
            public int compare(Appointment a1, Appointment a2) {
                return a1.getDate().compareTo(a2.getDate());
            }
        });
        return appointments;
    }

    public Appointment acceptAppointment(Appointment appointment) {
        Account account=accountService.findByAppointmentsContaining(appointment);
        if(account!=null){
            appointment.setAccount(account);
        }
        appointment.setStatus("ACCEPTED");
        appointment=appointmentRepository.save(appointment);
        this.template.convertAndSend("/topic/socket/client/"+account.getId().toString(), "The appointment from "+appointment.getDate()+" has been accepted.");
        return appointment;
    }

    public Appointment refuseAppointment(Appointment appointment){
        Account account=accountService.findByAppointmentsContaining(appointment);
        if(account!=null){
            appointment.setAccount(account);
        }
        appointment.setStatus("REFUSED");
        appointment=appointmentRepository.save(appointment);
        this.template.convertAndSend("/topic/socket/client/"+account.getId(), "The appointment from "+appointment.getDate()+" has been refused.");
        return appointment;
    }

    @Override
    public List<Appointment> findAllByStatusAndDateGreaterThanEqual(String status, Date date) {
        List<Appointment> appointments=(List<Appointment>)appointmentRepository.findAllByStatusAndDateGreaterThanEqual(status,date);
        for (Appointment item:appointments) {
            Account account=accountService.findByAppointmentsContaining(item);
            if(account!=null){
                item.setAccount(account);
                appointmentRepository.save(item);
            }
        }
        return appointments;
    }

    @Override
    public List<Appointment> findAllByStatusAndDateIsLessThan(String status, Date date) {
        List<Appointment> appointments=(List<Appointment>)appointmentRepository.findAllByStatusAndDateLessThan(status,date);
        for (Appointment item:appointments) {
            Account account=accountService.findByAppointmentsContaining(item);
            item.setAccount(account);
            appointmentRepository.save(item);
        }
        return appointments;
    }

}
