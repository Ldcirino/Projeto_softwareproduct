package com.leo.Gymfocus.controller;

import com.leo.Gymfocus.dto.CalculadoraBasalRequestDTO;
import com.leo.Gymfocus.model.CalculadoraBasal;
import com.leo.Gymfocus.service.CalculadoraBasalService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/calculadora-basal")
public class CalculadoraBasalController {

    private final CalculadoraBasalService service;

    public CalculadoraBasalController(CalculadoraBasalService service) {
        this.service = service;
    }

    @PostMapping("/calcular")
    public ResponseEntity<CalculadoraBasal> calcular(@RequestBody CalculadoraBasalRequestDTO request) {

        CalculadoraBasal resultado = service.calcularESalvar(request);

        return ResponseEntity.ok(resultado);
    }
}
