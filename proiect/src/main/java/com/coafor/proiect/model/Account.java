package com.coafor.proiect.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.xml.bind.annotation.*;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String username;

    private String password;

    @JsonManagedReference
    @OneToOne (cascade = CascadeType.REMOVE)
    private User user;

    @JsonManagedReference
    @OneToMany (cascade = CascadeType.REMOVE)
    private List<Appointment> appointments;
}
