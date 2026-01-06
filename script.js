// Guarda todos os veículos registrados
const historico = []

// Classe base para todos os veículos
class Veiculos {
    constructor(modelo, placa, ano) {
        this.modelo = modelo
        this.ano = ano
        this.placa = placa
    }
}

// Carro herda de Veículos
class Carro extends Veiculos {
    constructor(modelo, placa, ano, diaria) {
        super(modelo, placa, ano)
        this.diaria = diaria
    }

    // Carro: R$ 100 por diária
    calcularTotal() {
        return this.diaria * 100
    }
}

// Caminhão herda de Veículos
class Caminhao extends Veiculos {
    constructor(modelo, placa, ano, km) {
        super(modelo, placa, ano)
        this.kmRodado = km
    }

    // Caminhão: R$ 200 + R$ 10 por km
    calcularTotal() {
        const valorKm = 10 * this.kmRodado
        return 200 + valorKm
    }
}

// Coleta dados do formulário e cria um veículo
function getDados() {
    const nomeCliente = document.getElementById('nome').value
    const cpf = document.getElementById('cpf').value
    const categoria = document.getElementById('categoria').value
    const modelo = document.getElementById('modelo').value
    const placa = document.getElementById('placa').value
    const ano = document.getElementById('ano').value
    const diaria = Number(document.getElementById('diaria').value)
    const kmRodado = Number(document.getElementById('km').value)

    let veiculos;

    // Cria o veículo correto baseado na categoria selecionada
    if (categoria === "Carro") {
        veiculos = new Carro(modelo, placa, ano, diaria)
    } else if (categoria === "Caminhão") {
        veiculos = new Caminhao(modelo, placa, ano, kmRodado)
    } else {
        alert(`Selecione uma categoria válida!`)
    }

    if (veiculos) {
        veiculos.nome = nomeCliente
        veiculos.cpf = cpf
        veiculos.categoria = categoria
        historico.push(veiculos)
        const total = veiculos.calcularTotal()
        const resultado = document.getElementById('resultado')
        const htmlResultado = `
        <div class="resultado">
            <h1>Aluguel Registrado</h1>
            
            <h2>Detalhes do Cliente</h2>
            <p><strong>Nome:</strong> ${nomeCliente}</p>
            <p><strong>CPF:</strong> ${cpf}</p>
            
            <h2>Detalhes do Veículo</h2>
            <p><strong>Tipo:</strong> ${categoria}</p>
            <p><strong>Modelo:</strong> ${modelo}</p>
            <p><strong>Placa:</strong> ${placa}</p>
            
            <h2>Valor Total</h2>
            <p class="valorTotal">R$ ${total.toFixed(2)}</p>

            <button type="button" onclick="notaFiscal()">📄 Gerar Nota Fiscal</button>
        </div>
        `
        // "IMPRIME" O RESULTADO NO HTML
        resultado.innerHTML = htmlResultado

        // ROLA PARA O RESULTADO
        resultado.scrollIntoView({ behavior: 'smooth' })

        // RESETA OS INPUTS DO FORMULÁRIO PARA ADIOCIONAR UM NOVO CLIENTE
        document.getElementById('formulario').reset()
    }
}

// Gera a nota fiscal em PDF
function notaFiscal() {
    const { jsPDF } = window.jspdf
    const doc = new jsPDF()

    // Pega os dados do último veículo
    const dados = historico[historico.length - 1]
    const total = dados.calcularTotal()
    const data = new Date().toLocaleDateString('pt-BR')
    const numero = historico.length

    // CABEÇALHO
    doc.setFontSize(16)
    doc.text("NOTA FISCAL", 105, 15, { align: 'center' })
    doc.setFontSize(10)
    doc.text(`Nº: ${numero}`, 15, 25)
    doc.text(`Data: ${data}`, 15, 32)
    doc.line(15, 35, 195, 35)

    // CLIENTE
    doc.setFontSize(12)
    doc.text("INFORMAÇÔES DO CLIENTE", 15, 45)
    doc.setFontSize(10)
    doc.text(`Nome: ${dados.nome}`, 15, 52)
    doc.text(`CPF: ${dados.cpf}`, 15, 58)
    doc.line(15, 62, 195, 62)

    // VEÍCULO
    doc.setFontSize(12)
    doc.text("INFORMAÇÔES DO VEÍCULO", 15, 70)
    doc.setFontSize(10)
    doc.text(`Modelo: ${dados.modelo}`, 15, 77)
    doc.text(`Placa: ${dados.placa}`, 15, 83)
    doc.text(`Ano: ${dados.ano}`, 15, 89)
    doc.line(15, 93, 195, 93)

    // CÁLCULO
    doc.setFontSize(12)
    doc.text("CÁLCULO", 15, 102)
    doc.setFontSize(10)

    // SE TIVER DIARIA É CARRO, SE NÃO É CAMINHÃO
    if (dados.diaria) {
        doc.text(`Valor por diária: R$ 100`, 15, 109)
        doc.text(`Diárias: ${dados.diaria}`, 15, 115)
        doc.text(`Total: R$ ${total.toFixed(2)}`, 15, 120)
    } else {
        doc.text(`Valor base: R$ 200`, 15, 109)
        doc.text(`Valor por km: R$ 10`, 15, 115)
        doc.text(`KM: ${dados.kmRodado}`, 15, 121)
        doc.text(`Total: R$ ${total.toFixed(2)}`, 15, 127)
    }
    doc.line(15, 130, 195, 130)

    // RODAPÉ
    doc.setFontSize(9)
    doc.text("Obrigado!", 105, 280, { align: 'center' })
    // SALVA PDF
    doc.save(`nota-fiscal-${numero}.pdf`)
}

console.log(historico)

// Gera relatório completo de aluguéis do dia
function gerarRelatorio() {
    const { jsPDF } = window.jspdf
    const doc = new jsPDF()

    const data = new Date().toLocaleDateString('pt-BR')
    let totalGeral = 0
    let posicao = 85

    // Calcula total geral
    for (let i = 0; i < historico.length; i++) {
        totalGeral += historico[i].calcularTotal()
    }

    // CABEÇALHO
    doc.setFontSize(16)
    doc.text("RELATÓRIO DE ALUGUÉIS", 105, 15, { align: 'center' })

    doc.setFontSize(10)
    doc.text(`Data: ${data}`, 15, 25)
    doc.line(15, 30, 195, 30)

    // RESUMO
    doc.setFontSize(12)
    doc.text("RESUMO DO DIA", 15, 40)

    doc.setFontSize(10)
    doc.text(`Total de aluguéis: ${historico.length}`, 15, 50)
    doc.text(`Total arrecadado: R$ ${totalGeral.toFixed(2)}`, 15, 57)
    doc.line(15, 63, 195, 63)

    // DETALHES DOS ALUGUÉIS
    doc.setFontSize(12)
    doc.text("DETALHES DOS ALUGUÉIS", 15, 73)

    doc.setFontSize(9)

    // Lista cada aluguel
    for (let i = 0; i < historico.length; i++) {
        const veiculo = historico[i]
        const total = veiculo.calcularTotal()
        const numero = i + 1

        doc.text(`${numero}. ${veiculo.nome} - CPF: ${veiculo.cpf}`, 15, posicao)
        posicao += 6

        doc.text(`Tipo: ${veiculo.categoria} | Modelo: ${veiculo.modelo}`, 15, posicao)
        posicao += 5

        doc.text(`Placa: ${veiculo.placa}`, 15, posicao)
        posicao += 5

        if (veiculo.diaria) {
            doc.text(`${veiculo.diaria} diárias x R$ 100 = R$ ${total.toFixed(2)}`, 15, posicao)
        } else {
            doc.text(`${veiculo.kmRodado} km x R$ 10 + R$ 200 = R$ ${total.toFixed(2)}`, 15, posicao)
        }
        posicao += 8
    }

    // TOTAL
    doc.setFontSize(10)
    doc.text(`TOTAL GERAL: R$ ${totalGeral.toFixed(2)}`, 15, 270)

    doc.setFontSize(9)
    doc.text("Relatório gerado automaticamente", 105, 280, { align: 'center' })

    // SALVA PDF
    doc.save(`relatorio-alugueis.pdf`)
}