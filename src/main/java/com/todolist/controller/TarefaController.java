package com.todolist.controller;

import com.todolist.dto.TarefaDTO;
import com.todolist.service.TarefaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tarefas")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class TarefaController {

    private final TarefaService tarefaService;

    @GetMapping
    public ResponseEntity<List<TarefaDTO>> listarTodas() {
        List<TarefaDTO> tarefas = tarefaService.listarTodas();
        return ResponseEntity.ok(tarefas);
    }

    @GetMapping("/pendentes")
    public ResponseEntity<List<TarefaDTO>> listarPendentes() {
        List<TarefaDTO> tarefas = tarefaService.listarPendentes();
        return ResponseEntity.ok(tarefas);
    }

    @GetMapping("/concluidas")
    public ResponseEntity<List<TarefaDTO>> listarConcluidas() {
        List<TarefaDTO> tarefas = tarefaService.listarConcluidas();
        return ResponseEntity.ok(tarefas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TarefaDTO> obterPorId(@PathVariable Long id) {
        TarefaDTO tarefa = tarefaService.obterPorId(id);
        return ResponseEntity.ok(tarefa);
    }

    @PostMapping
    public ResponseEntity<TarefaDTO> criar(@Valid @RequestBody TarefaDTO tarefaDTO) {
        TarefaDTO novaTarefa = tarefaService.criar(tarefaDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaTarefa);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TarefaDTO> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody TarefaDTO tarefaDTO) {
        TarefaDTO tarefaAtualizada = tarefaService.atualizar(id, tarefaDTO);
        return ResponseEntity.ok(tarefaAtualizada);
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<TarefaDTO> alternarConclusao(@PathVariable Long id) {
        TarefaDTO tarefaAtualizada = tarefaService.alternarConclusao(id);
        return ResponseEntity.ok(tarefaAtualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        tarefaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
