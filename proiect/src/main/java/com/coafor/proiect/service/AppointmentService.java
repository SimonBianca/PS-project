package com.coafor.proiect.service;

import com.coafor.proiect.model.Account;
import com.coafor.proiect.model.Appointment;
import com.coafor.proiect.model.Service;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public interface AppointmentService {
    Appointment addAppointment(LocalDateTime date, Account account, List<Service> services);
    void deleteAppointment(Appointment appointment);
    Appointment findById(Long id);
    List<Appointment> findAllByAccount(Account account);
    List<Appointment> findAllByDate(LocalDateTime date);
}
