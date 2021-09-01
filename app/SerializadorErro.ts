import Serializador from "./Serializador";

export default class SerializadorErro extends Serializador {
    contentType: string;
    camposPublicos: string[];
    tagSingular: string;
    tagPlural: string;
    constructor(contentType: string, camposExtras: any) {
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
