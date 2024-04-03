function evaluarMano(mano) {
    const valores = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14 };
    const palos = ['C', 'D', 'H', 'S'];

    // Inicializar contadores
    const conteoValores = {};
    const conteoPalo = {};
    Object.keys(valores).forEach(valor => conteoValores[valor] = 0);
    palos.forEach(palo => conteoPalo[palo] = 0);

    // Contar valores y palos
    mano.forEach(carta => {
        const valor = carta[0];
        const palo = carta[1];
        conteoValores[valor]++;
        conteoPalo[palo]++;
    });

    // Determinar si hay un flush
    const flush = Object.values(conteoPalo).some(count => count >= 5);

    // Determinar si hay un straight
    let straight = false;
    const valoresOrdenados = mano.map(carta => valores[carta[0]]).sort((a, b) => a - b);
    for (let i = 0; i <= valoresOrdenados.length - 5; i++) {
        if (valoresOrdenados[i] === valoresOrdenados[i + 1] - 1 &&
            valoresOrdenados[i + 1] === valoresOrdenados[i + 2] - 1 &&
            valoresOrdenados[i + 2] === valoresOrdenados[i + 3] - 1 &&
            valoresOrdenados[i + 3] === valoresOrdenados[i + 4] - 1) {
            straight = true;
            break;
        }
    }

    // Evaluar la mano
    if (flush && straight) {
        return 9; // Escalera de color
    } else if (Object.values(conteoValores).some(count => count === 4)) {
        return 8; // Poker
    } else if (Object.values(conteoValores).some(count => count === 3) && Object.values(conteoValores).some(count => count === 2)) {
        return 7; // Full
    } else if (flush) {
        return 6; // Color
    } else if (straight) {
        return 5; // Escalera
    } else if (Object.values(conteoValores).some(count => count === 3)) {
        return 4; // Trio
    } else if (Object.values(conteoValores).filter(count => count === 2).length === 2) {
        return 3; // Dos pares
    } else if (Object.values(conteoValores).filter(count => count === 2).length === 1) {
        return 2; // Un par
    } else {
        return 1; // Carta alta
    }
}

// Ejemplo de uso
const manoEjemplo = ['9C', 'TS', 'QC', 'JD', 'AH']; // Por ejemplo, nueve de tréboles, diez de espadas, reina de corazones, jota de diamantes, as de corazones
const resultado = evaluarMano(manoEjemplo);
console.log("La fuerza de la mano es:", resultado);