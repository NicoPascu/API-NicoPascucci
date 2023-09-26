package com.Barberia.Barber.Service;

import com.Barberia.Barber.Model.Barbero;
import com.Barberia.Barber.Model.Cliente;
import com.Barberia.Barber.Model.Local;
import com.Barberia.Barber.Repository.LocalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class LocalService {
    @Autowired
    LocalRepository localRepository;
    public ArrayList<Local> obtenerLocales(){
        return (ArrayList<Local>) localRepository.findAll();
    }
    public Local obtenerLocalNro(Long nrosucursal) {
        return localRepository.findByNrosucursal(nrosucursal);
    }

    public Local guardarLocal(Local local){
        return localRepository.save(local);
    }

    public Optional<Local> buscarlocalID(String id){
        return localRepository.findById(id);
    }

    public void eliminarlocal(String id) {
        localRepository.deleteById(id);
    }
}
