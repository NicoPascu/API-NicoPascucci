package com.Barberia.Barber.Model;

import com.mongodb.internal.connection.Time;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.util.Date;
@Document
public class Turno {

    @Id
    private String id;
    Cliente cliente;
    Barbero barbero;
    Local local;
    private Date date;
    public Turno(String id, Cliente cliente, Barbero barbero, Local local, Date date) {
        this.id = id;
        this.cliente = cliente;
        this.barbero = barbero;
        this.local = local;
        this.date = date;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Barbero getBarbero() {
        return barbero;
    }

    public void setBarbero(Barbero barbero) {
        this.barbero = barbero;
    }

    public Local getLocal() {
        return local;
    }

    public void setLocal(Local local) {
        this.local = local;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
