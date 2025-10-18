package com.todolist.repository;

import com.todolist.entity.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TarefaRepository extends JpaRepository<Tarefa, Long> {

    @Query("SELECT t FROM Tarefa t ORDER BY t.dataCriacao DESC")
    List<Tarefa> findAllOrderByDataCriacaoDesc();

    List<Tarefa> findByConcluida(boolean concluida);

    @Query("SELECT t FROM Tarefa t WHERE t.concluida = false ORDER BY t.dataCriacao DESC")
    List<Tarefa> findTarefasPendentes();

    @Query("SELECT t FROM Tarefa t WHERE t.concluida = true ORDER BY t.dataCriacao DESC")
    List<Tarefa> findTarefasConcluidas();
}
