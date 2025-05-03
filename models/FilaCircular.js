// FilaCircular.js
class FilaCircular{
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
        if(!this.isFull()){// avançar fim circularmente
            if(this.#fim == this.#elementos.length-1)
                this.#fim = 0;
            else
            this.#fim++;
            this.#elementos[this.#fim] = dado;
            this.#qtd++;
            console.log("Ini: "+ this.#inicio + " Fim: " + this.#fim + " Qtd: " + this.#qtd);
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
            if(this.#inicio === this.#elementos.length-1)
                this.#inicio = 0;
            else
                this.#inicio++;
            this.#qtd--;
            console.log("Ini: "+ this.#inicio + " Fim: " + this.#fim + " Qtd: " + this.#qtd);
            return dado;
        } // fim if
        else
            return null; // se estiver vazia
    }

    toString(){
        let filaString = "";
        let pos = this.#inicio;
        // percorrer qtd elementos a partir de inicio
        for(let i = 0; i < this.#qtd; i++){
            filaString += " | " + this.#elementos[pos] + " | ";
            if(pos === this.#elementos.length-1)
                pos = 0;
            else
            pos++;
        } // fim for
        console.log(filaString);
        return filaString;
    }

    [Symbol.iterator]() {
        let i = this.#inicio;
        let qtd = this.#qtd;
        let cont = 0;
        const elementos = this.#elementos;
        return {
            next: () => {
                let dado = elementos[i];
                if (cont < qtd) {
                    if(i === elementos.length-1) 
                        i = 0;
                    else
                        i++;
                    cont++;
                    return { value: dado, done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }    

}