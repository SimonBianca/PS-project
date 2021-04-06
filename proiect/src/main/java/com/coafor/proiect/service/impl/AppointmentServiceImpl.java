package com.coafor.proiect.service.impl;

import com.coafor.proiect.model.Account;
import com.coafor.proiect.model.Appointment;
import com.coafor.proiect.model.Service;
import com.coafor.proiect.repository.AppointmentRepository;
import com.coafor.proiect.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.List;

@org.springframework.stereotype.Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public Appointment addAppointment(LocalDateTime date, Account account, List<Service> services){
        Appointment appointment=new Appointment(null,date,account,services);
        appointmentRepository.save(appointment);
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

    public List<Appointment> findAllByDate(LocalDateTime date){
        return (List<Appointment>)appointmentRepository.findAllByDate(date);
    }

}
