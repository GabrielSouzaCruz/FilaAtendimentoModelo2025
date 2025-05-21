
const minhaFila = new FilaEncadeada();

const minhaFilaPr = new FilaEncadeada();

// Aguarda o carregamento completo do DOM antes de executar o código
window.addEventListener("DOMContentLoaded", function () {
   const inputNome = document.getElementById("txtnovoNome"); // Campo de nome
   const inputCpf = document.getElementById("txtnovoCpf");   // Campo de CPF

   // Ao pressionar Enter no campo de nome, foca no campo CPF
   inputNome.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
         event.preventDefault(); // Evita comportamento padrão (submit de formulário)
         inputCpf.focus(); // Move o foco para o campo CPF
      }
   });

   // Ao pressionar Enter no campo de CPF, chama a função que adiciona à fila
   inputCpf.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
         event.preventDefault();
         addElementos(); // Adiciona novo atendimento à fila
      }
   });
});

// Função que adiciona novos elementos à fila
function addFila() {
   const novoElemento = document.getElementById("txtnovoNome");
   const novoCpf = document.getElementById("txtnovoCpf");

   // Verifica se os campos estão preenchidos
   if (novoElemento.value.trim() === "" || novoCpf.value.trim() === "") {
      const mostrarAtendimento = document.getElementById("mensagem-remocao");
      mostrarAtendimento.textContent = "Por favor, preencha o nome e o CPF !!!";
      return null; 
   }

   // Se a fila não estiver cheia, adiciona o novo atendimento
   //if (!minhaFila.isFull()) {
      const novoAtendimento = new Atendimento(novoElemento.value.trim(), novoCpf.value.trim());
      minhaFila.enqueue(novoAtendimento); // Enfileira novo atendimento
      mostrarFila(); // Atualiza visualmente a fila
      novoElemento.value = ""; // Limpa campo nome
      novoCpf.value = "";      // Limpa campo CPF
      novoElemento.focus();    // Volta o foco para o campo nome
   //} else {
    //  const mostrarAtendimento = document.getElementById("mensagem-remocao");
      //mostrarAtendimento.textContent = "Fila Cheia !!!";
      novoElemento.value = ""; // Limpa campo nome
      novoCpf.value = "";      // Limpa campo CPF
   //}
}

//------------------------------------------------------------------------------------\\

// Função que mostra os elementos da fila na tela
function mostrarFila() {
      const lblPessoasFila = document.getElementById("lblPessoasFila");
      const listaPessoasFila = document.getElementById("listFila");
      //listaPessoasFila.innerText = minhaFila.toString();
      //console.log(minhaFila.toString());

       lblPessoasFila.innerText = "Pessoas na fila:";
      listaPessoasFila.innerText = "";
      for (const atendimento of minhaFila){
            const li = document.createElement("li");
            li.innerText = atendimento.toString();
            listaPessoasFila.appendChild(li);
      }
    }
//-------------------------------------------------------------------------------------\\

// Função que atende (remove) a primeira pessoa da fila
function atenderFila(){
   if(!minhaFila.isEmpty()){ // Verifica se há pessoas na fila
       const atendido = minhaFila.dequeue(); // Remove o primeiro da fila
       const horario = obterHoraAtual(); // Hora atual do atendimento
       const diferençaHora = calcularDiferencaHoras(atendido.hora, horario); // Calcula tempo de espera
       
       const mostrarAtendimento = document.getElementById("mensagem-remocao");
       mostrarAtendimento.textContent = "Pessoa Atendida: " + atendido.nome + " - Tempo de Espera: " + diferençaHora;
       
       mostrarFila(); // Atualiza a fila
       localStorage.setItem('ultimoAtendido', atendido.nome); // Salva nome do último atendido
   }
   else {
      const mostrarAtendimento = document.getElementById("mensagem-remocao");
      mostrarAtendimento.textContent = "Fila Vazia!!!";
      localStorage.setItem('ultimoAtendido', "Aguardando..."); // Indica que não há atendimentos
   }
}
//---------------------------------------------------------------------------------------\\

// Função para buscar uma pessoa pelo CPF na fila
function buscarCpf() {
   const cpf = document.getElementById("txtnovoCpf").value; // Obtém o CPF informado
   let cont = 0;

   for (let itemFila of minhaFila) {
      cont++; // Conta posição
      if (itemFila.cpf === cpf) { // Se encontrar CPF
         const mostrarAtendimento = document.getElementById("mensagem-remocao");
         mostrarAtendimento.textContent =  "Pessoa encontrada: " + itemFila.nome + " - Hora de chegada: " + itemFila.hora + " - Posição na Fila: " + cont;
         return itemFila;
      }
   }

   // CPF não encontrado na fila
   const mostrarAtendimento = document.getElementById("mensagem-remocao");
   mostrarAtendimento.textContent = "CPF não encontrado na fila!";
   return null; 
}
//---------------------------------------------------------------------------------------\\

// Retorna a data atual no formato dd/mm/aaaa
function obterDataAtual() {
   let dataAtual = new Date();
   let dia = dataAtual.getDate();
   let mes = dataAtual.getMonth() + 1; // Mês começa do 0
   let ano = dataAtual.getFullYear();
   return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
}
//---------------------------------------------------------------------------------------\\

// Retorna a hora atual no formato hh:mm:ss
function obterHoraAtual() {
   const data = new Date();
   const hora = data.getHours().toString().padStart(2, '0');
   const minuto = data.getMinutes().toString().padStart(2, '0');
   const segundo = data.getSeconds().toString().padStart(2, '0');
   return `${hora}:${minuto}:${segundo}`;
}
//---------------------------------------------------------------------------------------\\

// Calcula a diferença entre duas horas (formato hh:mm:ss)
// Retorna a diferença em horas, minutos e segundos
function calcularDiferencaHoras(hora1, hora2) {
   const [h1, m1, s1] = hora1.split(':').map(Number);
   const [h2, m2, s2] = hora2.split(':').map(Number);
   const diferencaSegundos = (h2 * 3600 + m2 * 60 + s2) - (h1 * 3600 + m1 * 60 + s1);
   const horas = Math.floor(diferencaSegundos / 3600);
   const minutos = Math.floor((diferencaSegundos % 3600) / 60);
   const segundos = diferencaSegundos % 60;
   return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}
//---------------------------------------------------------------------------------------\\

function calcularIdade(dataNascimento) {
  // Espera data no formato "dd/mm/aaaa"
  const [dia, mes, ano] = dataNascimento.split('/').map(Number);

  const hoje = new Date();
  const dataNasc = new Date(ano, mes - 1, dia); // Mês começa em 0 no JavaScript

  let idade = hoje.getFullYear() - dataNasc.getFullYear();
  const mesAtual = hoje.getMonth();
  const diaAtual = hoje.getDate();

  // Verifica se a pessoa ainda não fez aniversário neste ano
  if (mesAtual < mes - 1 || (mesAtual === mes - 1 && diaAtual < dia)) {
    idade--;
  }

  return idade;
}