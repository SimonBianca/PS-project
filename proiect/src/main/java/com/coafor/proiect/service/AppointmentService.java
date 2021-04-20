package com.coafor.proiect.service;

import com.coafor.proiect.model.Account;
import com.coafor.proiect.model.Appointment;
import com.coafor.proiect.model.Service;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
public interface AppointmentService {
    Appointment addAppointment(Date date, Account account, List<Service> services);
    void deleteAppointment(Appointment appointment);
    Appointment findById(Long id);
    List<Appointment> findAllByAccount(Account account);
    List<Appointment> findAllByDate(Date date);
}
