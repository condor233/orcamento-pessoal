class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for(let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }

        return true
    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if(id === null) {
            localStorage.setItem('id', 0)
        }
    
    }

    remover(id) {
        localStorage.removeItem(id)
    }

    pesquisar(despesa) {
        let despesasFiltradas = this.recuperarTodosRegistros()

        if(despesa.ano !== '') despesasFiltradas = despesasFiltradas.filter(d => d.ano === despesa.ano)
        if(despesa.mes !== '') despesasFiltradas = despesasFiltradas.filter(d => d.mes === despesa.mes)
        if(despesa.dia !== '') despesasFiltradas = despesasFiltradas.filter(d => d.dia === despesa.dia)
        if(despesa.tipo !== '') despesasFiltradas = despesasFiltradas.filter(d => d.tipo === despesa.tipo)
        if(despesa.descricao !== '') despesasFiltradas = despesasFiltradas.filter(d => d.descricao === despesa.descricao)
        if(despesa.valor !== '') despesasFiltradas = despesasFiltradas.filter(d => d.valor === despesa.valor)

        return despesasFiltradas
    }

    recuperarTodosRegistros() {
        let id = localStorage.getItem('id')
        let despesas = []
        for (let i = 1; i <= id; i++) {
            let despesa = JSON.parse(localStorage.getItem(i))
            if(localStorage.getItem(i)) {
                despesa.id = i
                despesas.push(despesa)
            }
        }
        return despesas
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(despesa) {
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(despesa))
        localStorage.setItem('id', id)
    }
}

let bd = new Bd();

function cadastrarDespesa() {
    let ano =   document.getElementById('ano')
    let mes =  document.getElementById('mes')
    let dia =  document.getElementById('dia')
    let tipo =  document.getElementById('tipo')
    let descricao =  document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa (
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    if(despesa.validarDados()) {
        bd.gravar(despesa)

        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
		document.getElementById('modal_titulo_div').className = 'modal-header text-success'
		document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso!'
		document.getElementById('modal_btn').innerHTML = 'Voltar'
		document.getElementById('modal_btn').className = 'btn btn-success'
        $('#modalRegistraDespesa').modal('show') 
        
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
    } else {
        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
		document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
		document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente!'
		document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
		document.getElementById('modal_btn').className = 'btn btn-danger'
        $('#modalRegistraDespesa').modal('show')
    }  
}

function carregaListaDespesas( despesas = Array(), filtro = false) {
    if(despesas.length === 0 && filtro === false) {
        despesas = bd.recuperarTodosRegistros()
    }

    let listaDespesas = document.getElementById('listaDespesa')
    listaDespesas.innerHTML = ''

    despesas.forEach(e => {

       let linha = listaDespesas.insertRow()

       linha.insertCell(0).innerHTML = `${e.dia}/${e.mes}/${e.ano}`

       if(e.tipo === '1') e.tipo = 'Alimentação'
       if(e.tipo === '2') e.tipo = 'Educação'
       if(e.tipo === '3') e.tipo = 'Lazer'
       if(e.tipo === '4') e.tipo = 'Saúde'
       if(e.tipo === '5') e.tipo = 'Transporte'
    
       linha.insertCell(1).innerHTML = e.tipo
       linha.insertCell(2).innerHTML = e.descricao
       linha.insertCell(3).innerHTML = e.valor

       let btn = document.createElement("button")
       btn.className = 'btn btn-danger'
       btn.innerHTML = '<i class="fas fa-times"/<i>'
       btn.id = `id_despesa_${e.id}`
       btn.onclick = function() {
           let id = this.id.replace('id_despesa_', '')
           bd.remover(id)

           window.location.reload()
       }
       linha.insertCell(4).append(btn)

       console.log(e)
    })
  
}

function pesquisarDespesa() {
    let ano =   document.getElementById('ano').value
    let mes =  document.getElementById('mes').value
    let dia =  document.getElementById('dia').value
    let tipo =  document.getElementById('tipo').value
    let descricao =  document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    despesasFiltradas = bd.pesquisar(despesa)

    carregaListaDespesas(despesasFiltradas, true)

    
}



