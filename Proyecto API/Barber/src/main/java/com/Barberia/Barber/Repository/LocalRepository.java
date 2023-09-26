package com.Barberia.Barber.Repository;

import com.Barberia.Barber.Model.Local;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocalRepository extends MongoRepository<Local, String> {
    Local findByNrosucursal(Long nrosucursal);
}
