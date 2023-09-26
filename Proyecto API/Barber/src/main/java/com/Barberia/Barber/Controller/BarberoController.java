package com.Barberia.Barber.Controller;

import com.Barberia.Barber.Model.Barbero;
import com.Barberia.Barber.Service.BarberoService;
import com.Barberia.Barber.exceptions.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/barbero")
public class BarberoController {
    @Autowired
    BarberoService barberoService;
    @GetMapping("/obtener")
    public ArrayList<Barbero> obtenerbarberos(){
        return barberoService.obtenerBarberos();
    }

    @GetMapping("/obtenerDNI/{dni}")
    public ResponseEntity<Barbero> obtenerbarberoDNI(@PathVariable("dni") Long dni){
        Barbero barbero = barberoService.obtenerbarberoDNI(dni);
        if (barbero != null) {
            return ResponseEntity.ok(barbero);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/guardar")
    public Barbero guardarbarbero(@RequestBody Barbero barbero){
        return this.barberoService.guardarbarbero(barbero);
    }

    @DeleteMapping("/eliminar/{id}")
    public String eliminarbarbero(@PathVariable String id) {
        if (barberoService.buscarbarberoID(id) != null) {
            barberoService.eliminarbarbero(id);
            return "Barbero eliminado correctamente.";
        } else {
            return "No se encontró el barbero con el ID especificado";
        }
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Barbero> actualizarbarbero(
            @PathVariable("id") String id,
            @RequestBody Barbero barberoActualizado) {

        Barbero barbero = barberoService.buscarbarberoID(id).orElse(null);
        if (barbero != null) {
            barbero.setDni(barberoActualizado.getDni());
            barbero.setNombre(barberoActualizado.getNombre());
            barbero.setApellido(barberoActualizado.getApellido());
            barbero.setNro_telefono(barberoActualizado.getNro_telefono());
            barbero.setMail(barberoActualizado.getMail());
            barberoService.guardarbarbero(barbero);


            return ResponseEntity.ok(barberoActualizado);
        } else {
            return ResponseEntity.ok(null);
        }
    }
    @ExceptionHandler({BadRequestException.class})
    public ResponseEntity<String> procesarErrorBadRequest(BadRequestException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
}



