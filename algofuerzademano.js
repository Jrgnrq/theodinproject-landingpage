
    valores = {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14}
    palos = ['C', 'D', 'H', 'S']
    
    # Inicializar contadores
    conteo_valores = {valor: 0 for valor in valores}
    conteo_palo = {palo: 0 for palo in palos}
    
    # Contar valores y palos
    for carta in mano:
        valor = carta[0]
        palo = carta[1]
        conteo_valores[valor] += 1
        conteo_palo[palo] += 1
    
    # Determinar si hay un flush
    flush = any(count >= 5 for count in conteo_palo.values())
    
    # Determinar si hay un straight
    straight = False
    valores_ordenados = sorted([valores[carta[0]] for carta in mano])
    for i in range(len(valores_ordenados) - 4):
        if valores_ordenados[i] == valores_ordenados[i + 1] - 1 == valores_ordenados[i + 2] - 2 == valores_ordenados[i + 3] - 3 == valores_ordenados[i + 4] - 4:
            straight = True
            break
    
    # Evaluar la mano
    if flush and straight:
        return 9  # Escalera de color
    elif any(count == 4 for count in conteo_valores.values()):
        return 8  # Poker
    elif any(count == 3 for count in conteo_valores.values()) and any(count == 2 for count in conteo_valores.values()):
        return 7  # Full
    elif flush:
        return 6  # Color
    elif straight:
        return 5  # Escalera
    elif any(count == 3 for count in conteo_valores.values()):
        return 4  # Trio
    elif list(conteo_valores.values()).count(2) == 2:
        return 3  # Dos pares
    elif list(conteo_valores.values()).count(2) == 1:
        return 2  # Un par
    else:
        return 1  # Carta alta

# Ejemplo de uso
mano_ejemplo = ['9C', 'TS', 'QC', 'JD', 'AH']  # Por ejemplo, nueve de tréboles, diez de espadas, reina de corazones, jota de diamantes, as de corazones
resultado = evaluar_mano(mano_ejemplo)
print("La fuerza de la mano es:", resultado)
```

Este código en Python realiza las mismas operaciones que el código JavaScript original para evaluar la fuerza de una mano de póker y devuelve el mismo resultado.