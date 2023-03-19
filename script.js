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

function gerarPDF() {
  const doc = new jsPDF()

  doc.autoTable({ html: '#tabela' })

  doc.save('registro-de-horarios.pdf')
}
