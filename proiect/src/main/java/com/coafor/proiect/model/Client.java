package com.coafor.proiect.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Setter
@Getter
public class Client extends User{

    public Client(String firstName,String lastName,int age, String phone, String email){
        super(null,"CLIENT",firstName,lastName,age,phone,email,null);
    }

}
