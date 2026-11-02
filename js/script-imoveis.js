// =====================================================
// HOMERISK
// PÁGINA DE IMÓVEIS
// =====================================================


// =====================================================
// 1. DADOS
// =====================================================

const imoveis = window.HOMERISK_DADOS.imoveis;


// =====================================================
// 2. FUNÇÕES
// =====================================================

function formatarMoeda(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 0
    });

}


function calcularIndiceRisco(imovel) {

    const indice =
        (100 - imovel.saneamento) * 0.20 +
        (100 - imovel.infraestrutura) * 0.20 +
        (100 - imovel.seguranca) * 0.20 +
        (100 - imovel.transporte) * 0.10 +
        imovel.vulnerabilidade * 0.15 +
        imovel.ocorrencias * 0.15;

    return Math.round(indice);

}


function classificarRisco(indice) {

    if (indice < 40) {
        return "Baixo";
    }

    if (indice < 70) {
        return "Moderado";
    }

    return "Alto";

}


// Ícones padronizados com a página Risco da Região.
const ICONES_FATORES = window.HOMERISK_DADOS.iconesFatores;

function comIcone(nome) {
    return `${ICONES_FATORES[nome] || ""} ${nome}`.trim();
}


function calcularAjuste(nivel) {

    if (nivel === "Moderado") {
        return 0.05;
    }

    if (nivel === "Alto") {
        return 0.10;
    }

    return 0;

}


// =====================================================
// 3. ELEMENTOS
// =====================================================

const listaImoveis =
    document.getElementById("lista-imoveis-completa");


const pesquisa =
    document.getElementById("pesquisa-imovel");

const filtroRegiao =
    document.getElementById("filtro-regiao");

const filtroBairro =
    document.getElementById("filtro-bairro");

const filtroTipo =
    document.getElementById("filtro-tipo");

const filtroPreco =
    document.getElementById("filtro-preco");

const filtroNivel =
    document.getElementById("filtro-nivel");

const totalImoveis =
    document.getElementById("total-imoveis");

const mediaVenda =
    document.getElementById("media-venda");

const mediaAluguel =
    document.getElementById("media-aluguel");

// Botão flutuante de ajuda — mesmo padrão visual da página Risco da Região.
const botaoAjuda = document.getElementById("botao-ajuda-indicadores");
const painelAjuda = document.getElementById("painel-ajuda-indicadores");
const fecharAjuda = document.getElementById("fechar-ajuda-indicadores");


// =====================================================
// 4. MOSTRAR IMÓVEIS
// =====================================================

function mostrarImoveis(dados) {

    listaImoveis.innerHTML = "";

    if (dados.length === 0) {

        listaImoveis.innerHTML =
            "<p>Nenhum imóvel encontrado.</p>";

        return;

    }


    dados.forEach(function (imovel) {

        const indice =
            calcularIndiceRisco(imovel);

        const nivel =
            classificarRisco(indice);

        const ajuste =
            calcularAjuste(nivel);

        const valorAjustado =
            imovel.valorVenda * (1 - ajuste);


        const card =
            document.createElement("div");

        card.classList.add("card-imovel");
        card.dataset.imovelId = String(imovel.id);


        card.innerHTML = `

            <div class="card-imovel-topo">

                <div>

                    <h3>
                        ${imovel.imovel}
                    </h3>

                    <p>
                        ${imovel.bairro} • ${imovel.regiao}
                    </p>

                </div>

                <span class="nivel-${nivel.toLowerCase()}">
                    ${nivel}
                </span>

            </div>


            <div class="card-imovel-info">

                <div>
                    <span>Área</span>
                    <strong>${imovel.area} m²</strong>
                </div>

                <div>
                    <span>Venda</span>
                    <strong>
                        ${formatarMoeda(imovel.valorVenda)}
                    </strong>
                </div>

                <div>
                    <span>Aluguel</span>
                    <strong>
                        ${formatarMoeda(imovel.valorAluguel)}
                    </strong>
                </div>

                <div>
                    <span>Risco</span>
                    <strong>
                        ${indice}/100
                    </strong>
                </div>

            </div>


            <div class="card-imovel-rodape">

                <span>
                    Estimativa ajustada:
                    ${formatarMoeda(valorAjustado)}
                </span>

                <button class="botao-detalhes">
                    Ver detalhes
                </button>

            </div>


           

        `;


        /*
         * CLICOU NO IMÓVEL
         * Abre ou fecha os detalhes
         */

        
        const botao = card.querySelector(".botao-detalhes");

        botao.addEventListener("click", function (evento) {
            evento.stopPropagation();

            const detalhesExistentes =
                card.querySelector(".detalhes-imovel");

            // Se os detalhes já estiverem abertos, fecha.
            if (detalhesExistentes) {
                detalhesExistentes.remove();
                card.classList.remove("aberto");
                botao.textContent = "Ver detalhes";
                return;
            }

            // Cria os detalhes dentro do próprio card.
            const detalhes = mostrarDetalhes(imovel);

            card.appendChild(detalhes);
            card.classList.add("aberto");
            botao.textContent = "Ocultar detalhes";
        });

     

        listaImoveis.appendChild(card);

    });

}


// =====================================================
// 5. DETALHES
// =====================================================

function mostrarDetalhes(imovel) {

    const indice = calcularIndiceRisco(imovel);
    const nivel = classificarRisco(indice);
    const ajuste = calcularAjuste(nivel);

    const valorAjustado =
        imovel.valorVenda * (1 - ajuste);

    const detalhes = document.createElement("div");

    detalhes.classList.add("detalhes-imovel");

    detalhes.innerHTML = `

        <div class="detalhes-topo">

            <h3>${imovel.imovel}</h3>

            <p>
                ${imovel.endereco} —
                ${imovel.bairro},
                ${imovel.regiao}
            </p>

        </div>


        <div class="detalhes-indicadores">

            <div class="detalhe-item">
                <span>Índice de risco</span>
                <strong>
                    ${indice}/100
                </strong>
            </div>

            <div class="detalhe-item">
                <span>Nível de risco</span>
                <strong>
                    ${nivel}
                </strong>
            </div>

            <div class="detalhe-item">
                <span>Valor de venda</span>
                <strong>
                    ${formatarMoeda(imovel.valorVenda)}
                </strong>
            </div>

            <div class="detalhe-item">
                <span>Aluguel</span>
                <strong>
                    ${formatarMoeda(imovel.valorAluguel)}
                </strong>
            </div>

        </div>


        <div class="detalhe-categoria">

            <span>Estimativa ajustada pelo modelo</span>

            <p>
                Valor estimado:
                <strong>
                    ${formatarMoeda(valorAjustado)}
                </strong>
            </p>

            <p>
                Ajuste aplicado:
                <strong>
                    ${ajuste * 100}%
                </strong>
            </p>

        </div>


        <div class="lista-ocorrencias">

            <h4>Condições da região</h4>

            ${criarBarra(
                "Infraestrutura",
                imovel.infraestrutura
            )}

            ${criarBarra(
                "Saneamento",
                imovel.saneamento
            )}

            ${criarBarra(
                "Transporte",
                imovel.transporte
            )}

            ${criarBarra(
                "Segurança",
                imovel.seguranca
            )}

            ${criarBarra(
                "Vulnerabilidade",
                imovel.vulnerabilidade
            )}

        </div>

        <div class="acao-mapa-imovel">
            <a
                class="link-mapa-imovel"
                href="risco-regiao.html?imovel=${encodeURIComponent(imovel.id)}#secao-mapa-risco"
            >
                Ver este imóvel no mapa de risco
            </a>
        </div>

    `;

    return detalhes;
}



// =====================================================
// 6. BARRAS
// =====================================================

function criarBarra(nome, valor) {

    return `

        <div class="risco-info">

            <div class="risco-texto">

                <span>
                    ${comIcone(nome)}
                </span>

                <strong>
                    ${valor}%
                </strong>

            </div>


            <div class="barra-risco">

                <div
                    class="barra-risco-preenchida"
                    style="width: ${valor}%">
                </div>

            </div>

        </div>

    `;

}


// =====================================================
// 7. FILTROS
// =====================================================

function aplicarFiltros() {

    let dados =
        [...imoveis];


    const termo =
        pesquisa.value
            .toLowerCase()
            .trim();


    if (termo !== "") {

        dados =
            dados.filter(function (imovel) {

                return (

                    imovel.imovel
                        .toLowerCase()
                        .includes(termo)

                    ||

                    imovel.bairro
                        .toLowerCase()
                        .includes(termo)

                    ||

                    imovel.regiao
                        .toLowerCase()
                        .includes(termo)

                    ||

                    imovel.endereco
                        .toLowerCase()
                        .includes(termo)

                );

            });

    }


    if (filtroRegiao.value !== "") {

        dados =
            dados.filter(function (imovel) {

                return imovel.regiao === filtroRegiao.value;

            });

    }


    if (filtroBairro.value !== "") {

        dados =
            dados.filter(function (imovel) {

                return imovel.bairro === filtroBairro.value;

            });

    }


    if (filtroTipo.value !== "") {

        dados =
            dados.filter(function (imovel) {

                return imovel.tipo === filtroTipo.value;

            });

    }


    if (filtroPreco.value === "ate300") {

        dados =
            dados.filter(function (imovel) {

                return imovel.valorVenda <= 300000;

            });

    }


    if (filtroPreco.value === "300a450") {

        dados =
            dados.filter(function (imovel) {

                return (
                    imovel.valorVenda > 300000 &&
                    imovel.valorVenda <= 450000
                );

            });

    }


    if (filtroPreco.value === "acima450") {

        dados =
            dados.filter(function (imovel) {

                return imovel.valorVenda > 450000;

            });

    }


    if (filtroNivel.value !== "") {

        dados =
            dados.filter(function (imovel) {

                const indice =
                    calcularIndiceRisco(imovel);

                return (
                    classificarRisco(indice) ===
                    filtroNivel.value
                );

            });

    }


    atualizarResumo(dados);

    mostrarImoveis(dados);

}


// =====================================================
// 8. RESUMO
// =====================================================

function atualizarResumo(dados) {

    // Mantém os três indicadores sempre visíveis.
    totalImoveis.textContent = dados.length;

    const cardVenda = mediaVenda ? mediaVenda.closest(".indicador") : null;
    const cardAluguel = mediaAluguel ? mediaAluguel.closest(".indicador") : null;

    [cardVenda, cardAluguel].forEach(function (card) {
        if (card) {
            card.hidden = false;
            card.style.display = "";
        }
    });

    // Considera qualquer filtro da página.
    const temFiltroAtivo = [
        pesquisa && pesquisa.value,
        filtroRegiao && filtroRegiao.value,
        filtroBairro && filtroBairro.value,
        filtroTipo && filtroTipo.value,
        filtroPreco && filtroPreco.value,
        filtroNivel && filtroNivel.value
    ].some(function (valor) {
        return String(valor || "").trim() !== "";
    });

    // Sem filtros: os cards permanecem, mas os valores ficam vazios.
    if (!temFiltroAtivo) {
        mediaVenda.textContent = "";
        mediaAluguel.textContent = "";
        return;
    }

    // Filtro ativo sem resultados: não inventa uma média.
    if (!dados || dados.length === 0) {
        mediaVenda.textContent = "—";
        mediaAluguel.textContent = "—";
        return;
    }

    // Calcula as médias com os imóveis que realmente passaram pelos filtros.
    const somaVenda = dados.reduce(function (total, imovel) {
        return total + Number(imovel.valorVenda || 0);
    }, 0);

    const somaAluguel = dados.reduce(function (total, imovel) {
        return total + Number(imovel.valorAluguel || 0);
    }, 0);

    mediaVenda.textContent = formatarMoeda(somaVenda / dados.length);
    mediaAluguel.textContent = formatarMoeda(somaAluguel / dados.length);
}




// =====================================================
// 9. AJUDA — ENTENDA OS INDICADORES
// =====================================================

function fecharPainelAjuda() {
    if (!painelAjuda || !botaoAjuda) return;

    painelAjuda.hidden = true;
    botaoAjuda.setAttribute("aria-expanded", "false");
}

function alternarAjuda() {
    if (!painelAjuda || !botaoAjuda) return;

    const estaAberto = !painelAjuda.hidden;
    painelAjuda.hidden = estaAberto;
    botaoAjuda.setAttribute("aria-expanded", String(!estaAberto));
}


// =====================================================
// 10. EVENTOS
// =====================================================

pesquisa.addEventListener(
    "input",
    aplicarFiltros
);

filtroRegiao.addEventListener(
    "change",
    aplicarFiltros
);

filtroBairro.addEventListener(
    "change",
    aplicarFiltros
);

filtroTipo.addEventListener(
    "change",
    aplicarFiltros
);

filtroPreco.addEventListener(
    "change",
    aplicarFiltros
);

filtroNivel.addEventListener(
    "change",
    aplicarFiltros
);


// Eventos do painel flutuante de ajuda.
if (botaoAjuda && painelAjuda && fecharAjuda) {
    botaoAjuda.addEventListener("click", alternarAjuda);
    fecharAjuda.addEventListener("click", fecharPainelAjuda);

    document.addEventListener("click", function (evento) {
        if (!evento.target.closest(".ajuda-indicadores")) {
            fecharPainelAjuda();
        }
    });

    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape") {
            fecharPainelAjuda();
        }
    });
}


// =====================================================
// 11. INICIALIZAÇÃO
// =====================================================

function abrirImovelSolicitado() {

    const parametros = new URLSearchParams(window.location.search);
    const idSolicitado = parametros.get("imovel");

    if (!idSolicitado) return;

    const imovel = imoveis.find(function (item) {
        return String(item.id) === String(idSolicitado);
    });

    if (!imovel) return;

    // Garante que o imóvel esteja visível mesmo que a página tenha filtros ativos.
    filtroRegiao.value = imovel.regiao;
    filtroBairro.value = imovel.bairro;
    filtroTipo.value = "";
    filtroPreco.value = "";
    filtroNivel.value = "";
    pesquisa.value = "";

    aplicarFiltros();

    const card = listaImoveis.querySelector(
        `[data-imovel-id="${String(imovel.id)}"]`
    );

    if (!card) return;

    const botaoDetalhes = card.querySelector(".botao-detalhes");
    if (botaoDetalhes && !card.querySelector(".detalhes-imovel")) {
        botaoDetalhes.click();
    }

    card.classList.add("imovel-destacado");
    card.scrollIntoView({ behavior: "smooth", block: "center" });
}

aplicarFiltros();
abrirImovelSolicitado();