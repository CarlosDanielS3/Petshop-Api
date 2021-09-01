import ValorNaoSuportado  from './erros/ValorNaoSuportado'
import SerializadorErro from './SerializadorErro'
const jsontoxml = require('jsontoxml')

export default class Serializador {
    contentType: string
    tagSingular: any
    tagPlural: any
    camposPublicos: any
    json (dados: any) {
        return JSON.stringify(dados)
    }

    xml (dados: any[]) {
        let tag = this.tagSingular

        if (Array.isArray(dados)) {
            tag = this.tagPlural
            dados = dados.map((item) => {
                return {
                    [this.tagSingular]: item
                }
            })
        }

        return jsontoxml({ [tag]: dados })
    }

    serializar (dados: any) {
        dados = this.filtrar(dados)

        if (this.contentType === 'application/json') {
            return this.json(dados)
        }

        if (this.contentType === 'application/xml') {
            return this.xml(dados)
        }

        throw new ValorNaoSuportado(this.contentType)
    }

    filtrarObjeto (dados: { [x: string]: any; hasOwnProperty: (arg0: any) => any }) {
        const novoObjeto = {}

        this.camposPublicos.forEach((campo: string | number) => {
            if (dados.hasOwnProperty(campo)) {
                novoObjeto[campo] = dados[campo]
            }
        })

        return novoObjeto
    }

    filtrar (dados: any[] | any): any {
        if (Array.isArray(dados)) {
            dados = dados.map(item => {
                return this.filtrarObjeto(item)
            })
        } else {
            dados = this.filtrarObjeto(dados) 
        }

        return dados
    }
}

class SerializadorFornecedor extends Serializador {
    constructor (contentType: string, camposExtras: any) {
        super()
        this.contentType = contentType
        this.camposPublicos = [
            'id',
            'categoria'
        ].concat(camposExtras || [])
        this.tagSingular = 'fornecedor'
        this.tagPlural = 'fornecedores'
    }
}

class SerializadorProduto extends Serializador {
    contentType: string
    camposPublicos: string[]
    tagSingular: string
    tagPlural: string
    constructor (contentType: string, camposExtras: any) {
        super()
        this.contentType = contentType
        this.camposPublicos = [
            'id',
            'titulo'
        ].concat(camposExtras || [])
        this.tagSingular = 'produto'
        this.tagPlural = 'produtos'
    }
}

module.exports = {
    Serializador: Serializador,
    SerializadorFornecedor: SerializadorFornecedor,
    SerializadorErro: SerializadorErro,
    SerializadorProduto: SerializadorProduto,
    formatosAceitos: ['application/json', 'application/xml']
}