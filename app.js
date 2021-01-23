class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
}


function cadastrarDespesa() {
    document.getElementById('ano')
    document.getElementById('mes')
    document.getElementById('dia')
    document.getElementById('tipo')
    document.getElementById('descricao')
    document.getElementById('valor')

    let despesa = new Despesa (
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    console.log(despesa)
}

