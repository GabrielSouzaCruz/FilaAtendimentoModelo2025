// Declaração da classe Fila com atributos privados
class Fila {
    #inicio;       // Índice do primeiro elemento da fila
    #fim;          // Índice do último elemento da fila
    #qtd;          // Quantidade de elementos na fila
    #elementos;    // Vetor interno que armazena os elementos

    // Construtor da fila com tamanho padrão 10
    constructor(tamanho = 10) {
        this.#inicio = 0;              // Começa no índice 0
        this.#fim = -1;                // Nenhum elemento ainda (por isso -1)
        this.#qtd = 0;                 // Nenhum elemento adicionado ainda
        this.#elementos = new Array(tamanho); // Inicializa o vetor com tamanho fixo
    }

    // Verifica se a fila está cheia
    isFull() {
        return this.#fim === this.#elementos.length - 1;
    }

    // Verifica se a fila está vazia
    isEmpty() {
        return this.#fim < this.#inicio;
    }

    // Adiciona um novo elemento ao final da fila
    enqueue(dado) {
        if (!this.isFull()) {
            this.#fim++; // Avança o índice do fim
            this.#elementos[this.#fim] = dado; // Armazena o novo dado
            this.#qtd++; // Atualiza a quantidade de elementos
            return true; // Inserção bem-sucedida
        } else {
            return false; // Falha por fila cheia
        }
    }

    // Remove o elemento do início da fila
    dequeue() {
        if (!this.isEmpty()) {
            const dado = this.#elementos[this.#inicio]; // Pega o primeiro elemento
            this.#inicio++; // Avança o início (remove logicamente)
            this.#qtd--; // Atualiza a quantidade
            return dado; // Retorna o dado removido
        } else {
            return null; // Fila vazia, nada a remover
        }
    }

    // Retorna a fila como string (usado para debug/log)
    toString() {
        let filaString = "";
        for (let i = this.#inicio; i <= this.#fim; i++) {
            filaString += "| " + this.#elementos[i] + " | ";
        }
        console.log(filaString);
        return filaString;
    }

    // Implementa um iterador para permitir "for...of"
    [Symbol.iterator]() {
        let i = this.#inicio;
        let fim = this.#fim;

        return {
            next: () => {
                if (i <= fim) {
                    return { value: this.#elementos[i++], done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }
} // Fim da classe
