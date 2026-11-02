from pathlib import Path
import sqlite3

# A pasta deste arquivo será considerada a raiz do projeto.
PASTA_PROJETO = Path(__file__).resolve().parent
ARQUIVO_SQL = PASTA_PROJETO / "sql" / "01_criar_tabelas.sql"
ARQUIVO_BANCO = PASTA_PROJETO / "HomeRisk.db"

if not ARQUIVO_SQL.exists():
    raise FileNotFoundError(
        f"Não encontrei o arquivo SQL: {ARQUIVO_SQL}\n"
        "Confira se a pasta sql e o arquivo 01_criar_tabelas.sql existem."
    )

comandos_sql = ARQUIVO_SQL.read_text(encoding="utf-8")

try:
    with sqlite3.connect(ARQUIVO_BANCO) as conexao:
        conexao.execute("PRAGMA foreign_keys = ON;")
        conexao.executescript(comandos_sql)
        tabelas = conexao.execute(
            "SELECT name FROM sqlite_master "
            "WHERE type = 'table' AND name NOT LIKE 'sqlite_%' "
            "ORDER BY name;"
        ).fetchall()

    print("Banco HomeRisk criado/atualizado com sucesso!")
    print(f"Local: {ARQUIVO_BANCO}")
    print("Tabelas encontradas:")
    for (nome_tabela,) in tabelas:
        print(f"- {nome_tabela}")
except sqlite3.Error as erro:
    raise SystemExit(f"Erro ao executar o SQL: {erro}")
