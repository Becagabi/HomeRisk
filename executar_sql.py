from pathlib import Path
import sqlite3
import sys

PASTA_PROJETO = Path(__file__).resolve().parent
ARQUIVO_BANCO = PASTA_PROJETO / "HomeRisk.db"

if len(sys.argv) != 2:
    raise SystemExit("Uso: python executar_sql.py sql/02_consultas_validacao.sql")

arquivo_sql = (PASTA_PROJETO / sys.argv[1]).resolve()
if not ARQUIVO_BANCO.exists():
    raise SystemExit("HomeRisk.db não encontrado. Execute primeiro criar_banco.py e importar_dados.py.")
if not arquivo_sql.exists():
    raise SystemExit(f"Arquivo SQL não encontrado: {arquivo_sql}")

texto = arquivo_sql.read_text(encoding="utf-8-sig")
comandos = []
atual = ""
for linha in texto.splitlines(keepends=True):
    atual += linha
    if sqlite3.complete_statement(atual):
        comando = atual.strip()
        atual = ""
        if comando and any(not item.lstrip().startswith("--") for item in comando.splitlines()):
            comandos.append(comando)
if atual.strip():
    raise SystemExit("Existe um comando SQL incompleto no final do arquivo.")

with sqlite3.connect(ARQUIVO_BANCO) as conexao:
    conexao.execute("PRAGMA foreign_keys = ON;")
    for numero, comando in enumerate(comandos, start=1):
        cursor = conexao.execute(comando)
        print(f"\n--- Consulta {numero} ---")
        if cursor.description:
            colunas = [coluna[0] for coluna in cursor.description]
            linhas = cursor.fetchall()
            print(" | ".join(colunas))
            print("-" * max(30, len(" | ".join(colunas))))
            if linhas:
                for linha in linhas:
                    print(" | ".join(str(valor) for valor in linha))
            else:
                print("Nenhum registro retornado.")
        else:
            print("Comando executado.")

print("\nFim da execução SQL.")
