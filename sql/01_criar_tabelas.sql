-- HOMERISK | FASE 3 - SQL
-- Etapa 1: criação das tabelas relacionais no SQLite.
-- Todos os registros de origem são demonstrativos.

PRAGMA foreign_keys = ON;

-- 1. REGIOES
-- Um registro por bairro. Os indicadores territoriais ficam aqui para evitar
-- duplicar as mesmas notas em cada imóvel do bairro.
CREATE TABLE IF NOT EXISTS regioes (
    bairro TEXT PRIMARY KEY,
    regiao TEXT NOT NULL,
    saneamento_nota INTEGER NOT NULL CHECK (saneamento_nota BETWEEN 0 AND 100),
    infraestrutura_nota INTEGER NOT NULL CHECK (infraestrutura_nota BETWEEN 0 AND 100),
    transporte_nota INTEGER NOT NULL CHECK (transporte_nota BETWEEN 0 AND 100),
    seguranca_nota INTEGER NOT NULL CHECK (seguranca_nota BETWEEN 0 AND 100),
    vulnerabilidade_nota INTEGER NOT NULL CHECK (vulnerabilidade_nota BETWEEN 0 AND 100)
);

-- 2. IMOVEIS
-- O bairro funciona como chave estrangeira para a tabela regioes.
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
    ocorrencias_nota_demonstrativa INTEGER CHECK (
        ocorrencias_nota_demonstrativa BETWEEN 0 AND 100
    ),
    risco_eletrico INTEGER CHECK (risco_eletrico BETWEEN 0 AND 100),
    risco_hidraulico INTEGER CHECK (risco_hidraulico BETWEEN 0 AND 100),
    risco_estrutural INTEGER CHECK (risco_estrutural BETWEEN 0 AND 100),
    risco_infiltracao INTEGER CHECK (risco_infiltracao BETWEEN 0 AND 100),
    FOREIGN KEY (bairro) REFERENCES regioes (bairro)
);

-- 3. HISTORICO_IMOVEIS
-- Cada imóvel pode ter vários períodos. A chave composta impede repetir
-- o mesmo período para o mesmo imóvel.
CREATE TABLE IF NOT EXISTS historico_imoveis (
    id_imovel INTEGER NOT NULL,
    periodo_sequencial INTEGER NOT NULL CHECK (periodo_sequencial >= 1),
    indice_risco INTEGER NOT NULL CHECK (indice_risco BETWEEN 0 AND 100),
    observacao TEXT,
    PRIMARY KEY (id_imovel, periodo_sequencial),
    FOREIGN KEY (id_imovel) REFERENCES imoveis (id_imovel)
);

-- 4. HISTORICO_RELATOS
-- Uma linha representa bairro + categoria + mês.
CREATE TABLE IF NOT EXISTS historico_relatos (
    bairro TEXT NOT NULL,
    categoria_indicador TEXT NOT NULL CHECK (
        categoria_indicador IN (
            'Saneamento', 'Infraestrutura', 'Segurança',
            'Transporte', 'Vulnerabilidade'
        )
    ),
    mes_referencia TEXT NOT NULL,
    quantidade_demonstrativa INTEGER NOT NULL CHECK (quantidade_demonstrativa >= 0),
    observacao TEXT,
    PRIMARY KEY (bairro, categoria_indicador, mes_referencia),
    FOREIGN KEY (bairro) REFERENCES regioes (bairro)
);

-- 5. HISTORICO_MERCADO
-- Série mensal de fatores hipotéticos, não de preços reais observados.
CREATE TABLE IF NOT EXISTS historico_mercado (
    mes_referencia TEXT PRIMARY KEY,
    fator_variacao_hipotetico REAL NOT NULL,
    observacao TEXT
);

-- Índices para acelerar consultas comuns por bairro e tipo.
CREATE INDEX IF NOT EXISTS idx_imoveis_bairro ON imoveis (bairro);
CREATE INDEX IF NOT EXISTS idx_imoveis_tipo ON imoveis (tipo_imovel);
CREATE INDEX IF NOT EXISTS idx_historico_relatos_mes ON historico_relatos (mes_referencia);
