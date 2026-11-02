/* =========================================
   HOMERISK — RISCO DA REGIÃO
========================================= */


/* =========================================
   1. DADOS (fictícios, protótipo)
========================================= */

const regioes = window.HOMERISK_DADOS.regioes;

// Os cinco fatores de risco, com um único ícone para cada um.
// Este é o único lugar onde os ícones são definidos.

const categoriasRisco = window.HOMERISK_DADOS.categoriasRisco;

const ICONES_FATORES = window.HOMERISK_DADOS.iconesFatores;

function comIcone(nome) {
    return ICONES_FATORES[nome] + " " + nome;
}

const COR_AZUL = "#4B91C7";
const COR_AZUL_CLARA = "#78A9D4";


/* =========================================
   2. BASE HISTÓRICA DE RELATOS (fictícia)
========================================= */

const mesesHistorico = window.HOMERISK_DADOS.mesesHistoricoRisco;
const historicoRelatos = window.HOMERISK_DADOS.historicoRelatos;

// Cinco valores por bairro, na mesma ordem de categoriasRisco.


/* =========================================
   3. CÁLCULOS
========================================= */

function calcularIndiceRisco(regiao) {

    const indice =
        (100 - regiao.saneamento) * 0.20 +
        (100 - regiao.infraestrutura) * 0.20 +
        (100 - regiao.seguranca) * 0.20 +
        (100 - regiao.transporte) * 0.10 +
        regiao.vulnerabilidade * 0.30;

    return Math.round(indice);
}

function classificarRisco(indice) {

    if (indice < 40) {
        return "Baixo";
    }

    if (indice < 70) {
        return "Moderado";
    }

    return "Alto";
}

// Nome da localidade mostrado nos gráficos e no relatório.

function nomeLocalidade(zona, bairro) {

    return bairro
        ? bairro
        : zona
            ? `Zona ${zona}`
            : "Todas as regiões";
}

function obterFatoresRisco(dados) {

    const fatores = [
        { nome: "Saneamento", calcular: item => 100 - item.saneamento },
        { nome: "Infraestrutura", calcular: item => 100 - item.infraestrutura },
        { nome: "Segurança", calcular: item => 100 - item.seguranca },
        { nome: "Transporte", calcular: item => 100 - item.transporte },
        { nome: "Vulnerabilidade", calcular: item => item.vulnerabilidade }
    ];

    return fatores.map(function (fator) {

        const soma = dados.reduce(function (total, item) {
            return total + fator.calcular(item);
        }, 0);

        return {
            nome: fator.nome,
            indice: dados.length ? Math.round(soma / dados.length) : 0
        };

    }).sort(function (a, b) {
        return b.indice - a.indice;
    });
}

// Filtros reutilizados em toda a página.

function filtrarRegioes(zona, bairro) {

    return regioes.filter(function (item) {
        return (
            (zona === "" || item.regiao === zona) &&
            (bairro === "" || item.bairro === bairro)
        );
    });
}

function filtrarRelatos(zona, bairro, periodo) {

    const nomes = filtrarRegioes(zona, bairro).map(function (item) {
        return item.bairro;
    });

    const meses = mesesHistorico.slice(-periodo);

    const registros = historicoRelatos.filter(function (item) {
        return nomes.includes(item.bairro) && meses.includes(item.mes);
    });

    return { registros: registros, meses: meses };
}

function somarRelatos(registros, condicao) {

    return registros
        .filter(condicao)
        .reduce(function (total, item) {
            return total + item.quantidade;
        }, 0);
}

// Preenche um <select> de bairros conforme a zona escolhida.

function preencherBairros(select, zona) {

    const anterior = select.value;

    const bairros = regioes
        .filter(function (item) {
            return zona === "" || item.regiao === zona;
        })
        .map(function (item) {
            return item.bairro;
        });

    select.innerHTML = '<option value="">Todos os bairros</option>';

    bairros.forEach(function (bairro) {
        const opcao = document.createElement("option");
        opcao.value = bairro;
        opcao.textContent = bairro;
        select.appendChild(opcao);
    });

    if (bairros.includes(anterior)) {
        select.value = anterior;
    }
}


/* =========================================
   4. ELEMENTOS DO HTML E ESTADO
========================================= */

// Painel principal

const filtroRegiao = document.getElementById("filtro-regiao");
const filtroBairro = document.getElementById("filtro-bairro");

const totalRegioes = document.getElementById("total-regioes");
const riscoMedio = document.getElementById("risco-medio");
const menorRisco = document.getElementById("menor-risco");
const maiorRisco = document.getElementById("maior-risco");

const elementoGrafico = document.getElementById("grafico-risco-regioes");
const elementoGraficoEvolucao = document.getElementById("grafico-evolucao-risco");
const elementoMapaRisco = document.getElementById("mapa-risco-regiao");
const filtroMapaRegiao = document.getElementById("filtro-mapa-regiao");
const filtroMapaBairro = document.getElementById("filtro-mapa-bairro");

const botaoVisaoZona = document.getElementById("visao-zona");
const botaoVisaoBairro = document.getElementById("visao-bairro");
const botaoVisaoComparativo = document.getElementById("visao-comparativo");
const botaoVisaoEvolucao = document.getElementById("visao-evolucao");

const graficoContainer = document.getElementById("grafico-container");
const tabelaContainer = document.getElementById("tabela-container");
const evolucaoContainer = document.getElementById("evolucao-container");

let graficoRisco = null;
let graficoEvolucao = null;
let mapaRisco = null;
let camadaMarcadoresRisco = null;
const marcadoresPorImovel = new Map();
let modoGrafico = "zona";
let dadosAtuais = [...regioes];

// Painel de infraestrutura

const filtroZonaRisco = document.getElementById("filtro-zona-risco");
const filtroBairroRisco = document.getElementById("filtro-bairro-risco");
const filtroPeriodoRisco = document.getElementById("filtro-periodo-risco");

const elementoPicoRelatos = document.getElementById("grafico-pico-relatos");
const elementoTotalCategorias = document.getElementById("grafico-total-categorias");

let graficoPicoRelatos = null;
let graficoTotalCategorias = null;

// Relatório

const botaoRelatorio = document.getElementById("botao-relatorio");
const modalRelatorio = document.getElementById("modal-relatorio");
const fecharRelatorio = document.getElementById("fechar-relatorio");
const conteudoRelatorio = document.getElementById("conteudo-relatorio");
const tituloRelatorio = document.getElementById("relatorio-localidade");
const botaoImprimirRelatorio = document.getElementById("imprimir-relatorio");

const relatorioFiltroZona = document.getElementById("relatorio-filtro-zona");
const relatorioFiltroBairro = document.getElementById("relatorio-filtro-bairro");
const relatorioFiltroPeriodo = document.getElementById("relatorio-filtro-periodo");

// Botão de ajuda

const botaoAjuda = document.getElementById("botao-ajuda-indicadores");
const painelAjuda = document.getElementById("painel-ajuda-indicadores");
const fecharAjuda = document.getElementById("fechar-ajuda-indicadores");


/* =========================================
   5. CORES POR VALOR (verde → amarelo → vermelho)
   Quanto maior o valor, mais a cor vai do verde ao vermelho.
   O fundo dos gráficos continua branco.
========================================= */

const COR_VERDE = "rgba(60, 141, 90, 0.55)";
const COR_AMARELA = "rgba(201, 162, 39, 0.55)";
const COR_VERMELHA = "rgba(179, 38, 30, 0.55)";

// Índice de risco (0 a 100): segue a classificação Baixo / Moderado / Alto.

function corPorIndice(valor) {

    if (valor < 40) {
        return COR_VERDE;
    }

    if (valor < 70) {
        return COR_AMARELA;
    }

    return COR_VERMELHA;
}

// Quantidades: compara cada valor com o maior valor do gráfico.

function coresPorProporcao(valores) {

    const maximo = Math.max.apply(null, valores);

    return valores.map(function (valor) {

        const proporcao = maximo > 0 ? valor / maximo : 0;

        if (proporcao < 1 / 3) {
            return COR_VERDE;
        }

        if (proporcao < 2 / 3) {
            return COR_AMARELA;
        }

        return COR_VERMELHA;
    });
}

// Degradê da linha: verde embaixo, amarelo no meio e vermelho no alto.

function criarDegradeRisco(chart) {

    const area = chart.chartArea;

    if (!area) {
        return COR_AMARELA;
    }

    const degrade = chart.ctx.createLinearGradient(0, area.bottom, 0, area.top);

    degrade.addColorStop(0, COR_VERDE);
    degrade.addColorStop(0.4, COR_AMARELA);
    degrade.addColorStop(0.7, COR_VERMELHA);
    degrade.addColorStop(1, COR_VERMELHA);

    return degrade;
}


/* =========================================
   6. PAINEL DE FATORES DE RISCO
========================================= */

function atualizarPainelFatoresRisco(dados) {

    const lista = document.getElementById("lista-fatores-risco");

    if (!lista) {
        return;
    }

    if (dados.length === 0) {
        lista.innerHTML = "<p>Nenhum dado disponível.</p>";
        return;
    }

    lista.innerHTML = obterFatoresRisco(dados).map(function (fator, indice) {
        return `
            <article class="item-fator-risco">
                <div class="fator-cabecalho">
                    <span class="fator-posicao">${indice + 1}</span>
                    <strong>${comIcone(fator.nome)}</strong>
                    <span class="fator-indice">${fator.indice}/100</span>
                </div>

                <div class="barra-fator-risco">
                    <div
                        class="barra-fator-preenchida"
                        style="width: ${fator.indice}%">
                    </div>
                </div>
            </article>
        `;
    }).join("");
}


/* =========================================
   7. COMPARATIVO E INDICADORES
========================================= */

function mostrarComparativo(dados) {

    const tabela = document.getElementById("tabela-comparativo");

    if (dados.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td colspan="4">Nenhum bairro encontrado.</td>
            </tr>
        `;
        return;
    }

    const dadosOrdenados = [...dados].sort(function (a, b) {
        return calcularIndiceRisco(a) - calcularIndiceRisco(b);
    });

    tabela.innerHTML = dadosOrdenados.map(function (item) {

        const indice = calcularIndiceRisco(item);
        const nivel = classificarRisco(indice);

        return `
            <tr>
                <td>${item.bairro}</td>
                <td>${item.regiao}</td>
                <td>${indice}/100</td>
                <td>
                    <span class="nivel-${nivel.toLowerCase()}">
                        ${nivel}
                    </span>
                </td>
            </tr>
        `;
    }).join("");
}

function atualizarIndicadores(dados) {

    totalRegioes.textContent = dados.length;

    if (dados.length === 0) {
        riscoMedio.textContent = "—";
        menorRisco.textContent = "—";
        maiorRisco.textContent = "—";
        return;
    }

    const somaRiscos = dados.reduce(function (total, item) {
        return total + calcularIndiceRisco(item);
    }, 0);

    riscoMedio.textContent = `${Math.round(somaRiscos / dados.length)}/100`;

    const ordenados = [...dados].sort(function (a, b) {
        return calcularIndiceRisco(a) - calcularIndiceRisco(b);
    });

    const menor = ordenados[0];
    const maior = ordenados[ordenados.length - 1];

    menorRisco.textContent = `${menor.bairro} — ${menor.regiao}`;
    maiorRisco.textContent = `${maior.bairro} — ${maior.regiao}`;
}


/* =========================================
   8. GRÁFICOS DO PAINEL PRINCIPAL
========================================= */

function atualizarGraficoEvolucao(dados) {

    const meses = ["Mai", "Jun", "Jul", "Ago", "Set", "Out"];
    const localidade = nomeLocalidade(filtroRegiao.value, filtroBairro.value);

    let valores = [];

    if (dados.length > 0) {

        const soma = dados.reduce(function (total, item) {
            return total + calcularIndiceRisco(item);
        }, 0);

        const mediaAtual = Math.round(soma / dados.length);

        // Variações simuladas para demonstrar a evolução.
        const variacoes = [-6, -4, -2, 1, 3, 0];

        valores = variacoes.map(function (variacao) {
            return Math.max(0, Math.min(100, mediaAtual + variacao));
        });
    }

    if (graficoEvolucao) {
        graficoEvolucao.data.labels = meses;
        graficoEvolucao.data.datasets[0].data = valores;
        graficoEvolucao.options.plugins.title.text = localidade;
        graficoEvolucao.update();
        return;
    }

    graficoEvolucao = new Chart(elementoGraficoEvolucao, {

        type: "line",

        data: {
            labels: meses,
            datasets: [{
                label: "Índice médio de risco",
                data: valores,
                borderColor: function (contexto) {
                    return criarDegradeRisco(contexto.chart);
                },
                pointBackgroundColor: function (contexto) {
                    return corPorIndice(contexto.raw);
                },
                pointBorderColor: function (contexto) {
                    return corPorIndice(contexto.raw);
                },
                borderWidth: 3,
                fill: false,
                tension: 0.3
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: { display: true, text: "Índice de risco (0 a 100)" }
                },
                x: {
                    title: { display: true, text: "Meses" }
                }
            },

            plugins: {
                title: { display: true, text: localidade },
                legend: { display: true }
            }
        }
    });
}

function atualizarGrafico(dados) {

    graficoContainer.style.display =
        (modoGrafico === "zona" || modoGrafico === "bairro") ? "block" : "none";

    tabelaContainer.style.display =
        modoGrafico === "comparativo" ? "block" : "none";

    evolucaoContainer.style.display =
        modoGrafico === "evolucao" ? "block" : "none";

    if (modoGrafico === "evolucao") {
        atualizarGraficoEvolucao(dados);
        return;
    }

    if (modoGrafico === "comparativo") {
        return;
    }

    let labels = [];
    let indices = [];

    if (modoGrafico === "zona") {

        // Agrupa os bairros por zona e calcula a média de cada zona.
        const agrupados = {};

        dados.forEach(function (item) {

            if (!agrupados[item.regiao]) {
                agrupados[item.regiao] = { soma: 0, quantidade: 0 };
            }

            agrupados[item.regiao].soma += calcularIndiceRisco(item);
            agrupados[item.regiao].quantidade++;
        });

        labels = Object.keys(agrupados);

        indices = labels.map(function (zona) {
            return Math.round(agrupados[zona].soma / agrupados[zona].quantidade);
        });

    } else {

        labels = dados.map(function (item) {
            return item.bairro;
        });

        indices = dados.map(function (item) {
            return calcularIndiceRisco(item);
        });
    }

    const tituloX = modoGrafico === "zona" ? "Zonas" : "Bairros";
    const localidade = nomeLocalidade(filtroRegiao.value, filtroBairro.value);

    if (graficoRisco) {
        graficoRisco.data.labels = labels;
        graficoRisco.data.datasets[0].data = indices;
        graficoRisco.data.datasets[0].backgroundColor = indices.map(corPorIndice);
        graficoRisco.data.datasets[0].borderColor = indices.map(corPorIndice);
        graficoRisco.options.scales.x.title.text = tituloX;
        graficoRisco.options.plugins.title.text = localidade;
        graficoRisco.update();
        return;
    }

    graficoRisco = new Chart(elementoGrafico, {

        type: "bar",

        data: {
            labels: labels,
            datasets: [{
                label: "Índice de risco",
                data: indices,
                backgroundColor: indices.map(corPorIndice),
                borderColor: indices.map(corPorIndice),
                borderWidth: 1,
                borderRadius: 5
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: { display: true, text: "Índice de risco (0 a 100)" }
                },
                x: {
                    title: { display: true, text: tituloX }
                }
            },

            plugins: {
                title: { display: true, text: localidade },
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `Índice de risco: ${context.raw}/100`;
                        }
                    }
                }
            }
        }
    });
}

function aplicarFiltros() {

    dadosAtuais = filtrarRegioes(filtroRegiao.value, filtroBairro.value);

    atualizarIndicadores(dadosAtuais);
    mostrarComparativo(dadosAtuais);
    atualizarGrafico(dadosAtuais);
    atualizarPainelFatoresRisco(dadosAtuais);
    atualizarMapaRisco(obterDadosMapa());
}

function selecionarModo(modo) {

    modoGrafico = modo;

    const botoes = [
        { elemento: botaoVisaoZona, modo: "zona" },
        { elemento: botaoVisaoBairro, modo: "bairro" },
        { elemento: botaoVisaoComparativo, modo: "comparativo" },
        { elemento: botaoVisaoEvolucao, modo: "evolucao" }
    ];

    botoes.forEach(function (botao) {

        const selecionado = botao.modo === modo;

        botao.elemento.classList.toggle("ativo", selecionado);
        botao.elemento.setAttribute("aria-pressed", String(selecionado));
    });

    atualizarGrafico(dadosAtuais);
}


/* =========================================
   8.1. MAPA INTERATIVO DE RISCO POR BAIRRO
========================================= */

// Coordenadas aproximadas do centro de cada bairro.
// Elas servem para referência geográfica e não representam ocorrências em ruas.
const coordenadasBairros = {
    "Bom Retiro": [-23.526, -46.637],
    "Pinheiros": [-23.566, -46.689],
    "Itaquera": [-23.534, -46.456],
    "Moema": [-23.596, -46.661],
    "Vila Maria": [-23.513, -46.578],
    "Santana": [-23.500, -46.630],
    "Capão Redondo": [-23.669, -46.780],
    "Tucuruvi": [-23.476, -46.606]
};

// Liga cada bairro ao registro correspondente em script-imoveis.js.
// Os IDs e nomes devem acompanhar a lista de imóveis dessa página.
const imoveisPorBairro = {
    // Cada bairro aceita uma lista com quantos imóveis estiverem cadastrados.
    // Para adicionar outro imóvel no mesmo bairro, inclua um novo objeto na lista.
    "Bom Retiro": [
        { id: 1, nome: "Apto 101", tipo: "Apartamento" }
    ],
    "Pinheiros": [
        { id: 2, nome: "Apto 204", tipo: "Apartamento" }
    ],
    "Itaquera": [
        { id: 3, nome: "Apto 312", tipo: "Apartamento" }
    ],
    "Moema": [
        { id: 4, nome: "Apto 405", tipo: "Apartamento" }
    ],
    "Vila Maria": [
        { id: 5, nome: "Casa 12", tipo: "Casa" }
    ],
    "Santana": [
        { id: 6, nome: "Apto 600", tipo: "Apartamento" }
    ],
    "Capão Redondo": [
        { id: 7, nome: "Casa 08", tipo: "Casa" }
    ],
    "Tucuruvi": [
        { id: 8, nome: "Apto 506", tipo: "Apartamento" }
    ]
};

function obterDadosMapa() {
    return filtrarRegioes(filtroMapaRegiao.value, filtroMapaBairro.value);
}

function corMarcadorRisco(indice) {
    if (indice < 40) return "#3c8d5a";
    if (indice < 70) return "#c9a227";
    return "#b3261e";
}

function inicializarMapaRisco() {

    if (!elementoMapaRisco) return;

    if (typeof L === "undefined") {
        elementoMapaRisco.textContent =
            "Não foi possível carregar o mapa. Verifique sua conexão com a internet.";
        return;
    }

    mapaRisco = L.map(elementoMapaRisco).setView([-23.55, -46.64], 10);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapaRisco);

    camadaMarcadoresRisco = L.layerGroup().addTo(mapaRisco);

    // Garante que o Leaflet calcule as dimensões após a renderização do container.
    requestAnimationFrame(function () {
        mapaRisco.invalidateSize();
    });
}

function obterCoordenadaVisual(bairro, indice, total) {
    const centro = coordenadasBairros[bairro];
    if (!centro || total <= 1) return centro;

    // Pequeno deslocamento visual para separar marcadores do mesmo bairro.
    // Não representa a localização real dos imóveis.
    const angulo = (2 * Math.PI * indice) / total;
    const distanciaVisual = 0.00055;

    return [
        centro[0] + Math.cos(angulo) * distanciaVisual,
        centro[1] + Math.sin(angulo) * distanciaVisual
    ];
}

function localizarImovelMapa(idImovel) {
    for (const [bairro, lista] of Object.entries(imoveisPorBairro)) {
        const imovel = lista.find(function (item) {
            return String(item.id) === String(idImovel);
        });

        if (imovel) return { bairro: bairro, imovel: imovel };
    }

    return null;
}

function atualizarMapaRisco(dados, idDestacado) {

    if (!mapaRisco || !camadaMarcadoresRisco) return;

    camadaMarcadoresRisco.clearLayers();
    marcadoresPorImovel.clear();

    const pontosVisiveis = [];

    dados.forEach(function (item) {

        const centroBairro = coordenadasBairros[item.bairro];
        if (!centroBairro) return;

        const indice = calcularIndiceRisco(item);
        const nivel = classificarRisco(indice);
        const imoveisDoBairro = imoveisPorBairro[item.bairro] || [];

        // Cria um marcador para CADA imóvel cadastrado no bairro filtrado.
        imoveisDoBairro.forEach(function (imovel, indiceImovel) {

            const coordenadas = obterCoordenadaVisual(
                item.bairro,
                indiceImovel,
                imoveisDoBairro.length
            );
            const selecionado = String(imovel.id) === String(idDestacado || "");

            const marcador = L.circleMarker(coordenadas, {
                radius: selecionado ? 12 : 9,
                color: selecionado ? "#19364d" : "#ffffff",
                weight: selecionado ? 4 : 2,
                fillColor: corMarcadorRisco(indice),
                fillOpacity: 0.98
            });

            const textoTipo = imovel.tipo === "Apartamento"
                ? "Ver apartamento"
                : "Ver imóvel";

            const linkImovel = `<a class="link-imovel-mapa" href="imoveis.html?imovel=${encodeURIComponent(imovel.id)}">${textoTipo}</a>`;

            marcador.bindPopup(`
                <div class="popup-mapa-risco">
                    <strong>${item.bairro}</strong>
                    <span>Zona ${item.regiao}</span>
                    <p class="nome-imovel-mapa">${imovel.nome}</p>
                    <p>Índice demonstrativo do bairro: <b>${indice}/100</b></p>
                    <p>Classificação: <b>${nivel}</b></p>
                    ${linkImovel}
                    <small>
                        O marcador indica a localização aproximada do bairro. A posição pode ser deslocada visualmente para separar imóveis próximos e não representa o endereço exato.
                    </small>
                </div>
            `);

            marcador.addTo(camadaMarcadoresRisco);
            marcadoresPorImovel.set(String(imovel.id), marcador);
            pontosVisiveis.push(coordenadas);
        });
    });

    if (pontosVisiveis.length === 1) {
        mapaRisco.setView(pontosVisiveis[0], 13);
    } else if (pontosVisiveis.length > 1) {
        mapaRisco.fitBounds(pontosVisiveis, {
            padding: [30, 30],
            maxZoom: 11
        });
    } else {
        mapaRisco.setView([-23.55, -46.64], 10);
    }
}

// Ao vir da ficha de um imóvel, mostra TODOS os imóveis da mesma região,
// mantendo o imóvel selecionado destacado e com o popup aberto.
function abrirImovelSolicitadoNoMapa() {

    const parametros = new URLSearchParams(window.location.search);
    const idSolicitado = parametros.get("imovel");

    if (!idSolicitado || !mapaRisco) return;

    const encontrado = localizarImovelMapa(idSolicitado);
    if (!encontrado) return;

    const regiaoDoBairro = regioes.find(function (item) {
        return item.bairro === encontrado.bairro;
    });

    if (!regiaoDoBairro) return;

    filtroMapaRegiao.value = regiaoDoBairro.regiao;
    preencherBairros(filtroMapaBairro, regiaoDoBairro.regiao);

    // Mantém todos os bairros da região selecionada no mapa.
    filtroMapaBairro.value = "";

    atualizarMapaRisco(obterDadosMapa(), idSolicitado);

    const marcador = marcadoresPorImovel.get(String(idSolicitado));
    if (marcador) {
        // Não aproximar em excesso: manter os outros imóveis da região visíveis.
        marcador.openPopup();
    }

    const secaoMapa = document.getElementById("secao-mapa-risco");
    if (secaoMapa) {
        requestAnimationFrame(function () {
            secaoMapa.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    }
}

/* =========================================
   9. PAINEL DE INFRAESTRUTURA (RELATOS)
========================================= */

function obterRelatosFiltrados() {

    return filtrarRelatos(
        filtroZonaRisco.value,
        filtroBairroRisco.value,
        Number(filtroPeriodoRisco.value)
    );
}

function atualizarIndicadoresEvolucao(dados) {

    const categoriaElemento = document.getElementById("categoria-mais-relatos");
    const totalCategoriaElemento = document.getElementById("total-categoria-relatos");
    const variacaoElemento = document.getElementById("variacao-relatos");
    const classificacaoElemento = document.getElementById("classificacao-relatos");

    // Limpa a classificação anterior para não manter uma cor desatualizada.
    classificacaoElemento.classList.remove(
        "evolucao-aumento",
        "evolucao-reducao",
        "evolucao-estavel"
    );

    const totalGeral = somarRelatos(dados.registros, function () {
        return true;
    });

    // Evita destacar uma categoria quando não existem relatos no período.
    if (totalGeral === 0) {
        categoriaElemento.textContent = "Sem registros";
        totalCategoriaElemento.textContent = "Nenhum relato no período selecionado";
        variacaoElemento.textContent = "—";
        classificacaoElemento.textContent = "Dados insuficientes";
        return;
    }

    // Categoria com mais relatos.
    const totaisCategorias = categoriasRisco.map(function (categoria) {
        return {
            categoria: categoria,
            total: somarRelatos(dados.registros, function (item) {
                return item.categoria === categoria;
            })
        };
    });

    const categoriaPrincipal = totaisCategorias.reduce(function (maior, atual) {
        return atual.total > maior.total ? atual : maior;
    });

    categoriaElemento.textContent = comIcone(categoriaPrincipal.categoria);
    totalCategoriaElemento.textContent =
        categoriaPrincipal.total.toLocaleString("pt-BR") + " relatos registrados";

    // Variação entre o primeiro e o último mês.
    const totaisMeses = dados.meses.map(function (mes) {
        return somarRelatos(dados.registros, function (item) {
            return item.mes === mes;
        });
    });

    if (totaisMeses.length < 2) {
        variacaoElemento.textContent = "—";
        classificacaoElemento.textContent = "Dados insuficientes";
        return;
    }

    const primeiroMes = totaisMeses[0];
    const ultimoMes = totaisMeses[totaisMeses.length - 1];
    const diferenca = ultimoMes - primeiroMes;

    const variacao = primeiroMes > 0
        ? Math.round((diferenca / primeiroMes) * 100)
        : null;

    variacaoElemento.textContent = variacao === null
        ? "—"
        : `${variacao > 0 ? "+" : ""}${variacao}%`;

    if (diferenca > 0) {
        classificacaoElemento.textContent = "Aumento";
        classificacaoElemento.classList.add("evolucao-aumento");

    } else if (diferenca < 0) {
        classificacaoElemento.textContent = "Redução";
        classificacaoElemento.classList.add("evolucao-reducao");

    } else {
        classificacaoElemento.textContent = "Estável";
        classificacaoElemento.classList.add("evolucao-estavel");
    }
}

function atualizarGraficoPico(dados) {

    atualizarIndicadoresEvolucao(dados);

    const localidade = nomeLocalidade(filtroZonaRisco.value, filtroBairroRisco.value);

    const conjuntos = categoriasRisco.map(function (categoria) {
        return {
            label: comIcone(categoria),
            data: dados.meses.map(function (mes) {
                return somarRelatos(dados.registros, function (item) {
                    return item.mes === mes && item.categoria === categoria;
                });
            }),
            borderWidth: 2,
            tension: 0.3
        };
    });

    if (graficoPicoRelatos) {
        graficoPicoRelatos.data.labels = dados.meses;
        graficoPicoRelatos.data.datasets = conjuntos;
        graficoPicoRelatos.options.plugins.title.text = localidade;
        graficoPicoRelatos.update();
        return;
    }

    graficoPicoRelatos = new Chart(elementoPicoRelatos, {

        type: "line",

        data: {
            labels: dados.meses,
            datasets: conjuntos
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            interaction: { mode: "index", intersect: false },

            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: "Quantidade de relatos" }
                }
            },

            plugins: {
                title: { display: true, text: localidade },
                legend: { display: true, position: "top" }
            }
        }
    });
}

function atualizarGraficoTotal(dados) {

    const localidade = nomeLocalidade(filtroZonaRisco.value, filtroBairroRisco.value);

    const totais = categoriasRisco.map(function (categoria) {
        return somarRelatos(dados.registros, function (item) {
            return item.categoria === categoria;
        });
    });

    if (graficoTotalCategorias) {
        graficoTotalCategorias.data.datasets[0].data = totais;
        graficoTotalCategorias.data.datasets[0].backgroundColor = coresPorProporcao(totais);
        graficoTotalCategorias.data.datasets[0].borderColor = coresPorProporcao(totais);
        graficoTotalCategorias.options.plugins.title.text = localidade;
        graficoTotalCategorias.update();
        return;
    }

    graficoTotalCategorias = new Chart(elementoTotalCategorias, {

        type: "bar",

        data: {
            labels: categoriasRisco.map(comIcone),
            datasets: [{
                label: "Total de relatos",
                data: totais,
                backgroundColor: COR_AZUL_CLARA,
                borderColor: COR_AZUL,
                borderWidth: 1,
                borderRadius: 5
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: "Total de relatos" }
                }
            },

            plugins: {
                title: { display: true, text: localidade },
                legend: { display: false }
            }
        }
    });
}

function atualizarPainelInfraestrutura() {

    const dados = obterRelatosFiltrados();

    atualizarGraficoPico(dados);
    atualizarGraficoTotal(dados);

    atualizarPainelFatoresRisco(
        filtrarRegioes(filtroZonaRisco.value, filtroBairroRisco.value)
    );
}


/* =========================================
   10. RELATÓRIO DA LOCALIDADE
========================================= */

function gerarRelatorio() {

    const zona = relatorioFiltroZona.value;
    const bairro = relatorioFiltroBairro.value;
    const periodo = Number(relatorioFiltroPeriodo.value);

    const selecionados = filtrarRegioes(zona, bairro);
    const dados = filtrarRelatos(zona, bairro, periodo);
    const registros = dados.registros;
    const meses = dados.meses;

    // Risco e fatores

    const somaRisco = selecionados.reduce(function (total, item) {
        return total + calcularIndiceRisco(item);
    }, 0);

    const riscoMedioRelatorio = selecionados.length
        ? Math.round(somaRisco / selecionados.length)
        : 0;

    const fatoresRelatorio = obterFatoresRisco(selecionados);
    const principalFator = fatoresRelatorio[0];

    // Relatos

    const totalRelatos = somarRelatos(registros, function () {
        return true;
    });

    const totaisCategorias = categoriasRisco.map(function (categoria) {
        return {
            categoria: categoria,
            total: somarRelatos(registros, function (item) {
                return item.categoria === categoria;
            })
        };
    }).sort(function (a, b) {
        return b.total - a.total;
    });

    const totaisMeses = meses.map(function (mes) {
        return {
            mes: mes,
            total: somarRelatos(registros, function (item) {
                return item.mes === mes;
            })
        };
    });

    // Só existe categoria ou mês de destaque quando há relatos no período.
    const temRelatos = totalRelatos > 0;

    const categoriaDestaque = temRelatos
        ? totaisCategorias[0]
        : { categoria: null, total: 0 };

    const mesPico = temRelatos
        ? totaisMeses.reduce(function (maior, atual) {
            return atual.total > maior.total ? atual : maior;
        }, { mes: "—", total: 0 })
        : { mes: "—", total: 0 };

    const mesMenor = temRelatos
        ? totaisMeses.reduce(function (menor, atual) {
            return atual.total < menor.total ? atual : menor;
        }, { mes: "—", total: Infinity })
        : { mes: "—", total: Infinity };

    const primeiroMes = totaisMeses[0] || { mes: "—", total: 0 };
    const ultimoMes = totaisMeses[totaisMeses.length - 1] || { mes: "—", total: 0 };

    const diferencaRelatos = ultimoMes.total - primeiroMes.total;

    const variacaoPercentual = primeiroMes.total > 0
        ? Math.round((diferencaRelatos / primeiroMes.total) * 100)
        : null;

    let conclusaoRelatos = temRelatos
        ? "Não há dados suficientes para comparar o período."
        : "Não há relatos registrados no período selecionado.";

    if (temRelatos && totaisMeses.length > 1) {

        if (diferencaRelatos > 0) {
            conclusaoRelatos = `Os relatos aumentaram ${variacaoPercentual !== null ? variacaoPercentual + "%" : ""} entre ${primeiroMes.mes} e ${ultimoMes.mes}.`;

        } else if (diferencaRelatos < 0) {
            conclusaoRelatos = `Os relatos diminuíram ${Math.abs(variacaoPercentual)}% entre ${primeiroMes.mes} e ${ultimoMes.mes}.`;

        } else {
            conclusaoRelatos = `O volume de relatos permaneceu igual entre ${primeiroMes.mes} e ${ultimoMes.mes}.`;
        }
    }

    tituloRelatorio.textContent = nomeLocalidade(zona, bairro);

    conteudoRelatorio.innerHTML = `
    <section class="secao-relatorio">
        <h3>Identificação da localidade</h3>

        <div class="identificacao-relatorio">
            <div>
                <span>Zona</span>
                <strong>${zona || "Todas"}</strong>
            </div>

            <div>
                <span>Bairro</span>
                <strong>${bairro || "Todos"}</strong>
            </div>

            <div>
                <span>Período analisado</span>
                <strong>${meses[0]} até ${meses[meses.length - 1]}</strong>
            </div>
        </div>
    </section>

    <section class="secao-relatorio">
        <h3>Indicadores gerais</h3>

        <div class="resumo-relatorio">
            <div class="item-resumo-relatorio">
                <span>Índice médio de risco</span>
                <strong>${selecionados.length ? riscoMedioRelatorio + "/100" : "—"}</strong>
            </div>

            <div class="item-resumo-relatorio">
                <span>Total de relatos</span>
                <strong>${totalRelatos.toLocaleString("pt-BR")}</strong>
            </div>

            <div class="item-resumo-relatorio">
                <span>Mês com mais relatos</span>
                <strong>${mesPico.mes}</strong>
            </div>
        </div>
    </section>

    <section class="secao-relatorio">
        <div class="titulo-secao-relatorio">
            <div>
                <h3>Principais fatores de risco</h3>
                <p>
                    Identifique os fatores que mais contribuem para o índice
                    de risco da localidade.
                </p>
            </div>
            <span class="icone-secao">📊</span>
        </div>

        <div class="lista-fatores-relatorio">
            ${fatoresRelatorio.map(function (fator, indice) {
                return `
                    <div class="card-fator-relatorio">
                        <div class="cabecalho-fator">
                            <div class="identificacao-fator">
                                <span class="icone-fator">${ICONES_FATORES[fator.nome]}</span>

                                <div>
                                    <strong>${fator.nome}</strong>
                                    <small>${indice + 1}º fator de risco</small>
                                </div>
                            </div>

                            <strong class="valor-fator">${fator.indice}/100</strong>
                        </div>

                        <div class="barra-fator-relatorio">
                            <div
                                class="preenchimento-fator"
                                style="width: ${fator.indice}%; background-color: ${COR_AZUL};">
                            </div>
                        </div>
                    </div>
                `;
            }).join("")}
        </div>

        ${selecionados.length && principalFator ? `
            <div class="destaque-fator-relatorio">
                <div class="icone-destaque">🔎</div>

                <div>
                    <span class="rotulo-destaque">FATOR DE MAIOR DESTAQUE</span>

                    <h4>
                        ${comIcone(principalFator.nome)}
                        <span>${principalFator.indice}/100</span>
                    </h4>

                    <p>
                        Este é o fator que apresenta o maior índice de risco
                        entre os indicadores analisados para a localidade.
                    </p>
                </div>
            </div>

            <div class="queixas-relatorio">
                <h4>📋 Principais queixas</h4>
                <p>
                    Os registros detalhados das queixas serão apresentados
                    nesta seção quando os relatórios forem integrados.
                </p>
            </div>
        ` : `
            <p>Não há dados disponíveis para identificar os fatores de risco.</p>
        `}
    </section>

    <section class="secao-relatorio">
        <h3>Análise e interpretação</h3>

        <div class="analise-relatorio">
            <div class="item-analise-relatorio">
                <span>Categoria com mais relatos</span>
                <strong>${temRelatos ? comIcone(categoriaDestaque.categoria) : "Sem registros"}</strong>
                <p>${temRelatos ? categoriaDestaque.total.toLocaleString("pt-BR") + " relatos registrados" : "Nenhum relato no período"}</p>
            </div>

            <div class="item-analise-relatorio">
                <span>Mês com mais relatos</span>
                <strong>${temRelatos ? mesPico.mes : "—"}</strong>
                <p>${temRelatos ? mesPico.total.toLocaleString("pt-BR") + " relatos" : "Nenhum relato no período"}</p>
            </div>

            <div class="item-analise-relatorio">
                <span>Mês com menos relatos</span>
                <strong>${temRelatos && mesMenor.total !== Infinity ? mesMenor.mes : "—"}</strong>
                <p>${!temRelatos || mesMenor.total === Infinity ? "Sem registros" : mesMenor.total.toLocaleString("pt-BR") + " relatos"}</p>
            </div>
        </div>

        <div class="conclusao-relatorio">
            <h4>Conclusão do período</h4>
            <p>${conclusaoRelatos}</p>
        </div>
    </section>

    <section class="secao-relatorio">
        <h3>Total de relatos por categoria</h3>

        <table class="tabela-relatorio">
            <thead>
                <tr>
                    <th>Categoria</th>
                    <th>Total de relatos</th>
                </tr>
            </thead>

            <tbody>
                ${totaisCategorias.map(function (item) {
                    return `
                        <tr>
                            <td>${comIcone(item.categoria)}</td>
                            <td>${item.total.toLocaleString("pt-BR")}</td>
                        </tr>
                    `;
                }).join("")}
            </tbody>
        </table>
    </section>

    <section class="secao-relatorio">
        <h3>Acompanhamento mensal</h3>

        <table class="tabela-relatorio">
            <thead>
                <tr>
                    <th>Mês</th>
                    <th>Total de relatos</th>
                </tr>
            </thead>

            <tbody>
                ${totaisMeses.map(function (item) {
                    return `
                        <tr>
                            <td>${item.mes}</td>
                            <td>${item.total.toLocaleString("pt-BR")}</td>
                        </tr>
                    `;
                }).join("")}
            </tbody>
        </table>
    </section>

    <div class="aviso-relatorio">
        Dados fictícios de protótipo. Os índices e registros são
        demonstrativos e não representam dados oficiais.
    </div>
    `;
}


/* =========================================
   11. BOTÃO DE AJUDA — ENTENDA OS INDICADORES
========================================= */

function fecharPainelAjuda() {
    painelAjuda.hidden = true;
    botaoAjuda.setAttribute("aria-expanded", "false");
}

function alternarAjuda() {

    const estaAberto = !painelAjuda.hidden;

    painelAjuda.hidden = estaAberto;
    botaoAjuda.setAttribute("aria-expanded", String(!estaAberto));
}


/* =========================================
   12. EVENTOS
========================================= */

// Painel principal

filtroRegiao.addEventListener("change", function () {
    preencherBairros(filtroBairro, filtroRegiao.value);
    aplicarFiltros();
});

filtroBairro.addEventListener("change", aplicarFiltros);

botaoVisaoZona.addEventListener("click", function () { selecionarModo("zona"); });
botaoVisaoBairro.addEventListener("click", function () { selecionarModo("bairro"); });
botaoVisaoComparativo.addEventListener("click", function () { selecionarModo("comparativo"); });
botaoVisaoEvolucao.addEventListener("click", function () { selecionarModo("evolucao"); });

// Filtros exclusivos do mapa. Eles não alteram os demais painéis.
filtroMapaRegiao.addEventListener("change", function () {
    preencherBairros(filtroMapaBairro, filtroMapaRegiao.value);
    atualizarMapaRisco(obterDadosMapa());
});

filtroMapaBairro.addEventListener("change", function () {
    atualizarMapaRisco(obterDadosMapa());
});

// Painel de infraestrutura

filtroZonaRisco.addEventListener("change", function () {
    preencherBairros(filtroBairroRisco, filtroZonaRisco.value);
    atualizarPainelInfraestrutura();
});

filtroBairroRisco.addEventListener("change", atualizarPainelInfraestrutura);
filtroPeriodoRisco.addEventListener("change", atualizarPainelInfraestrutura);

// Relatório: abre com os filtros do painel como ponto de partida.

botaoRelatorio.addEventListener("click", function () {

    relatorioFiltroZona.value = filtroZonaRisco.value;
    preencherBairros(relatorioFiltroBairro, relatorioFiltroZona.value);

    relatorioFiltroBairro.value = filtroBairroRisco.value;
    relatorioFiltroPeriodo.value = filtroPeriodoRisco.value;

    modalRelatorio.style.display = "block";
    gerarRelatorio();
});

relatorioFiltroZona.addEventListener("change", function () {
    preencherBairros(relatorioFiltroBairro, relatorioFiltroZona.value);
    gerarRelatorio();
});

relatorioFiltroBairro.addEventListener("change", gerarRelatorio);
relatorioFiltroPeriodo.addEventListener("change", gerarRelatorio);

fecharRelatorio.addEventListener("click", function () {
    modalRelatorio.style.display = "none";
});

modalRelatorio.addEventListener("click", function (evento) {
    if (evento.target === modalRelatorio) {
        modalRelatorio.style.display = "none";
    }
});

botaoImprimirRelatorio.addEventListener("click", function () {
    window.print();
});

// Ajuda

botaoAjuda.addEventListener("click", alternarAjuda);
fecharAjuda.addEventListener("click", fecharPainelAjuda);

document.addEventListener("click", function (evento) {
    if (!evento.target.closest(".ajuda-indicadores")) {
        fecharPainelAjuda();
    }
});

document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") {
        fecharPainelAjuda();
    }
});


/* =========================================
   13. INICIALIZAÇÃO
========================================= */

preencherBairros(filtroBairro, filtroRegiao.value);
preencherBairros(filtroMapaBairro, filtroMapaRegiao.value);
inicializarMapaRisco();
aplicarFiltros();
atualizarMapaRisco(obterDadosMapa());
abrirImovelSolicitadoNoMapa();

preencherBairros(filtroBairroRisco, filtroZonaRisco.value);
atualizarPainelInfraestrutura();