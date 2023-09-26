package com.Barberia.Barber.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Local")
public class Local {
    @Id
    private String id;
    private Long nrosucursal;
    private String calle;
    private Integer numero;
    private String localidad;

    public Local(String id, Long nrosucursal, String calle, Integer numero, String localidad) {
        this.id = id;
        this.nrosucursal = nrosucursal;
        this.calle = calle;
        this.numero = numero;
        this.localidad = localidad;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getNrosucursal() {
        return nrosucursal;
    }

    public void setNrosucursal(Long nrosucursal) {
        this.nrosucursal = nrosucursal;
    }

    public String getCalle() {
        return calle;
    }

    public void setCalle(String calle) {
        this.calle = calle;
    }

    public Integer getNumero() {
        return numero;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public String getLocalidad() {
        return localidad;
    }

    public void setLocalidad(String localidad) {
        this.localidad = localidad;
    }
}
