// Declaração da classe FilaCircular com atributos privados
class FilaCircular {
    #inicio;       // Índice do início da fila
    #fim;          // Índice do fim da fila
    #qtd;          // Quantidade de elementos na fila
    #elementos;    // Array de armazenamento

    // Construtor da fila circular com tamanho padrão de 10 posições
    constructor(tamanho = 10) {
        this.#inicio = 0;                      // Começa no índice 0
        this.#fim = -1;                        // Nenhum elemento inserido ainda
        this.#qtd = 0;                         // Fila inicialmente vazia
        this.#elementos = new Array(tamanho);  // Cria o array fixo
    }

    // Verifica se a fila está cheia (qtd == capacidade)
    isFull() {
        return this.#qtd === this.#elementos.length;
    }

    // Verifica se a fila está vazia (qtd == 0)
    isEmpty() {
        return this.#qtd === 0;
    }

    // Adiciona um novo dado à fila circular
    enqueue(dado) {
        if (!this.isFull()) {
            // Se fim chegou ao final do array, volta ao início (posição 0)
            if (this.#fim === this.#elementos.length - 1)
                this.#fim = 0;
            else
                this.#fim++;

            // Armazena o elemento na posição do fim
            this.#elementos[this.#fim] = dado;
            this.#qtd++; // Incrementa a contagem de elementos

            // Log para depuração
            //console.log("Ini: " + this.#inicio + " Fim: " + this.#fim + " Qtd: " + this.#qtd);
            return true; // Sucesso
        } else {
            return false; // Fila cheia
        }
    }

    // Remove um elemento da frente da fila
    dequeue() {
        if (!this.isEmpty()) {
            const dado = this.#elementos[this.#inicio]; // Obtém o dado do início

            // Avança circularmente o início
            if (this.#inicio === this.#elementos.length - 1)
                this.#inicio = 0;
            else
                this.#inicio++;

            this.#qtd--; // Decrementa a quantidade

            // Log para depuração
            console.log("Ini: " + this.#inicio + " Fim: " + this.#fim + " Qtd: " + this.#qtd);
            return dado; // Retorna o dado removido
        } else {
            return null; // Fila vazia
        }
    }

    // Retorna uma representação da fila como string
    toString() {
        let filaString = "";
        let pos = this.#inicio;

        // Percorre a quantidade de elementos a partir de `inicio`
        for (let i = 0; i < this.#qtd; i++) {
            filaString += " | " + this.#elementos[pos] + " | ";

            // Avança circularmente
            if (pos === this.#elementos.length - 1)
                pos = 0;
            else
                pos++;
        }

        console.log(filaString); // Log opcional
        return filaString;
    }

    // Iterador para permitir "for...of" na fila
    [Symbol.iterator]() {
        let i = this.#inicio;     // Começa no início
        let qtd = this.#qtd;      // Total de elementos a percorrer
        let cont = 0;             // Quantidade já iterada
        const elementos = this.#elementos;

        return {
            next: () => {
                let dado = elementos[i]; // Pega o elemento atual
                if (cont < qtd) {
                    // Avança circularmente
                    if (i === elementos.length - 1)
                        i = 0;
                    else
                        i++;

                    cont++; // Atualiza contador
                    return { value: dado, done: false }; // Elemento retornado
                } else {
                    return { done: true }; // Iteração concluída
                }
            }
        };
    }
}
