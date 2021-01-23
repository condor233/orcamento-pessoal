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

    recuperarTodosRegistros() {
        let id = localStorage.getItem('id')
        let despesas = []
        for (let i = 1; i <= id; i++) {
            let despesa = JSON.parse(localStorage.getItem(i))
            if(localStorage.getItem(i)) {
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

function carregaListaDespesas() {
    let despesas = bd.recuperarTodosRegistros()

    let listaDespesas = document.getElementById('listaDespesa')

    despesas.forEach(e => {

       let linha = listaDespesas.insertRow()

       linha.insertCell(0).innerHTML = `${e.dia}/${e.mes}/${e.ano}`
       switch(e.tipo) {
           case '1': e.tipo = 'Alimentação'
           break
           case '2': e.tipo = 'Educação'
           break
           case '3': e.tipo = 'Lazer'
           break
           case '4': e.tipo = 'Saúde'
           break
           case '5': e.tipo = 'Transporte'
           break
       }
       linha.insertCell(1).innerHTML = e.tipo
       linha.insertCell(2).innerHTML = e.descricao
       linha.insertCell(3).innerHTML = e.valor
    })
  
}



