package com.coafor.proiect.repository;

import com.coafor.proiect.model.Service;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository extends CrudRepository<Service,Long> {
    Service findFirstById(Long id);
    Service findFirstByName(String name);
}
