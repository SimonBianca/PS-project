package com.coafor.proiect.service.impl;

import com.coafor.proiect.model.Account;
import com.coafor.proiect.model.Appointment;
import com.coafor.proiect.model.Service;
import com.coafor.proiect.repository.AppointmentRepository;
import com.coafor.proiect.service.AccountService;
import com.coafor.proiect.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.List;

@org.springframework.stereotype.Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private AccountService accountService;

    public Appointment addAppointment(Date date, Account account, List<Service> services){
        Appointment appointment=new Appointment(null,date,account,services);
        appointment=appointmentRepository.save(appointment);
        accountService.addAppointment(account,appointment);
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

}
