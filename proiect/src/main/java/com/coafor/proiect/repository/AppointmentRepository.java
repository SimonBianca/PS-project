package com.coafor.proiect.repository;

import com.coafor.proiect.model.Account;
import com.coafor.proiect.model.Appointment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface AppointmentRepository extends CrudRepository<Appointment,Long> {
    Appointment findFirstById(Long id);
    List<Appointment> findAll();
    List<Appointment> findAllByAccount(Account account);
    List<Appointment> findAllByDate(Date date);
    List<Appointment> findAllByAccountAndDateIsLessThan(Account account, Date date);
    List<Appointment> findAllByAccountAndDateIsGreaterThanEqual(Account account,Date date);
    List<Appointment> findAllByDateIsLessThan(Date date);
    List<Appointment> findAllByStatusAndDateGreaterThanEqual(String status, Date date);
    List<Appointment> findAllByDateGreaterThanEqual(Date date);
    List<Appointment> findAllByStatusAndDateLessThan(String status,Date date);
    List<Appointment> findAllByAccountAndStatusAndDateGreaterThanEqual(Account account,String status,Date date);
    List<Appointment> findAllByAccountAndStatusAndDateLessThan(Account account,String status,Date date);
}
