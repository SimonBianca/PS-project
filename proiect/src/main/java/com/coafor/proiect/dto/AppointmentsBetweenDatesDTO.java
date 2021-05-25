package com.coafor.proiect.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class AppointmentsBetweenDatesDTO {
    private Date startDate;
    private Date endDate;

}
