package com.Barberia.Barber.Controller;

import com.Barberia.Barber.Model.Barbero;
import com.Barberia.Barber.Model.Local;
import com.Barberia.Barber.Model.Turno;
import com.Barberia.Barber.Service.TurnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/turno")
public class TurnoController {
    @Autowired
    TurnoService turnoService;
    @GetMapping("/obtener")
    public ArrayList<Turno> obtenerturnos(){return turnoService.obtenerTurnos();}

    @GetMapping("/obtenerID/{id}")
    public ResponseEntity<Turno> obtenerTurnoPorId(@PathVariable String id) {
        try {
            Turno turno = turnoService.obtenerTurnoPorId(id);
            if (turno != null) {
                return ResponseEntity.ok(turno);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/guardar")
    public Turno guardarTurno(@RequestBody Turno turno){return this.turnoService.guardarTurno(turno);}

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarturno(@PathVariable String id) {
        ResponseEntity<String> response = null;

        if (turnoService.buscarturnoID(id).isPresent()) {
            turnoService.eliminarturno(id);
            response = ResponseEntity.status(HttpStatus.NO_CONTENT).body("Eliminado");
        } else {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return response;
    }
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Turno> actualizarturno(
            @PathVariable("id") String id,
            @RequestBody Turno turnoActualizado) {

        Turno turno = turnoService.buscarturnoID(id).orElse(null);
        if (turno != null) {
            turno.setCliente(turnoActualizado.getCliente());
            turno.setBarbero(turnoActualizado.getBarbero());
            turno.setLocal(turnoActualizado.getLocal());
            turno.setDate(turnoActualizado.getDate());
            return ResponseEntity.ok(turnoActualizado);
        } else {
            return ResponseEntity.ok(null);
        }
    }
}
