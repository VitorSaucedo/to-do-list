package com.todolist.exception;

public class TarefaNaoEncontradaException extends RuntimeException {

    public TarefaNaoEncontradaException(Long id) {
        super("Tarefa com ID " + id + " não foi encontrada");
    }

    public TarefaNaoEncontradaException(String mensagem) {
        super(mensagem);
    }
}
