// ===== API Configuration =====
const API_BASE_URL = 'http://localhost:8080/api/tarefas';

// ===== DOM Elements =====
const tarefaForm = document.getElementById('tarefaForm');
const tituloInput = document.getElementById('titulo');
const descricaoInput = document.getElementById('descricao');
const dataVencimentoInput = document.getElementById('dataVencimento');
const tarefasList = document.getElementById('tarefasList');
const alertContainer = document.getElementById('alertContainer');
const filterBtns = document.querySelectorAll('.filter-btn');
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const modalClose = document.querySelector('.modal-close');
const btnCancel = document.querySelector('.btn-cancel');
const editTituloInput = document.getElementById('editTitulo');
const editDescricaoInput = document.getElementById('editDescricao');
const editDataVencimentoInput = document.getElementById('editDataVencimento');
const totalTarefasEl = document.getElementById('totalTarefas');
const tarefasPendentesEl = document.getElementById('tarefasPendentes');
const tarefasConcluidasEl = document.getElementById('tarefasConcluidas');
const themeToggle = document.getElementById('themeToggle');

// ===== State =====
let tarefas = [];
let filtroAtual = 'todas';
let tarefaEmEdicao = null;

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', () => {
    inicializarTema();
    carregarTarefas();
    configurarEventos();
});

// ===== Event Listeners =====
function configurarEventos() {
    tarefaForm.addEventListener('submit', adicionarTarefa);
    editForm.addEventListener('submit', salvarEdicao);
    modalClose.addEventListener('click', fecharModal);
    btnCancel.addEventListener('click', fecharModal);
    editModal.addEventListener('click', (e) => {
        if (e.target === editModal) fecharModal();
    });
    themeToggle.addEventListener('click', alternarTema);

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filtroAtual = btn.dataset.filter;
            atualizarFiltro();
        });
    });
}

// ===== Fetch Tarefas =====
async function carregarTarefas() {
    try {
        mostrarCarregamento();
        const response = await fetch(API_BASE_URL);

        if (!response.ok) {
            throw new Error('Erro ao carregar tarefas');
        }

        tarefas = await response.json();
        atualizarFiltro();
    } catch (error) {
        console.error('Erro:', error);
        mostrarAlerta('Erro ao carregar tarefas', 'error');
    }
}

// ===== Adicionar Tarefa =====
async function adicionarTarefa(e) {
    e.preventDefault();

    const novasTarefa = {
        titulo: tituloInput.value.trim(),
        descricao: descricaoInput.value.trim() || null,
        dataVencimento: dataVencimentoInput.value || null
    };

    if (!novasTarefa.titulo) {
        mostrarAlerta('Por favor, preencha o título', 'warning');
        return;
    }

    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novasTarefa)
        });

        if (!response.ok) {
            throw new Error('Erro ao adicionar tarefa');
        }

        const tarefaCriada = await response.json();
        tarefas.unshift(tarefaCriada);

        tarefaForm.reset();
        atualizarFiltro();
        mostrarAlerta('Tarefa adicionada com sucesso!', 'success');
    } catch (error) {
        console.error('Erro:', error);
        mostrarAlerta('Erro ao adicionar tarefa', 'error');
    }
}

// ===== Atualizar Status =====
async function alternarConclusao(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}/toggle`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar tarefa');
        }

        const tarefaAtualizada = await response.json();
        const index = tarefas.findIndex(t => t.id === id);
        if (index !== -1) {
            tarefas[index] = tarefaAtualizada;
        }

        atualizarFiltro();
        mostrarAlerta(
            tarefaAtualizada.concluida ? 'Tarefa marcada como concluída' : 'Tarefa marcada como pendente',
            'success'
        );
    } catch (error) {
        console.error('Erro:', error);
        mostrarAlerta('Erro ao atualizar tarefa', 'error');
    }
}

// ===== Abrir Modal Edição =====
function abrirModal(id) {
    const tarefa = tarefas.find(t => t.id === id);
    if (!tarefa) return;

    tarefaEmEdicao = tarefa;
    editTituloInput.value = tarefa.titulo;
    editDescricaoInput.value = tarefa.descricao || '';
    editDataVencimentoInput.value = formatarDataParaInput(tarefa.dataVencimento);

    editModal.classList.add('show');
}

// ===== Fechar Modal =====
function fecharModal() {
    editModal.classList.remove('show');
    tarefaEmEdicao = null;
}

// ===== Salvar Edição =====
async function salvarEdicao(e) {
    e.preventDefault();

    if (!tarefaEmEdicao) return;

    const tarefaAtualizada = {
        titulo: editTituloInput.value.trim(),
        descricao: editDescricaoInput.value.trim() || null,
        dataVencimento: editDataVencimentoInput.value || null,
        concluida: tarefaEmEdicao.concluida
    };

    if (!tarefaAtualizada.titulo) {
        mostrarAlerta('Por favor, preencha o título', 'warning');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/${tarefaEmEdicao.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tarefaAtualizada)
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar tarefa');
        }

        const resultado = await response.json();
        const index = tarefas.findIndex(t => t.id === tarefaEmEdicao.id);
        if (index !== -1) {
            tarefas[index] = resultado;
        }

        fecharModal();
        atualizarFiltro();
        mostrarAlerta('Tarefa atualizada com sucesso!', 'success');
    } catch (error) {
        console.error('Erro:', error);
        mostrarAlerta('Erro ao atualizar tarefa', 'error');
    }
}

// ===== Deletar Tarefa =====
async function deletarTarefa(id) {
    if (!confirm('Tem certeza que deseja deletar esta tarefa?')) return;

    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Erro ao deletar tarefa');
        }

        tarefas = tarefas.filter(t => t.id !== id);
        atualizarFiltro();
        mostrarAlerta('Tarefa deletada com sucesso!', 'success');
    } catch (error) {
        console.error('Erro:', error);
        mostrarAlerta('Erro ao deletar tarefa', 'error');
    }
}

// ===== Atualizar Filtro =====
function atualizarFiltro() {
    let tarefasFiltradas = tarefas;

    switch (filtroAtual) {
        case 'pendentes':
            tarefasFiltradas = tarefas.filter(t => !t.concluida);
            break;
        case 'concluidas':
            tarefasFiltradas = tarefas.filter(t => t.concluida);
            break;
    }

    renderizarTarefas(tarefasFiltradas);
    atualizarEstatisticas();
    atualizarBotoesAtivos();
}

// ===== Renderizar Tarefas =====
function renderizarTarefas(tarefasParaRenderizar) {
    if (tarefasParaRenderizar.length === 0) {
        tarefasList.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon">📝</span>
                <p>Nenhuma tarefa encontrada. Crie uma nova tarefa para começar!</p>
            </div>
        `;
        return;
    }

    tarefasList.innerHTML = tarefasParaRenderizar.map(tarefa => `
        <div class="task-item ${tarefa.concluida ? 'completed' : ''}">
            <input 
                type="checkbox" 
                class="task-checkbox" 
                ${tarefa.concluida ? 'checked' : ''}
                onchange="alternarConclusao(${tarefa.id})"
            >
            <div class="task-content">
                <div class="task-titulo">${escaparHTML(tarefa.titulo)}</div>
                ${tarefa.descricao ? `<div class="task-descricao">${escaparHTML(tarefa.descricao)}</div>` : ''}
                <div class="task-meta">
                    <span>📅 ${formatarData(tarefa.dataCriacao)}</span>
                    ${tarefa.dataVencimento ? `<span>⏰ Vence: ${formatarData(tarefa.dataVencimento)}</span>` : ''}
                </div>
            </div>
            <div class="task-actions">
                <button class="btn-icon edit" onclick="abrirModal(${tarefa.id})" title="Editar">✏️</button>
                <button class="btn-icon delete" onclick="deletarTarefa(${tarefa.id})" title="Deletar">🗑️</button>
            </div>
        </div>
    `).join('');
}

// ===== Atualizar Estatísticas =====
function atualizarEstatisticas() {
    const total = tarefas.length;
    const pendentes = tarefas.filter(t => !t.concluida).length;
    const concluidas = tarefas.filter(t => t.concluida).length;

    totalTarefasEl.textContent = total;
    tarefasPendentesEl.textContent = pendentes;
    tarefasConcluidasEl.textContent = concluidas;
}

// ===== Atualizar Botões de Filtro =====
function atualizarBotoesAtivos() {
    filterBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filtroAtual);
    });
}

// ===== Mostrar Alerta =====
function mostrarAlerta(mensagem, tipo = 'info') {
    const alerta = document.createElement('div');
    alerta.className = `alert ${tipo}`;
    alerta.innerHTML = `
        <span>${tipo === 'success' ? '✅' : tipo === 'error' ? '❌' : '⚠️'}</span>
        <span>${mensagem}</span>
    `;

    alertContainer.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 4000);
}

// ===== Mostrar Carregamento =====
function mostrarCarregamento() {
    tarefasList.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div class="spinner"></div>
            <p style="margin-top: 16px; color: var(--text-secondary);">Carregando tarefas...</p>
        </div>
    `;
}

// ===== Formatação de Data =====
function formatarData(dataString) {
    if (!dataString) return 'Sem data';

    const data = new Date(dataString);
    const hoje = new Date();
    const ontem = new Date(hoje);
    ontem.setDate(ontem.getDate() - 1);

    const opções = { day: '2-digit', month: '2-digit', year: 'numeric' };

    if (data.toDateString() === hoje.toDateString()) {
        return 'Hoje';
    } else if (data.toDateString() === ontem.toDateString()) {
        return 'Ontem';
    } else {
        return data.toLocaleDateString('pt-BR', opções);
    }
}

// ===== Formatar Data para Input =====
function formatarDataParaInput(dataString) {
    if (!dataString) return '';

    const data = new Date(dataString);
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');

    return `${ano}-${mes}-${dia}T${horas}:${minutos}`;
}

// ===== Escapar HTML =====
function escaparHTML(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}

// ===== Theme Management =====
function inicializarTema() {
    const temaSalvo = localStorage.getItem('tema');
    const preferenciaSistema = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const usarDarkTheme = temaSalvo === 'dark' || (temaSalvo === null && preferenciaSistema);

    if (usarDarkTheme) {
        document.documentElement.classList.add('dark-theme');
        themeToggle.textContent = '☀️';
    } else {
        document.documentElement.classList.remove('dark-theme');
        themeToggle.textContent = '🌙';
    }
}

function alternarTema() {
    const isDarkTheme = document.documentElement.classList.toggle('dark-theme');

    if (isDarkTheme) {
        localStorage.setItem('tema', 'dark');
        themeToggle.textContent = '☀️';
    } else {
        localStorage.setItem('tema', 'light');
        themeToggle.textContent = '🌙';
    }
}