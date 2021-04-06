package com.coafor.proiect.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String role;
    private String firstName;
    private String lastName;
    private int age;
    private String phone;

    @Column(unique = true)
    private String email;

    @JsonBackReference
    @OneToOne(cascade = CascadeType.REMOVE)
    private Account account;
}
