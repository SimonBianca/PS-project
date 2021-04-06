package com.coafor.proiect.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Setter
@Getter
public class Admin extends User{

    public Admin(String firstName,String lastName,int age, String phone, String email){
        super(null,"ADMIN",firstName,lastName,age,phone,email,null);
    }
}
