const botaoMenu = document.querySelector('.menu-abrir');
const menu = document.querySelector('#menu-principal');

botaoMenu.addEventListener('click', () => {
  const aberto = botaoMenu.getAttribute('aria-expanded') === 'true';
  botaoMenu.setAttribute('aria-expanded', String(!aberto));
  menu.classList.toggle('aberto', !aberto);
});

menu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('aberto');
    botaoMenu.setAttribute('aria-expanded', 'false');
  });
});

document.querySelector('#ano-atual').textContent = new Date().getFullYear();

const cartoesImoveis = [...document.querySelectorAll('.cartao-imovel')];
const filtroTipo = document.querySelector('#filtro-tipo');
const filtroBairro = document.querySelector('#filtro-bairro');
const mensagemSemImoveis = document.querySelector('#mensagem-sem-imoveis');

const bairros = [...new Set(cartoesImoveis.map((cartao) => cartao.dataset.bairro))].sort(
  (bairroA, bairroB) => bairroA.localeCompare(bairroB, 'pt-BR'),
);

bairros.forEach((bairro) => {
  const opcao = document.createElement('option');
  opcao.value = bairro;
  opcao.textContent = bairro;
  filtroBairro.append(opcao);
});

function filtrarImoveis() {
  let imoveisVisiveis = 0;

  cartoesImoveis.forEach((cartao) => {
    const tipoCorrespondente =
      filtroTipo.value === 'todos' || cartao.dataset.tipo === filtroTipo.value;
    const bairroCorrespondente =
      filtroBairro.value === 'todos' || cartao.dataset.bairro === filtroBairro.value;
    const corresponde = tipoCorrespondente && bairroCorrespondente;

    cartao.hidden = !corresponde;
    if (corresponde) imoveisVisiveis += 1;
  });

  mensagemSemImoveis.hidden = imoveisVisiveis > 0;
}

filtroTipo.addEventListener('change', filtrarImoveis);
filtroBairro.addEventListener('change', filtrarImoveis);

const modalAgendamento = document.querySelector('#modal-agendamento');
const formularioAgendamento = document.querySelector('#form-agendamento');
const dataAgendamento = document.querySelector('#data-agendamento');
const confirmacaoAgendamento = document.querySelector('#confirmacao-agendamento');
const imovelAgendamento = document.querySelector('#imovel-agendamento');

const hoje = new Date();
const hojeLocal = [
  hoje.getFullYear(),
  String(hoje.getMonth() + 1).padStart(2, '0'),
  String(hoje.getDate()).padStart(2, '0'),
].join('-');
dataAgendamento.min = hojeLocal;

document.querySelectorAll('.botao-agendar').forEach((botao) => {
  botao.addEventListener('click', () => {
    const cartao = botao.closest('.cartao-imovel');
    imovelAgendamento.textContent = cartao.querySelector('h3').textContent;
    formularioAgendamento.reset();
    confirmacaoAgendamento.hidden = true;
    formularioAgendamento.hidden = false;
    modalAgendamento.showModal();
  });
});

document.querySelector('.fechar-modal').addEventListener('click', () => {
  modalAgendamento.close();
});

formularioAgendamento.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const nome = formularioAgendamento.elements.nome.value.trim();

  confirmacaoAgendamento.textContent =
    `Obrigado, ${nome}! Sua solicitação de visita para ${imovelAgendamento.textContent} foi recebida. ` +
    'Entraremos em contato para confirmar.';
  confirmacaoAgendamento.hidden = false;
  formularioAgendamento.hidden = true;
});
