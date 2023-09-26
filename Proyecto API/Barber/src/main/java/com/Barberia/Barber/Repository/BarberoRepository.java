package com.Barberia.Barber.Repository;

import com.Barberia.Barber.Model.Barbero;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface BarberoRepository extends MongoRepository<Barbero, String> {
    Barbero findByDni(Long dni);
}
