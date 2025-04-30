const minhaFila = new FilaCircular(5);

window.addEventListener("DOMContentLoaded", function () {
   const input = document.getElementById("txtnovoNome");

   input.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
         event.preventDefault(); // Evita comportamento padrão
         addElemento(); // Chama sua função
      }
   });
});//Codigo para que o Enter Funcione no Adicionar à Fila

function addElemento(){
   const alerta = document.getElementById("mensagem-remocao");
   const novoElemento1 = document.getElementById("txtnovoNome"); //Existe para direcionar o focus() e limpar
   const novoElemento = document.getElementById("txtnovoNome").value;
   
   if(novoElemento.trim() !== ""){
      if(!minhaFila.isFull()){
         minhaFila.enqueue(novoElemento);
         mostrarFila();
         novoElemento1.value = ""; //limpar
         novoElemento1.focus(); //cursor no input
      }else
       //alert("Fila cheia!!");
         alerta.textContent = ("Fila Cheia!!");
   }else
      alerta.textContent = ("Campo Vazio!!");     
}//fim addElemento
//------------------------------------------------------------------------------------\\

function mostrarFila(){
   const listaFila = document.getElementById("listFila");
   listaFila.textContent = minhaFila.toString();
}//fim mostrarFila
//-------------------------------------------------------------------------------------\\

function atenderFila(){
   const alerta = document.getElementById("mensagem-remocao");
   if(!minhaFila.isEmpty()){
      const atendido = minhaFila.dequeue();
      //alert("Pessoa atendida: " + atendido); abre um alerta
      //salvar no banco texto do navegador
      const alerta = document.getElementById("mensagem-remocao");
      alerta.textContent = ("Pessoa atendida: " + atendido); //imprime diretamente na aba (elemento:mensagem-remocao)
      mostrarFila();
   }
   else
      alerta.textContent =("Fila Vazia!!");
}//fim atenderFila
//---------------------------------------------------------------------------------------\\