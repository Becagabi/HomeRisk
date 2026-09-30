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
    }
];

// ===== CONTADORES =====

let quantidadeCritica = 0;
let quantidadeAlta = 0;
let quantidadeMedia = 0;
let quantidadeBaixa = 0;
let quantidadePendentes = 0;

// ===== ANÁLISE DOS DADOS =====

for (let i = 0; i < ocorrencias.length; i++) {

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

    if (ocorrencias[i].status === "Pendente") {
        quantidadePendentes++;
    }
}

// ===== IMÓVEIS ÚNICOS =====

const imoveis = new Set();

for (let i = 0; i < ocorrencias.length; i++) {
    imoveis.add(ocorrencias[i].imovel);
}


// ===== ATUALIZAÇÃO DOS KPIs =====

const kpiImoveis = document.getElementById("kpi-imoveis");
const kpiOcorrencias = document.getElementById("kpi-ocorrencias");
const kpiCriticos = document.getElementById("kpi-criticos");
const kpiPendentes = document.getElementById("kpi-pendentes");

kpiImoveis.textContent = imoveis.size;
kpiOcorrencias.textContent = ocorrencias.length;
kpiCriticos.textContent = quantidadeCritica;
kpiPendentes.textContent = quantidadePendentes;