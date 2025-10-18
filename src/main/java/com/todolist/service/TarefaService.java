package com.todolist.service;

import com.todolist.dto.TarefaDTO;
import com.todolist.entity.Tarefa;
import com.todolist.exception.TarefaNaoEncontradaException;
import com.todolist.repository.TarefaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class TarefaService {

    private final TarefaRepository tarefaRepository;

    public List<TarefaDTO> listarTodas() {
        return tarefaRepository.findAllOrderByDataCriacaoDesc()
                .stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    public List<TarefaDTO> listarPendentes() {
        return tarefaRepository.findTarefasPendentes()
                .stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    public List<TarefaDTO> listarConcluidas() {
        return tarefaRepository.findTarefasConcluidas()
                .stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    public TarefaDTO obterPorId(Long id) {
        Tarefa tarefa = tarefaRepository.findById(id)
                .orElseThrow(() -> new TarefaNaoEncontradaException(id));
        return converterParaDTO(tarefa);
    }

    public TarefaDTO criar(TarefaDTO tarefaDTO) {
        Tarefa tarefa = new Tarefa();
        tarefa.setTitulo(tarefaDTO.getTitulo());
        tarefa.setDescricao(tarefaDTO.getDescricao());
        tarefa.setDataVencimento(tarefaDTO.getDataVencimento());

        Tarefa tarefaSalva = tarefaRepository.save(tarefa);
        return converterParaDTO(tarefaSalva);
    }

    public TarefaDTO atualizar(Long id, TarefaDTO tarefaDTO) {
        Tarefa tarefa = tarefaRepository.findById(id)
                .orElseThrow(() -> new TarefaNaoEncontradaException(id));

        tarefa.setTitulo(tarefaDTO.getTitulo());
        tarefa.setDescricao(tarefaDTO.getDescricao());
        tarefa.setDataVencimento(tarefaDTO.getDataVencimento());
        tarefa.setConcluida(tarefaDTO.isConcluida());

        Tarefa tarefaAtualizada = tarefaRepository.save(tarefa);
        return converterParaDTO(tarefaAtualizada);
    }

    public TarefaDTO alternarConclusao(Long id) {
        Tarefa tarefa = tarefaRepository.findById(id)
                .orElseThrow(() -> new TarefaNaoEncontradaException(id));

        tarefa.setConcluida(!tarefa.isConcluida());
        Tarefa tarefaAtualizada = tarefaRepository.save(tarefa);
        return converterParaDTO(tarefaAtualizada);
    }

    public void deletar(Long id) {
        if (!tarefaRepository.existsById(id)) {
            throw new TarefaNaoEncontradaException(id);
        }
        tarefaRepository.deleteById(id);
    }

    private TarefaDTO converterParaDTO(Tarefa tarefa) {
        return new TarefaDTO(
                tarefa.getId(),
                tarefa.getTitulo(),
                tarefa.getDescricao(),
                tarefa.isConcluida(),
                tarefa.getDataCriacao(),
                tarefa.getDataVencimento()
        );
    }
}
