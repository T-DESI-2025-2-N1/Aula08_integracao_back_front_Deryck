const API_URL = "http://localhost:3033";

const tituloFormulario = document.getElementById("tituloFormulario");
const formProduto = document.getElementById("formProduto");
const nome = document.getElementById("nome");
const descricao = document.getElementById("descricao");
const preco = document.getElementById("preco");
const botaoCancelar = document.getElementById("botaoCancelar");
const botaoSalvar = document.getElementById("botaoSalvar");
const mensagem = document.getElementById("mensagem");
const idBusca = document.getElementById("idBusca");
const botaoBuscar = document.getElementById("botaoBuscar");
const botaoListar = document.getElementById("botaoListar");
const resultadoBusca = document.getElementById("resultadoBusca");
const botaoAtualizarLista = document.getElementById("botaoAtualizarLista");
const listaProdutos = document.getElementById("listaProdutos");

function mostrarMensagem(texto, ehErro = false) {
    mensagem.textContent = texto;
    mensagem.className = ehErro ? 'erro' : 'sucesso';
}

async function listarProdutos() {
    try {
        const resposta = await fetch(`${API_URL}/produtos`);

        if (!resposta.ok) {
            throw new Error('Erro ao buscar produtos.');
        }

        const produtos = await resposta.json();
        listaProdutos.innerHTML = '';

        if (produtos.length === 0) {
            listaProdutos.innerHTML = `
                <tr>
                    <td colspan = "5">Nenhum produto cadastrado.</td> 
                </tr>
            `;
            return;
        };

        produtos.forEach((produto) => {
            listaProdutos.innerHTML += `
                <tr>
                    <td>${produto.id}</td>
                    <td>${produto.nome}</td>
                    <td>${produto.descricao}</td>
                    <td>R$ ${Number(produto.preco).toFixed(2)}</td>
                    <td>
                    <button onclick ="prepararEdicao(${produto.id})">
                        Editar
                      </button>

                      <button onclick="excluirProduto(${produto.id})">
                          Excluir
                      </button>
                    </td>
                </tr>
            `;
        });
    } catch (erro) {
        mostrarMensagem(erro.message, true);
    }
}


async function buscarProdutosPorId(){
    try {
        const id = idBusca.value;

        if (!id) {
            resultadoBusca.textContent = "Informe um ID";

        };

        const resposta = await fetch(`${API_URL}/produtos/${idBusca.value}`);

        if (!resposta.ok) {
            throw new Error('Produto não encontrado.');
        }

        const dados = await resposta.json();
        const produto = dados[0];

        listaProdutos.innerHTML = `
        <tr>
            <td>${produto.id_produto}</td>
            <td>${produto.nome}</td>
            <td>${produto.preco}</td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade_estoque}</td>
        </tr>

            <button onclick ="prepararEdicao(${produto.id})">
                Editar
            </button>

            <button onclick="excluirProduto(${produto.id})">
                Excluir
            </button>
        </td>
    </tr>
`;

    }catch (erro) {
        listaProdutos.innerHTML = `
        <tr>
            <td colspan="5">${erro.message}</td>
        </tr>
    `;

        console.error(erro);
    }
};

async function cadastrarProduto(){
    const resposta = await fetch(`${API_URL}/produtos`,{
        method: 'POST',
        headers: {
            'Content type': 'application/json'
        },
        body: JSON.stringify(dadosProduto)
    });

    if(!resposta.ok) {
        throw new Error('Erro ao cadastrar produto.');
    };

    const resultado = await resposta.json();
    return resultado;
};
       
buscarTodosProdutos();

botaoBuscar.addEventListener("click", buscarProdutosPorId);
formProduto.addEventListener("submit", async function (e) {
    e.preventDefault();

    const dadosProdutos = {
        nome: nome.value,
        descricao: descricao.value,
        preco: preco.value
    };

    try {
        await cadastrarProduto(dadosProdutos);
        mostrarMensagem('Produto cadastrado com sucesso');
        buscarTodosProdutos();
    }catch(erro) {
        mostrarMensagem(erro.message, true);
    };
});

async function excluirProduto