// =====================================================
// HOMERISK — BASE CENTRAL DE DADOS
// Versão estática para publicação (sem dependência do servidor Python/SQLite).
// Dados demonstrativos exportados dos CSVs do projeto.
// Atualização: 10 imóveis, 10 bairros, 40 históricos de imóveis e 600 relatos.
// =====================================================

(function () {
  const imoveis = [
    {
        "id": 1,
        "imovel": "Apto 101",
        "endereco": "Rua X, 101",
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "tipo": "Apartamento",
        "area": 55,
        "latitude": -23.532,
        "longitude": -46.632,
        "valorVenda": 400000,
        "valorAluguel": 2500,
        "saneamento": 70,
        "infraestrutura": 65,
        "transporte": 90,
        "seguranca": 55,
        "vulnerabilidade": 60,
        "ocorrencias": 60,
        "riscoEletrico": 40,
        "riscoHidraulico": 50,
        "riscoEstrutural": 30,
        "riscoInfiltracao": 60,
        "historico": [
            38,
            40,
            39,
            41
        ],
        "indiceRisco": 41,
        "nivelRisco": "Moderado",
        "ajusteHipoteticoPct": 0.05,
        "valorVendaAjustado": 380000
    },
    {
        "id": 2,
        "imovel": "Apto 204",
        "endereco": "Rua X, 204",
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "tipo": "Apartamento",
        "area": 70,
        "latitude": -23.567,
        "longitude": -46.702,
        "valorVenda": 450000,
        "valorAluguel": 2800,
        "saneamento": 85,
        "infraestrutura": 80,
        "transporte": 75,
        "seguranca": 70,
        "vulnerabilidade": 40,
        "ocorrencias": 30,
        "riscoEletrico": 20,
        "riscoHidraulico": 25,
        "riscoEstrutural": 15,
        "riscoInfiltracao": 20,
        "historico": [
            28,
            27,
            27,
            26
        ],
        "indiceRisco": 28,
        "nivelRisco": "Baixo",
        "ajusteHipoteticoPct": 0,
        "valorVendaAjustado": 450000
    },
    {
        "id": 3,
        "imovel": "Apto 312",
        "endereco": "Rua X, 312",
        "bairro": "Itaquera",
        "regiao": "Leste",
        "tipo": "Apartamento",
        "area": 48,
        "latitude": -23.54,
        "longitude": -46.457,
        "valorVenda": 350000,
        "valorAluguel": 2000,
        "saneamento": 30,
        "infraestrutura": 30,
        "transporte": 50,
        "seguranca": 30,
        "vulnerabilidade": 85,
        "ocorrencias": 85,
        "riscoEletrico": 70,
        "riscoHidraulico": 75,
        "riscoEstrutural": 65,
        "riscoInfiltracao": 80,
        "historico": [
            65,
            68,
            70,
            73
        ],
        "indiceRisco": 72,
        "nivelRisco": "Alto",
        "ajusteHipoteticoPct": 0.1,
        "valorVendaAjustado": 315000
    },
    {
        "id": 4,
        "imovel": "Apto 405",
        "endereco": "Rua X, 405",
        "bairro": "Moema",
        "regiao": "Sul",
        "tipo": "Apartamento",
        "area": 85,
        "latitude": -23.6,
        "longitude": -46.665,
        "valorVenda": 720000,
        "valorAluguel": 4200,
        "saneamento": 90,
        "infraestrutura": 85,
        "transporte": 70,
        "seguranca": 80,
        "vulnerabilidade": 25,
        "ocorrencias": 20,
        "riscoEletrico": 15,
        "riscoHidraulico": 15,
        "riscoEstrutural": 10,
        "riscoInfiltracao": 20,
        "historico": [
            21,
            20,
            20,
            19
        ],
        "indiceRisco": 20,
        "nivelRisco": "Baixo",
        "ajusteHipoteticoPct": 0,
        "valorVendaAjustado": 720000
    },
    {
        "id": 5,
        "imovel": "Casa 12",
        "endereco": "Rua X, 12",
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "tipo": "Casa",
        "area": 110,
        "latitude": -23.51,
        "longitude": -46.585,
        "valorVenda": 520000,
        "valorAluguel": 3100,
        "saneamento": 60,
        "infraestrutura": 55,
        "transporte": 65,
        "seguranca": 50,
        "vulnerabilidade": 65,
        "ocorrencias": 55,
        "riscoEletrico": 50,
        "riscoHidraulico": 55,
        "riscoEstrutural": 45,
        "riscoInfiltracao": 60,
        "historico": [
            44,
            46,
            47,
            49
        ],
        "indiceRisco": 50,
        "nivelRisco": "Moderado",
        "ajusteHipoteticoPct": 0.05,
        "valorVendaAjustado": 494000
    },
    {
        "id": 6,
        "imovel": "Apto 600",
        "endereco": "Rua X, 600",
        "bairro": "Santana",
        "regiao": "Norte",
        "tipo": "Apartamento",
        "area": 40,
        "latitude": -23.5,
        "longitude": -46.628,
        "valorVenda": 330000,
        "valorAluguel": 1900,
        "saneamento": 75,
        "infraestrutura": 70,
        "transporte": 85,
        "seguranca": 65,
        "vulnerabilidade": 50,
        "ocorrencias": 45,
        "riscoEletrico": 35,
        "riscoHidraulico": 30,
        "riscoEstrutural": 25,
        "riscoInfiltracao": 40,
        "historico": [
            36,
            35,
            35,
            34
        ],
        "indiceRisco": 34,
        "nivelRisco": "Baixo",
        "ajusteHipoteticoPct": 0,
        "valorVendaAjustado": 330000
    },
    {
        "id": 7,
        "imovel": "Casa 08",
        "endereco": "Rua X, 8",
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "tipo": "Casa",
        "area": 90,
        "latitude": -23.66,
        "longitude": -46.78,
        "valorVenda": 280000,
        "valorAluguel": 1500,
        "saneamento": 35,
        "infraestrutura": 40,
        "transporte": 45,
        "seguranca": 35,
        "vulnerabilidade": 80,
        "ocorrencias": 80,
        "riscoEletrico": 75,
        "riscoHidraulico": 70,
        "riscoEstrutural": 70,
        "riscoInfiltracao": 80,
        "historico": [
            62,
            64,
            66,
            68
        ],
        "indiceRisco": 68,
        "nivelRisco": "Moderado",
        "ajusteHipoteticoPct": 0.05,
        "valorVendaAjustado": 266000
    },
    {
        "id": 8,
        "imovel": "Apto 506",
        "endereco": "Rua X, 506",
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "tipo": "Apartamento",
        "area": 52,
        "latitude": -23.48,
        "longitude": -46.603,
        "valorVenda": 380000,
        "valorAluguel": 2300,
        "saneamento": 65,
        "infraestrutura": 60,
        "transporte": 75,
        "seguranca": 60,
        "vulnerabilidade": 55,
        "ocorrencias": 50,
        "riscoEletrico": 45,
        "riscoHidraulico": 40,
        "riscoEstrutural": 35,
        "riscoInfiltracao": 50,
        "historico": [
            43,
            42,
            42,
            41
        ],
        "indiceRisco": 42,
        "nivelRisco": "Moderado",
        "ajusteHipoteticoPct": 0.05,
        "valorVendaAjustado": 361000
    },
    {
        "id": 9,
        "imovel": "Apto 709",
        "endereco": "Rua X, 709",
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "tipo": "Apartamento",
        "area": 68,
        "latitude": -23.589,
        "longitude": -46.634,
        "valorVenda": 680000,
        "valorAluguel": 3800,
        "saneamento": 88,
        "infraestrutura": 82,
        "transporte": 90,
        "seguranca": 76,
        "vulnerabilidade": 35,
        "ocorrencias": 25,
        "riscoEletrico": 18,
        "riscoHidraulico": 22,
        "riscoEstrutural": 15,
        "riscoInfiltracao": 25,
        "historico": [
            25,
            24,
            23,
            22
        ],
        "indiceRisco": 22,
        "nivelRisco": "Baixo",
        "ajusteHipoteticoPct": 0,
        "valorVendaAjustado": 680000
    },
    {
        "id": 10,
        "imovel": "Apto 810",
        "endereco": "Rua X, 810",
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "tipo": "Apartamento",
        "area": 62,
        "latitude": -23.54,
        "longitude": -46.576,
        "valorVenda": 490000,
        "valorAluguel": 2900,
        "saneamento": 68,
        "infraestrutura": 62,
        "transporte": 78,
        "seguranca": 58,
        "vulnerabilidade": 55,
        "ocorrencias": 48,
        "riscoEletrico": 35,
        "riscoHidraulico": 32,
        "riscoEstrutural": 28,
        "riscoInfiltracao": 40,
        "historico": [
            38,
            39,
            40,
            41
        ],
        "indiceRisco": 41,
        "nivelRisco": "Moderado",
        "ajusteHipoteticoPct": 0.05,
        "valorVendaAjustado": 465500
    }
];

  const regioes = [
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "saneamento": 70,
        "infraestrutura": 65,
        "transporte": 90,
        "seguranca": 55,
        "vulnerabilidade": 60,
        "indiceRisco": 41,
        "nivelRisco": "Moderado"
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "saneamento": 85,
        "infraestrutura": 80,
        "transporte": 75,
        "seguranca": 70,
        "vulnerabilidade": 40,
        "indiceRisco": 28,
        "nivelRisco": "Baixo"
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "saneamento": 30,
        "infraestrutura": 30,
        "transporte": 50,
        "seguranca": 30,
        "vulnerabilidade": 85,
        "indiceRisco": 72,
        "nivelRisco": "Alto"
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "saneamento": 90,
        "infraestrutura": 85,
        "transporte": 70,
        "seguranca": 80,
        "vulnerabilidade": 25,
        "indiceRisco": 20,
        "nivelRisco": "Baixo"
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "saneamento": 60,
        "infraestrutura": 55,
        "transporte": 65,
        "seguranca": 50,
        "vulnerabilidade": 65,
        "indiceRisco": 50,
        "nivelRisco": "Moderado"
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "saneamento": 75,
        "infraestrutura": 70,
        "transporte": 85,
        "seguranca": 65,
        "vulnerabilidade": 50,
        "indiceRisco": 34,
        "nivelRisco": "Baixo"
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "saneamento": 35,
        "infraestrutura": 40,
        "transporte": 45,
        "seguranca": 35,
        "vulnerabilidade": 80,
        "indiceRisco": 68,
        "nivelRisco": "Moderado"
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "saneamento": 65,
        "infraestrutura": 60,
        "transporte": 75,
        "seguranca": 60,
        "vulnerabilidade": 55,
        "indiceRisco": 42,
        "nivelRisco": "Moderado"
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "saneamento": 88,
        "infraestrutura": 82,
        "transporte": 90,
        "seguranca": 76,
        "vulnerabilidade": 35,
        "indiceRisco": 22,
        "nivelRisco": "Baixo"
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "saneamento": 68,
        "infraestrutura": 62,
        "transporte": 78,
        "seguranca": 58,
        "vulnerabilidade": 55,
        "indiceRisco": 41,
        "nivelRisco": "Moderado"
    }
];

  const categoriasRisco = ["Saneamento", "Infraestrutura", "Segurança", "Transporte", "Vulnerabilidade"];

  const iconesFatores = {
    "Saneamento": "🚰",
    "Infraestrutura": "🏗️",
    "Segurança": "🛡️",
    "Transporte": "🚌",
    "Vulnerabilidade": "⚠️"
  };

  const mesesHistoricoRisco = [
    "Nov/25",
    "Dez/25",
    "Jan/26",
    "Fev/26",
    "Mar/26",
    "Abr/26",
    "Mai/26",
    "Jun/26",
    "Jul/26",
    "Ago/26",
    "Set/26",
    "Out/26"
];

  const historicoRelatos = [
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Saneamento",
        "mes": "Nov/25",
        "quantidade": 14
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Saneamento",
        "mes": "Dez/25",
        "quantidade": 17
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Saneamento",
        "mes": "Jan/26",
        "quantidade": 16
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Saneamento",
        "mes": "Fev/26",
        "quantidade": 20
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Saneamento",
        "mes": "Mar/26",
        "quantidade": 22
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Saneamento",
        "mes": "Abr/26",
        "quantidade": 15
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Saneamento",
        "mes": "Mai/26",
        "quantidade": 18
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Saneamento",
        "mes": "Jun/26",
        "quantidade": 21
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Saneamento",
        "mes": "Jul/26",
        "quantidade": 16
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Saneamento",
        "mes": "Ago/26",
        "quantidade": 23
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Saneamento",
        "mes": "Set/26",
        "quantidade": 19
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Saneamento",
        "mes": "Out/26",
        "quantidade": 14
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Infraestrutura",
        "mes": "Nov/25",
        "quantidade": 11
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Infraestrutura",
        "mes": "Dez/25",
        "quantidade": 13
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Infraestrutura",
        "mes": "Jan/26",
        "quantidade": 13
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Infraestrutura",
        "mes": "Fev/26",
        "quantidade": 15
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Infraestrutura",
        "mes": "Mar/26",
        "quantidade": 17
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Infraestrutura",
        "mes": "Abr/26",
        "quantidade": 12
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Infraestrutura",
        "mes": "Mai/26",
        "quantidade": 14
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Infraestrutura",
        "mes": "Jun/26",
        "quantidade": 16
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Infraestrutura",
        "mes": "Jul/26",
        "quantidade": 13
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Infraestrutura",
        "mes": "Ago/26",
        "quantidade": 18
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Infraestrutura",
        "mes": "Set/26",
        "quantidade": 15
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Infraestrutura",
        "mes": "Out/26",
        "quantidade": 11
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Segurança",
        "mes": "Nov/25",
        "quantidade": 10
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Segurança",
        "mes": "Dez/25",
        "quantidade": 11
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Segurança",
        "mes": "Jan/26",
        "quantidade": 11
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Segurança",
        "mes": "Fev/26",
        "quantidade": 13
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Segurança",
        "mes": "Mar/26",
        "quantidade": 14
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Segurança",
        "mes": "Abr/26",
        "quantidade": 10
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Segurança",
        "mes": "Mai/26",
        "quantidade": 12
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Segurança",
        "mes": "Jun/26",
        "quantidade": 14
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Segurança",
        "mes": "Jul/26",
        "quantidade": 11
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Segurança",
        "mes": "Ago/26",
        "quantidade": 16
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Segurança",
        "mes": "Set/26",
        "quantidade": 13
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Segurança",
        "mes": "Out/26",
        "quantidade": 9
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Transporte",
        "mes": "Nov/25",
        "quantidade": 7
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Transporte",
        "mes": "Dez/25",
        "quantidade": 9
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Transporte",
        "mes": "Jan/26",
        "quantidade": 8
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Transporte",
        "mes": "Fev/26",
        "quantidade": 10
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Transporte",
        "mes": "Mar/26",
        "quantidade": 11
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Transporte",
        "mes": "Abr/26",
        "quantidade": 8
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Transporte",
        "mes": "Mai/26",
        "quantidade": 9
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Transporte",
        "mes": "Jun/26",
        "quantidade": 10
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Transporte",
        "mes": "Jul/26",
        "quantidade": 8
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Transporte",
        "mes": "Ago/26",
        "quantidade": 12
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Transporte",
        "mes": "Set/26",
        "quantidade": 9
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Transporte",
        "mes": "Out/26",
        "quantidade": 7
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Vulnerabilidade",
        "mes": "Nov/25",
        "quantidade": 6
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Vulnerabilidade",
        "mes": "Dez/25",
        "quantidade": 7
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Vulnerabilidade",
        "mes": "Jan/26",
        "quantidade": 6
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Vulnerabilidade",
        "mes": "Fev/26",
        "quantidade": 8
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Vulnerabilidade",
        "mes": "Mar/26",
        "quantidade": 8
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Vulnerabilidade",
        "mes": "Abr/26",
        "quantidade": 6
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Vulnerabilidade",
        "mes": "Mai/26",
        "quantidade": 7
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Vulnerabilidade",
        "mes": "Jun/26",
        "quantidade": 8
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Vulnerabilidade",
        "mes": "Jul/26",
        "quantidade": 6
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Vulnerabilidade",
        "mes": "Ago/26",
        "quantidade": 9
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Vulnerabilidade",
        "mes": "Set/26",
        "quantidade": 7
    },
    {
        "bairro": "Bom Retiro",
        "regiao": "Centro",
        "categoria": "Vulnerabilidade",
        "mes": "Out/26",
        "quantidade": 5
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Saneamento",
        "mes": "Nov/25",
        "quantidade": 6
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Saneamento",
        "mes": "Dez/25",
        "quantidade": 8
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Saneamento",
        "mes": "Jan/26",
        "quantidade": 7
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Saneamento",
        "mes": "Fev/26",
        "quantidade": 9
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Saneamento",
        "mes": "Mar/26",
        "quantidade": 10
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Saneamento",
        "mes": "Abr/26",
        "quantidade": 7
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Saneamento",
        "mes": "Mai/26",
        "quantidade": 8
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Saneamento",
        "mes": "Jun/26",
        "quantidade": 9
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Saneamento",
        "mes": "Jul/26",
        "quantidade": 7
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Saneamento",
        "mes": "Ago/26",
        "quantidade": 10
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Saneamento",
        "mes": "Set/26",
        "quantidade": 8
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Saneamento",
        "mes": "Out/26",
        "quantidade": 6
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Infraestrutura",
        "mes": "Nov/25",
        "quantidade": 6
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Infraestrutura",
        "mes": "Dez/25",
        "quantidade": 7
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Infraestrutura",
        "mes": "Jan/26",
        "quantidade": 6
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Infraestrutura",
        "mes": "Fev/26",
        "quantidade": 8
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Infraestrutura",
        "mes": "Mar/26",
        "quantidade": 8
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Infraestrutura",
        "mes": "Abr/26",
        "quantidade": 6
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Infraestrutura",
        "mes": "Mai/26",
        "quantidade": 7
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Infraestrutura",
        "mes": "Jun/26",
        "quantidade": 8
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Infraestrutura",
        "mes": "Jul/26",
        "quantidade": 6
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Infraestrutura",
        "mes": "Ago/26",
        "quantidade": 9
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Infraestrutura",
        "mes": "Set/26",
        "quantidade": 7
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Infraestrutura",
        "mes": "Out/26",
        "quantidade": 5
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Segurança",
        "mes": "Nov/25",
        "quantidade": 8
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Segurança",
        "mes": "Dez/25",
        "quantidade": 10
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Segurança",
        "mes": "Jan/26",
        "quantidade": 9
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Segurança",
        "mes": "Fev/26",
        "quantidade": 11
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Segurança",
        "mes": "Mar/26",
        "quantidade": 12
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Segurança",
        "mes": "Abr/26",
        "quantidade": 9
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Segurança",
        "mes": "Mai/26",
        "quantidade": 10
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Segurança",
        "mes": "Jun/26",
        "quantidade": 12
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Segurança",
        "mes": "Jul/26",
        "quantidade": 9
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Segurança",
        "mes": "Ago/26",
        "quantidade": 13
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Segurança",
        "mes": "Set/26",
        "quantidade": 11
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Segurança",
        "mes": "Out/26",
        "quantidade": 8
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Transporte",
        "mes": "Nov/25",
        "quantidade": 4
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Transporte",
        "mes": "Dez/25",
        "quantidade": 5
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Transporte",
        "mes": "Jan/26",
        "quantidade": 5
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Transporte",
        "mes": "Fev/26",
        "quantidade": 6
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Transporte",
        "mes": "Mar/26",
        "quantidade": 6
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Transporte",
        "mes": "Abr/26",
        "quantidade": 4
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Transporte",
        "mes": "Mai/26",
        "quantidade": 5
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Transporte",
        "mes": "Jun/26",
        "quantidade": 6
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Transporte",
        "mes": "Jul/26",
        "quantidade": 5
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Transporte",
        "mes": "Ago/26",
        "quantidade": 7
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Transporte",
        "mes": "Set/26",
        "quantidade": 5
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Transporte",
        "mes": "Out/26",
        "quantidade": 4
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Vulnerabilidade",
        "mes": "Nov/25",
        "quantidade": 5
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Vulnerabilidade",
        "mes": "Dez/25",
        "quantidade": 6
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Vulnerabilidade",
        "mes": "Jan/26",
        "quantidade": 5
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Vulnerabilidade",
        "mes": "Fev/26",
        "quantidade": 7
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Vulnerabilidade",
        "mes": "Mar/26",
        "quantidade": 7
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Vulnerabilidade",
        "mes": "Abr/26",
        "quantidade": 5
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Vulnerabilidade",
        "mes": "Mai/26",
        "quantidade": 6
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Vulnerabilidade",
        "mes": "Jun/26",
        "quantidade": 7
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Vulnerabilidade",
        "mes": "Jul/26",
        "quantidade": 5
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Vulnerabilidade",
        "mes": "Ago/26",
        "quantidade": 8
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Vulnerabilidade",
        "mes": "Set/26",
        "quantidade": 6
    },
    {
        "bairro": "Pinheiros",
        "regiao": "Oeste",
        "categoria": "Vulnerabilidade",
        "mes": "Out/26",
        "quantidade": 5
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Saneamento",
        "mes": "Nov/25",
        "quantidade": 18
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Saneamento",
        "mes": "Dez/25",
        "quantidade": 21
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Saneamento",
        "mes": "Jan/26",
        "quantidade": 20
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Saneamento",
        "mes": "Fev/26",
        "quantidade": 24
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Saneamento",
        "mes": "Mar/26",
        "quantidade": 26
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Saneamento",
        "mes": "Abr/26",
        "quantidade": 19
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Saneamento",
        "mes": "Mai/26",
        "quantidade": 22
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Saneamento",
        "mes": "Jun/26",
        "quantidade": 25
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Saneamento",
        "mes": "Jul/26",
        "quantidade": 20
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Saneamento",
        "mes": "Ago/26",
        "quantidade": 29
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Saneamento",
        "mes": "Set/26",
        "quantidade": 23
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Saneamento",
        "mes": "Out/26",
        "quantidade": 17
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Infraestrutura",
        "mes": "Nov/25",
        "quantidade": 14
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Infraestrutura",
        "mes": "Dez/25",
        "quantidade": 17
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Infraestrutura",
        "mes": "Jan/26",
        "quantidade": 16
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Infraestrutura",
        "mes": "Fev/26",
        "quantidade": 20
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Infraestrutura",
        "mes": "Mar/26",
        "quantidade": 22
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Infraestrutura",
        "mes": "Abr/26",
        "quantidade": 15
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Infraestrutura",
        "mes": "Mai/26",
        "quantidade": 18
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Infraestrutura",
        "mes": "Jun/26",
        "quantidade": 21
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Infraestrutura",
        "mes": "Jul/26",
        "quantidade": 16
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Infraestrutura",
        "mes": "Ago/26",
        "quantidade": 23
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Infraestrutura",
        "mes": "Set/26",
        "quantidade": 19
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Infraestrutura",
        "mes": "Out/26",
        "quantidade": 14
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Segurança",
        "mes": "Nov/25",
        "quantidade": 12
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Segurança",
        "mes": "Dez/25",
        "quantidade": 14
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Segurança",
        "mes": "Jan/26",
        "quantidade": 14
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Segurança",
        "mes": "Fev/26",
        "quantidade": 17
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Segurança",
        "mes": "Mar/26",
        "quantidade": 18
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Segurança",
        "mes": "Abr/26",
        "quantidade": 13
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Segurança",
        "mes": "Mai/26",
        "quantidade": 15
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Segurança",
        "mes": "Jun/26",
        "quantidade": 17
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Segurança",
        "mes": "Jul/26",
        "quantidade": 14
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Segurança",
        "mes": "Ago/26",
        "quantidade": 20
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Segurança",
        "mes": "Set/26",
        "quantidade": 16
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Segurança",
        "mes": "Out/26",
        "quantidade": 11
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Transporte",
        "mes": "Nov/25",
        "quantidade": 13
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Transporte",
        "mes": "Dez/25",
        "quantidade": 15
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Transporte",
        "mes": "Jan/26",
        "quantidade": 14
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Transporte",
        "mes": "Fev/26",
        "quantidade": 18
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Transporte",
        "mes": "Mar/26",
        "quantidade": 19
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Transporte",
        "mes": "Abr/26",
        "quantidade": 14
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Transporte",
        "mes": "Mai/26",
        "quantidade": 16
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Transporte",
        "mes": "Jun/26",
        "quantidade": 18
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Transporte",
        "mes": "Jul/26",
        "quantidade": 14
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Transporte",
        "mes": "Ago/26",
        "quantidade": 21
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Transporte",
        "mes": "Set/26",
        "quantidade": 17
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Transporte",
        "mes": "Out/26",
        "quantidade": 12
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Vulnerabilidade",
        "mes": "Nov/25",
        "quantidade": 6
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Vulnerabilidade",
        "mes": "Dez/25",
        "quantidade": 8
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Vulnerabilidade",
        "mes": "Jan/26",
        "quantidade": 7
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Vulnerabilidade",
        "mes": "Fev/26",
        "quantidade": 9
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Vulnerabilidade",
        "mes": "Mar/26",
        "quantidade": 10
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Vulnerabilidade",
        "mes": "Abr/26",
        "quantidade": 7
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Vulnerabilidade",
        "mes": "Mai/26",
        "quantidade": 8
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Vulnerabilidade",
        "mes": "Jun/26",
        "quantidade": 9
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Vulnerabilidade",
        "mes": "Jul/26",
        "quantidade": 7
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Vulnerabilidade",
        "mes": "Ago/26",
        "quantidade": 10
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Vulnerabilidade",
        "mes": "Set/26",
        "quantidade": 8
    },
    {
        "bairro": "Itaquera",
        "regiao": "Leste",
        "categoria": "Vulnerabilidade",
        "mes": "Out/26",
        "quantidade": 6
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Nov/25",
        "quantidade": 5
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Dez/25",
        "quantidade": 6
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Jan/26",
        "quantidade": 5
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Fev/26",
        "quantidade": 7
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Mar/26",
        "quantidade": 7
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Abr/26",
        "quantidade": 5
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Mai/26",
        "quantidade": 6
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Jun/26",
        "quantidade": 7
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Jul/26",
        "quantidade": 5
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Ago/26",
        "quantidade": 8
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Set/26",
        "quantidade": 6
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Out/26",
        "quantidade": 5
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Nov/25",
        "quantidade": 4
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Dez/25",
        "quantidade": 5
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Jan/26",
        "quantidade": 5
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Fev/26",
        "quantidade": 6
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Mar/26",
        "quantidade": 6
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Abr/26",
        "quantidade": 4
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Mai/26",
        "quantidade": 5
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Jun/26",
        "quantidade": 6
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Jul/26",
        "quantidade": 5
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Ago/26",
        "quantidade": 7
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Set/26",
        "quantidade": 5
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Out/26",
        "quantidade": 4
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Nov/25",
        "quantidade": 6
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Dez/25",
        "quantidade": 8
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Jan/26",
        "quantidade": 7
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Fev/26",
        "quantidade": 9
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Mar/26",
        "quantidade": 10
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Abr/26",
        "quantidade": 7
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Mai/26",
        "quantidade": 8
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Jun/26",
        "quantidade": 9
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Jul/26",
        "quantidade": 7
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Ago/26",
        "quantidade": 10
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Set/26",
        "quantidade": 8
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Out/26",
        "quantidade": 6
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Nov/25",
        "quantidade": 3
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Dez/25",
        "quantidade": 4
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Jan/26",
        "quantidade": 4
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Fev/26",
        "quantidade": 4
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Mar/26",
        "quantidade": 5
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Abr/26",
        "quantidade": 3
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Mai/26",
        "quantidade": 4
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Jun/26",
        "quantidade": 5
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Jul/26",
        "quantidade": 4
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Ago/26",
        "quantidade": 5
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Set/26",
        "quantidade": 4
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Out/26",
        "quantidade": 3
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Nov/25",
        "quantidade": 4
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Dez/25",
        "quantidade": 5
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Jan/26",
        "quantidade": 5
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Fev/26",
        "quantidade": 6
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Mar/26",
        "quantidade": 6
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Abr/26",
        "quantidade": 4
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Mai/26",
        "quantidade": 5
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Jun/26",
        "quantidade": 6
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Jul/26",
        "quantidade": 5
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Ago/26",
        "quantidade": 7
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Set/26",
        "quantidade": 5
    },
    {
        "bairro": "Moema",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Out/26",
        "quantidade": 4
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Nov/25",
        "quantidade": 11
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Dez/25",
        "quantidade": 13
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Jan/26",
        "quantidade": 13
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Fev/26",
        "quantidade": 15
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Mar/26",
        "quantidade": 17
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Abr/26",
        "quantidade": 12
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Mai/26",
        "quantidade": 14
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Jun/26",
        "quantidade": 16
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Jul/26",
        "quantidade": 13
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Ago/26",
        "quantidade": 18
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Set/26",
        "quantidade": 15
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Out/26",
        "quantidade": 11
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Nov/25",
        "quantidade": 10
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Dez/25",
        "quantidade": 11
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Jan/26",
        "quantidade": 11
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Fev/26",
        "quantidade": 13
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Mar/26",
        "quantidade": 14
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Abr/26",
        "quantidade": 10
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Mai/26",
        "quantidade": 12
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Jun/26",
        "quantidade": 14
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Jul/26",
        "quantidade": 11
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Ago/26",
        "quantidade": 16
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Set/26",
        "quantidade": 13
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Out/26",
        "quantidade": 9
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Nov/25",
        "quantidade": 9
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Dez/25",
        "quantidade": 10
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Jan/26",
        "quantidade": 10
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Fev/26",
        "quantidade": 12
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Mar/26",
        "quantidade": 13
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Abr/26",
        "quantidade": 9
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Mai/26",
        "quantidade": 11
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Jun/26",
        "quantidade": 13
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Jul/26",
        "quantidade": 10
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Ago/26",
        "quantidade": 14
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Set/26",
        "quantidade": 12
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Out/26",
        "quantidade": 8
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Nov/25",
        "quantidade": 8
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Dez/25",
        "quantidade": 10
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Jan/26",
        "quantidade": 9
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Fev/26",
        "quantidade": 11
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Mar/26",
        "quantidade": 12
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Abr/26",
        "quantidade": 9
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Mai/26",
        "quantidade": 10
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Jun/26",
        "quantidade": 12
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Jul/26",
        "quantidade": 9
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Ago/26",
        "quantidade": 13
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Set/26",
        "quantidade": 11
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Out/26",
        "quantidade": 8
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Nov/25",
        "quantidade": 5
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Dez/25",
        "quantidade": 6
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Jan/26",
        "quantidade": 5
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Fev/26",
        "quantidade": 7
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Mar/26",
        "quantidade": 7
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Abr/26",
        "quantidade": 5
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Mai/26",
        "quantidade": 6
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Jun/26",
        "quantidade": 7
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Jul/26",
        "quantidade": 5
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Ago/26",
        "quantidade": 8
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Set/26",
        "quantidade": 6
    },
    {
        "bairro": "Vila Maria",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Out/26",
        "quantidade": 5
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Nov/25",
        "quantidade": 8
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Dez/25",
        "quantidade": 10
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Jan/26",
        "quantidade": 9
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Fev/26",
        "quantidade": 11
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Mar/26",
        "quantidade": 12
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Abr/26",
        "quantidade": 9
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Mai/26",
        "quantidade": 10
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Jun/26",
        "quantidade": 12
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Jul/26",
        "quantidade": 9
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Ago/26",
        "quantidade": 13
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Set/26",
        "quantidade": 11
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Out/26",
        "quantidade": 8
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Nov/25",
        "quantidade": 7
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Dez/25",
        "quantidade": 9
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Jan/26",
        "quantidade": 8
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Fev/26",
        "quantidade": 10
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Mar/26",
        "quantidade": 11
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Abr/26",
        "quantidade": 8
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Mai/26",
        "quantidade": 9
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Jun/26",
        "quantidade": 10
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Jul/26",
        "quantidade": 8
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Ago/26",
        "quantidade": 12
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Set/26",
        "quantidade": 9
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Out/26",
        "quantidade": 7
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Nov/25",
        "quantidade": 6
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Dez/25",
        "quantidade": 8
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Jan/26",
        "quantidade": 7
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Fev/26",
        "quantidade": 9
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Mar/26",
        "quantidade": 10
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Abr/26",
        "quantidade": 7
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Mai/26",
        "quantidade": 8
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Jun/26",
        "quantidade": 9
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Jul/26",
        "quantidade": 7
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Ago/26",
        "quantidade": 10
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Set/26",
        "quantidade": 8
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Out/26",
        "quantidade": 6
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Nov/25",
        "quantidade": 6
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Dez/25",
        "quantidade": 7
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Jan/26",
        "quantidade": 6
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Fev/26",
        "quantidade": 8
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Mar/26",
        "quantidade": 8
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Abr/26",
        "quantidade": 6
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Mai/26",
        "quantidade": 7
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Jun/26",
        "quantidade": 8
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Jul/26",
        "quantidade": 6
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Ago/26",
        "quantidade": 9
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Set/26",
        "quantidade": 7
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Out/26",
        "quantidade": 5
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Nov/25",
        "quantidade": 4
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Dez/25",
        "quantidade": 5
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Jan/26",
        "quantidade": 5
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Fev/26",
        "quantidade": 6
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Mar/26",
        "quantidade": 6
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Abr/26",
        "quantidade": 4
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Mai/26",
        "quantidade": 5
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Jun/26",
        "quantidade": 6
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Jul/26",
        "quantidade": 5
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Ago/26",
        "quantidade": 7
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Set/26",
        "quantidade": 5
    },
    {
        "bairro": "Santana",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Out/26",
        "quantidade": 4
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Nov/25",
        "quantidade": 16
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Dez/25",
        "quantidade": 19
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Jan/26",
        "quantidade": 18
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Fev/26",
        "quantidade": 22
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Mar/26",
        "quantidade": 24
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Abr/26",
        "quantidade": 17
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Mai/26",
        "quantidade": 20
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Jun/26",
        "quantidade": 23
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Jul/26",
        "quantidade": 18
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Ago/26",
        "quantidade": 26
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Set/26",
        "quantidade": 21
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Out/26",
        "quantidade": 15
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Nov/25",
        "quantidade": 14
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Dez/25",
        "quantidade": 16
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Jan/26",
        "quantidade": 15
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Fev/26",
        "quantidade": 19
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Mar/26",
        "quantidade": 20
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Abr/26",
        "quantidade": 14
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Mai/26",
        "quantidade": 17
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Jun/26",
        "quantidade": 20
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Jul/26",
        "quantidade": 15
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Ago/26",
        "quantidade": 22
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Set/26",
        "quantidade": 18
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Out/26",
        "quantidade": 13
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Nov/25",
        "quantidade": 11
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Dez/25",
        "quantidade": 13
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Jan/26",
        "quantidade": 13
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Fev/26",
        "quantidade": 15
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Mar/26",
        "quantidade": 17
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Abr/26",
        "quantidade": 12
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Mai/26",
        "quantidade": 14
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Jun/26",
        "quantidade": 16
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Jul/26",
        "quantidade": 13
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Ago/26",
        "quantidade": 18
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Set/26",
        "quantidade": 15
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Out/26",
        "quantidade": 11
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Nov/25",
        "quantidade": 12
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Dez/25",
        "quantidade": 14
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Jan/26",
        "quantidade": 14
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Fev/26",
        "quantidade": 17
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Mar/26",
        "quantidade": 18
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Abr/26",
        "quantidade": 13
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Mai/26",
        "quantidade": 15
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Jun/26",
        "quantidade": 17
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Jul/26",
        "quantidade": 14
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Ago/26",
        "quantidade": 20
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Set/26",
        "quantidade": 16
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Out/26",
        "quantidade": 11
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Nov/25",
        "quantidade": 6
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Dez/25",
        "quantidade": 7
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Jan/26",
        "quantidade": 6
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Fev/26",
        "quantidade": 8
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Mar/26",
        "quantidade": 8
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Abr/26",
        "quantidade": 6
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Mai/26",
        "quantidade": 7
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Jun/26",
        "quantidade": 8
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Jul/26",
        "quantidade": 6
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Ago/26",
        "quantidade": 9
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Set/26",
        "quantidade": 7
    },
    {
        "bairro": "Capão Redondo",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Out/26",
        "quantidade": 5
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Nov/25",
        "quantidade": 10
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Dez/25",
        "quantidade": 11
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Jan/26",
        "quantidade": 11
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Fev/26",
        "quantidade": 13
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Mar/26",
        "quantidade": 14
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Abr/26",
        "quantidade": 10
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Mai/26",
        "quantidade": 12
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Jun/26",
        "quantidade": 14
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Jul/26",
        "quantidade": 11
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Ago/26",
        "quantidade": 16
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Set/26",
        "quantidade": 13
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Saneamento",
        "mes": "Out/26",
        "quantidade": 9
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Nov/25",
        "quantidade": 8
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Dez/25",
        "quantidade": 10
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Jan/26",
        "quantidade": 9
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Fev/26",
        "quantidade": 11
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Mar/26",
        "quantidade": 12
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Abr/26",
        "quantidade": 9
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Mai/26",
        "quantidade": 10
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Jun/26",
        "quantidade": 12
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Jul/26",
        "quantidade": 9
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Ago/26",
        "quantidade": 13
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Set/26",
        "quantidade": 11
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Infraestrutura",
        "mes": "Out/26",
        "quantidade": 8
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Nov/25",
        "quantidade": 7
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Dez/25",
        "quantidade": 9
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Jan/26",
        "quantidade": 8
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Fev/26",
        "quantidade": 10
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Mar/26",
        "quantidade": 11
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Abr/26",
        "quantidade": 8
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Mai/26",
        "quantidade": 9
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Jun/26",
        "quantidade": 10
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Jul/26",
        "quantidade": 8
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Ago/26",
        "quantidade": 12
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Set/26",
        "quantidade": 9
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Segurança",
        "mes": "Out/26",
        "quantidade": 7
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Nov/25",
        "quantidade": 6
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Dez/25",
        "quantidade": 8
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Jan/26",
        "quantidade": 7
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Fev/26",
        "quantidade": 9
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Mar/26",
        "quantidade": 10
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Abr/26",
        "quantidade": 7
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Mai/26",
        "quantidade": 8
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Jun/26",
        "quantidade": 9
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Jul/26",
        "quantidade": 7
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Ago/26",
        "quantidade": 10
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Set/26",
        "quantidade": 8
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Transporte",
        "mes": "Out/26",
        "quantidade": 6
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Nov/25",
        "quantidade": 5
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Dez/25",
        "quantidade": 6
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Jan/26",
        "quantidade": 5
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Fev/26",
        "quantidade": 7
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Mar/26",
        "quantidade": 7
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Abr/26",
        "quantidade": 5
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Mai/26",
        "quantidade": 6
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Jun/26",
        "quantidade": 7
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Jul/26",
        "quantidade": 5
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Ago/26",
        "quantidade": 8
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Set/26",
        "quantidade": 6
    },
    {
        "bairro": "Tucuruvi",
        "regiao": "Norte",
        "categoria": "Vulnerabilidade",
        "mes": "Out/26",
        "quantidade": 5
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Nov/25",
        "quantidade": 8
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Dez/25",
        "quantidade": 9
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Jan/26",
        "quantidade": 8
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Fev/26",
        "quantidade": 9
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Mar/26",
        "quantidade": 10
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Abr/26",
        "quantidade": 8
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Mai/26",
        "quantidade": 9
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Jun/26",
        "quantidade": 9
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Jul/26",
        "quantidade": 8
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Ago/26",
        "quantidade": 9
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Set/26",
        "quantidade": 8
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Saneamento",
        "mes": "Out/26",
        "quantidade": 8
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Nov/25",
        "quantidade": 9
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Dez/25",
        "quantidade": 10
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Jan/26",
        "quantidade": 9
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Fev/26",
        "quantidade": 10
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Mar/26",
        "quantidade": 11
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Abr/26",
        "quantidade": 9
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Mai/26",
        "quantidade": 10
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Jun/26",
        "quantidade": 10
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Jul/26",
        "quantidade": 10
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Ago/26",
        "quantidade": 11
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Set/26",
        "quantidade": 9
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Infraestrutura",
        "mes": "Out/26",
        "quantidade": 9
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Nov/25",
        "quantidade": 7
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Dez/25",
        "quantidade": 8
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Jan/26",
        "quantidade": 7
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Fev/26",
        "quantidade": 8
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Mar/26",
        "quantidade": 8
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Abr/26",
        "quantidade": 7
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Mai/26",
        "quantidade": 8
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Jun/26",
        "quantidade": 8
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Jul/26",
        "quantidade": 7
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Ago/26",
        "quantidade": 8
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Set/26",
        "quantidade": 7
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Segurança",
        "mes": "Out/26",
        "quantidade": 7
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Nov/25",
        "quantidade": 11
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Dez/25",
        "quantidade": 12
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Jan/26",
        "quantidade": 11
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Fev/26",
        "quantidade": 13
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Mar/26",
        "quantidade": 13
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Abr/26",
        "quantidade": 11
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Mai/26",
        "quantidade": 12
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Jun/26",
        "quantidade": 13
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Jul/26",
        "quantidade": 12
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Ago/26",
        "quantidade": 13
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Set/26",
        "quantidade": 11
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Transporte",
        "mes": "Out/26",
        "quantidade": 11
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Nov/25",
        "quantidade": 6
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Dez/25",
        "quantidade": 7
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Jan/26",
        "quantidade": 6
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Fev/26",
        "quantidade": 7
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Mar/26",
        "quantidade": 7
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Abr/26",
        "quantidade": 6
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Mai/26",
        "quantidade": 6
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Jun/26",
        "quantidade": 7
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Jul/26",
        "quantidade": 6
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Ago/26",
        "quantidade": 7
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Set/26",
        "quantidade": 6
    },
    {
        "bairro": "Vila Mariana",
        "regiao": "Sul",
        "categoria": "Vulnerabilidade",
        "mes": "Out/26",
        "quantidade": 6
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Saneamento",
        "mes": "Nov/25",
        "quantidade": 11
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Saneamento",
        "mes": "Dez/25",
        "quantidade": 12
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Saneamento",
        "mes": "Jan/26",
        "quantidade": 11
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Saneamento",
        "mes": "Fev/26",
        "quantidade": 13
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Saneamento",
        "mes": "Mar/26",
        "quantidade": 13
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Saneamento",
        "mes": "Abr/26",
        "quantidade": 11
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Saneamento",
        "mes": "Mai/26",
        "quantidade": 12
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Saneamento",
        "mes": "Jun/26",
        "quantidade": 13
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Saneamento",
        "mes": "Jul/26",
        "quantidade": 12
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Saneamento",
        "mes": "Ago/26",
        "quantidade": 13
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Saneamento",
        "mes": "Set/26",
        "quantidade": 11
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Saneamento",
        "mes": "Out/26",
        "quantidade": 11
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Infraestrutura",
        "mes": "Nov/25",
        "quantidade": 13
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Infraestrutura",
        "mes": "Dez/25",
        "quantidade": 14
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Infraestrutura",
        "mes": "Jan/26",
        "quantidade": 14
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Infraestrutura",
        "mes": "Fev/26",
        "quantidade": 15
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Infraestrutura",
        "mes": "Mar/26",
        "quantidade": 16
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Infraestrutura",
        "mes": "Abr/26",
        "quantidade": 12
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Infraestrutura",
        "mes": "Mai/26",
        "quantidade": 14
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Infraestrutura",
        "mes": "Jun/26",
        "quantidade": 15
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Infraestrutura",
        "mes": "Jul/26",
        "quantidade": 14
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Infraestrutura",
        "mes": "Ago/26",
        "quantidade": 15
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Infraestrutura",
        "mes": "Set/26",
        "quantidade": 13
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Infraestrutura",
        "mes": "Out/26",
        "quantidade": 13
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Segurança",
        "mes": "Nov/25",
        "quantidade": 12
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Segurança",
        "mes": "Dez/25",
        "quantidade": 13
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Segurança",
        "mes": "Jan/26",
        "quantidade": 12
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Segurança",
        "mes": "Fev/26",
        "quantidade": 14
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Segurança",
        "mes": "Mar/26",
        "quantidade": 14
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Segurança",
        "mes": "Abr/26",
        "quantidade": 12
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Segurança",
        "mes": "Mai/26",
        "quantidade": 13
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Segurança",
        "mes": "Jun/26",
        "quantidade": 14
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Segurança",
        "mes": "Jul/26",
        "quantidade": 13
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Segurança",
        "mes": "Ago/26",
        "quantidade": 14
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Segurança",
        "mes": "Set/26",
        "quantidade": 12
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Segurança",
        "mes": "Out/26",
        "quantidade": 12
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Transporte",
        "mes": "Nov/25",
        "quantidade": 10
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Transporte",
        "mes": "Dez/25",
        "quantidade": 11
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Transporte",
        "mes": "Jan/26",
        "quantidade": 10
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Transporte",
        "mes": "Fev/26",
        "quantidade": 12
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Transporte",
        "mes": "Mar/26",
        "quantidade": 12
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Transporte",
        "mes": "Abr/26",
        "quantidade": 10
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Transporte",
        "mes": "Mai/26",
        "quantidade": 11
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Transporte",
        "mes": "Jun/26",
        "quantidade": 11
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Transporte",
        "mes": "Jul/26",
        "quantidade": 11
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Transporte",
        "mes": "Ago/26",
        "quantidade": 12
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Transporte",
        "mes": "Set/26",
        "quantidade": 10
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Transporte",
        "mes": "Out/26",
        "quantidade": 10
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Vulnerabilidade",
        "mes": "Nov/25",
        "quantidade": 10
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Vulnerabilidade",
        "mes": "Dez/25",
        "quantidade": 11
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Vulnerabilidade",
        "mes": "Jan/26",
        "quantidade": 10
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Vulnerabilidade",
        "mes": "Fev/26",
        "quantidade": 12
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Vulnerabilidade",
        "mes": "Mar/26",
        "quantidade": 12
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Vulnerabilidade",
        "mes": "Abr/26",
        "quantidade": 10
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Vulnerabilidade",
        "mes": "Mai/26",
        "quantidade": 11
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Vulnerabilidade",
        "mes": "Jun/26",
        "quantidade": 11
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Vulnerabilidade",
        "mes": "Jul/26",
        "quantidade": 11
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Vulnerabilidade",
        "mes": "Ago/26",
        "quantidade": 12
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Vulnerabilidade",
        "mes": "Set/26",
        "quantidade": 10
    },
    {
        "bairro": "Tatuapé",
        "regiao": "Leste",
        "categoria": "Vulnerabilidade",
        "mes": "Out/26",
        "quantidade": 10
    }
];

  const historicoImoveis = [
    {
        "id": 1,
        "imovel": "Apto 101",
        "periodo": 1,
        "indiceRisco": 38
    },
    {
        "id": 1,
        "imovel": "Apto 101",
        "periodo": 2,
        "indiceRisco": 40
    },
    {
        "id": 1,
        "imovel": "Apto 101",
        "periodo": 3,
        "indiceRisco": 39
    },
    {
        "id": 1,
        "imovel": "Apto 101",
        "periodo": 4,
        "indiceRisco": 41
    },
    {
        "id": 2,
        "imovel": "Apto 204",
        "periodo": 1,
        "indiceRisco": 28
    },
    {
        "id": 2,
        "imovel": "Apto 204",
        "periodo": 2,
        "indiceRisco": 27
    },
    {
        "id": 2,
        "imovel": "Apto 204",
        "periodo": 3,
        "indiceRisco": 27
    },
    {
        "id": 2,
        "imovel": "Apto 204",
        "periodo": 4,
        "indiceRisco": 26
    },
    {
        "id": 3,
        "imovel": "Apto 312",
        "periodo": 1,
        "indiceRisco": 65
    },
    {
        "id": 3,
        "imovel": "Apto 312",
        "periodo": 2,
        "indiceRisco": 68
    },
    {
        "id": 3,
        "imovel": "Apto 312",
        "periodo": 3,
        "indiceRisco": 70
    },
    {
        "id": 3,
        "imovel": "Apto 312",
        "periodo": 4,
        "indiceRisco": 73
    },
    {
        "id": 4,
        "imovel": "Apto 405",
        "periodo": 1,
        "indiceRisco": 21
    },
    {
        "id": 4,
        "imovel": "Apto 405",
        "periodo": 2,
        "indiceRisco": 20
    },
    {
        "id": 4,
        "imovel": "Apto 405",
        "periodo": 3,
        "indiceRisco": 20
    },
    {
        "id": 4,
        "imovel": "Apto 405",
        "periodo": 4,
        "indiceRisco": 19
    },
    {
        "id": 5,
        "imovel": "Casa 12",
        "periodo": 1,
        "indiceRisco": 44
    },
    {
        "id": 5,
        "imovel": "Casa 12",
        "periodo": 2,
        "indiceRisco": 46
    },
    {
        "id": 5,
        "imovel": "Casa 12",
        "periodo": 3,
        "indiceRisco": 47
    },
    {
        "id": 5,
        "imovel": "Casa 12",
        "periodo": 4,
        "indiceRisco": 49
    },
    {
        "id": 6,
        "imovel": "Apto 600",
        "periodo": 1,
        "indiceRisco": 36
    },
    {
        "id": 6,
        "imovel": "Apto 600",
        "periodo": 2,
        "indiceRisco": 35
    },
    {
        "id": 6,
        "imovel": "Apto 600",
        "periodo": 3,
        "indiceRisco": 35
    },
    {
        "id": 6,
        "imovel": "Apto 600",
        "periodo": 4,
        "indiceRisco": 34
    },
    {
        "id": 7,
        "imovel": "Casa 08",
        "periodo": 1,
        "indiceRisco": 62
    },
    {
        "id": 7,
        "imovel": "Casa 08",
        "periodo": 2,
        "indiceRisco": 64
    },
    {
        "id": 7,
        "imovel": "Casa 08",
        "periodo": 3,
        "indiceRisco": 66
    },
    {
        "id": 7,
        "imovel": "Casa 08",
        "periodo": 4,
        "indiceRisco": 68
    },
    {
        "id": 8,
        "imovel": "Apto 506",
        "periodo": 1,
        "indiceRisco": 43
    },
    {
        "id": 8,
        "imovel": "Apto 506",
        "periodo": 2,
        "indiceRisco": 42
    },
    {
        "id": 8,
        "imovel": "Apto 506",
        "periodo": 3,
        "indiceRisco": 42
    },
    {
        "id": 8,
        "imovel": "Apto 506",
        "periodo": 4,
        "indiceRisco": 41
    },
    {
        "id": 9,
        "imovel": "Apto 709",
        "periodo": 1,
        "indiceRisco": 25
    },
    {
        "id": 9,
        "imovel": "Apto 709",
        "periodo": 2,
        "indiceRisco": 24
    },
    {
        "id": 9,
        "imovel": "Apto 709",
        "periodo": 3,
        "indiceRisco": 23
    },
    {
        "id": 9,
        "imovel": "Apto 709",
        "periodo": 4,
        "indiceRisco": 22
    },
    {
        "id": 10,
        "imovel": "Apto 810",
        "periodo": 1,
        "indiceRisco": 38
    },
    {
        "id": 10,
        "imovel": "Apto 810",
        "periodo": 2,
        "indiceRisco": 39
    },
    {
        "id": 10,
        "imovel": "Apto 810",
        "periodo": 3,
        "indiceRisco": 40
    },
    {
        "id": 10,
        "imovel": "Apto 810",
        "periodo": 4,
        "indiceRisco": 41
    }
];

  const mesesHistoricoMercado = [
    "Nov/25",
    "Dez/25",
    "Jan/26",
    "Fev/26",
    "Mar/26",
    "Abr/26",
    "Mai/26",
    "Jun/26",
    "Jul/26",
    "Ago/26",
    "Set/26",
    "Out/26"
];

  const variacoesHipoteticasMercado = [
    0.94,
    0.946,
    0.951,
    0.949,
    0.961,
    0.966,
    0.972,
    0.976,
    0.974,
    0.986,
    0.993,
    1
];

  window.HOMERISK_DADOS = Object.freeze({
    imoveis,
    regioes,
    categoriasRisco,
    iconesFatores,
    mesesHistoricoRisco,
    historicoRelatos,
    historicoImoveis,
    mesesHistoricoMercado,
    variacoesHipoteticasMercado,
    versaoDados: "2026-11-02",
    origemDados: "CSV demonstrativos do HomeRisk"
  });
})();
