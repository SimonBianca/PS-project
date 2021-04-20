package com.coafor.proiect.repository;

import com.coafor.proiect.model.Account;
import com.coafor.proiect.model.Appointment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Date;

@Repository
public interface AppointmentRepository extends CrudRepository<Appointment,Long> {
    Appointment findFirstById(Long id);
    Appointment findAllByAccount(Account account);
    Appointment findAllByDate(Date date);
}
