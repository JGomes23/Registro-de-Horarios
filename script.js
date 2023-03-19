const tabela = document.getElementById('tabela')
const nomeInput = document.getElementById('nome')
const entradaInput = document.getElementById('entrada')
const saidaInput = document.getElementById('saida')

function adicionarFuncionario() {
  const nome = nomeInput.value
  const entrada = entradaInput.value
  const saida = saidaInput.value

  if (nome === '' || entrada === '' || saida === '') {
    alert('Preencha todos os campos!')
    return
  }

  const entradaHoras = Number.parseInt(entrada.split(':')[0])
  const entradaMinutos = Number.parseInt(entrada.split(':')[1])
  const saidaHoras = Number.parseInt(saida.split(':')[0])
  const saidaMinutos = Number.parseInt(saida.split(':')[1])

  if (entradaHoras <= 9) {
    tabela.insertAdjacentHTML(
      'beforeend',
      `
      <tr class="normal-entrada">
        <td>${nome}</td>
        <td class="verde">${entrada}</td>
        <td>${saida}</td>
        <td><span class="acao-excluir" onclick="excluirFuncionario(this)">Excluir</span></td>
      </tr>
    `
    )
  } else {
    tabela.insertAdjacentHTML(
      'beforeend',
      `
      <tr class="alerta-entrada">
        <td>${nome}</td>
        <td class="vermelho">${entrada}</td>
        <td>${saida}</td>
        <td><span class="acao-excluir" onclick="excluirFuncionario(this)">Excluir</span></td>
      </tr>
    `
    )
  }

  if (saidaHoras > 17 || (saidaHoras === 17 && saidaMinutos > 0)) {
    tabela.lastElementChild.classList.add('alerta-saida')
  }

  nomeInput.value = ''
  entradaInput.value = ''
  saidaInput.value = ''
}

function excluirFuncionario(elemento) {
  const linha = elemento.parentNode.parentNode
  linha.parentNode.removeChild(linha)
}
function gerarJPG() {
  html2canvas(document.querySelector('#tabela')).then(function (canvas) {
    var a = document.createElement('a')
    a.href = canvas
      .toDataURL('image/jpeg')
      .replace('image/jpeg', 'image/octet-stream')
    a.download = 'tabela.jpg'
    a.click()
  })
}

window.onload = function () {
  document.querySelector('#btnJPG').addEventListener('click', gerarJPG)
}

function gerarCSV() {
  // Criar uma variável para armazenar os dados da tabela
  let dados = ''

  // Obter todas as linhas da tabela
  const linhas = document.querySelectorAll('table tr')

  // Percorrer as linhas da tabela e adicionar os dados na variável
  for (let i = 0; i < linhas.length; i++) {
    const colunas = linhas[i].querySelectorAll('td, th')
    for (let j = 0; j < colunas.length; j++) {
      if (j > 0) {
        dados += ','
      }
      dados += colunas[j].innerText
    }
    dados += '\n'
  }

  // Criar um objeto Blob com os dados
  const blob = new Blob([dados], { type: 'text/csv;charset=utf-8;' })

  // Criar um link para download
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'tabela.csv'
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
