
# Brainstorm

## Lógica

- API -> brapi.dev
  - Problema 1: Plano grátis permite apenas 1 ação por request
    - *Solução escolhida: split na string de ações, loop uma por uma e soma no array de dados*
  - Problema 2: Plano grátis limita range de dados para até 3 meses atrás
    - *Solução escolhida: Implementar uma lógica que funcionaria para outros ranges, mas limitar no frontend para os últimos 3 meses, a fim de evitar erros na API.*

## Interface visual

- Gráfico: Recharts
- Card c/ dados
- Input with inner tags (OriginUI)

## Ideias de Requisitos Extras

- Modo claro e escuro
- Animações a cada interação

## A fazer

- Separar tipos em arquivos na pasta src/types
- Definir uma implementação para o filtro de datas (back ou front)
