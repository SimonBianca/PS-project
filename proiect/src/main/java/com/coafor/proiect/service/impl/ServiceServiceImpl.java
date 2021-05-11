package com.coafor.proiect.service.impl;

import com.coafor.proiect.model.Appointment;
import com.coafor.proiect.model.Service;
import com.coafor.proiect.repository.AppointmentRepository;
import com.coafor.proiect.repository.ServiceRepository;
import com.coafor.proiect.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;


@org.springframework.stereotype.Service
public class ServiceServiceImpl implements ServiceService {

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    public Service addService(String name, float price, int duration){
        Service serv=serviceRepository.findFirstByName(name);
        if(serv==null){
            Service service=new Service(null,name,price,duration);
            service=serviceRepository.save(service);
            return service;
        }
        return null;
    }

    public void deleteService(Service service){
        deleteAppointmentsIfServiceIsDeleted(service.getName());
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
        if(getNumberOfServicesByName(name)>=1){
            updatedService.setName("");
            serviceRepository.save(updatedService);
            return null;
        }
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

    @Override
    public int getNumberOfServicesByName(String name) {
        int nr=0;
        List<Service> services=findAll();
        for(Service item:services){
         if(item.getName().equals(name)){
             nr++;
         }
        }
        return nr;
    }

    public void deleteAppointmentsIfServiceIsDeleted(String serviceName){
        Service service=serviceRepository.findFirstByName(serviceName);
        List<Appointment> appointments=appointmentRepository.findAll();
        for (Appointment appointment:appointments) {
            if(appointment.getServices().contains(service)){
                appointmentRepository.delete(appointment);
            }
        }
    }


}
