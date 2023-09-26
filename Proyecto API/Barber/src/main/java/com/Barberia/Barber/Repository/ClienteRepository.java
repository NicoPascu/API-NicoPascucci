package com.Barberia.Barber.Repository;

import com.Barberia.Barber.Model.Barbero;
import com.Barberia.Barber.Model.Cliente;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends MongoRepository<Cliente, String> {
    Cliente findByDni(Long dni);
}
