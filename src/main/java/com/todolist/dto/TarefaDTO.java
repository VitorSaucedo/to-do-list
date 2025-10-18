package com.todolist.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TarefaDTO {

    private Long id;

    @NotBlank(message = "Título não pode estar vazio")
    @Size(min = 1, max = 255, message = "Título deve ter entre 1 e 255 caracteres")
    private String titulo;

    @Size(max = 1000, message = "Descrição não pode exceder 1000 caracteres")
    private String descricao;

    private boolean concluida;

    private LocalDateTime dataCriacao;

    private LocalDateTime dataVencimento;
}
