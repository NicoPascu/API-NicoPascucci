package com.Barberia.Barber.Controller;

import com.Barberia.Barber.Model.Barbero;
import com.Barberia.Barber.Model.Cliente;
import com.Barberia.Barber.Service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/cliente")
public class ClienteController {
    @Autowired
    ClienteService clienteService;
    @GetMapping("/obtener")
    public ArrayList<Cliente> obtenerclientes(){return clienteService.obtenerClientes();}

    @GetMapping("/obtenerDNI/{dni}")
    public ResponseEntity<Cliente> obtenerbarberoDNI(@PathVariable("dni") Long dni){
        Cliente cliente = clienteService.obtenerclienteDNI(dni);
        if (cliente != null) {
            return ResponseEntity.ok(cliente);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/guardar")
    public Cliente guardarCLiente(@RequestBody Cliente cliente){return this.clienteService.guardarCliente(cliente);}

    @DeleteMapping("/eliminar/{id}")
    public String eliminarcliente(@PathVariable String id) {
        if (clienteService.buscarclienteID(id) != null) {
            clienteService.eliminarcliente(id);
            return "Cliente eliminado correctamente.";
        } else {
            return "No se encontró el Cliente con el ID especificado";
        }
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Cliente> actualizarcliente(
            @PathVariable("id") String id,
            @RequestBody Cliente clienteActualizado) {

        Cliente cliente = clienteService.buscarclienteID(id).orElse(null);
        if (cliente != null) {
            cliente.setDni(clienteActualizado.getDni());
            cliente.setNombre(clienteActualizado.getNombre());
            cliente.setApellido(clienteActualizado.getApellido());
            cliente.setNro_telefono(clienteActualizado.getNro_telefono());
            cliente.setMail(clienteActualizado.getMail());
            clienteService.guardarCliente(cliente);
            return ResponseEntity.ok(clienteActualizado);
        } else {
            return ResponseEntity.ok(null);
        }
    }
}
