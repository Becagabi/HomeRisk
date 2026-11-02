// =====================================================
// HOMERISK — MERCADO IMOBILIÁRIO
// Base demonstrativa alinhada à página Imóveis.
// =====================================================

const imoveisMercado = window.HOMERISK_DADOS.imoveis;


// Série temporal fictícia para demonstrar gráficos de evolução.
// Os fatores abaixo são hipóteses de simulação, não observações de mercado.
const mesesHistoricoMercado = window.HOMERISK_DADOS.mesesHistoricoMercado;

const variacoesHipoteticasMercado = window.HOMERISK_DADOS.variacoesHipoteticasMercado;

const elRegiao = document.getElementById("mercado-regiao");
const elBairro = document.getElementById("mercado-bairro");
const elTipo = document.getElementById("mercado-tipo");
const elPeriodo = document.getElementById("mercado-periodo");
const elLimpar = document.getElementById("limpar-filtros-mercado");
const corpoTabela = document.getElementById("tabela-mercado-corpo");
const elOrdenarPor = document.getElementById("mercado-ordenar-por");
const elOrdem = document.getElementById("mercado-ordem");
const elStatusComparativo = document.getElementById("mercado-status-comparativo");

const moeda = valor => valor.toLocaleString("pt-BR", {
    style: "currency", currency: "BRL", maximumFractionDigits: 0
});
const numero = valor => valor.toLocaleString("pt-BR", { maximumFractionDigits: 1 });

// Mesmo cálculo de cinco fatores usado na página Risco da Região.
function calcularRiscoMercado(imovel) {
    return Math.round(
        (100 - imovel.saneamento) * 0.20 +
        (100 - imovel.infraestrutura) * 0.20 +
        (100 - imovel.seguranca) * 0.20 +
        (100 - imovel.transporte) * 0.10 +
        imovel.vulnerabilidade * 0.30
    );
}

// Cores padronizadas com a classificação de risco do HomeRisk.
// Baixo: 0–39 | Moderado: 40–69 | Alto: 70–100.
function corPorIndiceRisco(indice) {
    if (indice < 40) return "rgba(60, 141, 90, 0.82)";
    if (indice < 70) return "rgba(201, 162, 39, 0.86)";
    return "rgba(179, 38, 30, 0.86)";
}

function bordaPorIndiceRisco(indice) {
    if (indice < 40) return "#3C8D5A";
    if (indice < 70) return "#C9A227";
    return "#B3261E";
}

function preencherBairrosMercado() {
    const zona = elRegiao.value;
    const bairroAnterior = elBairro.value;
    const bairros = [...new Set(imoveisMercado
        .filter(item => !zona || item.regiao === zona)
        .map(item => item.bairro))].sort((a, b) => a.localeCompare(b, "pt-BR"));

    elBairro.innerHTML = '<option value="">Todos os bairros</option>';
    bairros.forEach(bairro => {
        const option = document.createElement("option");
        option.value = bairro;
        option.textContent = bairro;
        elBairro.appendChild(option);
    });

    if (bairros.includes(bairroAnterior)) elBairro.value = bairroAnterior;
}

function obterDadosFiltrados() {
    return imoveisMercado.filter(item =>
        (!elRegiao.value || item.regiao === elRegiao.value) &&
        (!elBairro.value || item.bairro === elBairro.value) &&
        (!elTipo.value || item.tipo === elTipo.value)
    );
}

function media(dados, campo) {
    if (!dados.length) return null;
    return dados.reduce((soma, item) => soma + item[campo], 0) / dados.length;
}

function precoMedioM2(dados) {
    const areaTotal = dados.reduce((soma, item) => soma + item.area, 0);
    if (!areaTotal) return null;
    const valorTotal = dados.reduce((soma, item) => soma + item.valorVenda, 0);
    return valorTotal / areaTotal;
}

// Rentabilidade bruta anual estimada do conjunto filtrado:
// soma dos aluguéis de 12 meses dividida pela soma dos valores de venda.
function calcularRentabilidadeBrutaAnual(dados) {
    const valorVendaTotal = dados.reduce((soma, item) => soma + item.valorVenda, 0);
    if (!valorVendaTotal) return null;

    const aluguelAnualTotal = dados.reduce(
        (soma, item) => soma + item.valorAluguel * 12,
        0
    );

    return (aluguelAnualTotal / valorVendaTotal) * 100;
}

function agrupar(dados, chave) {
    const grupos = new Map();
    dados.forEach(item => {
        if (!grupos.has(item[chave])) grupos.set(item[chave], []);
        grupos.get(item[chave]).push(item);
    });
    return [...grupos.entries()].sort((a, b) => a[0].localeCompare(b[0], "pt-BR"));
}

function correlacaoPearson(dados) {
    if (dados.length < 2) return null;
    const xs = dados.map(calcularRiscoMercado);
    const ys = dados.map(item => item.valorVenda);
    const mx = xs.reduce((a, b) => a + b, 0) / xs.length;
    const my = ys.reduce((a, b) => a + b, 0) / ys.length;
    const numerador = xs.reduce((s, x, i) => s + (x - mx) * (ys[i] - my), 0);
    const somaX = xs.reduce((s, x) => s + (x - mx) ** 2, 0);
    const somaY = ys.reduce((s, y) => s + (y - my) ** 2, 0);
    const denominador = Math.sqrt(somaX * somaY);
    return denominador ? numerador / denominador : null;
}

function existeFiltroMercadoAtivo() {
    return Boolean(
        elRegiao.value ||
        elBairro.value ||
        elTipo.value
    );
}

function atualizarIndicadores(dados) {
    const filtroAtivo = existeFiltroMercadoAtivo();

    document.getElementById("mercado-total-imoveis").textContent = dados.length;

    // As médias ficam vazias no cenário geral. São exibidas quando
    // qualquer filtro (região, bairro ou tipo) estiver selecionado.
    document.getElementById("mercado-media-venda").textContent = !filtroAtivo
        ? ""
        : dados.length
            ? moeda(media(dados, "valorVenda"))
            : "—";

    document.getElementById("mercado-media-aluguel").textContent = !filtroAtivo
        ? ""
        : dados.length
            ? moeda(media(dados, "valorAluguel"))
            : "—";

    const m2 = precoMedioM2(dados);
    document.getElementById("mercado-preco-m2").textContent = !filtroAtivo
        ? ""
        : m2 === null
            ? "—"
            : `${moeda(m2)}/m²`;

    const rentabilidade = calcularRentabilidadeBrutaAnual(dados);
    document.getElementById("mercado-rentabilidade").textContent = !filtroAtivo
        ? ""
        : rentabilidade === null
            ? "—"
            : `${rentabilidade.toFixed(2).replace(".", ",")}%`;

    const r = correlacaoPearson(dados);
    document.getElementById("mercado-correlacao").textContent = r === null ? "—" : `r = ${r.toFixed(2).replace(".", ",")}`;
    document.getElementById("mercado-correlacao-nota").textContent = r === null
        ? "Dados insuficientes"
        : `Amostra demonstrativa • ${dados.length} imóveis`;
}

function opcoesMoeda() {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: context => moeda(context.parsed.y ?? context.parsed.x) } }
        },
        scales: {
            y: { beginAtZero: true, ticks: { callback: value => moeda(value) } }
        }
    };
}

function criarGraficoBarra(elemento, labels, valores, tituloEixo, horizontal = false) {
    const config = {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: tituloEixo,
                data: valores,
                backgroundColor: "rgba(75, 145, 199, 0.72)",
                borderColor: "#4B91C7",
                borderWidth: 1,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: horizontal ? "y" : "x",
            plugins: {
                legend: { display: false },
                tooltip: { callbacks: { label: context => `${tituloEixo}: ${moeda(context.parsed.y ?? context.parsed.x)}` } }
            },
            scales: {
                x: horizontal ? { beginAtZero: true, ticks: { callback: value => moeda(value) } } : { grid: { display: false } },
                y: horizontal ? { grid: { display: false } } : { beginAtZero: true, ticks: { callback: value => moeda(value) } }
            }
        }
    };
    return new Chart(elemento, config);
}

let graficoVenda = null;
let graficoAluguel = null;
let graficoM2 = null;
let graficoRiscoVenda = null;
let graficoRiscoAluguel = null;
let graficoEvolucaoVenda = null;
let graficoEvolucaoAluguel = null;

// Monta uma série mensal hipotética a partir dos valores atuais filtrados.
// Pequenas diferenças por ID evitam que todas as curvas fiquem perfeitamente proporcionais.
function obterSerieHistoricaSimulada(dados, campo) {
    const serieCompleta = mesesHistoricoMercado.map((mes, indiceMes) => {
        if (!dados.length) {
            return { mes, valor: null };
        }

        const valoresDoMes = dados.map(imovel => {
            const variacaoIndividual = ((imovel.id % 3) - 1) * 0.003;
            const ajusteProgressivo = variacaoIndividual * (11 - indiceMes) / 11;
            const fator = variacoesHipoteticasMercado[indiceMes] * (1 + ajusteProgressivo);
            return imovel[campo] * fator;
        });

        const valorMedio = valoresDoMes.reduce((total, valor) => total + valor, 0) / valoresDoMes.length;
        return { mes, valor: Math.round(valorMedio) };
    });

    // O filtro de período controla apenas os gráficos históricos.
    // Os indicadores atuais continuam representando os valores cadastrados na base.
    const quantidadeMeses = Number(elPeriodo.value) || 12;
    return serieCompleta.slice(-quantidadeMeses);
}

function opcoesGraficoHistorico(rotulo) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: contexto => `${rotulo}: ${contexto.raw === null ? "sem dados" : moeda(contexto.raw)}`
                }
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                ticks: { callback: valor => moeda(valor) }
            },
            x: {
                grid: { display: false }
            }
        }
    };
}

function atualizarGraficoHistorico(instancia, elemento, dados, campo, rotulo, cor) {
    const serie = obterSerieHistoricaSimulada(dados, campo);
    const labels = serie.map(item => item.mes);
    const valores = serie.map(item => item.valor);

    if (!instancia) {
        return new Chart(elemento, {
            type: "line",
            data: {
                labels,
                datasets: [{
                    label: rotulo,
                    data: valores,
                    borderColor: cor,
                    backgroundColor: cor,
                    borderWidth: 2.5,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    tension: 0.3,
                    fill: false,
                    spanGaps: false
                }]
            },
            options: opcoesGraficoHistorico(rotulo)
        });
    }

    instancia.data.labels = labels;
    instancia.data.datasets[0].data = valores;
    instancia.update();
    return instancia;
}

function atualizarGraficosHistoricos(dados) {
    graficoEvolucaoVenda = atualizarGraficoHistorico(
        graficoEvolucaoVenda,
        document.getElementById("grafico-evolucao-venda"),
        dados,
        "valorVenda",
        "Venda média simulada",
        "#4B91C7"
    );

    graficoEvolucaoAluguel = atualizarGraficoHistorico(
        graficoEvolucaoAluguel,
        document.getElementById("grafico-evolucao-aluguel"),
        dados,
        "valorAluguel",
        "Aluguel médio simulado",
        "#1F7A8C"
    );
}

function atualizarGraficos(dados) {
    const porRegiao = agrupar(dados, "regiao");
    const regioes = porRegiao.map(([nome]) => nome);
    const vendas = porRegiao.map(([, itens]) => media(itens, "valorVenda"));
    const alugueis = porRegiao.map(([, itens]) => media(itens, "valorAluguel"));

    const porBairro = agrupar(dados, "bairro");
    const bairros = porBairro.map(([nome]) => nome);
    const valoresM2 = porBairro.map(([, itens]) => precoMedioM2(itens));

    if (!graficoVenda) graficoVenda = criarGraficoBarra(document.getElementById("grafico-venda-regiao"), regioes, vendas, "Venda média");
    else {
        graficoVenda.data.labels = regioes;
        graficoVenda.data.datasets[0].data = vendas;
        graficoVenda.update();
    }

    if (!graficoAluguel) graficoAluguel = criarGraficoBarra(document.getElementById("grafico-aluguel-regiao"), regioes, alugueis, "Aluguel médio");
    else {
        graficoAluguel.data.labels = regioes;
        graficoAluguel.data.datasets[0].data = alugueis;
        graficoAluguel.update();
    }

    if (!graficoM2) graficoM2 = criarGraficoBarra(document.getElementById("grafico-preco-m2-bairro"), bairros, valoresM2, "Preço médio por m²", true);
    else {
        graficoM2.data.labels = bairros;
        graficoM2.data.datasets[0].data = valoresM2;
        graficoM2.update();
    }

    const pontos = dados.map(item => ({
        x: calcularRiscoMercado(item),
        y: item.valorVenda,
        imovel: item.imovel,
        bairro: item.bairro,
        regiao: item.regiao
    }));

    if (!graficoRiscoVenda) {
        graficoRiscoVenda = new Chart(document.getElementById("grafico-risco-venda"), {
            type: "scatter",
            data: { datasets: [{
                label: "Imóveis",
                data: pontos,
                backgroundColor: pontos.map(ponto => corPorIndiceRisco(ponto.x)),
                borderColor: pontos.map(ponto => bordaPorIndiceRisco(ponto.x)),
                pointRadius: 7,
                pointHoverRadius: 9
            }] },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { callbacks: { label: context => {
                        const p = context.raw;
                        return `${p.imovel} • ${p.bairro}: risco ${p.x}/100 • venda ${moeda(p.y)}`;
                    } } }
                },
                scales: {
                    x: { min: 0, max: 100, title: { display: true, text: "Índice de risco (0 a 100)" } },
                    y: { beginAtZero: true, title: { display: true, text: "Valor de venda" }, ticks: { callback: value => moeda(value) } }
                }
            }
        });
    } else {
        graficoRiscoVenda.data.datasets[0].data = pontos;
        graficoRiscoVenda.data.datasets[0].backgroundColor =
            pontos.map(ponto => corPorIndiceRisco(ponto.x));
        graficoRiscoVenda.data.datasets[0].borderColor =
            pontos.map(ponto => bordaPorIndiceRisco(ponto.x));
        graficoRiscoVenda.update();
    }

    const pontosAluguel = dados.map(item => ({
        x: calcularRiscoMercado(item),
        y: item.valorAluguel,
        imovel: item.imovel,
        bairro: item.bairro,
        regiao: item.regiao
    }));

    if (!graficoRiscoAluguel) {
        graficoRiscoAluguel = new Chart(document.getElementById("grafico-risco-aluguel"), {
            type: "scatter",
            data: { datasets: [{
                label: "Imóveis",
                data: pontosAluguel,
                backgroundColor: pontosAluguel.map(ponto => corPorIndiceRisco(ponto.x)),
                borderColor: pontosAluguel.map(ponto => bordaPorIndiceRisco(ponto.x)),
                pointRadius: 7,
                pointHoverRadius: 9
            }] },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { callbacks: { label: context => {
                        const ponto = context.raw;
                        return `${ponto.imovel} • ${ponto.bairro}: risco ${ponto.x}/100 • aluguel ${moeda(ponto.y)}/mês`;
                    } } }
                },
                scales: {
                    x: {
                        min: 0,
                        max: 100,
                        title: { display: true, text: "Índice de risco (0 a 100)" }
                    },
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: "Valor do aluguel mensal" },
                        ticks: { callback: value => moeda(value) }
                    }
                }
            }
        });
    } else {
        graficoRiscoAluguel.data.datasets[0].data = pontosAluguel;
        graficoRiscoAluguel.data.datasets[0].backgroundColor =
            pontosAluguel.map(ponto => corPorIndiceRisco(ponto.x));
        graficoRiscoAluguel.data.datasets[0].borderColor =
            pontosAluguel.map(ponto => bordaPorIndiceRisco(ponto.x));
        graficoRiscoAluguel.update();
    }

    atualizarGraficosHistoricos(dados);
}

function obterResumoBairros(dados) {
    return agrupar(dados, "bairro").map(([bairro, itens]) => ({
        bairro,
        quantidade: itens.length,
        venda: media(itens, "valorVenda"),
        aluguel: media(itens, "valorAluguel"),
        m2: precoMedioM2(itens),
        risco: Math.round(media(
            itens.map(item => ({ risco: calcularRiscoMercado(item) })),
            "risco"
        ))
    }));
}

function classificarRiscoBairro(indice) {
    if (indice < 40) return { nivel: "Baixo", classe: "mercado-risco-baixo" };
    if (indice < 70) return { nivel: "Moderado", classe: "mercado-risco-moderado" };
    return { nivel: "Alto", classe: "mercado-risco-alto" };
}

function atualizarTabela(dados) {
    const comparativo = obterResumoBairros(dados);

    if (!comparativo.length) {
        corpoTabela.innerHTML = '<tr><td colspan="6" class="mercado-sem-dados">Nenhum imóvel encontrado para os filtros selecionados.</td></tr>';
        elStatusComparativo.textContent = "Não há bairros para comparar com os filtros atuais.";
        return;
    }

    const campo = elOrdenarPor.value;
    const direcao = elOrdem.value === "asc" ? 1 : -1;
    const nomesIndicadores = {
        venda: "venda média",
        aluguel: "aluguel médio",
        m2: "preço médio por m²",
        risco: "risco médio",
        quantidade: "quantidade de imóveis"
    };

    comparativo.sort((a, b) => {
        const diferenca = (a[campo] ?? 0) - (b[campo] ?? 0);
        return diferenca === 0
            ? a.bairro.localeCompare(b.bairro, "pt-BR")
            : diferenca * direcao;
    });

    elStatusComparativo.textContent =
        `${comparativo.length} bairro(s) • ${dados.length} imóvel(is) • ordenado por ${nomesIndicadores[campo]} (${direcao === 1 ? "menor para maior" : "maior para menor"}).`;

    corpoTabela.innerHTML = comparativo.map(item => `<tr>
        <td><strong>${item.bairro}</strong></td>
        <td>${item.quantidade}</td>
        <td>${moeda(item.venda)}</td>
        <td>${moeda(item.aluguel)}</td>
        <td>${moeda(item.m2)}</td>
        <td>
            <div class="mercado-risco-celula">
                <span class="mercado-risco-status ${classificarRiscoBairro(item.risco).classe}">
                    ${classificarRiscoBairro(item.risco).nivel}
                </span>
                <span class="mercado-risco-indice">${item.risco}/100</span>
            </div>
        </td>
    </tr>`).join("");
}

function atualizarMercado() {
    const dados = obterDadosFiltrados();
    atualizarIndicadores(dados);
    atualizarGraficos(dados);
    atualizarTabela(dados);
}

elRegiao.addEventListener("change", () => {
    preencherBairrosMercado();
    atualizarMercado();
});
elBairro.addEventListener("change", atualizarMercado);
elTipo.addEventListener("change", atualizarMercado);
elPeriodo.addEventListener("change", atualizarMercado);
elOrdenarPor.addEventListener("change", atualizarMercado);
elOrdem.addEventListener("change", atualizarMercado);
elLimpar.addEventListener("click", () => {
    elRegiao.value = "";
    elBairro.value = "";
    elTipo.value = "";
    elPeriodo.value = "12";
    preencherBairrosMercado();
    atualizarMercado();
});

// Preenche o filtro de bairro já na abertura da página.
// Sem esta chamada inicial, o select mostrava somente "Todos os bairros"
// até que a pessoa alterasse a região.
preencherBairrosMercado();
atualizarMercado();
