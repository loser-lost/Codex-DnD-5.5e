

export function removerAcentos(texto: String) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}