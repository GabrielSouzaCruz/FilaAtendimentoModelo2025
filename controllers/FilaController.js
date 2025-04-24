const minhaFila = new Fila(5);

function addElemento(){
    const novoElemento = document.getElementById("txtnovoNome");
    const alerta = document.getElementById("mensagem-remocao");
    if(!minhaFila.isFull()){
       minhaFila.enqueue(novoElemento.value);
       mostrarFila();
       novoElemento.value = ""; //limpar
       novoElemento.focus(); //cursor no input
    } 
    else
        //alert("Fila cheia!!");
        alerta.textContent = ("Fila Cheia!!");     
}//fim addElemento
//------------------------------------------------------------------------------------\\

function mostrarFila(){
   const listaFila = document.getElementById("listFila");
   listaFila.textContent = minhaFila.toString();
}//fim mostrarFila
//-------------------------------------------------------------------------------------\\

function atenderFila(){
   if(!minhaFila.isEmpty()){
      const atendido = minhaFila.dequeue();
      //alert("Pessoa atendida: " + atendido); abre um alerta
      //salvar no banco texto do navegador
      const alerta = document.getElementById("mensagem-remocao");
      alerta.textContent = ("Pessoa atendida: " + atendido); //imprime diretamente na aba (elemento:mensagem-remocao)
      mostrarFila();
   }
   else
      alert("Fila vazia!");

   
}