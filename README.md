# Desafio Técnico - INOA

# Requisitos

O objetivo do sistema é **permitir que o usuário consulte o preço de fechamento diário de um ou mais ativos da B3** e exibir o resultado em um gráfico de linha numa página da web.

O programa deve possuir um front-end e um back-end, em que **o back-end consultará uma API de cotação para obter os preços e o front-end exibirá o resultado**. A linguagem, framework e bibliotecas utilizadas no front e back são de livre escolha, mas temos preferência pelo back em C# ou node e pelo front em Angular ou React.

Na tela, o usário deve conseguir preencher um formulário simples com os campos abaixo para solicitar a consulta:

1. Os ativos a serem consultados (ex: `PETR4` E `VALE3`). Caso seja escolhido mais de um, é esperado que o resultado de todos os ativos seja exibido no mesmo gráfico
2. A data de início da consulta
3. A data de fim da consulta

Quando o usuário solicitar a consulta utilizando um botão, **o front deve fazer uma chamada para o back** passando os parâmetros acima e **o back deve chamar uma API externa de cotação**, processar o resultado da API externa e retornar para o front os dados necessários para a construção do gráfico. A API externa de cotação é de livre escolha.

**Bônus: no back, persistir e/ou cachear os dados retornados pela API externa e, caso o usuário consulte ativos e datas previamente consultadas, utilizar os dados persistidos ou cacheados em vez de realizar uma nova consulta à API externa.**

# Brainstorm

- Ideias e detalhamento do processo do desafio: [BRAINSTORM.md](./BRAINSTORM.md)
