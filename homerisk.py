from __future__ import annotations

import argparse
import csv
import json
import sqlite3
from collections import defaultdict
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

BASE_DIR = Path(__file__).resolve().parent
DATABASE = BASE_DIR / "HomeRisk.db"
SQL_FILE = BASE_DIR / "homerisk.sql"
CSV_DIR = BASE_DIR / "dados_csv"
TABELAS = (
    "regioes", "imoveis", "historico_imoveis", "historico_relatos", "historico_mercado"
)
ARQUIVOS_CSV = (
    "Regioes.csv", "Imoveis.csv", "Historico_Imoveis.csv",
    "Historico_Relatos.csv", "Historico_Mercado.csv"
)
CATEGORIAS_RISCO = ["Saneamento", "Infraestrutura", "Segurança", "Transporte", "Vulnerabilidade"]
ICONES_FATORES = {
    "Saneamento": "🚰", "Infraestrutura": "🏗️", "Segurança": "🛡️",
    "Transporte": "🚌", "Vulnerabilidade": "⚠️"
}


def conectar() -> sqlite3.Connection:
    conexao = sqlite3.connect(DATABASE)
    conexao.row_factory = sqlite3.Row
    conexao.execute("PRAGMA foreign_keys = ON;")
    return conexao


def criar_estrutura() -> None:
    if not SQL_FILE.exists():
        raise FileNotFoundError(f"Arquivo SQL não encontrado: {SQL_FILE}")
    with conectar() as conexao:
        conexao.executescript(SQL_FILE.read_text(encoding="utf-8"))


def ler_csv(nome: str) -> list[dict[str, str]]:
    caminho = CSV_DIR / nome
    if not caminho.exists():
        raise FileNotFoundError(f"CSV obrigatório não encontrado: {caminho}")
    with caminho.open("r", encoding="utf-8-sig", newline="") as arquivo:
        leitor = csv.DictReader(arquivo, delimiter=";")
        if not leitor.fieldnames:
            raise ValueError(f"O arquivo {nome} não possui cabeçalho.")
        return list(leitor)


def numero(linha: dict, campo: str, tipo=float, permitir_vazio=False):
    valor = (linha.get(campo) or "").strip()
    if not valor and permitir_vazio:
        return None
    if not valor:
        raise ValueError(f"Campo obrigatório vazio: {campo}")
    return tipo(valor)


def importar_csvs() -> dict[str, int]:
    criar_estrutura()
    regioes = ler_csv("Regioes.csv")
    imoveis = ler_csv("Imoveis.csv")
    historico_imoveis = ler_csv("Historico_Imoveis.csv")
    historico_relatos = ler_csv("Historico_Relatos.csv")
    historico_mercado = ler_csv("Historico_Mercado.csv")

    mapa_regioes = {r["bairro"].strip(): r for r in regioes}
    if len(mapa_regioes) != len(regioes):
        raise ValueError("Há bairros duplicados em Regioes.csv.")

    with conectar() as conexao:
        with conexao:
            for r in regioes:
                conexao.execute(
                    """INSERT INTO regioes (
                        bairro, regiao, saneamento_nota, infraestrutura_nota,
                        transporte_nota, seguranca_nota, vulnerabilidade_nota
                    ) VALUES (?, ?, ?, ?, ?, ?, ?)
                    ON CONFLICT(bairro) DO UPDATE SET
                        regiao=excluded.regiao, saneamento_nota=excluded.saneamento_nota,
                        infraestrutura_nota=excluded.infraestrutura_nota,
                        transporte_nota=excluded.transporte_nota,
                        seguranca_nota=excluded.seguranca_nota,
                        vulnerabilidade_nota=excluded.vulnerabilidade_nota""",
                    (r["bairro"].strip(), r["regiao"].strip(),
                     numero(r, "saneamento_nota", int), numero(r, "infraestrutura_nota", int),
                     numero(r, "transporte_nota", int), numero(r, "seguranca_nota", int),
                     numero(r, "vulnerabilidade_nota", int))
                )

            for i in imoveis:
                bairro = i["bairro"].strip()
                if bairro not in mapa_regioes:
                    raise ValueError(f"Bairro {bairro!r} do imóvel {i.get('id_imovel')} não cadastrado.")
                regiao_csv = mapa_regioes[bairro]["regiao"].strip()
                if i["regiao"].strip() != regiao_csv:
                    raise ValueError(f"Região divergente para o bairro {bairro}.")
                for campo in ("saneamento_nota", "infraestrutura_nota", "transporte_nota", "seguranca_nota", "vulnerabilidade_nota"):
                    if int(i[campo]) != int(mapa_regioes[bairro][campo]):
                        raise ValueError(f"Nota {campo} divergente no imóvel {i['id_imovel']} ({bairro}).")
                conexao.execute(
                    """INSERT INTO imoveis (
                        id_imovel, nome_imovel, endereco_demonstrativo, bairro, tipo_imovel,
                        area_m2, latitude_aproximada, longitude_aproximada, valor_venda_brl,
                        valor_aluguel_brl, ocorrencias_nota_demonstrativa, risco_eletrico,
                        risco_hidraulico, risco_estrutural, risco_infiltracao
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ON CONFLICT(id_imovel) DO UPDATE SET
                        nome_imovel=excluded.nome_imovel, endereco_demonstrativo=excluded.endereco_demonstrativo,
                        bairro=excluded.bairro, tipo_imovel=excluded.tipo_imovel, area_m2=excluded.area_m2,
                        latitude_aproximada=excluded.latitude_aproximada, longitude_aproximada=excluded.longitude_aproximada,
                        valor_venda_brl=excluded.valor_venda_brl, valor_aluguel_brl=excluded.valor_aluguel_brl,
                        ocorrencias_nota_demonstrativa=excluded.ocorrencias_nota_demonstrativa,
                        risco_eletrico=excluded.risco_eletrico, risco_hidraulico=excluded.risco_hidraulico,
                        risco_estrutural=excluded.risco_estrutural, risco_infiltracao=excluded.risco_infiltracao""",
                    (numero(i, "id_imovel", int), i["nome_imovel"].strip(), i["endereco_demonstrativo"].strip(),
                     bairro, i["tipo_imovel"].strip(), numero(i, "area_m2"),
                     numero(i, "latitude_aproximada", permitir_vazio=True),
                     numero(i, "longitude_aproximada", permitir_vazio=True),
                     numero(i, "valor_venda_brl"), numero(i, "valor_aluguel_brl"),
                     numero(i, "ocorrencias_nota_demonstrativa", int, True),
                     numero(i, "risco_eletrico", int, True), numero(i, "risco_hidraulico", int, True),
                     numero(i, "risco_estrutural", int, True), numero(i, "risco_infiltracao", int, True))
                )

            for h in historico_imoveis:
                conexao.execute(
                    """INSERT INTO historico_imoveis (id_imovel, periodo_sequencial, indice_risco, observacao)
                    VALUES (?, ?, ?, ?)
                    ON CONFLICT(id_imovel, periodo_sequencial) DO UPDATE SET
                        indice_risco=excluded.indice_risco, observacao=excluded.observacao""",
                    (numero(h, "id_imovel", int), numero(h, "periodo_sequencial", int),
                     numero(h, "indice_risco", int), h.get("observacao", "").strip() or None)
                )

            for h in historico_relatos:
                bairro = h["bairro"].strip()
                if bairro not in mapa_regioes or h["regiao"].strip() != mapa_regioes[bairro]["regiao"].strip():
                    raise ValueError(f"Bairro/região inválidos no histórico de relatos: {bairro}.")
                conexao.execute(
                    """INSERT INTO historico_relatos (
                        bairro, categoria_indicador, mes_referencia, quantidade_demonstrativa, observacao
                    ) VALUES (?, ?, ?, ?, ?)
                    ON CONFLICT(bairro, categoria_indicador, mes_referencia) DO UPDATE SET
                        quantidade_demonstrativa=excluded.quantidade_demonstrativa,
                        observacao=excluded.observacao""",
                    (bairro, h["categoria_indicador"].strip(), h["mes_referencia"].strip(),
                     numero(h, "quantidade_demonstrativa", int), h.get("observacao", "").strip() or None)
                )

            for h in historico_mercado:
                conexao.execute(
                    """INSERT INTO historico_mercado (mes_referencia, fator_variacao_hipotetico, observacao)
                    VALUES (?, ?, ?)
                    ON CONFLICT(mes_referencia) DO UPDATE SET
                        fator_variacao_hipotetico=excluded.fator_variacao_hipotetico,
                        observacao=excluded.observacao""",
                    (h["mes_referencia"].strip(), numero(h, "fator_variacao_hipotetico"),
                     h.get("observacao", "").strip() or None)
                )

        problemas = conexao.execute("PRAGMA foreign_key_check").fetchall()
        if problemas:
            raise sqlite3.IntegrityError(f"Referências inválidas: {problemas}")
        return contar_registros(conexao)


def contar_registros(conexao: sqlite3.Connection | None = None) -> dict[str, int]:
    fechar = conexao is None
    db = conexao or conectar()
    try:
        tabelas_existentes = {row[0] for row in db.execute("SELECT name FROM sqlite_master WHERE type='table'")}
        ausentes = [t for t in TABELAS if t not in tabelas_existentes]
        if ausentes:
            raise RuntimeError("Tabelas ausentes: " + ", ".join(ausentes))
        return {t: db.execute(f'SELECT COUNT(*) FROM "{t}"').fetchone()[0] for t in TABELAS}
    finally:
        if fechar:
            db.close()


def validar_banco_pronto() -> dict[str, int]:
    if not DATABASE.exists():
        raise FileNotFoundError("HomeRisk.db não encontrado. Execute: python homerisk.py importar")
    with conectar() as conexao:
        totais = contar_registros(conexao)
        vazias = [t for t, total in totais.items() if total == 0]
        if vazias:
            raise RuntimeError("Tabelas sem dados: " + ", ".join(vazias) + ". Execute: python homerisk.py importar")
        problemas = conexao.execute("PRAGMA foreign_key_check").fetchall()
        if problemas:
            raise RuntimeError(f"Referências inválidas: {problemas}")
        return totais


def carregar_analises() -> dict:
    """Consulta visões analíticas do SQLite, sem Pandas ou cálculos duplicados no JS."""
    with conectar() as conexao:
        mercado_regiao = [dict(row) for row in conexao.execute(
            "SELECT * FROM vw_mercado_risco_regiao ORDER BY regiao"
        )]
        risco_imoveis = [dict(row) for row in conexao.execute(
            "SELECT * FROM vw_analise_risco_mercado ORDER BY indice_risco DESC, nome_imovel"
        )]
        fatores_regiao = [dict(row) for row in conexao.execute(
            "SELECT * FROM vw_fatores_risco_regiao ORDER BY regiao, CASE fator "
            "WHEN 'Saneamento' THEN 1 WHEN 'Infraestrutura' THEN 2 "
            "WHEN 'Segurança' THEN 3 WHEN 'Transporte' THEN 4 ELSE 5 END"
        )]
        distribuicao_risco = [dict(row) for row in conexao.execute(
            "SELECT * FROM vw_distribuicao_risco_regiao ORDER BY regiao"
        )]

    return {
        "origem": "SQLite / HomeRisk.db",
        "demonstrativo": True,
        "mercadoPorRegiao": mercado_regiao,
        "imoveisPorRisco": risco_imoveis,
        "fatoresDeRiscoPorRegiao": fatores_regiao,
        "distribuicaoDeRiscoPorRegiao": distribuicao_risco,
        "observacao": "Comparações descritivas com dados demonstrativos; não indicam causalidade.",
    }


def calcular_correlacao_pearson(pares: list[tuple[float, float]]) -> float | None:
    """Calcula Pearson sem bibliotecas externas. Retorna None sem variância/amostra."""
    if len(pares) < 2:
        return None
    xs = [float(x) for x, _ in pares]
    ys = [float(y) for _, y in pares]
    media_x = sum(xs) / len(xs)
    media_y = sum(ys) / len(ys)
    soma_x = sum((x - media_x) ** 2 for x in xs)
    soma_y = sum((y - media_y) ** 2 for y in ys)
    denominador = (soma_x * soma_y) ** 0.5
    if denominador == 0:
        return None
    covariancia = sum((x - media_x) * (y - media_y) for x, y in pares)
    return covariancia / denominador


def carregar_analise_mercado(regiao: str = "", bairro: str = "", tipo: str = "") -> dict:
    """Entrega métricas do Mercado filtradas e calculadas no SQLite."""
    condicoes = []
    parametros: list[str] = []
    if regiao:
        condicoes.append("regiao = ?")
        parametros.append(regiao)
    if bairro:
        condicoes.append("bairro = ?")
        parametros.append(bairro)
    if tipo:
        condicoes.append("tipo_imovel = ?")
        parametros.append(tipo)
    where_sql = (" WHERE " + " AND ".join(condicoes)) if condicoes else ""

    with conectar() as conexao:
        imoveis_sql = f"""SELECT id_imovel, nome_imovel, bairro, regiao, tipo_imovel,
                            area_m2, valor_venda_brl, valor_aluguel_brl, indice_risco,
                            nivel_risco, preco_m2_brl, rentabilidade_bruta_anual_pct
                     FROM vw_analise_risco_mercado{where_sql}
                     ORDER BY nome_imovel"""
        registros = [dict(row) for row in conexao.execute(imoveis_sql, parametros)]

        indicadores_sql = f"""SELECT
            COUNT(*) AS total_imoveis,
            ROUND(AVG(valor_venda_brl), 2) AS media_venda,
            ROUND(AVG(valor_aluguel_brl), 2) AS media_aluguel,
            ROUND(SUM(valor_venda_brl) / NULLIF(SUM(area_m2), 0), 2) AS preco_medio_m2,
            ROUND(SUM(valor_aluguel_brl * 12.0) / NULLIF(SUM(valor_venda_brl), 0) * 100.0, 2) AS rentabilidade_bruta_anual,
            ROUND(AVG(indice_risco), 2) AS risco_medio
            FROM vw_analise_risco_mercado{where_sql}"""
        indicadores = dict(conexao.execute(indicadores_sql, parametros).fetchone())

        por_regiao_sql = f"""SELECT regiao, COUNT(*) AS quantidade,
            ROUND(AVG(valor_venda_brl), 2) AS venda_media,
            ROUND(AVG(valor_aluguel_brl), 2) AS aluguel_medio
            FROM vw_analise_risco_mercado{where_sql}
            GROUP BY regiao ORDER BY regiao"""
        por_regiao = [dict(row) for row in conexao.execute(por_regiao_sql, parametros)]

        por_bairro_sql = f"""SELECT bairro, COUNT(*) AS quantidade,
            ROUND(AVG(valor_venda_brl), 2) AS venda_media,
            ROUND(AVG(valor_aluguel_brl), 2) AS aluguel_medio,
            ROUND(SUM(valor_venda_brl) / NULLIF(SUM(area_m2), 0), 2) AS preco_m2,
            ROUND(AVG(indice_risco), 0) AS risco_medio
            FROM vw_analise_risco_mercado{where_sql}
            GROUP BY bairro ORDER BY bairro"""
        por_bairro = [dict(row) for row in conexao.execute(por_bairro_sql, parametros)]

    correlacao = calcular_correlacao_pearson([
        (registro["indice_risco"], registro["valor_venda_brl"])
        for registro in registros
        if registro["indice_risco"] is not None and registro["valor_venda_brl"] is not None
    ])

    return {
        "origem": "SQLite / HomeRisk.db",
        "demonstrativo": True,
        "filtros": {"regiao": regiao, "bairro": bairro, "tipo": tipo},
        "indicadores": {
            "totalImoveis": indicadores["total_imoveis"] or 0,
            "mediaVenda": indicadores["media_venda"],
            "mediaAluguel": indicadores["media_aluguel"],
            "precoMedioM2": indicadores["preco_medio_m2"],
            "rentabilidadeBrutaAnual": indicadores["rentabilidade_bruta_anual"],
            "riscoMedio": indicadores["risco_medio"],
            "correlacaoRiscoVenda": correlacao,
        },
        "porRegiao": por_regiao,
        "porBairro": por_bairro,
        "imoveis": registros,
        "observacao": "Comparações descritivas com dados demonstrativos; não indicam causalidade."
    }


def carregar_dados() -> dict:
    with conectar() as conexao:
        meses_risco = [row[0] for row in conexao.execute(
            "SELECT mes_referencia FROM historico_relatos GROUP BY mes_referencia ORDER BY MIN(rowid)")]
        meses_mercado = [row[0] for row in conexao.execute(
            "SELECT mes_referencia FROM historico_mercado ORDER BY rowid")]
        historicos: dict[int, list[int]] = defaultdict(list)
        for row in conexao.execute(
            "SELECT id_imovel, indice_risco FROM historico_imoveis ORDER BY id_imovel, periodo_sequencial"):
            historicos[row["id_imovel"]].append(row["indice_risco"])

        imoveis = []
        for row in conexao.execute(
            """SELECT i.id_imovel, i.nome_imovel, i.endereco_demonstrativo, i.bairro, r.regiao,
                      i.tipo_imovel, i.area_m2, i.latitude_aproximada, i.longitude_aproximada,
                      i.valor_venda_brl, i.valor_aluguel_brl, r.saneamento_nota,
                      r.infraestrutura_nota, r.transporte_nota, r.seguranca_nota,
                      r.vulnerabilidade_nota, i.ocorrencias_nota_demonstrativa,
                      i.risco_eletrico, i.risco_hidraulico, i.risco_estrutural, i.risco_infiltracao
               FROM imoveis i INNER JOIN regioes r ON r.bairro=i.bairro ORDER BY i.id_imovel"""):
            imoveis.append({
                "id": row["id_imovel"], "imovel": row["nome_imovel"], "endereco": row["endereco_demonstrativo"],
                "bairro": row["bairro"], "regiao": row["regiao"], "tipo": row["tipo_imovel"],
                "area": row["area_m2"], "latitude": row["latitude_aproximada"], "longitude": row["longitude_aproximada"],
                "valorVenda": row["valor_venda_brl"], "valorAluguel": row["valor_aluguel_brl"],
                "saneamento": row["saneamento_nota"], "infraestrutura": row["infraestrutura_nota"],
                "transporte": row["transporte_nota"], "seguranca": row["seguranca_nota"],
                "vulnerabilidade": row["vulnerabilidade_nota"], "ocorrencias": row["ocorrencias_nota_demonstrativa"],
                "riscoEletrico": row["risco_eletrico"], "riscoHidraulico": row["risco_hidraulico"],
                "riscoEstrutural": row["risco_estrutural"], "riscoInfiltracao": row["risco_infiltracao"],
                "historico": historicos.get(row["id_imovel"], [])
            })

        regioes = [{
            "bairro": row["bairro"], "regiao": row["regiao"], "saneamento": row["saneamento_nota"],
            "infraestrutura": row["infraestrutura_nota"], "transporte": row["transporte_nota"],
            "seguranca": row["seguranca_nota"], "vulnerabilidade": row["vulnerabilidade_nota"]
        } for row in conexao.execute(
            "SELECT bairro, regiao, saneamento_nota, infraestrutura_nota, transporte_nota, seguranca_nota, vulnerabilidade_nota FROM regioes ORDER BY rowid")]

        relatos = [{
            "bairro": row["bairro"], "regiao": row["regiao"], "categoria": row["categoria_indicador"],
            "mes": row["mes_referencia"], "quantidade": row["quantidade_demonstrativa"]
        } for row in conexao.execute(
            """SELECT h.bairro, r.regiao, h.categoria_indicador, h.mes_referencia, h.quantidade_demonstrativa
               FROM historico_relatos h INNER JOIN regioes r ON r.bairro=h.bairro ORDER BY h.rowid""")]
        variacoes = [row[0] for row in conexao.execute(
            "SELECT fator_variacao_hipotetico FROM historico_mercado ORDER BY rowid")]

    return {
        "imoveis": imoveis, "regioes": regioes, "categoriasRisco": CATEGORIAS_RISCO,
        "iconesFatores": ICONES_FATORES, "mesesHistoricoRisco": meses_risco,
        "historicoRelatos": relatos, "mesesHistoricoMercado": meses_mercado,
        "variacoesHipoteticasMercado": variacoes, "origemDados": "SQLite / HomeRisk.db",
        "dadosDemonstrativos": True
    }


class HomeRiskHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(BASE_DIR), **kwargs)

    def enviar_json(self, dados, status=200):
        corpo = json.dumps(dados, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(corpo)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(corpo)

    def enviar_dados_js(self):
        dados = carregar_dados()
        conteudo = ("// Dados carregados do SQLite HomeRisk.db. Uso demonstrativo.\n"
                    "window.HOMERISK_DADOS = Object.freeze(" +
                    json.dumps(dados, ensure_ascii=False, separators=(",", ":")) + ");\n").encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/javascript; charset=utf-8")
        self.send_header("Content-Length", str(len(conteudo)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(conteudo)

    def do_GET(self):
        caminho = urlparse(self.path).path
        try:
            if caminho == "/api/status":
                self.enviar_json({"status": "online", "banco": DATABASE.name, "tabelas": contar_registros()})
                return
            if caminho == "/api/dados":
                self.enviar_json(carregar_dados())
                return
            if caminho == "/api/analises":
                self.enviar_json(carregar_analises())
                return
            if caminho == "/api/analises/mercado-regiao":
                self.enviar_json(carregar_analises()["mercadoPorRegiao"])
                return
            if caminho == "/api/analises/risco-imoveis":
                self.enviar_json(carregar_analises()["imoveisPorRisco"])
                return
            if caminho == "/api/analises/fatores-regiao":
                self.enviar_json(carregar_analises()["fatoresDeRiscoPorRegiao"])
                return
            if caminho == "/api/analises/distribuicao-risco":
                self.enviar_json(carregar_analises()["distribuicaoDeRiscoPorRegiao"])
                return
            if caminho == "/api/analises/mercado-detalhado":
                consulta = parse_qs(urlparse(self.path).query)
                regiao = consulta.get("regiao", [""])[0].strip()
                bairro = consulta.get("bairro", [""])[0].strip()
                tipo = consulta.get("tipo", [""])[0].strip()
                self.enviar_json(carregar_analise_mercado(regiao, bairro, tipo))
                return
            if caminho == "/api/imoveis":
                self.enviar_json(carregar_dados()["imoveis"])
                return
            if caminho == "/api/regioes":
                self.enviar_json(carregar_dados()["regioes"])
                return
            if caminho == "/js/dados.js":
                self.enviar_dados_js()
                return
            if caminho == "/HomeRisk.db" or caminho.startswith("/dados_csv/"):
                self.send_error(404, "Arquivo não disponibilizado pelo servidor web local.")
                return
            super().do_GET()
        except (sqlite3.Error, RuntimeError, FileNotFoundError) as erro:
            self.enviar_json({"erro": str(erro)}, status=500)

    def log_message(self, formato, *args):
        print(f"[HomeRisk] {self.address_string()} - {formato % args}")


def iniciar_servidor(host="127.0.0.1", porta=8000):
    criar_estrutura()  # Garante a criação/atualização das visões analíticas no banco existente.
    totais = validar_banco_pronto()
    servidor = ThreadingHTTPServer((host, porta), HomeRiskHandler)
    print("\nHomeRisk conectado ao SQLite com sucesso!\n")
    for tabela, total in totais.items():
        print(f"  {tabela}: {total} registros")
    print(f"\nAcesse: http://{host}:{porta}/index.html")
    print(f"API: http://{host}:{porta}/api/status")
    print("Para encerrar, pressione CTRL + C.\n")
    try:
        servidor.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor HomeRisk encerrado.")
    finally:
        servidor.server_close()


def main():
    parser = argparse.ArgumentParser(
        description="HomeRisk: um único script para banco SQLite, importação CSV e servidor local."
    )
    parser.add_argument("acao", choices=("configurar", "importar", "iniciar", "status"),
                        help="configurar = criar estrutura e importar; importar = atualizar CSVs; iniciar = abrir site; status = conferir banco")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8000)
    args = parser.parse_args()

    try:
        if args.acao in ("configurar", "importar"):
            totais = importar_csvs()
            print("\nDados importados/atualizados com sucesso!\n")
            for tabela, total in totais.items():
                print(f"{tabela}: {total} registros")
            print(f"\nBanco: {DATABASE}")
            print("A importação pode ser repetida sem duplicar registros.")
        elif args.acao == "status":
            criar_estrutura()
            print(json.dumps({"status": "online", "banco": DATABASE.name, "tabelas": validar_banco_pronto()},
                             ensure_ascii=False, indent=2))
        elif args.acao == "iniciar":
            iniciar_servidor(args.host, args.port)
    except (sqlite3.Error, ValueError, KeyError, FileNotFoundError, RuntimeError) as erro:
        print(f"\n[HomeRisk] Não foi possível concluir a ação: {erro}")
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
