package com.leo.Gymfocus.service;

import com.leo.Gymfocus.model.CalculadoraBasal;
import com.leo.Gymfocus.dto.CalculadoraBasalRequestDTO;
import com.leo.Gymfocus.repository.CalculadoraBasalRepository;
import org.springframework.stereotype.Service;

@Service
public class CalculadoraBasalService {

    private final CalculadoraBasalRepository repository;

    public CalculadoraBasalService(CalculadoraBasalRepository repository) {
        this.repository = repository;
    }

    public CalculadoraBasal calcularESalvar(CalculadoraBasalRequestDTO request) {

        double basal;

        if (request.getSexo().equalsIgnoreCase("masculino")) {
            basal = 88.36 + (13.4 * request.getPeso())
                    + (4.8 * request.getAltura())
                    - (5.7 * request.getIdade());
        } else {
            basal = 447.6 + (9.2 * request.getPeso())
                    + (3.1 * request.getAltura())
                    - (4.3 * request.getIdade());
        }


        double fator = switch (request.getNivelAtividade()) {
            case 0 -> 1.2;
            case 1 -> 1.375;
            case 2 -> 1.55;
            case 3 -> 1.725;
            case 4 -> 1.9;
            default -> 1.2;
        };

        double totalCalorias = basal * fator;

        CalculadoraBasal entidade = new CalculadoraBasal();
        entidade.setPeso(request.getPeso());
        entidade.setAltura(request.getAltura());
        entidade.setIdade(request.getIdade());
        entidade.setSexo(request.getSexo());

        entidade.setResultado(basal);
        entidade.setCaloriasTotais(totalCalorias);

        return repository.save(entidade);
    }
}