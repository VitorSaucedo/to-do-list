# 📋 To-Do List App

Uma aplicação web moderna de gerenciamento de tarefas desenvolvida com **Java 21 + Spring Boot** no backend e **HTML5 + CSS3 + JavaScript Vanilla** no frontend.

![Java](https://img.shields.io/badge/Java-21-blue?style=flat-square)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.0-green?style=flat-square)
![Maven](https://img.shields.io/badge/Maven-3.8.1-orange?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

## ✨ Características

### 🎯 Funcionalidades Principais
- ✅ **Criar tarefas** - Adicione novas tarefas com título, descrição e data de vencimento
- ✅ **Listar tarefas** - Visualize todas as suas tarefas organizadas
- ✅ **Editar tarefas** - Modifique tarefas existentes através de um modal elegante
- ✅ **Deletar tarefas** - Remova tarefas que não precisa mais
- ✅ **Marcar como concluída** - Alterne o status das tarefas com um clique
- ✅ **Filtrar tarefas** - Visualize todas, apenas pendentes ou concluídas
- ✅ **Estatísticas** - Acompanhe o total, pendentes e concluídas em tempo real
- ✅ **Tema escuro/claro** - Alterne entre temas com preferência salva localmente

### 🎨 Design & UX
- 📱 **Responsivo** - Funciona perfeitamente em desktop, tablet e mobile
- 🌈 **Design moderno** - Interface limpa com gradientes, sombras e animações
- ⚡ **Transições suaves** - Animações elegantes para melhor experiência
- 🎯 **Intuitivo** - Interface fácil de usar sem necessidade de documentação
- 🛡️ **Acessível** - Semântica HTML e validações de entrada
- 🌓 **Tema escuro/claro** - Alterne entre temas com um clique

### 🔧 Tecnologias
- **Backend:** Java 21, Spring Boot 3.4.0, JPA/Hibernate, H2 Database
- **Frontend:** HTML5, CSS3 (Flexbox/Grid), JavaScript Vanilla
- **Build:** Maven 3.8.1+
- **API:** REST com CORS habilitado

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Java 21+** - [Download JDK](https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html)
- **Maven 3.8.1+** - [Download Maven](https://maven.apache.org/download.cgi)
- **Git** - [Download Git](https://git-scm.com/)

### Verificar instalação:
```bash
java -version
mvn -version
git --version
```

## 🚀 Instalação e Execução

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/seu-usuario/todo-app.git
cd todo-app
```

### 2️⃣ Compilar o projeto
```bash
mvn clean install
```

Isso vai:
- Baixar todas as dependências
- Compilar o código Java
- Executar os testes
- Empacotar a aplicação

### 3️⃣ Executar a aplicação
```bash
mvn spring-boot:run
```

Ou após compilar:
```bash
java -jar target/todo-app-1.0.0.jar
```

### 4️⃣ Acessar a aplicação
Abra seu navegador e acesse:
```
http://localhost:8080
```

## 📂 Estrutura do Projeto

```
todo-app/
├── pom.xml                                  # Configuração Maven
├── README.md                                # Este arquivo
├── src/
│   ├── main/
│   │   ├── java/com/todoapp/
│   │   │   ├── TodoAppApplication.java      # Classe principal
│   │   │   ├── config/
│   │   │   │   └── WebConfig.java           # Configuração CORS
│   │   │   ├── controller/
│   │   │   │   └── TarefaController.java    # REST Controllers
│   │   │   ├── service/
│   │   │   │   └── TarefaService.java       # Lógica de negócio
│   │   │   ├── repository/
│   │   │   │   └── TarefaRepository.java    # Acesso a dados
│   │   │   ├── entity/
│   │   │   │   └── Tarefa.java              # Modelo de dados
│   │   │   ├── dto/
│   │   │   │   └── TarefaDTO.java           # Data Transfer Object
│   │   │   └── exception/
│   │   │       ├── TarefaNaoEncontradaException.java
│   │   │       └── GlobalExceptionHandler.java
│   │   └── resources/
│   │       ├── application.yml              # Configuração da aplicação
│   │       └── static/
│   │           ├── index.html               # Página principal
│   │           ├── css/
│   │           │   └── style.css            # Estilos
│   │           └── js/
│   │               └── app.js               # Lógica do frontend
│   └── test/
│       └── java/                            # Testes unitários
└── target/                                  # Arquivos compilados
```

## 📡 API REST

### Endpoints Disponíveis

#### 📥 Listar todas as tarefas
```http
GET /api/tarefas
```
**Resposta:** Array de tarefas

#### 🔍 Listar tarefas pendentes
```http
GET /api/tarefas/pendentes
```
**Resposta:** Array de tarefas não concluídas

#### ✅ Listar tarefas concluídas
```http
GET /api/tarefas/concluidas
```
**Resposta:** Array de tarefas concluídas

#### 📝 Obter tarefa por ID
```http
GET /api/tarefas/{id}
```
**Resposta:**
```json
{
  "id": 1,
  "titulo": "Comprar leite",
  "descricao": "Comprar leite integral no supermercado",
  "concluida": false,
  "dataCriacao": "2025-10-17T10:30:00",
  "dataVencimento": "2025-10-20T18:00:00"
}
```

#### ➕ Criar nova tarefa
```http
POST /api/tarefas
Content-Type: application/json

{
  "titulo": "Comprar leite",
  "descricao": "Comprar leite integral",
  "dataVencimento": "2025-10-20T18:00:00"
}
```

#### ✏️ Atualizar tarefa
```http
PUT /api/tarefas/{id}
Content-Type: application/json

{
  "titulo": "Comprar leite desnatado",
  "descricao": "Comprar leite desnatado no supermercado",
  "concluida": false,
  "dataVencimento": "2025-10-20T18:00:00"
}
```

#### 🔄 Alternar conclusão da tarefa
```http
PATCH /api/tarefas/{id}/toggle
```
**Nota:** Inverte o status de concluída

#### 🗑️ Deletar tarefa
```http
DELETE /api/tarefas/{id}
```

## 🗄️ Banco de Dados

### H2 Console
Durante o desenvolvimento, você pode acessar o H2 Console para gerenciar o banco de dados:

```
http://localhost:8080/h2-console
```

**Credenciais:**
- **URL:** `jdbc:h2:mem:tododb`
- **User:** `sa`
- **Password:** (deixar em branco)

### Configuração
O banco de dados está configurado em `src/main/resources/application.yml`:
- **Banco:** H2 em memória (automático)
- **DDL:** Create-drop (recria tabelas a cada inicialização)
- **Hibernate:** Auto-configurado

## 🔧 Comandos Úteis

### Maven
```bash
# Compilar
mvn clean compile

# Executar testes
mvn test

# Empacotar
mvn clean package

# Executar a aplicação
mvn spring-boot:run

# Limpar cache
mvn clean
```

### Git
```bash
# Clonar repositório
git clone https://github.com/seu-usuario/todo-app.git

# Criar branch
git checkout -b feature/nova-funcionalidade

# Commit
git commit -m "Descrição do commit"

# Push
git push origin feature/nova-funcionalidade
```

## 📲 Testando a API com cURL

### Criar tarefa
```bash
curl -X POST http://localhost:8080/api/tarefas \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Estudar Spring Boot",
    "descricao": "Aprender REST APIs",
    "dataVencimento": "2025-10-25T18:00:00"
  }'
```

### Listar tarefas
```bash
curl http://localhost:8080/api/tarefas
```

### Atualizar tarefa
```bash
curl -X PUT http://localhost:8080/api/tarefas/1 \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Estudar Spring Boot",
    "descricao": "Aprender REST APIs e JPA",
    "concluida": false
  }'
```

### Alternar conclusão
```bash
curl -X PATCH http://localhost:8080/api/tarefas/1/toggle
```

### Deletar tarefa
```bash
curl -X DELETE http://localhost:8080/api/tarefas/1
```

## 🎓 Aprendizado

Este projeto demonstra:

### Backend (Java/Spring Boot)
- ✅ Arquitetura em camadas (Controller → Service → Repository)
- ✅ REST API com Spring Web
- ✅ JPA/Hibernate para persistência
- ✅ Tratamento de exceções global
- ✅ Validação de dados com Bean Validation
- ✅ CORS configurado
- ✅ DTOs para transferência de dados
- ✅ Padrão Repository

### Frontend (HTML/CSS/JavaScript)
- ✅ Fetch API para requisições HTTP
- ✅ DOM Manipulation
- ✅ Event Listeners
- ✅ CSS moderno (Flexbox, Grid, Gradients)
- ✅ Responsividade (Mobile-first)
- ✅ Animações CSS
- ✅ Validação de formulários
- ✅ Formatação de datas
- ✅ Tratamento de erros

## 🚀 Melhorias Futuras

- [x] Temas (claro/escuro)
- [ ] Autenticação e autorização (JWT)
- [ ] Categorias/Tags para tarefas
- [ ] Prioridades (Alta, Média, Baixa)
- [ ] Busca e filtro avançado
- [ ] Exportar tarefas (CSV, PDF)
- [ ] Notificações por email
- [ ] WebSocket para tempo real
- [ ] Testes unitários completos
- [ ] Documentação Swagger/OpenAPI
- [ ] Paginação
- [ ] Compartilhamento de tarefas
- [ ] Recorrência de tarefas
- [ ] Histórico de alterações
- [ ] App mobile (Flutter/React Native)

## 🐛 Troubleshooting

### Erro: "port 8080 already in use"
```bash
# Linux/Mac
lsof -i :8080
kill -9 <PID>

# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### Erro: "Maven not found"
Certifique-se que Maven está instalado e adicionado ao PATH:
```bash
mvn -version
```

### Erro: "Java version not compatible"
Verifique se você tem Java 21+:
```bash
java -version
```

### Erro: CORS
Verifique se o `WebConfig.java` está configurado corretamente em `src/main/java/com/todoapp/config/`

### Banco de dados não criado
Verifique o `application.yml` e certifique-se que a propriedade `ddl-auto` está como `create-drop`

## 📝 Padrões e Boas Práticas

Este projeto segue:

- **Clean Code** - Código legível e bem estruturado
- **REST API Standards** - HTTP methods apropriados
- **SOLID Principles** - Separação de responsabilidades
- **DRY (Don't Repeat Yourself)** - Código reutilizável
- **Responsive Design** - Mobile-first
- **Semantic HTML** - HTML bem estruturado
- **Acessibilidade** - WCAG guidelines

## 🎨 Temas (Claro/Escuro)

A aplicação possui suporte completo para tema claro e escuro!

### Como usar:
1. Clique no botão **🌙** (lua) no canto superior direito do header
2. A interface alternará para o **tema escuro**
3. Clique novamente no botão **☀️** (sol) para voltar ao **tema claro**
4. Sua preferência é **salva automaticamente** no navegador

### Características:
- ✅ Detecção automática de preferência do sistema operacional
- ✅ Persistência de preferência no localStorage
- ✅ Transição suave entre temas
- ✅ Tema escuro otimizado para reduzir fadiga ocular
- ✅ Cores ajustadas para melhor contraste em ambos os temas

---



Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

Vitor Saucedo, 2025.

Desenvolvido como projeto educacional.