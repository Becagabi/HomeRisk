-- HOMERISK | BANCO DE DADOS SQLITE
-- Um único arquivo SQL para criar estrutura, índices e visões de análise.
-- Todos os dados atuais são demonstrativos.

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS regioes (
    bairro TEXT PRIMARY KEY,
    regiao TEXT NOT NULL,
    saneamento_nota INTEGER NOT NULL CHECK (saneamento_nota BETWEEN 0 AND 100),
    infraestrutura_nota INTEGER NOT NULL CHECK (infraestrutura_nota BETWEEN 0 AND 100),
    transporte_nota INTEGER NOT NULL CHECK (transporte_nota BETWEEN 0 AND 100),
    seguranca_nota INTEGER NOT NULL CHECK (seguranca_nota BETWEEN 0 AND 100),
    vulnerabilidade_nota INTEGER NOT NULL CHECK (vulnerabilidade_nota BETWEEN 0 AND 100)
);

CREATE TABLE IF NOT EXISTS imoveis (
    id_imovel INTEGER PRIMARY KEY,
    nome_imovel TEXT NOT NULL,
    endereco_demonstrativo TEXT NOT NULL,
    bairro TEXT NOT NULL,
    tipo_imovel TEXT NOT NULL CHECK (tipo_imovel IN ('Apartamento', 'Casa')),
    area_m2 REAL NOT NULL CHECK (area_m2 > 0),
    latitude_aproximada REAL,
    longitude_aproximada REAL,
    valor_venda_brl REAL NOT NULL CHECK (valor_venda_brl >= 0),
    valor_aluguel_brl REAL NOT NULL CHECK (valor_aluguel_brl >= 0),
    ocorrencias_nota_demonstrativa INTEGER CHECK (ocorrencias_nota_demonstrativa BETWEEN 0 AND 100),
    risco_eletrico INTEGER CHECK (risco_eletrico BETWEEN 0 AND 100),
    risco_hidraulico INTEGER CHECK (risco_hidraulico BETWEEN 0 AND 100),
    risco_estrutural INTEGER CHECK (risco_estrutural BETWEEN 0 AND 100),
    risco_infiltracao INTEGER CHECK (risco_infiltracao BETWEEN 0 AND 100),
    FOREIGN KEY (bairro) REFERENCES regioes (bairro)
);

CREATE TABLE IF NOT EXISTS historico_imoveis (
    id_imovel INTEGER NOT NULL,
    periodo_sequencial INTEGER NOT NULL CHECK (periodo_sequencial >= 1),
    indice_risco INTEGER NOT NULL CHECK (indice_risco BETWEEN 0 AND 100),
    observacao TEXT,
    PRIMARY KEY (id_imovel, periodo_sequencial),
    FOREIGN KEY (id_imovel) REFERENCES imoveis (id_imovel)
);

CREATE TABLE IF NOT EXISTS historico_relatos (
    bairro TEXT NOT NULL,
    categoria_indicador TEXT NOT NULL CHECK (
        categoria_indicador IN ('Saneamento', 'Infraestrutura', 'Segurança', 'Transporte', 'Vulnerabilidade')
    ),
    mes_referencia TEXT NOT NULL,
    quantidade_demonstrativa INTEGER NOT NULL CHECK (quantidade_demonstrativa >= 0),
    observacao TEXT,
    PRIMARY KEY (bairro, categoria_indicador, mes_referencia),
    FOREIGN KEY (bairro) REFERENCES regioes (bairro)
);

CREATE TABLE IF NOT EXISTS historico_mercado (
    mes_referencia TEXT PRIMARY KEY,
    fator_variacao_hipotetico REAL NOT NULL,
    observacao TEXT
);

CREATE INDEX IF NOT EXISTS idx_imoveis_bairro ON imoveis (bairro);
CREATE INDEX IF NOT EXISTS idx_imoveis_tipo ON imoveis (tipo_imovel);
CREATE INDEX IF NOT EXISTS idx_historico_relatos_mes ON historico_relatos (mes_referencia);

-- Visão analítica: calcula o índice pelo modelo de cinco fatores definido no projeto.
-- Fatores de qualidade são invertidos; vulnerabilidade entra diretamente.
-- Pesos: saneamento 20%, infraestrutura 20%, segurança 20%, transporte 10%, vulnerabilidade 30%.
CREATE VIEW IF NOT EXISTS vw_imoveis_analise AS
SELECT
    base.*,
    CASE
        WHEN base.indice_risco < 40 THEN 'Baixo'
        WHEN base.indice_risco < 70 THEN 'Moderado'
        ELSE 'Alto'
    END AS nivel_risco,
    CASE
        WHEN base.indice_risco < 40 THEN 0.00
        WHEN base.indice_risco < 70 THEN 0.05
        ELSE 0.10
    END AS ajuste_hipotetico_pct,
    ROUND(
        base.valor_venda_brl * (1 - CASE
            WHEN base.indice_risco < 40 THEN 0.00
            WHEN base.indice_risco < 70 THEN 0.05
            ELSE 0.10
        END), 2
    ) AS valor_venda_ajustado_brl
FROM (
    SELECT
        i.id_imovel,
        i.nome_imovel,
        i.endereco_demonstrativo,
        i.bairro,
        r.regiao,
        i.tipo_imovel,
        i.area_m2,
        i.latitude_aproximada,
        i.longitude_aproximada,
        i.valor_venda_brl,
        i.valor_aluguel_brl,
        r.saneamento_nota,
        r.infraestrutura_nota,
        r.seguranca_nota,
        r.transporte_nota,
        r.vulnerabilidade_nota,
        i.risco_eletrico,
        i.risco_hidraulico,
        i.risco_estrutural,
        i.risco_infiltracao,
        CAST(ROUND(
            (100 - r.saneamento_nota) * 0.20 +
            (100 - r.infraestrutura_nota) * 0.20 +
            (100 - r.seguranca_nota) * 0.20 +
            (100 - r.transporte_nota) * 0.10 +
            r.vulnerabilidade_nota * 0.30
        ) AS INTEGER) AS indice_risco
    FROM imoveis i
    INNER JOIN regioes r ON r.bairro = i.bairro
) AS base;

-- Visão para resumo de mercado por região.
CREATE VIEW IF NOT EXISTS vw_mercado_regiao AS
SELECT
    r.regiao,
    COUNT(i.id_imovel) AS total_imoveis,
    ROUND(AVG(i.valor_venda_brl), 2) AS media_venda_brl,
    ROUND(AVG(i.valor_aluguel_brl), 2) AS media_aluguel_brl,
    ROUND(AVG(i.valor_venda_brl / NULLIF(i.area_m2, 0)), 2) AS media_preco_m2_brl
FROM regioes r
LEFT JOIN imoveis i ON i.bairro = r.bairro
GROUP BY r.regiao;

-- CONSULTAS ÚTEIS (execute manualmente quando quiser consultar o banco):
-- SELECT * FROM vw_imoveis_analise ORDER BY indice_risco DESC;
-- SELECT * FROM vw_mercado_regiao ORDER BY media_venda_brl DESC;
-- SELECT * FROM regioes ORDER BY regiao, bairro;
-- SELECT * FROM historico_relatos ORDER BY mes_referencia, bairro;
-- PRAGMA foreign_key_check;

-- Visão detalhada: reúne o índice de risco e os indicadores de mercado por imóvel.
-- A rentabilidade é bruta e estimada (aluguel mensal x 12 / valor de venda).
CREATE VIEW IF NOT EXISTS vw_analise_risco_mercado AS
SELECT
    a.*,
    ROUND(a.valor_venda_brl / NULLIF(a.area_m2, 0), 2) AS preco_m2_brl,
    ROUND((a.valor_aluguel_brl * 12.0 / NULLIF(a.valor_venda_brl, 0)) * 100.0, 2)
        AS rentabilidade_bruta_anual_pct
FROM vw_imoveis_analise a;

-- Comparação regional: risco médio e indicadores de mercado na mesma linha.
-- É uma comparação descritiva; não indica causalidade entre risco e preço.
CREATE VIEW IF NOT EXISTS vw_mercado_risco_regiao AS
SELECT
    a.regiao,
    COUNT(*) AS total_imoveis,
    ROUND(AVG(a.indice_risco), 2) AS risco_medio,
    CASE
        WHEN AVG(a.indice_risco) < 40 THEN 'Baixo'
        WHEN AVG(a.indice_risco) < 70 THEN 'Moderado'
        ELSE 'Alto'
    END AS nivel_risco_medio,
    ROUND(AVG(a.valor_venda_brl), 2) AS media_venda_brl,
    ROUND(AVG(a.valor_aluguel_brl), 2) AS media_aluguel_brl,
    ROUND(AVG(a.preco_m2_brl), 2) AS media_preco_m2_brl,
    ROUND(AVG(a.rentabilidade_bruta_anual_pct), 2) AS rentabilidade_bruta_media_pct,
    SUM(CASE WHEN a.nivel_risco = 'Baixo' THEN 1 ELSE 0 END) AS total_baixo,
    SUM(CASE WHEN a.nivel_risco = 'Moderado' THEN 1 ELSE 0 END) AS total_moderado,
    SUM(CASE WHEN a.nivel_risco = 'Alto' THEN 1 ELSE 0 END) AS total_alto
FROM vw_analise_risco_mercado a
GROUP BY a.regiao;

-- Pontuação de risco por fator e região, já respeitando a direção de cada indicador.
-- Saneamento, infraestrutura, segurança e transporte são invertidos (100 - nota).
-- Vulnerabilidade entra diretamente no índice de risco.
CREATE VIEW IF NOT EXISTS vw_fatores_risco_regiao AS
SELECT regiao, 'Saneamento' AS fator,
       ROUND(AVG(saneamento_nota), 2) AS nota_media,
       ROUND(AVG(100 - saneamento_nota), 2) AS risco_medio
FROM regioes GROUP BY regiao
UNION ALL
SELECT regiao, 'Infraestrutura',
       ROUND(AVG(infraestrutura_nota), 2),
       ROUND(AVG(100 - infraestrutura_nota), 2)
FROM regioes GROUP BY regiao
UNION ALL
SELECT regiao, 'Segurança',
       ROUND(AVG(seguranca_nota), 2),
       ROUND(AVG(100 - seguranca_nota), 2)
FROM regioes GROUP BY regiao
UNION ALL
SELECT regiao, 'Transporte',
       ROUND(AVG(transporte_nota), 2),
       ROUND(AVG(100 - transporte_nota), 2)
FROM regioes GROUP BY regiao
UNION ALL
SELECT regiao, 'Vulnerabilidade',
       ROUND(AVG(vulnerabilidade_nota), 2),
       ROUND(AVG(vulnerabilidade_nota), 2)
FROM regioes GROUP BY regiao;

-- Distribuição de imóveis por nível de risco em cada região.
CREATE VIEW IF NOT EXISTS vw_distribuicao_risco_regiao AS
SELECT
    regiao,
    COUNT(*) AS total_imoveis,
    SUM(CASE WHEN nivel_risco = 'Baixo' THEN 1 ELSE 0 END) AS total_baixo,
    SUM(CASE WHEN nivel_risco = 'Moderado' THEN 1 ELSE 0 END) AS total_moderado,
    SUM(CASE WHEN nivel_risco = 'Alto' THEN 1 ELSE 0 END) AS total_alto
FROM vw_imoveis_analise
GROUP BY regiao;

