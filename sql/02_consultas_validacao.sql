-- HOMERISK | FASE 3 - ETAPA 2
-- Execute estas consultas depois de importar_dados.py.

-- 1. Conferir quantos imóveis foram carregados.
SELECT COUNT(*) AS total_imoveis
FROM imoveis;

-- 2. Visualizar todos os imóveis.
SELECT
    id_imovel,
    nome_imovel,
    bairro,
    tipo_imovel,
    valor_venda_brl,
    valor_aluguel_brl
FROM imoveis
ORDER BY id_imovel;

-- 3. Contar registros de cada tabela.
SELECT 'regioes' AS tabela, COUNT(*) AS total FROM regioes
UNION ALL
SELECT 'imoveis', COUNT(*) FROM imoveis
UNION ALL
SELECT 'historico_imoveis', COUNT(*) FROM historico_imoveis
UNION ALL
SELECT 'historico_relatos', COUNT(*) FROM historico_relatos
UNION ALL
SELECT 'historico_mercado', COUNT(*) FROM historico_mercado;

-- 4. Primeiro JOIN: imóveis com a região correspondente.
SELECT
    i.nome_imovel,
    i.bairro,
    r.regiao,
    i.valor_venda_brl,
    i.valor_aluguel_brl
FROM imoveis AS i
INNER JOIN regioes AS r
    ON i.bairro = r.bairro
ORDER BY r.regiao, i.nome_imovel;

-- 5. Média de venda por região.
SELECT
    r.regiao,
    ROUND(AVG(i.valor_venda_brl), 2) AS media_venda_brl,
    COUNT(i.id_imovel) AS quantidade_imoveis
FROM imoveis AS i
INNER JOIN regioes AS r
    ON i.bairro = r.bairro
GROUP BY r.regiao
ORDER BY media_venda_brl DESC;

-- 6. Verificar referências estrangeiras.
PRAGMA foreign_key_check;
