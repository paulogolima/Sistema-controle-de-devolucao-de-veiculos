# Sistema de Controle de Devolução de Veículos

Um sistema web para gerenciar devoluções de aluguel de veículos (carros e caminhões) com geração automática de notas fiscais e relatórios em PDF.

## Sobre o Projeto

Este sistema foi desenvolvido para facilitar o controle de devoluções de uma locadora de veículos. Permite registrar informações do cliente e do veículo, calcular automaticamente o valor do aluguel e gerar documentos em PDF.

## Funcionalidades

- **Registro de Cliente**: Coleta nome e CPF do cliente
- **Seleção de Veículo**: Suporta Carros e Caminhões com cálculos diferentes
- **Cálculo Automático**:
- **Carro**: R$ 100 por diária
- **Caminhão**: R$ 200 base + R$ 10 por km rodado
- **Gerar Nota Fiscal**: PDF individual para cada aluguel
- **Gerar Relatório**: PDF com resumo completo do dia
- **Interface Amigável**: Design responsivo com gradiente roxo

## Tecnologias Utilizadas

- **HTML5** - Estrutura
- **CSS3** - Estilização (Flexbox, Gradientes, Transições)
- **JavaScript** - Lógica da aplicação
- **jsPDF** - Geração de PDFs
- **POO (Programação Orientada a Objetos)** - Classes e herança

## Como Usar

### 1. Preencher Informações do Cliente

- Nome do Cliente
- CPF do Cliente

### 2. Selecionar e Registrar Veículo

- Escolher categoria (Carro ou Caminhão)
- Informar modelo, ano e placa
- Para **Carro**: preencher quantidade de diárias
- Para **Caminhão**: preencher km rodado

### 3. Finalizar Devolução

- Clicar em " Finalizar Devolução"
- O sistema calcula automaticamente o valor
- Aparece opção para gerar nota fiscal

### 4. Gerar Documentos

- **Nota Fiscal Individual**: Clique no botão dentro do resultado
- **Relatório do Dia**: Clique em " Relatório" (mostra todos os aluguéis do dia)

## Estrutura do Projeto

```
devolucao-veiculos/
├── index.html       # Página principal com formulário
├── script.js        # Lógica da aplicação (classes e funções)
├── styles.css       # Estilização
└── README.md        # Este arquivo
```

## Arquitetura do Código

### Classes Principais

```javascript
// Classe Base
class Veiculos {
    constructor(modelo, placa, ano)
    calcularTotal()
}

// Classes Derivadas
class Carro extends Veiculos
class Caminhao extends Veiculos
```

### Funções Principais

| Função             | Descrição                                     |
| ------------------ | --------------------------------------------- |
| `getDados()`       | Coleta dados do formulário e registra aluguel |
| `notaFiscal()`     | Gera PDF da nota fiscal individual            |
| `gerarRelatorio()` | Gera PDF com relatório de todos os aluguéis   |

### Array de Histórico

- Armazena todos os aluguéis registrados no dia
- Utilizado para calcular totais e gerar relatórios

## Interface

A interface possui:

- **Gradiente roxo** no fundo (#667eea → #764ba2)
- **Cards brancos** com sombras suaves
- **Botões com hover effects** (movimento + sombra)
- **Inputs com focus animado** (borda roxo)
- **Resultado destacado** com gradiente suave

## Como Instalar

1. **Clone ou baixe o projeto**

```bash
git clone <seu-repositorio>
cd devolucao-veiculos
```

2. **Abra no navegador**

- Abra `index.html` diretamente no navegador
- Ou use um servidor local (Live Server, etc.)

3. **Pronto!**

- O sistema está pronto para usar
- Não precisa de instalação adicional

## Exemplos de Uso

### Exemplo 1: Aluguel de Carro

```
Cliente: João Silva | CPF: 123.456.789-00
Carro: Fiat Uno | Placa: ABC-1234 | Ano: 2020
Diárias: 5
Cálculo: 5 × R$ 100 = R$ 500,00
```

### Exemplo 2: Aluguel de Caminhão

```
Cliente: Maria Santos | CPF: 987.654.321-11
Caminhão: Volvo | Placa: XYZ-5678 | Ano: 2019
Km Rodado: 150
Cálculo: (150 × R$ 10) + R$ 200 = R$ 1700,00
```

## Relatório Diário

O relatório em PDF inclui:

- Data do dia
- Total de aluguéis registrados
- Total arrecadado
- Detalhes de cada aluguel (cliente, veículo, cálculo)

## Conceitos Aprendidos

Programação Orientada a Objetos (POO)
Herança entre classes
Manipulação do DOM
Geração de documentos PDF
Arrays e iteração
Estruturas condicionais
Design responsivo

## Autor

Paulo Guilherme Oliveira de Lima
paulogolimacontato@gmail.com
+55 (79) 9 9684-9530

---

**Status**: Funcional | **Última atualização**: Janeiro 2026
