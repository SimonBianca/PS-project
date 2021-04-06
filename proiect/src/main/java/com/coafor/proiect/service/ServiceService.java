package com.coafor.proiect.service;

import com.coafor.proiect.model.Service;
import org.springframework.context.annotation.ComponentScan;

import java.util.List;

@ComponentScan
public interface ServiceService {
    Service addService(String name, float price, int duration);
    void deleteService(Service service);
    Service updatePrice(Service service,float price);
    Service updateName(Service service,String name);
    Service updateDuration(Service service,int duration);
    Service findById(Long id);
    Service findByName(String name);
    List<Service> findAll();
}
