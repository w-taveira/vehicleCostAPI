# 🚗 Vehicle Cost & Pricing Analysis API

API desenvolvida em **NestJS** para análise de custos operacionais de veículos, cálculo de preço por quilômetro e verificação de viabilidade financeira, considerando **Pessoa Física (PF)** e **Pessoa Jurídica (PJ)**.

O sistema oferece dois modos de análise:
- **Básico** – cálculo direto e rápido
- **Avançado** – cálculo iterativo com ajuste preciso de impostos e lucro alvo

---

## ✨ Funcionalidades

- Cálculo de custos operacionais por km
- Cálculo de preço mínimo necessário por km
- Análise de viabilidade financeira
- Suporte a **PF e PJ**, com regras tributárias distintas
- Modo **Básico** e **Avançado**
- Validação completa de dados com `class-validator`
- Arquitetura limpa baseada em **Use Cases**
- Pronto para uso com **Docker**

---

## 🧠 Conceitos aplicados

- Clean Architecture (Use Cases + Domain)
- Strategy Pattern para impostos
- Separação clara entre lógica básica e avançada
- Validação de entrada via DTOs
- Código preparado para expansão futura (auth, histórico, banco de dados)

---

## 🛠️ Tecnologias

- Node.js
- NestJS
- TypeScript
- Docker
- class-validator
- class-transformer

---

## 📦 Instalação

### Pré-requisitos
- Node.js 18+
- Docker (opcional)

### Instalação local

```bash
npm install
npm run start:dev
```

### A API estará disponível em:
```bash
http://localhost:3000
```

### 🐳 Executando com Docker

```bash
docker build -t vehicle-api .
docker run -p 3000:3000 vehicle-api
```
---

## 📡 Endpoints

### 🔹 Análise Básica

```bash
POST /vehicle/analyze/basic
```
Calcula custos, preço necessário e viabilidade de forma direta.

### 🔹 Análise Avançada

```bash
POST /vehicle/analyze/advanced
```
Executa cálculo iterativo para encontrar o preço por km ideal que atinge exatamente o lucro alvo, considerando impostos reais.

### 🔹 Preço Necessário por Km

```bash
POST /vehicle/required-price
```
Retorna o preço mínimo por km e o ponto de equilíbrio.

---

## 🧾 Exemplo de Request

```bash
{
  "kmPerMonth": 5000,
  "profitTarget": 5000,
  "taxType": "PF",
  "fuelConsumptionPerLiter": 10,
  "fuelPricePerLiter": 6,
  "tireDurabilityKm": 40000,
  "tireCost": 2000,
  "oilChangeIntervalKm": 10000,
  "oilChangeCost": 300,
  "vehicleValue": 60000,
  "annualDepreciationRate": 0.1,
  "fipeValue": 60000,
  "ipvaRate": 0.04,
  "insuranceAnnualCost": 2400
}
```

---

## ⚠️ Validação de Dados

Todos os campos são validados automaticamente.
Exemplo de erro:

```bash
{
  "statusCode": 400,
  "message": [
    "kmPerMonth must be greater than zero",
    "profitTarget must be greater than zero",
    "taxType must be one of the following values: PF, PJ"
  ],
  "error": "Bad Request"
}
```

---

## 🧮 Diferença entre Básico e Avançado

| Modo     | Descrição                                               |
| -------- | ------------------------------------------------------- |
| Básico   | Usa uma taxa fixa de imposto                            |
| Avançado | Ajusta o preço iterativamente até atingir o lucro exato |

---

## 🚀 Roadmap (futuro)

- Autenticação por API Key
- Histórico de simulações
- Persistência em banco de dados
- Dashboard web
- Rate limiting
- Deploy automatizado

---

## 📄 Licença

Este projeto está sob licença MIT.

---

## 👤 Autor

Desenvolvido por Wellington Oliveira Guedes Taveira

---
