package com.leo.Gymfocus.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Calculadorabasal")
@Data
public class CalculadoraBasal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double peso;
    private double altura;
    private int idade;
    private String sexo;
    private double resultado;
    private double caloriasTotais;
}