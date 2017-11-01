#Sudoku 1vs1
La idea es programar un generador de sudokus con tres niveles de dificultad y medir el tiempo que tardan dos jugadores diferentes en resolverlo para calcular un ganador.

##Objetos del Sudoku

+ **cells** = un número para indicar el tamaño del sudoku. Por defecto, el estandar es 9, una tabla de 9x9 (81 números) pero estaría bien que fuera capaz de condicionar el sudoku que se monta cambiando este número.
+ **boxSize** = el número que celdas que tiene cada una de las "cajas" en las que tampoco se puden repetir los números.
+ **digits** = un array con los números admitidos en el sudoku
+ **board** = un array de 9 arrays de números entre el 1 y el 9 con la particularidad de que no pueden repetirse números entre filas, columnas o 'tablas' (matrices 3x3 de 9 números)
+ **level** = un array de valores para seleccionar la dificultad del sudoku a resolver y que básicamente establecen el número de casillas que se vacían.
+ **playerSudoku** = un array que proviene del primero y usa el level para vaciar los espacios que deberá adivinar y rellenar el player. Así le podemos enseñar los fallos.
+ **initialSudoku** = un array que proviene del primero, pero que tiene los espacios vacíos que deberá adivinar el player. (Tendremos que almacenarlo si queremos que el player2 juegue con el mismo)
+ **hits** = un contador de aciertos para usar al evaluar si está correcto. Esto no lo tengo claro, porque que la solución no sea unica condiciona todo esto.
+ **player1Time** = para almacenar el tiempo del jugador 1
+ **player2Time** = para almacenar el tiempo del jugador 2


##Métodos
+ **shuffle** = genera un nuevo array de sudoku con las particularidades especificadas arriba
+ **push** = inserta el valor introducido por el player en su array
+ **pop** = borra del array del player valores introducidos
+ **check** = compara los valores introducidos con los de la matriz del sudoku y valorar si se ha acertado o no. Incrementa (o decrementa, si se borra algún número que estuviera bien) el contador de hits
+ **checkWinner** = compara los tiempos de los players
+ **status** = para saber si se ha completado el juego acudiendo al this.hits
+ **timer** = una función cronómetro que se para cuando se resuelve
+ **toggleTimer** = para poder parar/lanzar el cronómetro si hay que ir a mear


##Bonus
+ Una funcionalidad para resaltar los errores comparando el array sudoku con el array playerSudoku.
+ Poder elegir entre hacer un sudoku de números o de otra cosa (lo que lo dificultaría), por ejemplo colores (cada color asociado a un número)
+ Almacenar históricos de tiempos por niveles
