type LettersAndComponentsType = {
    (html: string): [number, number, string];
    (html: string, onlyCount: 'Y' | 'N'): [number, number, string];
};

export const lettersAndComponents: LettersAndComponentsType = (html, onlyCount = 'N') => {
    // Contar letras y componentes (puedes ajustar esta lógica según tu caso real)
    const letterCount = html.replace(/<[^>]+>/g, '').length; // Contar solo las letras excluyendo etiquetas HTML
    const componentCount = (html.match(/<\/?[a-z][^>]*>/gi) || []).length; // Contar etiquetas HTML

    if (onlyCount === 'Y') {
        // Si solo queremos contar, devolvemos [number, number]
        return [letterCount, componentCount, ''];
    }

    // Si queremos el conteo y algo más (por ejemplo, el HTML sin etiquetas)
    const modifiedHtml = html.replace(/<[^>]+>/g, ''); // El HTML sin etiquetas

    return [letterCount, componentCount, modifiedHtml]; // Devolvemos [number, number, string]
};


export const serializeText = (text: string): string  => {
    const result = decodeHTMLEntities(
        text.replaceAll(/<br>/g, '\n\r')
        .replaceAll(/(<)(\w+)(>)/g,'')
        .replaceAll(/(<\/)(\w+)(>)/g,'')
    );
    return result;
};


export const decodeHTMLEntities = (text: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value;
};