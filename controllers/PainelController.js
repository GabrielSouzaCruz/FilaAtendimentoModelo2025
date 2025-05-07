// Função que atualiza o painel com o último atendimento realizado
function atualizarUltimoAtendimento() {
  // Recupera o valor armazenado no localStorage com a chave 'ultimoAtendido'
  const ultimoAtendido = localStorage.getItem('ultimoAtendido');

  // Atualiza o conteúdo do elemento HTML com ID 'ultimoAtendimento'
  document.getElementById('ultimoAtendimento').textContent = ultimoAtendido;
}

// Define um valor padrão no localStorage assim que o script é carregado
// Isso evita que o painel fique vazio caso ainda não tenha ocorrido nenhum atendimento
localStorage.setItem('ultimoAtendido', "Aguardando...");

// Atualiza o painel logo após o carregamento da página
atualizarUltimoAtendimento();

// Define um intervalo que chama a função de atualização a cada 1 segundo (1000 ms)
// Garante que o painel fique sincronizado com as mudanças em tempo real
setInterval(atualizarUltimoAtendimento, 1000);
