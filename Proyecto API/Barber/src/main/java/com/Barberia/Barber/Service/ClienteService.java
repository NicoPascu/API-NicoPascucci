package com.Barberia.Barber.Service;

import com.Barberia.Barber.Model.Barbero;
import com.Barberia.Barber.Model.Cliente;
import com.Barberia.Barber.Repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class ClienteService {
    @Autowired
    ClienteRepository clienteRepository;
    public ArrayList<Cliente> obtenerClientes(){
        return (ArrayList<Cliente>) clienteRepository.findAll();
    }

    public Cliente obtenerclienteDNI(Long dni) {
        return clienteRepository.findByDni(dni);
    }

    public Cliente guardarCliente(Cliente cliente){
        return clienteRepository.save(cliente);
    }

    public Optional<Cliente> buscarclienteID(String id){
        return clienteRepository.findById(id);
    }

    public void eliminarcliente(String id) {
        clienteRepository.deleteById(id);
    }
}
