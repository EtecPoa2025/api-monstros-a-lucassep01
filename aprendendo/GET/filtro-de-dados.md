# Filtros de Dados

Para rotas do tipo GET existem regras e boas práticas para filtrar dados atráves da URL. Iremos abordar como selecionar um dado especifico e como utilizar "QueryString" para filtrar dados.

### Selecionando por ID do registro

É possivel selecionar por ID um registro, basta informar o ID do registro após o nome do recurso consultado.

Exemplo:

GET `/monstros/1`

**Retorna:**

```javascript
{
    "id": 1,
    "nome": "James P. Sullivan",
    "descricao": "Monstro gigante similar a um minotauro peludo com dois chifres na cabeça. Ele tem imensa massa de gordura e pelos azulados com manchas púrpuras. Seus pés e mãos possuem pequenas garras além de dentes afiados escondidos dentro da boca. Seu rabo é grosso e pontudo igual ao de um dinossauro. Ele mede 2,28 m e pesa 360 kg.",
    "tipo_criatura": "Minotauro Peludo",
    "pontos_vida": 15,
    "ataque": 1,
    "defesa": 3,
    "habitat": "Universidade Monstros S.A."
}
```

### 2. Filtro de dados na URL (Query String)

A capacidade de filtrar dados diretamente na URL é uma das características mais poderosas das APIs REST, pois permite que o front-end ou qualquer outra aplicação consuma apenas o que é necessário. Isso otimiza o desempenho e a flexibilidade.

Os filtros na URL são geralmente implementados através dos parâmetros de consulta (Query Parameters). Eles são a parte da URL que vem depois do ponto de interrogação (?).

#### Filtros por Propriedade Específica

Este filtro permite buscar recursos com base em um valor exato de uma de suas propriedades.

Sintaxe: `?nome_da_propriedade=valor`

Exemplo: `GET /monstros?tipo_criatura=Besta`

(Retorna todos os monstros cujo tipo de criatura seja "Besta").

#### Filtros de Intervalo (Range Filters)

Estes filtros são ideais para propriedades numéricas ou de data. Eles permitem buscar recursos dentro de um intervalo de valores.

Sintaxe: Geralmente usamos parâmetros com sufixos _min ou _max.

Exemplo na API de Monstros:

GET /monstros?pontos_vida_min=50&pontos_vida_max=150

(Retorna monstros com pontos de vida entre 50 e 150).

#### Filtros de Busca por Texto

Este filtro busca recursos que contenham uma determinada palavra-chave em uma ou mais propriedades de texto (como nome ou descricao).

Sintaxe: ?busca=palavra_chave ou ?q=palavra_chave

Exemplo na API de Monstros:

GET /monstros?busca=fogo

(Retorna monstros cujo nome ou descrição contenha a palavra "fogo", como "Dragão Vermelho").

#### Filtros de Ordenação (Sorting)
A ordenação permite que o cliente da API defina a ordem em que os resultados devem ser retornados.

Sintaxe: ?ordenar_por=nome_da_propriedade&direcao=asc ou direcao=desc. A direção é opcional, sendo asc (ascendente) o padrão.

Exemplo na API de Monstros:

GET /monstros?ordenar_por=ataque&direcao=desc

(Retorna a lista de monstros ordenada pelo ataque, do mais forte para o mais fraco).


#### Como Combina-los?

O grande poder dos filtros de URL é que eles podem ser combinados uns com os outros usando o caractere &.

Exemplo Combinado na API de Monstros:

GET /monstros?tipo_criatura=Besta&pontos_vida_min=50&ordenar_por=ataque&direcao=desc

(Retorna todas as "Bestas" com mais de 50 pontos de vida, ordenadas do ataque mais forte para o mais fraco).
