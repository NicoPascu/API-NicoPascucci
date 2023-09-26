package com.Barberia.Barber.Controller;

import com.Barberia.Barber.Model.Barbero;
import com.Barberia.Barber.Model.Cliente;
import com.Barberia.Barber.Model.Local;
import com.Barberia.Barber.Service.LocalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/local")
public class LocalController {
    @Autowired
    LocalService localService;
    @GetMapping("/obtener")
    public ArrayList<Local> obtenerLocales(){return localService.obtenerLocales();}
    @GetMapping("/obtenerNRO/{nrosucursal}")
    public ResponseEntity<Local> obtenerLocalNro(@PathVariable("nrosucursal") Long nrosucursal){
        Local local = localService.obtenerLocalNro(nrosucursal);
        if (local != null) {
            return ResponseEntity.ok(local);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/guardar")
    public Local guardarLocal(@RequestBody Local local){return this.localService.guardarLocal(local);}

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarlocal(@PathVariable String id) {
        ResponseEntity<String> response = null;

        if (localService.buscarlocalID(id) != null) {
            localService.eliminarlocal(id);
            response = ResponseEntity.status(HttpStatus.NO_CONTENT).body("Eliminado");
        } else {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return response;
    }
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Local> actualizarlocal(
            @PathVariable("id") String id,
            @RequestBody Local localActualizado) {

        Local local = localService.buscarlocalID(id).orElse(null);
        if (local != null) {
            local.setNrosucursal(localActualizado.getNrosucursal());
            local.setCalle(localActualizado.getCalle());
            local.setNumero(localActualizado.getNumero());
            local.setLocalidad(localActualizado.getLocalidad());
            localService.guardarLocal(local);
            return ResponseEntity.ok(localActualizado);
        } else {
            return ResponseEntity.ok(null);
        }
    }
}
