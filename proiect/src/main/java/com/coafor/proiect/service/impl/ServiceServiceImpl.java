package com.coafor.proiect.service.impl;

import com.coafor.proiect.model.Service;
import com.coafor.proiect.repository.ServiceRepository;
import com.coafor.proiect.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;


@org.springframework.stereotype.Service
public class ServiceServiceImpl implements ServiceService {

    @Autowired
    private ServiceRepository serviceRepository;

    public Service addService(String name, float price, int duration){
        Service service=new Service(null,name,price,duration);
        service=serviceRepository.save(service);
        return service;
    }

    public void deleteService(Service service){
        serviceRepository.delete(service);
    }

    public Service updatePrice(Service service,float price){
        Service updatedService=serviceRepository.findById(service.getId()).get();
        updatedService.setPrice(price);
        serviceRepository.save(updatedService);
        return updatedService;
    }

    public Service updateName(Service service,String name){
        Service updatedService=serviceRepository.findById(service.getId()).get();
        updatedService.setName(name);
        serviceRepository.save(updatedService);
        return updatedService;
    }

    public Service updateDuration(Service service,int duration){
        Service updatedService=serviceRepository.findById(service.getId()).get();
        updatedService.setDuration(duration);
        serviceRepository.save(updatedService);
        return updatedService;
    }

    public Service findById(Long id){
        return serviceRepository.findFirstById(id);
    }

    public Service findByName(String name){
        return serviceRepository.findFirstByName(name);
    }

    public List<Service> findAll(){
        return (List<Service>)serviceRepository.findAll();
    }




}
