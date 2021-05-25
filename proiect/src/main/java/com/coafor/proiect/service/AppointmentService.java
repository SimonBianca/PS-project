package com.coafor.proiect.service;

import com.coafor.proiect.dto.AppointmentsBetweenDatesDTO;
import com.coafor.proiect.model.Account;
import com.coafor.proiect.model.Appointment;
import com.coafor.proiect.model.Service;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

@Component
public interface AppointmentService {
    Appointment addAppointment(Date date, Account account, List<Service> services);
    void deleteAppointment(Appointment appointment);
    Appointment findById(Long id);
    List<Appointment> findAllByAccount(Account account);
    List<Appointment> findAllByDate(Date date);
    List<Appointment> findAllByDateIsLessThan(Date date);
    List<Appointment> findAllByDateGreaterThanEqual(Date date);
    Appointment acceptAppointment(Appointment appointment);
    Appointment refuseAppointment(Appointment appointment);
    List<Appointment> findAllByStatusAndDateGreaterThanEqual(String status, Date date);
    List<Appointment> findAllByAccountAndDateIsGreaterThanEqualAndStatus(Account account, Date date,String status);
    List<Appointment> findAllByStatusAndDateIsLessThan(String status, Date date);
    List<Appointment> findAllByAccountAndDateIsLessThanAndStatus(Account account, Date date,String status);
    List<Appointment> findAllByDateAndStatus(Date date,String status);
    List<Appointment> findAllByStatusAndDateBetween(String status, AppointmentsBetweenDatesDTO dto);
}
