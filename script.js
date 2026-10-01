
// =====================================================
// HOMERISK
// Dashboard de análise de riscos em imóveis
// =====================================================


// =====================================================
// 1. DADOS
// =====================================================

const ocorrencias = [
    {
        imovel: "Apto 101",
        regiao: "Norte",
        categoria: "Infiltração",
        severidade: "Crítica",
        status: "Pendente",
        data: "12/09/2026"
    },

    {
        imovel: "Apto 204",
        regiao: "Sul",
        categoria: "Elétrica",
        severidade: "Alta",
        status: "Em andamento",
        data: "18/09/2026"
    },

    {
        imovel: "Apto 312",
        regiao: "Leste",
        categoria: "Hidráulica",
        severidade: "Média",
        status: "Pendente",
        data: "22/09/2026"
    },

    {
        imovel: "Apto 405",
        regiao: "Oeste",
        categoria: "Estrutural",
        severidade: "Baixa",
        status: "Resolvida",
        data: "25/09/2026"
    },

    {
        imovel: "Apto 506",
        regiao: "Norte",
        categoria: "Elétrica",
        severidade: "Alta",
        status: "Pendente",
        data: "26/09/2026"
    },

    {
        imovel: "Apto 600",
        regiao: "Sul",
        categoria: "Elétrica",
        severidade: "Baixa",
        status: "Resolvida",
        data: "27/09/2026"
    }
];


// =====================================================
// 2. CONTADORES
// =====================================================

let quantidadeCritica = 0;
let quantidadeAlta = 0;
let quantidadeMedia = 0;
let quantidadeBaixa = 0;

let quantidadePendentes = 0;

let quantidadeEletrica = 0;
let quantidadeInfiltracao = 0;
let quantidadeHidraulica = 0;
let quantidadeEstrutural = 0;


// =====================================================
// 3. ANÁLISE DOS DADOS
// =====================================================

for (let i = 0; i < ocorrencias.length; i++) {

    // -------------------------
    // Severidade
    // -------------------------

    if (ocorrencias[i].severidade === "Crítica") {
        quantidadeCritica++;
    }

    if (ocorrencias[i].severidade === "Alta") {
        quantidadeAlta++;
    }

    if (ocorrencias[i].severidade === "Média") {
        quantidadeMedia++;
    }

    if (ocorrencias[i].severidade === "Baixa") {
        quantidadeBaixa++;
    }


    // -------------------------
    // Status
    // -------------------------

    if (ocorrencias[i].status === "Pendente") {
        quantidadePendentes++;
    }


    // -------------------------
    // Categoria
    // -------------------------

    if (ocorrencias[i].categoria === "Elétrica") {
        quantidadeEletrica++;
    }

    if (ocorrencias[i].categoria === "Infiltração") {
        quantidadeInfiltracao++;
    }

    if (ocorrencias[i].categoria === "Hidráulica") {
        quantidadeHidraulica++;
    }

    if (ocorrencias[i].categoria === "Estrutural") {
        quantidadeEstrutural++;
    }
}


// =====================================================
// 4. CATEGORIAS
// =====================================================

const categorias = {
    eletrica: quantidadeEletrica,
    infiltracao: quantidadeInfiltracao,
    hidraulica: quantidadeHidraulica,
    estrutural: quantidadeEstrutural
};


// =====================================================
// 5. IMÓVEIS ÚNICOS
// =====================================================

const imoveis = new Set();

for (let i = 0; i < ocorrencias.length; i++) {
    imoveis.add(ocorrencias[i].imovel);
}


// =====================================================
// 6. ELEMENTOS DO HTML
// =====================================================

// KPIs

const kpiImoveis = document.getElementById("kpi-imoveis");
const kpiOcorrencias = document.getElementById("kpi-ocorrencias");
const kpiCriticos = document.getElementById("kpi-criticos");
const kpiPendentes = document.getElementById("kpi-pendentes");


// Filtros

const filtroRegiao = document.getElementById("filtro-regiao");


//atualizar dados

function atualizarDashboard(dados) {

    let quantidadeCritica = 0;
    let quantidadeAlta = 0;
    let quantidadeMedia = 0;
    let quantidadeBaixa = 0;

    let quantidadePendentes = 0;

    for (let i = 0; i < dados.length; i++) {
        if (dados[i].severidade === "Crítica") {
            quantidadeCritica++;
        }

        if (dados[i].severidade === "Alta") {
            quantidadeAlta++;
        }

        if (dados[i].severidade === "Média") {
            quantidadeMedia++;
        }

        if (dados[i].severidade === "Baixa") {
            quantidadeBaixa++;
        }

            }
    
    
    kpiOcorrencias.textContent = dados.length;

    kpiCriticos.textContent = quantidadeCritica;

    kpiPendentes.textContent = quantidadePendentes;
}

atualizarDashboard(ocorrencias);

// Gráficos

const canvasCategoria = document.getElementById("grafico-categoria");
const canvasSeveridade = document.getElementById("grafico-severidade");


// =====================================================
// 7. ATUALIZAÇÃO DOS KPIs
// =====================================================

kpiImoveis.textContent = imoveis.size;

kpiOcorrencias.textContent = ocorrencias.length;

kpiCriticos.textContent = quantidadeCritica;

kpiPendentes.textContent = quantidadePendentes;


// =====================================================
// 8. GRÁFICO — PROBLEMAS POR CATEGORIA
// =====================================================

const graficoCategoria = new Chart(canvasCategoria, {

    type: "bar",

    data: {

        labels: [
            "Elétrica",
            "Infiltração",
            "Hidráulica",
            "Estrutural"
        ],

        datasets: [
            {
                label: "Ocorrências",

                data: [
                    categorias.eletrica,
                    categorias.infiltracao,
                    categorias.hidraulica,
                    categorias.estrutural
                ]
            }
        ]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});


// =====================================================
// 9. GRÁFICO — DISTRIBUIÇÃO POR SEVERIDADE
// =====================================================

const graficoSeveridade = new Chart(canvasSeveridade, {

    type: "doughnut",

    data: {

        labels: [
            "Crítica",
            "Alta",
            "Média",
            "Baixa"
        ],

        datasets: [
            {
                label: "Ocorrências",

                data: [
                    quantidadeCritica,
                    quantidadeAlta,
                    quantidadeMedia,
                    quantidadeBaixa
                ],

                backgroundColor: [
                    "#b3261e",
                    "#d9822b",
                    "#c9a227",
                    "#3c8d5a"
                ]
            }
        ]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});


// =====================================================
// 10. FILTRO DE REGIÃO
// =====================================================

// Começamos mostrando todas as ocorrências.

let ocorrenciasFiltradas = ocorrencias;


// Detecta quando o usuário muda a região.

filtroRegiao.addEventListener("change", function () {

    // Se "Todas" estiver selecionado

    if (filtroRegiao.value === "") {

        ocorrenciasFiltradas = ocorrencias;

    }

    // Se uma região específica estiver selecionada

    else {

        ocorrenciasFiltradas = ocorrencias.filter(function (ocorrencia) {

            return ocorrencia.regiao === filtroRegiao.value;

        });

    }


    // Teste no Console

    console.log("Região escolhida:", filtroRegiao.value);

    console.log("Dados filtrados:", ocorrenciasFiltradas);
    atualizarDashboard(ocorrenciasFiltradas);
});

