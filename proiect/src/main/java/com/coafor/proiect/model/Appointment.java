package com.coafor.proiect.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import javax.xml.bind.annotation.*;
import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@XmlAccessorType(XmlAccessType.FIELD)
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @XmlTransient
    private Long id;

    private Date date;

    @JsonBackReference
    @ManyToOne
    @XmlTransient
    private Account account;

    @OneToMany
    @XmlElementWrapper(name="list-of-services")
    @XmlElement(name="service")
    private List<Service> services;

    private String status;

}
