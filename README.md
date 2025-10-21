# 📋 To-Do List App

Uma aplicação web moderna de gerenciamento de tarefas desenvolvida com **Java 21 + Spring Boot** no backend e **HTML5 + CSS3 + JavaScript Vanilla** no frontend.

![Java](https://img.shields.io/badge/Java-21-blue?style=flat-square) ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.0-green?style=flat-square) ![Maven](https://img.shields.io/badge/Maven-3.8.1-orange?style=flat-square) ![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

## ✨ Características

**Funcionalidades:** Criar, listar, editar, deletar tarefas | Marcar como concluída | Filtrar (todas/pendentes/concluídas) | Estatísticas em tempo real | Tema escuro/claro com persistência local

**Design & UX:** Interface responsiva (mobile-first) | Design moderno com gradientes e animações | Tema escuro/claro com transições suaves | Acessível com semântica HTML

**Tecnologias:** Java 21 | Spring Boot 3.4.0 | JPA/Hibernate | H2 Database | HTML5 + CSS3 | JavaScript Vanilla | Maven 3.8.1+

## 📋 Pré-requisitos

- **Java 21+** — [Download JDK](https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html)
- **Maven 3.8.1+** — [Download Maven](https://maven.apache.org/download.cgi)
- **Git** — [Download Git](https://git-scm.com/)

```bash
java -version && mvn -version && git --version
```

## 🚀 Instalação e Execução

```bash
# 1. Clonar repositório
git clone https://github.com/seu-usuario/todo-app.git && cd todo-app

# 2. Compilar
mvn clean install

# 3. Executar
mvn spring-boot:run
```

Acesse em `http://localhost:8080`

## 📂 Estrutura do Projeto

```
todo-app/
├── pom.xml
├── src/main/java/com/todoapp/
│   ├── TodoAppApplication.java
│   ├── config/WebConfig.java (CORS)
│   ├── controller/TarefaController.java
│   ├── service/TarefaService.java
│   ├── repository/TarefaRepository.java
│   ├── entity/Tarefa.java
│   ├── dto/TarefaDTO.java
│   └── exception/{TarefaNaoEncontradaException, GlobalExceptionHandler}.java
├── src/main/resources/
│   ├── application.yml
│   └── static/{index.html, css/style.css, js/app.js}
└── src/test/java/
```

## 📡 API REST

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/tarefas` | Listar todas |
| GET | `/api/tarefas/pendentes` | Listar pendentes |
| GET | `/api/tarefas/concluidas` | Listar concluídas |
| GET | `/api/tarefas/{id}` | Obter por ID |
| POST | `/api/tarefas` | Criar tarefa |
| PUT | `/api/tarefas/{id}` | Atualizar tarefa |
| PATCH | `/api/tarefas/{id}/toggle` | Alternar conclusão |
| DELETE | `/api/tarefas/{id}` | Deletar tarefa |

**Exemplo (cURL):**
```bash
# Criar
curl -X POST http://localhost:8080/api/tarefas \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Estudar","descricao":"Spring Boot","dataVencimento":"2025-10-25T18:00:00"}'

# Listar
curl http://localhost:8080/api/tarefas
```

## 🗄️ Banco de Dados

O projeto usa **H2 em memória**. Acesse o console em `http://localhost:8080/h2-console`

**Credenciais:** URL: `jdbc:h2:mem:tododb` | Usuário: `sa` | Senha: (vazia)

## 🔧 Comandos Úteis

```bash
# Maven
mvn clean compile && mvn test && mvn clean package

# Git
git checkout -b feature/nova-funcionalidade
git commit -m "Descrição" && git push origin feature/nova-funcionalidade

# Resolver porta em uso
lsof -i :8080 && kill -9 <PID>  # Mac/Linux
netstat -ano | findstr :8080 && taskkill /PID <PID> /F  # Windows
```

## 🎓 Conceitos Aprendidos

**Backend:** Arquitetura em camadas | REST API | JPA/Hibernate | Tratamento de exceções global | Bean Validation | CORS | DTOs | Padrão Repository

**Frontend:** Fetch API | DOM Manipulation | CSS moderno (Flexbox/Grid) | Responsividade | Animações | Validação de formulários | Formatação de datas

## 🎨 Tema Escuro/Claro

Clique no ícone **🌙** no header para alternar temas. Sua preferência é salva automaticamente.

## 🚀 Melhorias Futuras

Autenticação JWT | Categorias/Tags | Prioridades | Busca avançada | Exportar (CSV/PDF) | Notificações | WebSocket | Testes completos | Swagger/OpenAPI | Paginação | Compartilhamento | Recorrência | Histórico | App mobile

## 🐛 Troubleshooting

| Erro | Solução |
|------|---------|
| Porta 8080 em uso | `lsof -i :8080 && kill -9 <PID>` |
| Maven não encontrado | Verificar PATH: `mvn -version` |
| Java incompatível | Verificar versão: `java -version` (precisa 21+) |
| CORS | Validar `WebConfig.java` |
| BD não criado | Verificar `ddl-auto: create-drop` em `application.yml` |

## 📝 Padrões

Clean Code | REST API Standards | SOLID Principles | DRY | Mobile-first | Semantic HTML | Acessibilidade WCAG

---

Licença: [MIT](LICENSE) | Autor: Vitor Saucedo, 2025 | Projeto educacional
