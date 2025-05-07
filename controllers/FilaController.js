const minhaFila = new FilaCircular(5);

window.addEventListener("DOMContentLoaded", function () {
   const inputNome = document.getElementById("txtnovoNome");
   const inputCpf = document.getElementById("txtnovoCpf");

   inputNome.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
         event.preventDefault(); // Evita comportamento padrão (como submit)
         inputCpf.focus(); // Move o foco para o campo CPF
      }
   });

   inputCpf.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
         event.preventDefault();
         addElementos(); // Chama a função de adicionar à fila
      }
   });
});

function addElementos() {
   const novoElemento = document.getElementById("txtnovoNome");
   const novoCpf = document.getElementById("txtnovoCpf");

   // Verifica se os campos estão preenchidos
   if (novoElemento.value.trim() === "" || novoCpf.value.trim() === "") {
      const mostrarAtendimento = document.getElementById("mensagem-remocao");
      mostrarAtendimento.textContent = "Por favor, preencha o nome e o CPF.";
      return null; 
   }

   if (!minhaFila.isFull()) {
      const novoAtendimento = new Atendimento(novoElemento.value.trim(), novoCpf.value.trim());
      minhaFila.enqueue(novoAtendimento);
      mostrarFila();
      novoElemento.value = "";
      novoCpf.value = "";
      novoElemento.focus();
   } else {
      alert("Fila cheia!");
   }
}

//------------------------------------------------------------------------------------\\

function mostrarFila() {
   const listaFila = document.getElementById("listFila");
   listaFila.textContent = ""; // Limpa o texto
   listaFila.innerHTML = "";   // Limpa a lista

   let contador = 1; // Inicia o contador

   for (let item of minhaFila) {
      const listaElemento = document.createElement("li");
      listaElemento.textContent = `${contador}. ${item}`; // Adiciona o número antes do item
      listaFila.insertAdjacentElement("beforeend", listaElemento);
      contador++; // Incrementa o contador
   }
}
//-------------------------------------------------------------------------------------\\

function atenderFila(){
   if(!minhaFila.isEmpty()){
       const atendido = minhaFila.dequeue();
       const horario = obterHoraAtual();
       const diferença = calcularDiferencaHoras(atendido.hora, horario);
       //alert("Pessoa Atendida: " +atendido)
       const mostrarAtendimento = document.getElementById("mensagem-remocao");
       mostrarAtendimento.textContent = "Pessoa Atendida: " + atendido.nome + " - Tempo de Espera: "+diferença;
       mostrarFila();
       localStorage.setItem('ultimoAtendido', atendido.nome);
   }
   else {
      const mostrarAtendimento = document.getElementById("mensagem-remocao");
      mostrarAtendimento.textContent = "Fila Vazia!!!";
      localStorage.setItem('ultimoAtendido', "Aguardando...");}
}
//---------------------------------------------------------------------------------------\\

function buscar() {
   const CPF = document.getElementById("txtnovoCpf").value;
   let cont = 0;
   for (let itemFila of minhaFila) {
       cont++;
      if (itemFila.cpf === CPF) {
       const mostrarAtendimento = document.getElementById("mensagem-remocao");
         mostrarAtendimento.textContent =  "Pessoa encontrada: " + itemFila.nome + " - Hora de chegada: " + itemFila.hora + " - Posição na Fila: " +cont;
         return itemFila;
      }
   }

      const mostrarAtendimento = document.getElementById("mensagem-remocao");
      mostrarAtendimento.textContent = "CPF não encontrado na fila!";
      return null; 
}
//---------------------------------------------------------------------------------------\\


function obterDataAtual() {
   let dataAtual = new Date();
   let dia = dataAtual.getDate();
   let mes = dataAtual.getMonth() + 1; // Adiciona 1 porque o mês inicia do zero
   let ano = dataAtual.getFullYear();
   return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
}
//---------------------------------------------------------------------------------------\\


function obterHoraAtual() {
   const data = new Date();
   const hora = data.getHours().toString().padStart(2, '0');
   const minuto = data.getMinutes().toString().padStart(2, '0');
   const segundo = data.getSeconds().toString().padStart(2, '0');
   return `${hora}:${minuto}:${segundo}`;
}
//---------------------------------------------------------------------------------------\\


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
