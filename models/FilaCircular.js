// FilaCircular.js
class Fila{
    #inicio; //# privados
    #fim;
    #qtd;
    #elementos; // vetor

    constructor(tamanho = 10){
        this.#inicio = 0;
        this.#fim = -1;
        this.#qtd = 0;
        this.#elementos = new Array(tamanho);
    }
    
    isFull(){
        // fila cheia se qtd == capacidade
        return this.#qtd === this.#elementos.length;
    }

    isEmpty(){
        // fila vazia se qtd == 0
        return this.#qtd === 0;
    }

    enqueue(dado){
        if(!this.isFull()){
            // avançar fim circularmente
            this.#fim = (this.#fim + 1) % this.#elementos.length; // garante que, se o índice ultrapassar o tamanho do array, ele volte para o início (índice 0)
            this.#elementos[this.#fim] = dado;
            this.#qtd++;
            return true;
        } // fim if
        else
            return false; // se estiver cheia
    }

    dequeue(){
        if(!this.isEmpty()){
            // remover do início
            const dado = this.#elementos[this.#inicio];
            // avançar início circularmente
            this.#inicio = (this.#inicio + 1) % this.#elementos.length;
            this.#qtd--;
            return dado;
        } // fim if
        else
            return null; // se estiver vazia
    }

    toString(){
        let filaString = "";
        // percorrer qtd elementos a partir de inicio
        for(let i = 0; i < this.#qtd; i++){
            const rotativo = (this.#inicio + i) % this.#elementos.length; // garante que, se o índice ultrapassar o tamanho do array, ele volte para o início (índice 0)
            filaString += "| " + this.#elementos[rotativo] + " | ";
        } // fim for
        console.log(filaString);
        return filaString;
    }

}