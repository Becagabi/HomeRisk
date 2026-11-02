// =====================================================
// HOMERISK — BASE CENTRAL DE DADOS
// Protótipo demonstrativo: os dados não são avaliações oficiais.
// Todas as páginas consomem esta única fonte.
// =====================================================

(function () {
  const imoveis = [
    {
        id: 1, imovel: "Apto 101", endereco: "Rua X, 101",
        bairro: "Bom Retiro", regiao: "Centro", tipo: "Apartamento", area: 55,
        latitude: -23.532, longitude: -46.632,
        valorVenda: 400000, valorAluguel: 2500,
        saneamento: 70, infraestrutura: 65, transporte: 90,
        seguranca: 55, vulnerabilidade: 60, ocorrencias: 60,
        riscoEletrico: 40, riscoHidraulico: 50, riscoEstrutural: 30, riscoInfiltracao: 60,
        historico: [38, 40, 39, 41]
    },
    {
        id: 2, imovel: "Apto 204", endereco: "Rua X, 204",
        bairro: "Pinheiros", regiao: "Oeste", tipo: "Apartamento", area: 70,
        latitude: -23.567, longitude: -46.702,
        valorVenda: 450000, valorAluguel: 2800,
        saneamento: 85, infraestrutura: 80, transporte: 75,
        seguranca: 70, vulnerabilidade: 40, ocorrencias: 30,
        riscoEletrico: 20, riscoHidraulico: 25, riscoEstrutural: 15, riscoInfiltracao: 20,
        historico: [28, 27, 27, 26]
    },
    {
        id: 3, imovel: "Apto 312", endereco: "Rua X, 312",
        bairro: "Itaquera", regiao: "Leste", tipo: "Apartamento", area: 48,
        latitude: -23.540, longitude: -46.457,
        valorVenda: 350000, valorAluguel: 2000,
        saneamento: 30, infraestrutura: 30, transporte: 50,
        seguranca: 30, vulnerabilidade: 85, ocorrencias: 85,
        riscoEletrico: 70, riscoHidraulico: 75, riscoEstrutural: 65, riscoInfiltracao: 80,
        historico: [65, 68, 70, 73]
    },
    {
        id: 4, imovel: "Apto 405", endereco: "Rua X, 405",
        bairro: "Moema", regiao: "Sul", tipo: "Apartamento", area: 85,
        latitude: -23.600, longitude: -46.665,
        valorVenda: 720000, valorAluguel: 4200,
        saneamento: 90, infraestrutura: 85, transporte: 70,
        seguranca: 80, vulnerabilidade: 25, ocorrencias: 20,
        riscoEletrico: 15, riscoHidraulico: 15, riscoEstrutural: 10, riscoInfiltracao: 20,
        historico: [21, 20, 20, 19]
    },
    {
        id: 5, imovel: "Casa 12", endereco: "Rua X, 12",
        bairro: "Vila Maria", regiao: "Norte", tipo: "Casa", area: 110,
        latitude: -23.510, longitude: -46.585,
        valorVenda: 520000, valorAluguel: 3100,
        saneamento: 60, infraestrutura: 55, transporte: 65,
        seguranca: 50, vulnerabilidade: 65, ocorrencias: 55,
        riscoEletrico: 50, riscoHidraulico: 55, riscoEstrutural: 45, riscoInfiltracao: 60,
        historico: [44, 46, 47, 49]
    },
    {
        id: 6, imovel: "Apto 600", endereco: "Rua X, 600",
        bairro: "Santana", regiao: "Norte", tipo: "Apartamento", area: 40,
        latitude: -23.500, longitude: -46.628,
        valorVenda: 330000, valorAluguel: 1900,
        saneamento: 75, infraestrutura: 70, transporte: 85,
        seguranca: 65, vulnerabilidade: 50, ocorrencias: 45,
        riscoEletrico: 35, riscoHidraulico: 30, riscoEstrutural: 25, riscoInfiltracao: 40,
        historico: [36, 35, 35, 34]
    },
    {
        id: 7, imovel: "Casa 08", endereco: "Rua X, 8",
        bairro: "Capão Redondo", regiao: "Sul", tipo: "Casa", area: 90,
        latitude: -23.660, longitude: -46.780,
        valorVenda: 280000, valorAluguel: 1500,
        saneamento: 35, infraestrutura: 40, transporte: 45,
        seguranca: 35, vulnerabilidade: 80, ocorrencias: 80,
        riscoEletrico: 75, riscoHidraulico: 70, riscoEstrutural: 70, riscoInfiltracao: 80,
        historico: [62, 64, 66, 68]
    },
    {
        id: 8, imovel: "Apto 506", endereco: "Rua X, 506",
        bairro: "Tucuruvi", regiao: "Norte", tipo: "Apartamento", area: 52,
        latitude: -23.480, longitude: -46.603,
        valorVenda: 380000, valorAluguel: 2300,
        saneamento: 65, infraestrutura: 60, transporte: 75,
        seguranca: 60, vulnerabilidade: 55, ocorrencias: 50,
        riscoEletrico: 45, riscoHidraulico: 40, riscoEstrutural: 35, riscoInfiltracao: 50,
        historico: [43, 42, 42, 41]
    }
];

  const regioes = [
    { bairro: "Bom Retiro", regiao: "Centro", saneamento: 70, infraestrutura: 65, transporte: 90, seguranca: 55, vulnerabilidade: 60 },
    { bairro: "Pinheiros", regiao: "Oeste", saneamento: 85, infraestrutura: 80, transporte: 75, seguranca: 70, vulnerabilidade: 40 },
    { bairro: "Itaquera", regiao: "Leste", saneamento: 30, infraestrutura: 30, transporte: 50, seguranca: 30, vulnerabilidade: 85 },
    { bairro: "Moema", regiao: "Sul", saneamento: 90, infraestrutura: 85, transporte: 70, seguranca: 80, vulnerabilidade: 25 },
    { bairro: "Vila Maria", regiao: "Norte", saneamento: 60, infraestrutura: 55, transporte: 65, seguranca: 50, vulnerabilidade: 65 },
    { bairro: "Santana", regiao: "Norte", saneamento: 75, infraestrutura: 70, transporte: 85, seguranca: 65, vulnerabilidade: 50 },
    { bairro: "Capão Redondo", regiao: "Sul", saneamento: 35, infraestrutura: 40, transporte: 45, seguranca: 35, vulnerabilidade: 80 },
    { bairro: "Tucuruvi", regiao: "Norte", saneamento: 65, infraestrutura: 60, transporte: 75, seguranca: 60, vulnerabilidade: 55 }
];

  const categoriasRisco = [
    "Saneamento",
    "Infraestrutura",
    "Segurança",
    "Transporte",
    "Vulnerabilidade"
];

  const iconesFatores = {
    "Saneamento": "🚰",
    "Infraestrutura": "🏗️",
    "Segurança": "🛡️",
    "Transporte": "🚌",
    "Vulnerabilidade": "⚠️"
};

  const mesesHistoricoRisco = [
    "Nov/25", "Dez/25", "Jan/26", "Fev/26", "Mar/26", "Abr/26",
    "Mai/26", "Jun/26", "Jul/26", "Ago/26", "Set/26", "Out/26"
];

  const volumeBaseBairros = {
    "Bom Retiro": [18, 14, 12, 9, 7],
    "Pinheiros": [8, 7, 10, 5, 6],
    "Itaquera": [22, 18, 15, 16, 8],
    "Moema": [6, 5, 8, 4, 5],
    "Vila Maria": [14, 12, 11, 10, 6],
    "Santana": [10, 9, 8, 7, 5],
    "Capão Redondo": [20, 17, 14, 15, 7],
    "Tucuruvi": [12, 10, 9, 8, 6]
};

  const variacoesMensaisRisco = [
    0.80, 0.95, 0.90, 1.10,
    1.20, 0.85, 1.00, 1.15,
    0.90, 1.30, 1.05, 0.75
];

  const mesesHistoricoMercado = [
    "Nov/25", "Dez/25", "Jan/26", "Fev/26", "Mar/26", "Abr/26",
    "Mai/26", "Jun/26", "Jul/26", "Ago/26", "Set/26", "Out/26"
];

  const variacoesHipoteticasMercado = [
    0.94, 0.946, 0.951, 0.949, 0.961, 0.966,
    0.972, 0.976, 0.974, 0.986, 0.993, 1
];

  const historicoRelatos = [];
  regioes.forEach(regiao => {
    const volumes = volumeBaseBairros[regiao.bairro];
    categoriasRisco.forEach((categoria, indiceCategoria) => {
      mesesHistoricoRisco.forEach((mes, indiceMes) => {
        historicoRelatos.push({
          bairro: regiao.bairro,
          regiao: regiao.regiao,
          categoria,
          mes,
          quantidade: Math.round(volumes[indiceCategoria] * variacoesMensaisRisco[indiceMes])
        });
      });
    });
  });

  window.HOMERISK_DADOS = Object.freeze({
    imoveis, regioes, categoriasRisco, iconesFatores,
    mesesHistoricoRisco, historicoRelatos,
    mesesHistoricoMercado, variacoesHipoteticasMercado
  });
})();
