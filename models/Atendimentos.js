// Declaração da classe Atendimento
class Atendimento {
    // Campos privados (só acessíveis dentro da classe)
    #nome;
    #cpf;

    // Campos públicos (acessíveis diretamente)
    data; // Data do atendimento
    hora; // Hora do atendimento

    // Construtor chamado ao criar uma nova instância de Atendimento
    constructor(nome, cpf) {
        this.nome = nome; // Usa o setter para armazenar nome
        this.cpf = cpf;   // Usa o setter para armazenar CPF
        this.hora = obterHoraAtual();   // Define a hora atual no momento da criação
        this.data = obterDataAtual();   // Define a data atual no momento da criação
    }

    // Getter para o nome (acessa o campo privado #nome)
    get nome() {
        return this.#nome;
    }

    // Getter para o CPF (acessa o campo privado #cpf)
    get cpf() {
        return this.#cpf;
    }

    // Setter para o nome (define o valor do campo privado #nome)
    set nome(novoNome) {
        this.#nome = novoNome;
    }

    // Setter para o CPF (define o valor do campo privado #cpf)
    set cpf(novoCpf) {
        this.#cpf = novoCpf;
    }

    // Método que retorna uma string formatada com os dados do atendimento
    toString() {
        return this.nome + " - " + this.cpf + " - " + this.data + " - " + this.hora;
    }
}
