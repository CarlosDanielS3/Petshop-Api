export class NaoEncontrado extends Error {
    idErro: number
    constructor (nome) {
        super(`${nome} não foi encontrado!`)
        this.name = 'NaoEncontrado'
        this.idErro = 0
    }
}

module.exports = NaoEncontrado