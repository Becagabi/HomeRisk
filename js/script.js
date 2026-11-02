// =====================================================
// HOMERISK 2.0
// DASHBOARD — análise de risco e mercado imobiliário
// =====================================================

// =====================================================
// 1. DADOS (protótipo: valores fictícios)
// =====================================================

const imoveis = window.HOMERISK_DADOS.imoveis;


// =====================================================
// 2. FUNÇÕES DO MODELO E PADRÃO VISUAL
// =====================================================

const ICONES_FATORES = window.HOMERISK_DADOS.iconesFatores;

const COR_VERDE = "rgba(60, 141, 90, 0.55)";
const COR_AMARELA = "rgba(201, 162, 39, 0.55)";
const COR_VERMELHA = "rgba(179, 38, 30, 0.55)";
const COR_AZUL = "#4B91C7";
const COR_AZUL_CLARA = "#78A9D4";

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 0
    });
}

function comIconeFator(nome) {
    return `${ICONES_FATORES[nome] || ""} ${nome}`.trim();
}

function calcularIndiceRisco(imovel) {
    const indice =
        (100 - imovel.saneamento) * 0.20 +
        (100 - imovel.infraestrutura) * 0.20 +
        (100 - imovel.seguranca) * 0.20 +
        (100 - imovel.transporte) * 0.10 +
        imovel.vulnerabilidade * 0.30;

    return Math.round(indice);
}

function classificarRisco(indice) {
    if (indice < 40) return "Baixo";
    if (indice < 70) return "Moderado";
    return "Alto";
}

function corPorIndice(valor) {
    if (valor < 40) return COR_VERDE;
    if (valor < 70) return COR_AMARELA;
    return COR_VERMELHA;
}

function corPorTendencia(valorAnterior, valorAtual) {
    if (valorAtual > valorAnterior) return COR_VERMELHA;
    if (valorAtual < valorAnterior) return COR_VERDE;
    return COR_AMARELA;
}

function calcularPercentualAjuste(nivel) {
    if (nivel === "Moderado") return 0.05;
    if (nivel === "Alto") return 0.10;
    return 0;
}

function criarBarra(nome, valor) {
    const nomeComIcone = comIconeFator(nome);

    return `
        <div class="risco-info">
            <div class="risco-texto">
                <span>${nomeComIcone}</span>
                <strong>${valor}%</strong>
            </div>
            <div class="barra-risco">
                <div class="barra-risco-preenchida" style="width: ${valor}%"></div>
            </div>
        </div>
    `;
}


// =====================================================
// 3. ELEMENTOS DO HTML
// =====================================================

// KPIs
const kpiImoveis = document.getElementById("kpi-imoveis");
const kpiAluguel = document.getElementById("kpi-aluguel");
const kpiVenda = document.getElementById("kpi-venda");
const kpiIndice = document.getElementById("kpi-indice");
const nivelRiscoElemento = document.getElementById("nivel-risco");
const detalhesRisco = document.getElementById("detalhes-risco");

// Imóveis e detalhes
const listaApartamentos = document.getElementById("lista-apartamentos");
const mensagemDetalhes = document.getElementById("mensagem-detalhes");
const botaoOcultarDetalhes = document.getElementById("botao-ocultar-detalhes");

// Pesquisa e filtros
const pesquisaImovel = document.getElementById("pesquisa-imovel");
const filtroRegiao = document.getElementById("filtro-regiao");
const filtroBairro = document.getElementById("filtro-bairro");
const filtroTipo = document.getElementById("filtro-tipo");
const filtroPreco = document.getElementById("filtro-preco");
const filtroNivel = document.getElementById("filtro-nivel");

// Gráficos
const canvasEvolucao = document.getElementById("grafico-evolucao");
const canvasCategoria = document.getElementById("grafico-categoria");
const canvasNivel = document.getElementById("grafico-nivel");

// Ajuda fixa
const botaoAjuda = document.getElementById("botao-ajuda-indicadores");
const painelAjuda = document.getElementById("painel-ajuda-indicadores");
const fecharAjuda = document.getElementById("fechar-ajuda-indicadores");


// =====================================================
// 4. GRÁFICOS
// =====================================================

// Evolução do risco médio: a linha e todos os pontos ficam amarelos.
const graficoEvolucao = new Chart(canvasEvolucao, {
    type: "line",
    data: {
        labels: ["Jun", "Jul", "Ago", "Set"],
        datasets: [{
            label: "Risco médio",
            data: [],
            borderColor: COR_AMARELA,
            backgroundColor: COR_AMARELA,
            borderWidth: 3,
            tension: 0.3,
            fill: false,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBorderWidth: 2,
            pointBorderColor: "#ffffff",
            pointBackgroundColor: COR_AMARELA
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                min: 0,
                max: 100,
                title: { display: true, text: "Índice de risco (0 a 100)" }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `Risco médio: ${context.parsed.y}/100`;
                    }
                }
            }
        }
    }
});

// Cinco indicadores padronizados. Os quatro primeiros são indicadores
// de qualidade (invertidos para representar risco); vulnerabilidade já
// representa risco diretamente.
const definicaoFatoresRegiao = [
    { nome: "Saneamento", calcular: item => 100 - item.saneamento },
    { nome: "Infraestrutura", calcular: item => 100 - item.infraestrutura },
    { nome: "Segurança", calcular: item => 100 - item.seguranca },
    { nome: "Transporte", calcular: item => 100 - item.transporte },
    { nome: "Vulnerabilidade", calcular: item => item.vulnerabilidade }
];

const graficoCategoria = new Chart(canvasCategoria, {
    type: "bar",
    data: {
        labels: definicaoFatoresRegiao.map(item => comIconeFator(item.nome)),
        datasets: [{
            label: "Índice de risco",
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1,
            borderRadius: 5
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                min: 0,
                max: 100,
                title: { display: true, text: "Índice de risco (0 a 100)" }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `Risco: ${context.raw}/100`;
                    }
                }
            }
        }
    }
});

// Imóveis por nível de risco: mantém as cores de classificação.
const graficoNivel = new Chart(canvasNivel, {
    type: "doughnut",
    data: {
        labels: ["Baixo", "Moderado", "Alto"],
        datasets: [{
            label: "Imóveis",
            data: [],
            backgroundColor: [COR_VERDE, COR_AMARELA, COR_VERMELHA]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});


// =====================================================
// 5. ATUALIZAÇÃO DOS GRÁFICOS
// =====================================================

function atualizarGraficoEvolucao(dados) {
    const somaMeses = [0, 0, 0, 0];

    dados.forEach(function (imovel) {
        imovel.historico.forEach(function (valor, indice) {
            somaMeses[indice] += valor;
        });
    });

    const medias = somaMeses.map(function (total) {
        return dados.length ? Math.round(total / dados.length) : 0;
    });

    graficoEvolucao.data.datasets[0].data = medias;
    graficoEvolucao.data.datasets[0].borderColor = COR_AMARELA;
    graficoEvolucao.data.datasets[0].pointBackgroundColor = COR_AMARELA;
    graficoEvolucao.update();
}

function atualizarGraficoFatores(dados) {
    const medias = definicaoFatoresRegiao.map(function (fator) {
        if (dados.length === 0) return 0;

        const soma = dados.reduce(function (total, item) {
            return total + fator.calcular(item);
        }, 0);

        return Math.round(soma / dados.length);
    });

    graficoCategoria.data.labels = definicaoFatoresRegiao.map(function (fator) {
        return comIconeFator(fator.nome);
    });
    graficoCategoria.data.datasets[0].data = medias;
    graficoCategoria.data.datasets[0].backgroundColor = medias.map(corPorIndice);
    graficoCategoria.data.datasets[0].borderColor = medias.map(corPorIndice);
    graficoCategoria.update();
}


// =====================================================
// 6. ATUALIZAR DASHBOARD
// =====================================================

function atualizarDashboard(dados) {
    let somaRisco = 0;
    let somaAluguel = 0;
    let somaVenda = 0;
    let quantidadeBaixo = 0;
    let quantidadeModerado = 0;
    let quantidadeAlto = 0;

    dados.forEach(function (imovel) {
        const indice = calcularIndiceRisco(imovel);
        const nivel = classificarRisco(indice);

        somaRisco += indice;
        somaAluguel += imovel.valorAluguel;
        somaVenda += imovel.valorVenda;

        if (nivel === "Baixo") quantidadeBaixo++;
        if (nivel === "Moderado") quantidadeModerado++;
        if (nivel === "Alto") quantidadeAlto++;
    });

    const divisor = dados.length || 1;
    const riscoMedio = dados.length
        ? Math.round(somaRisco / divisor)
        : 0;

    // A quantidade de imóveis permanece visível sem filtros.
    kpiImoveis.textContent = dados.length;

    // Os indicadores médios só aparecem após a seleção de qualquer filtro.
    const existeFiltroAtivo = Boolean(
        filtroRegiao.value ||
        filtroBairro.value ||
        filtroTipo.value ||
        filtroPreco.value ||
        filtroNivel.value ||
        pesquisaImovel.value.trim()
    );

    if (!existeFiltroAtivo) {
        kpiAluguel.textContent = "";
        kpiVenda.textContent = "";
        kpiIndice.textContent = "";
        detalhesRisco.textContent = "";
        nivelRiscoElemento.textContent = "de 100";
    } else if (dados.length === 0) {
        kpiAluguel.textContent = "—";
        kpiVenda.textContent = "—";
        kpiIndice.textContent = "—";
        detalhesRisco.textContent = "Nenhum imóvel encontrado";
        nivelRiscoElemento.textContent = "Sem dados";
    } else {
        kpiAluguel.textContent = formatarMoeda(somaAluguel / divisor);
        kpiVenda.textContent = formatarMoeda(somaVenda / divisor);
        kpiIndice.textContent = riscoMedio;
        detalhesRisco.textContent =
            `${quantidadeAlto} alto • ${quantidadeModerado} moderado • ${quantidadeBaixo} baixo`;
        nivelRiscoElemento.textContent = classificarRisco(riscoMedio);
    }

    nivelRiscoElemento.classList.remove(
        "nivel-baixo",
        "nivel-moderado",
        "nivel-alto"
    );

    if (existeFiltroAtivo && dados.length > 0) {
        const nivelRisco = classificarRisco(riscoMedio);
        nivelRiscoElemento.classList.add("nivel-" + nivelRisco.toLowerCase());
    }

    // Atualiza os três gráficos com o mesmo conjunto filtrado.
    atualizarGraficoFatores(dados);
    graficoNivel.data.datasets[0].data = [
        quantidadeBaixo,
        quantidadeModerado,
        quantidadeAlto
    ];
    graficoNivel.update();

    atualizarGraficoEvolucao(dados);
    mostrarApartamentos(dados);
}


// =====================================================
// 7. CARDS E DETALHES DOS IMÓVEIS
// =====================================================

function mostrarApartamentos(dados) {
    // Ao mudar os filtros, fecha os detalhes anteriores para não manter
    // aberto um imóvel que talvez já não pertença ao resultado atual.
    ocultarDetalhes();
    listaApartamentos.innerHTML = "";

    if (dados.length === 0) {
        listaApartamentos.innerHTML =
            "<p class=\"sem-imoveis\">Nenhum imóvel encontrado com esses filtros.</p>";
        ocultarDetalhes();
        return;
    }

    dados.slice(0, 4).forEach(function (imovel) {
        const indice = calcularIndiceRisco(imovel);
        const nivel = classificarRisco(indice);
        const ajuste = calcularPercentualAjuste(nivel);
        const vendaAjustada = imovel.valorVenda * (1 - ajuste);
        const textoAjuste = ajuste > 0
            ? `-${Math.round(ajuste * 100)}%`
            : "0%";

        const classeRisco = nivel === "Alto"
            ? "risco-alto"
            : nivel === "Moderado"
                ? "risco-medio"
                : "risco-baixo";

        const card = document.createElement("article");
        card.className = `card-apartamento ${classeRisco}`;
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-label", `Ver detalhes de ${imovel.imovel}`);

        card.innerHTML = `
            <div class="card-apartamento-cabecalho">
                <div>
                    <h3>${imovel.imovel}</h3>
                    <p>${imovel.bairro} — ${imovel.regiao}</p>
                </div>
                <span class="nivel-${nivel.toLowerCase()}">${nivel}</span>
            </div>

            <div class="risco-info">
                <div class="risco-texto">
                    <span>Índice de risco</span>
                    <strong>${indice}/100</strong>
                </div>
                <div class="barra-risco">
                    <div class="barra-risco-preenchida" style="width: ${indice}%; background: ${corPorIndice(indice)}"></div>
                </div>
            </div>

            <p>Venda: <strong>${formatarMoeda(imovel.valorVenda)}</strong></p>
            <p>Aluguel: <strong>${formatarMoeda(imovel.valorAluguel)}</strong></p>
            <p>Ajuste demonstrativo: <strong>${textoAjuste}</strong></p>
            <p>Venda ajustada: <strong>${formatarMoeda(vendaAjustada)}</strong></p>
            <span class="card-apartamento-acao">Consultar detalhes</span>
        `;

        function selecionarImovel() {
            document.querySelectorAll(".card-apartamento.selecionado").forEach(function (item) {
                item.classList.remove("selecionado");
            });

            card.classList.add("selecionado");
            mostrarDetalhes(imovel);
        }

        card.addEventListener("click", selecionarImovel);
        card.addEventListener("keydown", function (evento) {
            if (evento.key === "Enter" || evento.key === " ") {
                evento.preventDefault();
                selecionarImovel();
            }
        });

        listaApartamentos.appendChild(card);
    });
}

function mostrarDetalhes(imovel) {
    const indice = calcularIndiceRisco(imovel);
    const nivel = classificarRisco(indice);
    const percentualRisco = calcularPercentualAjuste(nivel);
    const vendaAjustada = imovel.valorVenda * (1 - percentualRisco);
    const aluguelAjustado = imovel.valorAluguel * (1 - percentualRisco);
    const precoM2 = imovel.valorVenda / imovel.area;

    mensagemDetalhes.innerHTML = `
        <div class="detalhes-topo">
            <div>
                <span class="detalhes-identificador">${imovel.tipo} • ${imovel.area} m²</span>
                <h3>${imovel.imovel}</h3>
                <p>${imovel.endereco} — ${imovel.bairro}, ${imovel.regiao}</p>
            </div>
            <span class="nivel-${nivel.toLowerCase()}">${nivel}</span>
        </div>

        <div class="detalhes-indicadores">
            <div class="detalhe-item">
                <span>Índice de risco</span>
                <strong>${indice}/100</strong>
            </div>
            <div class="detalhe-item">
                <span>Valor de venda</span>
                <strong>${formatarMoeda(imovel.valorVenda)}</strong>
            </div>
            <div class="detalhe-item">
                <span>Aluguel mensal</span>
                <strong>${formatarMoeda(imovel.valorAluguel)}</strong>
            </div>
            <div class="detalhe-item">
                <span>Preço por m²</span>
                <strong>${formatarMoeda(precoM2)}</strong>
            </div>
        </div>

        <div class="detalhe-categoria">
            <h4>Estimativa ajustada pelo modelo</h4>
            <div class="detalhe-valores-ajustados">
                <p>Venda estimada: <strong>${formatarMoeda(vendaAjustada)}</strong></p>
                <p>Aluguel estimado: <strong>${formatarMoeda(aluguelAjustado)}</strong></p>
                <p>Ajuste hipotético aplicado: <strong>${Math.round(percentualRisco * 100)}%</strong></p>
            </div>
            <small>Estimativa demonstrativa, não representa preço real de mercado.</small>
        </div>

        <div class="lista-ocorrencias">
            <h4>Indicadores da região</h4>
            ${criarBarra("Saneamento", imovel.saneamento)}
            ${criarBarra("Infraestrutura", imovel.infraestrutura)}
            ${criarBarra("Segurança", imovel.seguranca)}
            ${criarBarra("Transporte", imovel.transporte)}
            ${criarBarra("Vulnerabilidade", imovel.vulnerabilidade)}
        </div>

        <a
            class="botao-ver-imovel-pagina"
            href="imoveis.html?imovel=${encodeURIComponent(imovel.id)}"
            aria-label="Ver ${imovel.imovel} na página de Imóveis"
        >
            Ver este imóvel na página de Imóveis <span aria-hidden="true">→</span>
        </a>
    `;

    botaoOcultarDetalhes.hidden = false;
}

function ocultarDetalhes() {
    mensagemDetalhes.innerHTML = "<p>Selecione um imóvel para visualizar os detalhes.</p>";
    botaoOcultarDetalhes.hidden = true;

    document.querySelectorAll(".card-apartamento.selecionado").forEach(function (card) {
        card.classList.remove("selecionado");
    });
}

botaoOcultarDetalhes.addEventListener("click", ocultarDetalhes);


// =====================================================
// 8. FILTROS
// =====================================================

function aplicarFiltros() {
    let dadosFiltrados = [...imoveis];

    if (filtroRegiao.value !== "") {
        dadosFiltrados = dadosFiltrados.filter(function (imovel) {
            return imovel.regiao === filtroRegiao.value;
        });
    }

    if (filtroBairro.value !== "") {
        dadosFiltrados = dadosFiltrados.filter(function (imovel) {
            return imovel.bairro === filtroBairro.value;
        });
    }

    if (filtroTipo.value !== "") {
        dadosFiltrados = dadosFiltrados.filter(function (imovel) {
            return imovel.tipo === filtroTipo.value;
        });
    }

    if (filtroPreco.value === "ate300") {
        dadosFiltrados = dadosFiltrados.filter(function (imovel) {
            return imovel.valorVenda <= 300000;
        });
    }

    if (filtroPreco.value === "300a450") {
        dadosFiltrados = dadosFiltrados.filter(function (imovel) {
            return imovel.valorVenda > 300000 && imovel.valorVenda <= 450000;
        });
    }

    if (filtroPreco.value === "acima450") {
        dadosFiltrados = dadosFiltrados.filter(function (imovel) {
            return imovel.valorVenda > 450000;
        });
    }

    if (filtroNivel.value !== "") {
        dadosFiltrados = dadosFiltrados.filter(function (imovel) {
            return classificarRisco(calcularIndiceRisco(imovel)) === filtroNivel.value;
        });
    }

    if (pesquisaImovel.value.trim() !== "") {
        const termo = pesquisaImovel.value.toLowerCase().trim();
        dadosFiltrados = dadosFiltrados.filter(function (imovel) {
            return (
                imovel.imovel.toLowerCase().includes(termo) ||
                imovel.bairro.toLowerCase().includes(termo) ||
                imovel.regiao.toLowerCase().includes(termo) ||
                imovel.endereco.toLowerCase().includes(termo)
            );
        });
    }

    atualizarDashboard(dadosFiltrados);
}

filtroRegiao.addEventListener("change", aplicarFiltros);
filtroBairro.addEventListener("change", aplicarFiltros);
filtroTipo.addEventListener("change", aplicarFiltros);
filtroPreco.addEventListener("change", aplicarFiltros);
filtroNivel.addEventListener("change", aplicarFiltros);
pesquisaImovel.addEventListener("input", aplicarFiltros);


// =====================================================
// 9. PAINEL FIXO DE AJUDA
// =====================================================

function abrirAjuda() {
    painelAjuda.hidden = false;
    botaoAjuda.setAttribute("aria-expanded", "true");
}

function fecharPainelAjuda() {
    painelAjuda.hidden = true;
    botaoAjuda.setAttribute("aria-expanded", "false");
}

botaoAjuda.addEventListener("click", function () {
    if (painelAjuda.hidden) abrirAjuda();
    else fecharPainelAjuda();
});

fecharAjuda.addEventListener("click", fecharPainelAjuda);

document.addEventListener("click", function (evento) {
    const ajuda = document.querySelector(".ajuda-indicadores");
    if (!ajuda.contains(evento.target)) fecharPainelAjuda();
});

document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") fecharPainelAjuda();
});


// =====================================================
// 10. INICIALIZAÇÃO
// =====================================================

aplicarFiltros();
