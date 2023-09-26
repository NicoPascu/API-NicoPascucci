package com.Barberia.Barber.Service;

import com.Barberia.Barber.Model.Barbero;
import com.Barberia.Barber.Model.Turno;
import com.Barberia.Barber.Repository.TurnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TurnoService {
    @Autowired
    TurnoRepository turnoRepository;
    public ArrayList<Turno> obtenerTurnos(){
        return (ArrayList<Turno>) turnoRepository.findAll();
    }

    public Turno obtenerTurnoPorId(String id) {
        Optional<Turno> optionalTurno = turnoRepository.findById(id);
        return optionalTurno.orElse(null);
    }

    public Turno guardarTurno(Turno turno){
        return turnoRepository.save(turno);
    }

    public Optional<Turno> buscarturnoID(String id){
        return turnoRepository.findById(id);
    }

    public void eliminarturno(String id) {
        turnoRepository.deleteById(id);
    }
}
