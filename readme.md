# Sistema de Gerenciamento de Tarefas

Este é um sistema backend para gerenciamento de tarefas, desenvolvido com Node.js, Express e TypeScript. O sistema utiliza uma arquitetura moderna e boas práticas de desenvolvimento.

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas, utilizando os seguintes padrões de design:

- **Repository Pattern**: Para abstração do acesso aos dados
- **Service Layer Pattern**: Para lógica de negócios
- **Controller Pattern**: Para manipulação de requisições HTTP
- **Middleware Pattern**: Para processamento intermediário de requisições
- **Validation Pattern**: Para validação de dados usando Zod e Joi

### Estrutura de Diretórios

```
src/
├── controllers/    # Controladores da aplicação
├── middlewares/    # Middlewares personalizados
├── routes/         # Definição das rotas
├── services/       # Lógica de negócios
├── validations/    # Schemas de validação
├── utils/          # Utilitários e helpers
└── server.ts       # Arquivo principal da aplicação
```

## 🛠️ Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- Prisma (ORM)
- Zod e Joi (Validação)
- Jest (Testes)
- bcrypt (Criptografia de senhas)
- jsonwebtoken (Autenticação)
- cors (Segurança)
- axios (Requisições HTTP)

## 🚀 Rotas Disponíveis

### Tarefas
- `GET /tasks` - Lista todas as tarefas
- `GET /tasks/:id` - Obtém uma tarefa específica
- `POST /tasks` - Cria uma nova tarefa (requer autenticação)
- `PUT /tasks/:id` - Atualiza uma tarefa (requer autenticação)
- `DELETE /tasks/:id` - Remove uma tarefa (requer autenticação)
- `POST /tasks/:id/assign` - Atribui um responsável à tarefa (requer autenticação)
- `GET /tasks/priority/:priorityId` - Lista tarefas por prioridade (requer autenticação)
- `GET /tasks/responsible/:responsibleId` - Lista tarefas por responsável (requer autenticação)
- `GET /tasks/creator/:creatorId` - Lista tarefas por criador (requer autenticação)
- `GET /tasks/tag/:tagId` - Lista tarefas por tag (requer autenticação)

### Tags
- `GET /tags` - Lista todas as tags
- `POST /tags` - Cria uma nova tag
- `GET /tags/:id` - Obtém uma tag específica
- `PUT /tags/:id` - Atualiza uma tag
- `DELETE /tags/:id` - Remove uma tag

### Prioridades
- `GET /priorities` - Lista todas as prioridades
- `POST /priorities` - Cria uma nova prioridade
- `GET /priorities/:id` - Obtém uma prioridade específica
- `PUT /priorities/:id` - Atualiza uma prioridade
- `DELETE /priorities/:id` - Remove uma prioridade

### Usuários
- `POST /users/login` - Realiza login do usuário
- `GET /users` - Lista todos os usuários
- `GET /users/:id` - Obtém um usuário específico
- `PUT /users/:id` - Atualiza um usuário
- `DELETE /users/:id` - Remove um usuário

## 📦 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Banco de dados PostgreSQL

## 🔧 Configuração e Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd task-management
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
DATABASE_URL="postgresql://user:password@localhost:5432/task_management"
PORT=3000
```

4. Execute as migrações do banco de dados:
```bash
npx prisma migrate dev
```

5. (Opcional) Execute o seed para popular o banco com dados iniciais:
```bash
npm run seed
```

## 🚀 Executando o Projeto

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

### Testes
```bash
npm test
```

## 📝 Licença

Este projeto está sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Contribuição

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
