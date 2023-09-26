package com.Barberia.Barber;

import com.Barberia.Barber.Model.Barbero;
import com.Barberia.Barber.Service.BarberoService;
import jakarta.persistence.Id;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
public class IntegrationBarberoTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private BarberoService barberoService;

    public void cargarDataSet(){
       Barbero b = barberoService.guardarbarbero(new Barbero("01", 44523473L, "Nico", "Pascu", "3413858352", "nico@gmail.com"));
    }
    @Test
    public void listarbarberos() throws Exception {
        this.cargarDataSet();
        MvcResult response = mockMvc.perform(MockMvcRequestBuilders.get("/barbero/obtenerDNI/{dni}", 44523473L).accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk()).andReturn();

        Assert.assertFalse(response.getResponse().getContentAsString().isEmpty());
    }
}
