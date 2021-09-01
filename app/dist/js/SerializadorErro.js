import Serializador from "./Serializador";
export default class SerializadorErro extends Serializador {
    constructor(contentType, camposExtras) {
        super();
        this.contentType = contentType;
        this.camposPublicos = [
            'id',
            'mensagem'
        ].concat(camposExtras || []);
        this.tagSingular = 'erro';
        this.tagPlural = 'erros';
    }
}
//# sourceMappingURL=SerializadorErro.js.map