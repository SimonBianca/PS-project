package com.coafor.proiect.dto;

import com.coafor.proiect.model.Appointment;
import lombok.Getter;
import lombok.Setter;

import javax.xml.bind.annotation.*;
import java.util.List;

@Getter
@Setter
@XmlRootElement(name = "list-of-appointments")
@XmlAccessorType(XmlAccessType.FIELD)
public class AppointmentsDTO {
    @XmlElementWrapper(name="")
    @XmlElement(name="appointment")
    private List<Appointment> appointments;
}
