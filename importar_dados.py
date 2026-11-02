from pathlib import Path
import csv
import sqlite3

# HOMERISK | FASE 3 - ETAPA 2
# Importa os CSVs demonstrativos para o banco SQLite criado na Etapa 1.

PASTA_PROJETO = Path(__file__).resolve().parent
PASTA_CSV = PASTA_PROJETO / "dados_csv"
ARQUIVO_BANCO = PASTA_PROJETO / "HomeRisk.db"

ARQUIVOS_OBRIGATORIOS = [
    "Regioes.csv",
    "Imoveis.csv",
    "Historico_Imoveis.csv",
    "Historico_Relatos.csv",
    "Historico_Mercado.csv",
]


def ler_csv(nome_arquivo):
    """Lê CSV separado por ponto e vírgula, inclusive com BOM do Excel/Sheets."""
    caminho = PASTA_CSV / nome_arquivo
    if not caminho.exists():
        raise FileNotFoundError(f"Não encontrei {caminho}")

    with caminho.open("r", encoding="utf-8-sig", newline="") as arquivo:
        leitor = csv.DictReader(arquivo, delimiter=";")
        if not leitor.fieldnames:
            raise ValueError(f"O arquivo {nome_arquivo} não tem cabeçalho.")
        return list(leitor)


def numero(linha, campo, tipo=float, permitir_vazio=False):
    valor = linha.get(campo, "").strip()
    if valor == "" and permitir_vazio:
        return None
    if valor == "":
        raise ValueError(f"Campo obrigatório vazio: {campo}")
    return tipo(valor)


def importar(conexao):
    # Lê os dados primeiro e valida os arquivos antes de gravar.
    regioes = ler_csv("Regioes.csv")
    imoveis = ler_csv("Imoveis.csv")
    historico_imoveis = ler_csv("Historico_Imoveis.csv")
    historico_relatos = ler_csv("Historico_Relatos.csv")
    historico_mercado = ler_csv("Historico_Mercado.csv")

    # Mapeia os bairros para validar as referências e evitar duplicar
    # indicadores territoriais dentro de cada imóvel.
    mapa_regioes = {linha["bairro"].strip(): linha for linha in regioes}
    if len(mapa_regioes) != len(regioes):
        raise ValueError("Há bairros duplicados em Regioes.csv.")

    # 1. REGIOES: precisa entrar antes de IMOVEIS por causa da chave estrangeira.
    sql_regioes = """
        INSERT INTO regioes (
            bairro, regiao, saneamento_nota, infraestrutura_nota,
            transporte_nota, seguranca_nota, vulnerabilidade_nota
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(bairro) DO UPDATE SET
            regiao = excluded.regiao,
            saneamento_nota = excluded.saneamento_nota,
            infraestrutura_nota = excluded.infraestrutura_nota,
            transporte_nota = excluded.transporte_nota,
            seguranca_nota = excluded.seguranca_nota,
            vulnerabilidade_nota = excluded.vulnerabilidade_nota;
    """
    for r in regioes:
        conexao.execute(sql_regioes, (
            r["bairro"].strip(), r["regiao"].strip(),
            numero(r, "saneamento_nota", int),
            numero(r, "infraestrutura_nota", int),
            numero(r, "transporte_nota", int),
            numero(r, "seguranca_nota", int),
            numero(r, "vulnerabilidade_nota", int),
        ))

    # 2. IMOVEIS: indicadores do bairro ficam em REGIOES. Os campos calculados
    # (índice, nível, ajuste e valor ajustado) não são armazenados nesta tabela.
    sql_imoveis = """
        INSERT INTO imoveis (
            id_imovel, nome_imovel, endereco_demonstrativo, bairro, tipo_imovel,
            area_m2, latitude_aproximada, longitude_aproximada,
            valor_venda_brl, valor_aluguel_brl, ocorrencias_nota_demonstrativa,
            risco_eletrico, risco_hidraulico, risco_estrutural, risco_infiltracao
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id_imovel) DO UPDATE SET
            nome_imovel = excluded.nome_imovel,
            endereco_demonstrativo = excluded.endereco_demonstrativo,
            bairro = excluded.bairro,
            tipo_imovel = excluded.tipo_imovel,
            area_m2 = excluded.area_m2,
            latitude_aproximada = excluded.latitude_aproximada,
            longitude_aproximada = excluded.longitude_aproximada,
            valor_venda_brl = excluded.valor_venda_brl,
            valor_aluguel_brl = excluded.valor_aluguel_brl,
            ocorrencias_nota_demonstrativa = excluded.ocorrencias_nota_demonstrativa,
            risco_eletrico = excluded.risco_eletrico,
            risco_hidraulico = excluded.risco_hidraulico,
            risco_estrutural = excluded.risco_estrutural,
            risco_infiltracao = excluded.risco_infiltracao;
    """
    for i in imoveis:
        bairro = i["bairro"].strip()
        if bairro not in mapa_regioes:
            raise ValueError(f"O bairro {bairro!r} do imóvel {i['id_imovel']} não existe em Regioes.csv.")

        regiao_csv = mapa_regioes[bairro]["regiao"].strip()
        if i["regiao"].strip() != regiao_csv:
            raise ValueError(f"Região divergente para o bairro {bairro}: Imoveis.csv x Regioes.csv.")

        # Confere se as notas repetidas no CSV de imóveis correspondem à tabela de regiões.
        campos_notas = [
            "saneamento_nota", "infraestrutura_nota", "transporte_nota",
            "seguranca_nota", "vulnerabilidade_nota"
        ]
        for campo in campos_notas:
            if int(i[campo]) != int(mapa_regioes[bairro][campo]):
                raise ValueError(f"Nota {campo} divergente no imóvel {i['id_imovel']} ({bairro}).")

        conexao.execute(sql_imoveis, (
            numero(i, "id_imovel", int), i["nome_imovel"].strip(),
            i["endereco_demonstrativo"].strip(), bairro, i["tipo_imovel"].strip(),
            numero(i, "area_m2"), numero(i, "latitude_aproximada", permitir_vazio=True),
            numero(i, "longitude_aproximada", permitir_vazio=True),
            numero(i, "valor_venda_brl"), numero(i, "valor_aluguel_brl"),
            numero(i, "ocorrencias_nota_demonstrativa", int, permitir_vazio=True),
            numero(i, "risco_eletrico", int, permitir_vazio=True),
            numero(i, "risco_hidraulico", int, permitir_vazio=True),
            numero(i, "risco_estrutural", int, permitir_vazio=True),
            numero(i, "risco_infiltracao", int, permitir_vazio=True),
        ))

    # 3. HISTORICO_IMOVEIS: o nome do imóvel no CSV é redundante; id_imovel
    # é suficiente para relacionar o histórico à tabela principal.
    sql_hist_imoveis = """
        INSERT INTO historico_imoveis (
            id_imovel, periodo_sequencial, indice_risco, observacao
        ) VALUES (?, ?, ?, ?)
        ON CONFLICT(id_imovel, periodo_sequencial) DO UPDATE SET
            indice_risco = excluded.indice_risco,
            observacao = excluded.observacao;
    """
    for h in historico_imoveis:
        conexao.execute(sql_hist_imoveis, (
            numero(h, "id_imovel", int),
            numero(h, "periodo_sequencial", int),
            numero(h, "indice_risco", int),
            h.get("observacao", "").strip() or None,
        ))

    # 4. HISTORICO_RELATOS: valida regiao, mas guarda bairro como referência
    # porque a região já pode ser recuperada por meio da tabela REGIOES.
    sql_hist_relatos = """
        INSERT INTO historico_relatos (
            bairro, categoria_indicador, mes_referencia,
            quantidade_demonstrativa, observacao
        ) VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(bairro, categoria_indicador, mes_referencia) DO UPDATE SET
            quantidade_demonstrativa = excluded.quantidade_demonstrativa,
            observacao = excluded.observacao;
    """
    for h in historico_relatos:
        bairro = h["bairro"].strip()
        if bairro not in mapa_regioes:
            raise ValueError(f"Bairro {bairro!r} não cadastrado em Regioes.csv (Historico_Relatos).")
        if h["regiao"].strip() != mapa_regioes[bairro]["regiao"].strip():
            raise ValueError(f"Região divergente no histórico de relatos para {bairro}.")
        conexao.execute(sql_hist_relatos, (
            bairro, h["categoria_indicador"].strip(), h["mes_referencia"].strip(),
            numero(h, "quantidade_demonstrativa", int),
            h.get("observacao", "").strip() or None,
        ))

    # 5. HISTORICO_MERCADO: contém fatores hipotéticos, não preços coletados.
    sql_hist_mercado = """
        INSERT INTO historico_mercado (mes_referencia, fator_variacao_hipotetico, observacao)
        VALUES (?, ?, ?)
        ON CONFLICT(mes_referencia) DO UPDATE SET
            fator_variacao_hipotetico = excluded.fator_variacao_hipotetico,
            observacao = excluded.observacao;
    """
    for h in historico_mercado:
        conexao.execute(sql_hist_mercado, (
            h["mes_referencia"].strip(), numero(h, "fator_variacao_hipotetico"),
            h.get("observacao", "").strip() or None,
        ))


def main():
    if not ARQUIVO_BANCO.exists():
        raise FileNotFoundError(
            f"Não encontrei {ARQUIVO_BANCO}. Execute primeiro criar_banco.py."
        )
    for nome in ARQUIVOS_OBRIGATORIOS:
        if not (PASTA_CSV / nome).exists():
            raise FileNotFoundError(f"Arquivo obrigatório ausente: {PASTA_CSV / nome}")

    try:
        with sqlite3.connect(ARQUIVO_BANCO) as conexao:
            conexao.execute("PRAGMA foreign_keys = ON;")
            importar(conexao)
            # Valida as relações depois dos INSERTs.
            problemas = conexao.execute("PRAGMA foreign_key_check;").fetchall()
            if problemas:
                raise sqlite3.IntegrityError(f"Foram encontradas referências inválidas: {problemas}")
            totais = {
                nome: conexao.execute(f"SELECT COUNT(*) FROM {nome};").fetchone()[0]
                for nome in [
                    "regioes", "imoveis", "historico_imoveis",
                    "historico_relatos", "historico_mercado"
                ]
            }

        print("\nDados importados/atualizados com sucesso!\n")
        for tabela, total in totais.items():
            print(f"{tabela}: {total} registros")
        print(f"\nBanco utilizado: {ARQUIVO_BANCO}")
        print("\nVocê pode executar este script novamente sem duplicar os registros.")
    except (sqlite3.Error, ValueError, KeyError) as erro:
        raise SystemExit(f"Erro durante a importação: {erro}")


if __name__ == "__main__":
    main()
