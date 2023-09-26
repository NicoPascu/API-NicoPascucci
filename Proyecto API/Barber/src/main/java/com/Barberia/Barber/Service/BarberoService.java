package com.Barberia.Barber.Service;

import com.Barberia.Barber.Model.Barbero;
import com.Barberia.Barber.Repository.BarberoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BarberoService {
    @Autowired
    BarberoRepository barberoRepository;
    public ArrayList<Barbero> obtenerBarberos(){
        return (ArrayList<Barbero>) barberoRepository.findAll();
    }

    public Barbero guardarbarbero(Barbero barbero){
        return barberoRepository.save(barbero);
    }
    public Barbero obtenerbarberoDNI(Long dni) {
        return barberoRepository.findByDni(dni);
    }

    public Optional<Barbero> buscarbarberoID(String id){
        return barberoRepository.findById(id);
    }

    public void eliminarbarbero(String id) {
        barberoRepository.deleteById(id);
    }


}
