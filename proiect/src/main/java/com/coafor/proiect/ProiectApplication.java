package com.coafor.proiect;

import com.coafor.proiect.model.*;
import com.coafor.proiect.repository.*;
import com.coafor.proiect.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;

@SpringBootApplication
@EnableJpaRepositories
@EntityScan
public class ProiectApplication {

	public static void main(String[] args) {SpringApplication.run(ProiectApplication.class, args);
	}

	@Bean
	CommandLineRunner init(ClientRepository clientRepository, AccountRepository accountRepository, AdminRepository adminRepository,
						   ServiceRepository serviceRepository, AppointmentRepository appointmentRepository){
		return args ->{
			/*Client client=new Client("Iulia","Simon",20,"0766595336","simon_iulia@yahoo.com");
			clientRepository.save(client);

			Account account=new Account(null,"simonbianca","simonbianca",client,null);
			accountRepository.save(account);
			client.setAccount(account);
			clientRepository.save(client);

			Admin admin=new Admin("Bianca","Simon",22,"0766595336","simon_biancandreea@yahoo.com");
			adminRepository.save(admin);

			Service service1=new Service(null,"hairCut",35,30);
			serviceRepository.save(service1);

			Service service2=new Service(null,"blowDry",15,20);
			serviceRepository.save(service2);

			ArrayList<Service> services=new ArrayList<Service>();
			services.add(service2);
			services.add(service1);
			serviceRepository.saveAll(services);

			Appointment appointment=new Appointment(null,LocalDateTime.of(2021,10,12,12,30),account,services);
			appointmentRepository.save(appointment);

			ArrayList<Appointment> appointments=new ArrayList<Appointment>();
			appointments.add(appointment);
			account.setAppointments(appointments);
			accountRepository.save(account);
			 */
		};
	}
}
