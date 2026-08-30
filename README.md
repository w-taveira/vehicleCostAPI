# Vehicle Cost API

API NestJS para analisar custos operacionais de veículos, calcular preço por quilômetro, ponto de equilíbrio e viabilidade nos cenários de pessoa física e jurídica.

## Arquitetura

O projeto separa regras de domínio, casos de uso e adaptações de transporte. Estratégias específicas encapsulam regras que variam entre os cenários PF e PJ, enquanto DTOs validam as entradas da API.

## Stack

- NestJS e TypeScript
- class-validator e class-transformer
- Jest e Supertest

## Executar localmente

```bash
npm install
npm run start:dev
```

## Testes

```bash
npm test
npm run test:e2e
```

## Escopo atual

O repositório é uma API de estudo aplicada a um problema de domínio. Não inclui deploy público nem containerização versionada neste momento.
