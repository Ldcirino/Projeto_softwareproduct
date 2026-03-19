package com.leo.Gymfocus.dto;

import lombok.Data;

@Data
public class CalculadoraBasalRequestDTO {

    private double peso;
    private double altura;
    private int idade;
    private String sexo;
    private int nivelAtividade;
}