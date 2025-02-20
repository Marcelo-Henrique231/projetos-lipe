// Função para salvar dados da Coluna 1
document.getElementById('formColuna1').addEventListener('submit', function (e) {
    e.preventDefault();
    const coluna1 = document.getElementById('coluna1').value;
    salvarDados('/salvar-coluna1', { coluna1 }, 'dadosColuna1');  // Envia os dados da Coluna 1
    document.getElementById('coluna1').value = ''; // Limpa o campo após salvar
});

// Função para salvar dados da Coluna 2
document.getElementById('formColuna2').addEventListener('submit', function (e) {
    e.preventDefault();
    const coluna2 = document.getElementById('coluna2').value;
    salvarDados('/salvar-coluna2', { coluna2 }, 'dadosColuna2');  // Envia os dados da Coluna 2
    document.getElementById('coluna2').value = ''; // Limpa o campo após salvar
});

// Função para salvar dados da Coluna 3
document.getElementById('formColuna3').addEventListener('submit', function (e) {
    e.preventDefault();
    const coluna3 = document.getElementById('coluna3').value;
    salvarDados('/salvar-coluna3', { coluna3 }, 'dadosColuna3');  // Envia os dados da Coluna 3
    document.getElementById('coluna3').value = ''; // Limpa o campo após salvar
});

// Função genérica para salvar dados
function salvarDados(url, data, colunaId) {
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
        carregarDados(colunaId);  // Recarrega os dados da coluna específica
    })
    .catch(error => console.error('Erro:', error));
}

// Função para carregar e exibir os dados de uma coluna
function carregarDados(colunaId) {
    fetch('/dados')  // Busca todos os dados do backend
    .then(response => response.json())
    .then(data => {
        console.log('Dados carregados:', data); // Exibe os dados no console

        const colunaElement = document.getElementById(colunaId);
        colunaElement.innerHTML = ''; // Limpa a coluna antes de carregar novos dados

        // Obtém o nome da coluna no banco de dados
        const colunaName = colunaId.replace('dados', '').toLowerCase(); // Remove 'dados' e converte para minúsculas
        console.log(`Nome da coluna gerado: ${colunaName}`); // Verifica o nome da coluna

        // Filtra e exibe os dados da coluna específica
        data.forEach(row => {
            const valor = row[colunaName]; // Obtém o valor da coluna específica
            console.log(`Checando coluna: ${colunaName} -> Valor: ${valor}`); // Verifica o valor de cada coluna

            if (valor) {
                const div = document.createElement('div');
                div.textContent = valor; // Adiciona o valor ao div
                colunaElement.appendChild(div); // Adiciona o div à coluna
            }
        });
    })
    .catch(error => console.error('Erro ao carregar dados:', error));
}

// Carrega os dados ao abrir a página
carregarDados('dadosColuna1');
carregarDados('dadosColuna2');
carregarDados('dadosColuna3');