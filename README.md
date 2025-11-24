# Sistema de Gestão Financeira Pessoal

API REST para gerenciamento de finanças pessoais com autenticação JWT, controle de orçamento mensal, metas financeiras e transações.

## Índice

- [Instalação e Configuração](#instalação-e-configuração)
- [Documentação da API](#documentação-da-api)
  - [Rotas Públicas](#rotas-públicas)
    - [POST /auth - Login](#post-auth---login)
    - [POST /auth/register - Registro](#post-authregister---registro)
  - [Rotas Protegidas](#rotas-protegidas)
  - [Usuários](#usuários)
  - [Contas (Accounts)](#contas-accounts)
  - [Transações (Transactions)](#transações-transactions)
  - [Categorias (Categories)](#categorias-categories)
  - [Metas Financeiras (Financial Goals)](#metas-financeiras-financial-goals)
  - [Orçamento Mensal (Monthly Budget)](#orçamento-mensal-monthly-budget)
- [Segurança](#segurança)
- [Tecnologias](#tecnologias)
- [Notas](#notas)
- [Contribuindo](#contribuindo)

---

## Instalação e Configuração

### Pré-requisitos

- [Bun](https://bun.com) v1.2.21+
- PostgreSQL
- Node.js (opcional)

### Instalação

1. **Instalar Bun globalmente:**

```bash
npm install -g bun
```

2. **Instalar dependências:**

```bash
bun install
```

3. **Configurar variáveis de ambiente:**
Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
SECRET_KEY=sua_chave_secreta_super_segura
PORT=3333
```

4. **Executar migrações do banco:**

```bash
bun run drizzle-kit push
```

5. **Iniciar servidor:**

```bash
bun dev
```

O servidor estará rodando em `http://localhost:3333`

---

## Documentação da API

### Rotas Públicas

#### **POST /auth** - Login

Autenticar usuário e receber token JWT.

**Request:**

```json
{
  "email": "usuario@example.com",
  "password": "senha123"
}
```

**Response (200):**

```json
{
  "message": "Login sucessfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (401):**

```json
{
  "error": "Invalid email or password"
}
```

---

#### **POST /auth/register** - Registro

Criar nova conta de usuário.

**Request:**

```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Response (201):**

```json
{
  "message": "Request sucessfully, created user",
  "data": [{
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "João Silva",
    "email": "joao@example.com",
    "created_at": "2025-11-24T10:30:00.000Z",
    "updated_at": "2025-11-24T10:30:00.000Z"
  }]
}
```

---

### Rotas Protegidas

**Todas as rotas abaixo requerem autenticação via Bearer Token no header:**

```
Authorization: Bearer {seu_token_jwt}
```

---

## Usuários

#### **GET /user** - Listar todos os usuários

**Response (200):**

```json
{
  "message": "Requet sucessfully",
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "João Silva",
      "email": "joao@example.com",
      "created_at": "2025-11-24T10:30:00.000Z"
    }
  ]
}
```

---

#### **GET /user/:userId** - Buscar usuário por ID

**Requer:** `userId` do token = `userId` da URL

**Response (200):**

```json
{
  "message": "Request sucessfuly, user found!!"
}
```

---

#### **PUT /user/:userId** - Atualizar usuário

**Requer:** `userId` do token = `userId` da URL

**Request (partial):**

```json
{
  "name": "João da Silva Junior",
  "email": "joao.junior@example.com"
}
```

**Response (200):**

```json
{
  "message": "Request sucessfully, updated user"
}
```

---

#### **DELETE /user/:userId** - Deletar usuário

**Requer:** `userId` do token = `userId` da URL

**Response (200):**

```json
{
  "message": "Request sucessfully, deleted user"
}
```

---

## Contas (Accounts)

#### **GET /account** - Listar todas as contas

**Response (200):**

```json
{
  "message": "Request sucessfully",
  "data": [
    {
      "id": "account-uuid",
      "bank": "Banco do Brasil",
      "type": "checking",
      "balance": "5000.00",
      "is_active": true,
      "user_id": "user-uuid"
    }
  ]
}
```

---

#### **GET /account/:accountId** - Buscar conta por ID

**Response (200):**

```json
{
  "message": "Request sucessfully, account found",
  "data": {
    "id": "account-uuid",
    "bank": "Banco do Brasil",
    "type": "savings",
    "balance": "10000.00",
    "is_active": true
  }
}
```

---

#### **POST /account/user/:userId** - Criar nova conta

**Request:**

```json
{
  "bank": "Nubank",
  "type": "digital",
  "balance": "1500.00",
  "is_active": true
}
```

**Tipos válidos:** `"checking"`, `"savings"`, `"salary"`, `"investment"`, `"digital"`

**Response (201):**

```json
{
  "message": "Request sucessfully, created account",
  "data": [{
    "id": "new-account-uuid",
    "bank": "Nubank",
    "type": "digital",
    "balance": "1500.00",
    "is_active": true,
    "user_id": "user-uuid"
  }]
}
```

---

#### **PUT /account/:accountId/user/:userId** - Atualizar conta

**Requer:** `userId` do token = `userId` da URL

**Request (partial):**

```json
{
  "balance": "2000.00",
  "is_active": false
}
```

---

#### **DELETE /account/:accountId/user/:userId** - Deletar conta

**Requer:** `userId` do token = `userId` da URL

---

## Transações (Transactions)

#### **GET /transaction** - Listar todas as transações

**Response (200):**

```json
{
  "message": "Request sucessfully",
  "data": [
    {
      "id": "transaction-uuid",
      "type": "income",
      "value": "3000.00",
      "date": "2025-11-24T00:00:00.000Z",
      "description": "Salário",
      "account_id": "account-uuid",
      "category_id": "category-uuid"
    }
  ]
}
```

---

#### **GET /transaction/:transactionId** - Buscar transação por ID

---

#### **POST /transaction/user/:userId** - Criar transação

**Request:**

```json
{
  "type": "expense",
  "value": "150.50",
  "date": "2025-11-24",
  "description": "Compras no supermercado",
  "account_id": "account-uuid",
  "category_id": "category-uuid"
}
```

**Tipos válidos:** `"income"` (receita), `"expense"` (despesa)

**Response (201):**

```json
{
  "message": "Request sucessfully, created transaction",
  "data": [{
    "id": "new-transaction-uuid",
    "type": "expense",
    "value": "150.50",
    "date": "2025-11-24T00:00:00.000Z",
    "description": "Compras no supermercado"
  }]
}
```

---

#### **PUT /transaction/:transactionId/user/:userId** - Atualizar transação

**Requer:** `userId` do token = `userId` da URL

---

#### **DELETE /transaction/:transactionId/user/:userId** - Deletar transação

**Requer:** `userId` do token = `userId` da URL

---

#### **GET /transaction/category/:categoryId/user/:userId** - Listar por categoria

**Requer:** `userId` do token = `userId` da URL

---

## Categorias (Categories)

#### **GET /category** - Listar todas as categorias

**Response (200):**

```json
{
  "message": "Request sucessfully",
  "data": [
    {
      "id": "category-uuid",
      "name": "Alimentação",
      "type": "variable"
    }
  ]
}
```

---

#### **POST /category** - Criar categoria

**Request:**

```json
{
  "name": "Moradia",
  "type": "fix"
}
```

**Tipos válidos:** `"fix"` (fixa), `"variable"` (variável)

**Response (201):**

```json
{
  "message": "Request sucessfully, created category",
  "data": [{
    "id": "new-category-uuid",
    "name": "Moradia",
    "type": "fix"
  }]
}
```

---

#### **PUT /category/:categoryId** - Atualizar categoria

---

#### **DELETE /category/:categoryId** - Deletar categoria

---

## Metas Financeiras (Financial Goals)

#### **GET /financial-goal** - Listar todas as metas

**Response (200):**

```json
{
  "message": "Request sucessfully",
  "data": [
    {
      "id": "goal-uuid",
      "description": "Comprar um carro",
      "target_value": "50000.00",
      "current_value": "15000.00",
      "deadline": "2026-12-31T00:00:00.000Z",
      "user_id": "user-uuid"
    }
  ]
}
```

---

#### **POST /financial-goal/user/:userId** - Criar meta

**Request:**

```json
{
  "description": "Viagem para Europa",
  "target_value": 20000,
  "current_value": 5000,
  "deadline": "2026-06-30"
}
```

**Response (201):**

```json
{
  "message": "Request sucessfully, created financial goal",
  "data": [{
    "id": "new-goal-uuid",
    "description": "Viagem para Europa",
    "target_value": "20000.00",
    "current_value": "5000.00",
    "deadline": "2026-06-30T00:00:00.000Z"
  }]
}
```

---

#### **PUT /financial-goal/:financialGoalId/user/:userId** - Atualizar meta

**Requer:** `userId` do token = `userId` da URL

---

#### **DELETE /financial-goal/:financialGoalId/user/:userId** - Deletar meta

**Requer:** `userId` do token = `userId` da URL

---

## Orçamento Mensal (Monthly Budget)

#### **GET /monthly-budget** - Listar todos os orçamentos

**Response (200):**

```json
{
  "message": "Request sucessfully",
  "data": [
    {
      "id": "budget-uuid",
      "month": "Nov",
      "year": "2025",
      "limit_value": "5000.00",
      "spent_value": "3200.00",
      "user_id": "user-uuid"
    }
  ]
}
```

---

#### **POST /monthly-budget/user/:userId** - Criar orçamento

**Request:**

```json
{
  "month": "Dec",
  "year": "2025",
  "limit_value": "6000.00",
  "spent_value": "0.00"
}
```

**Meses válidos:** `"Jan"`, `"Feb"`, `"Mar"`, `"Apr"`, `"May"`, `"Jun"`, `"Jul"`, `"Aug"`, `"Sep"`, `"Oct"`, `"Nov"`, `"Dec"`

**Response (201):**

```json
{
  "message": "Request sucessfully, created monthly budget",
  "data": [{
    "id": "new-budget-uuid",
    "month": "Dec",
    "year": "2025",
    "limit_value": "6000.00",
    "spent_value": "0.00"
  }]
}
```

---

#### **PUT /monthly-budget/:monthlyBudgetId/user/:userId** - Atualizar orçamento

**Requer:** `userId` do token = `userId` da URL

---

#### **DELETE /monthly-budget/:monthlyBudgetId/user/:userId** - Deletar orçamento

**Requer:** `userId` do token = `userId` da URL

---

## Segurança

- **Autenticação:** JWT (JSON Web Token) com expiração de 4 horas
- **Autorização:** Middleware `isOwnerMiddleware` verifica propriedade dos recursos
- **Hash de senhas:** bcrypt com 10 salt rounds
- **CORS:** Habilitado para todas as origens
- **Validação:** Zod para validação de schemas em todas as rotas

---

## Tecnologias

- **Runtime:** Bun v1.2.21+
- **Framework:** Express.js
- **ORM:** Drizzle ORM
- **Banco de dados:** PostgreSQL
- **Autenticação:** JWT (jsonwebtoken)
- **Validação:** Zod
- **Hash:** bcryptjs

---

## Notas

- Todas as datas devem estar no formato ISO 8601
- Valores monetários são strings no formato `"0000.00"`
- UUIDs são gerados automaticamente pelo banco de dados
- Tokens JWT expiram em 4 horas

---

## Contribuindo

Este projeto foi criado para a disciplina de Arquitetura Orientada a Serviços (AOS) 2025-2.
