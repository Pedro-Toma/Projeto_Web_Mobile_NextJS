# Projeto_Web_Mobile

## Integrantes:

Gabriel Fuentes - 10408876  
Guilherme Florio - 10409698  
Pedro Toma - 10390171  

## Processo de Ideação
Consideramos a ideia de rastreabilidade de preços, ficamos em dúvida entre 2 nichos: produtos de mercado e produtos eletrônicos.
A ideia é que o usuário consiga comparar preços e saber o melhor local físico ou virtual onde ele possa comprar.
Essa decisão foi baseada em se tratar de um nicho mais inclusivo, que atende a um público amplo e diverso, independentemente do nível de familiaridade com tecnologia. Além disso, produtos de mercado fazem parte da rotina frequente dos consumidores, o que aumenta a recorrência de uso da solução. Por fim, foi identificada uma necessidade mais evidente nesse contexto, especialmente diante da variação constante de preços em supermercados e do impacto direto no orçamento das famílias.
Dessa forma, a escolha por esse nicho se mostra mais alinhada com a proposta de gerar valor prático e acessível para um maior número de usuários.

## Caráter Extensionista
A proposta é poder facilitar a consulta de produtos, para que as pessoas possam economizar nas suas compras e tomar uma decisão mais eficiente com relação ao local, podendo escolher um lugar mais próximo a sua casa, sem perder um desconto ou valor.

## Imagens dos Wireframes

### Desktop
#### Página Incial (Seção de "Ofertas Imperdíveis" e seção de "Mercados")
<img width="1098" height="623" alt="image" src="https://github.com/user-attachments/assets/5f123cf2-e60b-40ad-a919-387dde8aa114" />

#### Página de Produto (Lista de mercados onde o produto está disponível)
<img width="1092" height="620" alt="image" src="https://github.com/user-attachments/assets/15a38bd7-596a-4111-aff0-ff046c8c2066" />

#### Página de Mercado (Lista de produtos disponíveis no mercado)
<img width="1091" height="620" alt="image" src="https://github.com/user-attachments/assets/0b4da784-1753-496b-b046-6f9f727b0bd7" />

#### Seção Lateral (Lista de produtos adicionados pelo usuário)
<img width="1091" height="618" alt="image" src="https://github.com/user-attachments/assets/76560e5b-ab87-4fd0-834a-efe0c51db010" />

### Mobile

#### Página Incial
<img width="268" height="567" alt="image" src="https://github.com/user-attachments/assets/65e3a2eb-69c1-4f31-b208-881a134a21ab" />

#### Página de Produto
<img width="292" height="624" alt="image" src="https://github.com/user-attachments/assets/7bde1bb1-c5db-4f8b-8b2f-51d632e11cf1" />

#### Página de Mercado
<img width="289" height="624" alt="image" src="https://github.com/user-attachments/assets/11f9b883-72c1-4ad5-ad60-19eb93b4321e" />

#### Modal (Posição da lista modificada para versão mobile)
<img width="294" height="625" alt="image" src="https://github.com/user-attachments/assets/9ba285e7-0fb7-42fc-af24-a66e4952db5b" />

## Vantagem da migração para ReactJS
As vantagens da utilização de componentes ReactJS incluem a facilidade de troca de rotas para mudança de páginas, principalmente com relação a necessidade de fazer a troca de dados na mesma tela, além da facilidade de organização e manipulação dos dados.

## Migração para NextJS

As configuração de CSS foram colocados no arquivo global.css para facilitar o início da migração.

### Estrutura das pastas e arquivos
<img width="212" height="636" alt="image" src="https://github.com/user-attachments/assets/ebbd24dc-fd87-4e0e-af89-24eb4a0d0bc6" />

Foi criado a pasta de componentes para armazenar o header e seção lateral que estão presentes em todas as abas, inseridos no arquivo layout.js. Além de armazenar os cards de produto e mercado e as seções da página principal.

~~~js
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Header/>
        {children}
        <SecaoLateral/>
      </body>
    </html>
  );
}
~~~

A página home está na raiz do projeto "page.js" e as páginas de produto e de mercado estão criadas como novas abas que recebem como parâmetro as informações necessárias para carregar o conteúdo desejado (mercado -> nome, produto -> id)

### Página Home
<img width="1909" height="804" alt="image" src="https://github.com/user-attachments/assets/fba6cd7f-854f-4487-8941-91fb23192fa5" />

~~~js
export default function Home()
~~~

Usar features do browser no lado do cliente e importar useState e Link
~~~js
"use client"
import { useState } from 'react';
import Link from 'next/link';
~~~

Alterar o filtro resulta na renderização das estruturas necessárias da página (lista de produtos mais populares)
~~~js
const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
~~~

Busca dados do db através da API e armazena os dados em listas.
~~~js
  const [produtos, setProdutos] = useState([]);
  const [mercados, setMercados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const termoBusca = searchParams.get('busca') || '';
  
  async function carregarDados() {
    try {
      const resProdutos = await fetch("/api/produtos");
      const dataProdutos = await resProdutos.json();
      setProdutos(dataProdutos);

      const resMercados = await fetch("/api/mercados");
      const dataMercados = await resMercados.json();
      setMercados(dataMercados);

      const resCategorias = await fetch("/api/categorias");
      const dataCategorias = await resCategorias.json();
      setCategorias(dataCategorias);
    } catch (erro) {
      console.error("Erro ao carregar os dados do API:", erro);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);
~~~

As outras funções foram apenas migradas e ajustadas para nomeclatura correta, "className" e fechamento de tags como "img"

Retorno da página Home
~~~js
return (
    <>
      <form id="Pesquisa-Mobile" className="pesquisa-mobile">
          <i className="fa fa-search icon"></i>
          <input type="text" placeholder="Pesquisar..."/>
      </form>
      <main className="conteudo">
        <article className="titulo">Produtos Mais Populares</article>
        {gerarCategorias()} 
        <section className="produtos">
            {gerarCardsProdutos("Todos", produtosFiltrados)} 
        </section>
        <article className="titulo">Mercados</article>
        <section className="mercados">
            {gerarCardsMercados()}
        </section>
      </main>
    </>
  );
~~~

Acha melhor preço para cada produto e filtra produtos com base na barra de pesquisa e na categoria ativa.
~~~js
  const produtosComPreco = produtos.map((p) => {
    if (!p.ofertas || p.ofertas.length === 0) return { ...p, preco: 0 };

    const melhorOferta = p.ofertas.reduce((menor, atual) => {
      return atual.preco < menor.preco ? atual : menor;
    }, p.ofertas[0]);
    
    return {
      ...p,
      preco: melhorOferta.preco
    };
  });

  const produtosFiltrados = produtosComPreco.filter(p => {
      const passaCategoria = categoriaAtiva === "Todos" || p.categoria === categoriaAtiva;

      const passaTermo = !termoBusca || p.nome.toLowerCase().includes(termoBusca.toLowerCase());

      return passaCategoria && passaTermo;
    });
~~~

html de retorno da página principal com utilização de componentes.
~~~js
return (
    <>
      <PesquisaMobile termoBusca={termoBusca} />
      <main className={styles.conteudo}>
        <SecaoOfertas categorias={categorias} produtosFiltrados={produtosFiltrados} categoriaAtiva={categoriaAtiva} setCategoriaAtiva={setCategoriaAtiva}/>
        <SecaoMercados mercados={mercados} />
      </main>
    </>
  );
~~~

### Página de Produto
<img width="1909" height="812" alt="image" src="https://github.com/user-attachments/assets/a5efc9e5-9bc1-4433-953b-8c0e518d2e81" />

~~~js
export default function Produto()
~~~

Usar features do browser "use client" e importar Link, parâmetros via URL e contexto da lista do usuário.
~~~js
"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { useLista } from '../../context/ListaContext';
~~~

Verifica id da URL e procura por produto com mesmo id e utiliza contexto da lista para adicionar produtos.
~~~js
const params = useParams();
const idProduto = params.id;

const { adicionarProduto } = useLista();

const [produto, setProduto] = useState(null);
const [carregando, setCarregando] = useState(true);

if (!idProduto) return;
~~~

Retorno da página de produto
~~~js
  return (
    <main className={styles.conteudo}>
      <section className={styles['pagina-detalhes']}>
        {!produto ? (
          <>
            <button className={styles.voltar}>
              <Link href={`/`} className={styles['link-home']}> Home </Link> &gt; Produto não encontrado
            </button>
            <p> Produto Não Encontrado </p>
          </>
        ) : (
          <>
            <button className={styles.voltar}>
              <Link href={`/`} className={styles['link-home']}> Home </Link> &gt; {produto.nome}
            </button>
            
            <h1>{produto.nome}</h1>
            
            <section className={styles['pagina-produto']}>
              <div className={styles['imagem-produto']}>
                <img src={produto.imagem} alt={produto.nome} />
              </div>
              
              <section className={styles['lista-mercados']}>
                {(!produto.ofertas || produto.ofertas.length === 0) ? (
                  <p>Nenhuma oferta encontrada.</p>
                ) : (
                  produto.ofertas.map(oferta => (
                    <article className={styles['produto-mercado']} key={oferta.endereco}>
                      <img src={oferta.mercado} alt={oferta.loja} />
                      <div className={styles['produto-conteudo']}>
                        <p> Endereço: {oferta.endereco} </p>
                        <p className={styles['produto-preco']}> 
                          R$ {oferta.preco.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                      <button className={styles['adicionar-produto']} onClick={() => adicionarProduto({
                          id: produto.id, 
                          nome: produto.nome, 
                          preco: oferta.preco, 
                          imagem: produto.imagem 
                        })}>
                        +
                      </button>
                    </article>
                  ))
                )}
              </section>
            </section>
          </>
        )}
      </section>
    </main>
  );
~~~

### Página de Mercado
<img width="1909" height="808" alt="image" src="https://github.com/user-attachments/assets/e781b52d-78ba-4362-898c-1733db033111" />

~~~js
export default function PaginaMercado()
~~~

Imports semelhantes a página de produto, "use client" e card de produto.
~~~js
"use client";

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import CardProduto from "../../components/cardProduto/CardProduto";
~~~

Criar variável categoriaAtiva para recarregar partes necessárias da página se houver alteração e dados usados na lista de produtos e variável de mercado específico.
~~~js
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const [produtos, setProdutos] = useState([]);
  const [mercado, setMercado] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const params = useParams();
  const idMercado = decodeURIComponent(params.id);
~~~

Acha produtos do mercado específico e filtra pela categoria ativa.
~~~js
const produtosNesteMercado = produtos
    .map(produto => {
      const oferta = produto.ofertas.find(
        o => o.endereco === mercado.endereco
      );

      if (!oferta) return null;

      return {
        ...produto,
        preco: oferta.preco
      };
    })
    .filter(Boolean);
  
  const produtosFiltrados = categoriaAtiva === "Todos" 
    ? produtosNesteMercado 
    : produtosNesteMercado.filter(p => p.categoria === categoriaAtiva);
~~~

Retorno da página de mercado
~~~js
  return (
    <main className={styles.conteudo}>
      <section className={styles['pagina-detalhes']}>

        <button className={styles.voltar}>
          <Link href={`/`} className={styles['link-home']}> Home </Link> &gt; {mercado.nome}
        </button>

        <section className={styles['pagina-mercado']}>

          <section className={styles['info-mercado']}>
            <div className={styles['imagem-mercado']}>
              <img className={styles['pagina-mercado-imagem']} src={mercado.imagem} alt={mercado.nome}  />
            </div>
            <h1>{mercado.nome}</h1>
            <p>{mercado.endereco}</p>
          </section>        

          <section className={styles['produtos-mercado']}>

            <article className={styles.titulo}>
              Ofertas Imperdíveis
            </article>
            <section className={styles['categorias-desktop']}>
              <ul className={styles['categorias-filtros']}>
                { categorias.map(categoria => (
                  <li key={categoria} onClick={() => setCategoriaAtiva(categoria)} className={categoriaAtiva == categoria ? styles['filtro-ativo'] : ""}> {categoria} </li>
                ))}
              </ul>
            </section>
            <section className={styles['categorias-mobile']}>
              <select id="filtros-mobile" value={categoriaAtiva} onChange={(e) => setCategoriaAtiva(e.target.value)}>
                  { categorias.map(categoria => (
                    <option key={categoria} value={categoria}>{categoria}</option>
                  ))}
              </select>
          </section>
            <section className={styles.produtos}>

              {produtosFiltrados.length === 0 ? (
                <p>Nenhum produto encontrado neste mercado</p>
              ) : (
                produtosFiltrados.map(produto => (
                  <CardProduto id={produto.id} nome={produto.nome} preco={produto.preco} imagem={produto.imagem} key={produto.id}/>
                ))
              )}

            </section>

          </section>
        </section>
      </section>
    </main>
  );
~~~

Divisão da aplicação em arquivos separados usando componentização (CardProduto, CardMercado, ...) junto com a separação do CSS em arquivos diferentes utilizando "styles".
<img width="179" height="176" alt="image" src="https://github.com/user-attachments/assets/80118797-e929-4957-bd74-ab8ba0e7b247" />

CardMercado.jsx
~~~js
const CardMercado = ({nome, endereco, imagem}) => {
    return (
        <article className={styles.mercado}>
          <img src={imagem} alt={nome} />
          <p>{nome}</p>
          <p>{endereco}</p>
        </article>
    );
}

export default CardMercado;
~~~

CardProduto.jsx 
~~~js
const CardProduto = ({id, nome, preco, imagem}) => {

    const { adicionarProduto } = useLista();

    return (
        <article className={styles.produto}>
            <Link href={`/produto/${id}`}>
                <img src={imagem}/>
            </Link>
            <section className={styles['info-produto']}>
                <p> {nome} </p>
                <p className={styles.preco}> R$ {preco.toFixed(2).replace('.', ',')} </p>
            </section>
            <button className={styles['adicionar-home']} 
                data-nome={nome}
                data-preco={preco} 
                data-imagem={imagem}
                onClick={() => adicionarProduto({ id, nome, preco, imagem })}>
                    +        
            </button>
        </article>
    );
}

export default CardProduto;
~~~

Header.jsx
~~~js
const Header = () => {

    const pathname = usePathname();
    const router = useRouter();

    const [termoBusca, setTermoBusca] = useState("");

    const dispararBusca = (e) => {
        e.preventDefault();
        if (termoBusca.trim() === '') {
            router.push('/');
        } else {
            router.push(`/?busca=${encodeURIComponent(termoBusca.trim().toLowerCase())}`);
        }
    };

    return (
        <header className={styles.header}>
            <Link href={'/'} className={styles['link-logo']}>
                <h3 className={styles.titulo}> Lista Barata </h3>
            </Link>
            <Link href={'/contatos'} className={styles['link-logo']}>
                <h3 className={styles.titulo}> Contatos </h3>
            </Link>
            {pathname === '/' && (
                <form id="Pesquisa" className={styles['pesquisa-desktop']} onSubmit={dispararBusca}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={styles['search-icon']}/>
                    <input type="text" placeholder="Pesquisar..." className={styles['busca']} onChange={(e) => setTermoBusca(e.target.value)}/>
                </form>
            )}
        </header>
    );
};

export default Header;
~~~

PesquisaMobile.jsx
~~~js
const PesquisaMobile = ({ termoBusca }) => {

    const [buscaMobile, setBuscaMobile] = useState(termoBusca);
    const router = useRouter();
    
    const dispararBuscaMobile = (e) => {
        e.preventDefault();
        if (buscaMobile.trim() === '') {
            router.push('/');
        } else {
            router.push(`/?busca=${encodeURIComponent(buscaMobile.trim().toLowerCase())}`);
        }
    };

    useEffect(() => {
        setBuscaMobile(termoBusca);
    }, [termoBusca]);

    return (
        <form id="Pesquisa-Mobile" className={styles['pesquisa-mobile']} onSubmit={dispararBuscaMobile}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className={styles['search-icon-mobile']}/>
            <input type="text" placeholder="Pesquisar..." className={styles['busca-mobile']} onChange={(e) => setBuscaMobile(e.target.value)}/>
        </form>
    );
};

export default PesquisaMobile;
~~~

~~~js

~~~

Adição da barra lateral da Lista e alterações no css para sua estilização:
SecaoLateral.jsx
~~~js
const SecaoLateral = () => {

    const [estaAberto, setEstaAberto] = useState(false);

    const { minhaLista, alterarQuantidade, calcularTotal } = useLista();

    const toggleLista = () => {
        setEstaAberto(!estaAberto);
    };

    return (
        <aside className={`${styles['secao-lateral']} ${estaAberto ? styles.aberto : ''}`}>
            <button className={styles['toggle-lista']} onClick={toggleLista}> 
                <i className="fa-solid fa-chevron-left"></i> 
                Lista
            </button>
            <section className={styles.lista}>
                <ul className={styles['lista-itens']}>
                    {minhaLista.length === 0 ? (
                        <p className={styles.vazio}>Adicione Itens à Lista...</p>
                    ) : (
                        minhaLista.map((produto, indice) => (
                            <li key={indice} className={styles['produto-lista']}>
                                <Image src={produto.imagem} alt={produto.nome} width={100} height={100}/>
                                <article className={styles['produto-info-lista']}>
                                    <p> {produto.nome} </p>
                                    <p> R$ {(produto.preco * produto.quantidade).toFixed(2).replace('.', ',')} </p>
                                </article>
                                <section className={styles['controle-quantidade']}>
                                    <button onClick={() => alterarQuantidade(produto.id, 1)}>+</button>
                                    <p> {produto.quantidade} </p>
                                    <button onClick={() => alterarQuantidade(produto.id, -1)}>-</button>
                                </section>
                            </li>
                        ))
                    )}
                </ul>
                <footer className={styles['rodape-lista']}>
                    <p className={styles['preco-total']}>
                        Total: R$ {calcularTotal().toFixed(2).replace('.', ',')}
                    </p>
                </footer>
            </section>
        </aside>
    );
};

export default SecaoLateral;
~~~

SecaoMercados.jsx
~~~js
const SecaoMercados = ({ mercados }) => {

    return (
        <>
            <article className={styles.titulo}>Mercados</article>
            <section className={styles.mercados}>
                { mercados.length === 0 ? (
                    <p>Nenhum mercado encontrado.</p>
                ) : ( 
                    mercados.map(mercado => (
                    <Link href={`/mercado/${mercado.id}`} key={mercado.endereco} className={styles['link-mercado']}>
                    <CardMercado nome={mercado.nome} endereco={mercado.endereco} imagem={mercado.imagem}/>
                    </Link>
                ))
                )}
            </section>
        </>
    );
};

export default SecaoMercados;
~~~

SecaoOfertas
~~~js
const SecaoOfertas = ({ categorias, produtosFiltrados, categoriaAtiva, setCategoriaAtiva }) => {

    return (
        <section className={styles['secao-ofertas']}>
            <article className={`${styles.titulo} ${styles.branco}`}>Ofertas Imperdíveis</article>
            <section className={styles['categorias-desktop']}>
                <ul className={styles['categorias-filtros']}>
                    { categorias.map(categoria => (
                        <li key={categoria} onClick={() => setCategoriaAtiva(categoria)} className={categoriaAtiva === categoria ? styles['filtro-ativo'] : ""}> {categoria} </li>
                    ))}
                </ul>
            </section>
            <section className={styles['categorias-mobile']}>
                <select id="filtros-mobile" value={categoriaAtiva} onChange={(e) => setCategoriaAtiva(e.target.value)}>
                    { categorias.map(categoria => (
                        <option key={categoria} value={categoria}>{categoria}</option>
                    ))}
                </select>
            </section>
            <section className={styles.produtos}>
                { produtosFiltrados.length === 0 ? (
                    <p>Nenhum produto encontrado nesta categoria.</p>
                ) : ( 
                    produtosFiltrados.map(produto => ( 
                        <CardProduto id={produto.id} nome={produto.nome} preco={produto.preco} imagem={produto.imagem} key={produto.id}/>
                    ))
                )}
            </section>
        </section>
    );
};

export default SecaoOfertas;
~~~

Estrutura da pasta de APIs
<img width="187" height="239" alt="image" src="https://github.com/user-attachments/assets/8583cf66-a1ef-4d86-93fb-1faebecf0675" />

API de categorias
~~~js
// GET
export async function GET() {
  return Response.json(db.categorias);
}
~~~

API de mercados (geral)
~~~js
// GET
export async function GET() {
  return Response.json(db.mercados);
}
~~~

API de mercado (específico)
~~~js
// GET por ID
export async function GET(request, context) {
  const { id } = await context.params;
  const numericId = Number(id);

  const mercado = db.mercados.find((m) => m.id === numericId);

  if (!mercado) {
    return new Response("Produto não encontrado", { status: 404 });
  }

  return Response.json(mercado);
}
~~~

API de produtos (geral)
~~~js
// GET
export async function GET() {
  return Response.json(db.produtos);
}
~~~

API de produto (específico)
~~~js
// GET por ID
export async function GET(request, context) {
  const { id } = await context.params;
  const numericId = Number(id);

  const produto = db.produtos.find((p) => p.id === numericId);

  if (!produto) {
    return new Response("Produto não encontrado", { status: 404 });
  }

  return Response.json(produto);
}
~~~

Chamando API de produtos, mercados e categorias na página inicial
~~~js
  async function carregarDados() {
    try {
      const resProdutos = await fetch("/api/produtos");
      const dataProdutos = await resProdutos.json();
      setProdutos(dataProdutos);

      const resMercados = await fetch("/api/mercados");
      const dataMercados = await resMercados.json();
      setMercados(dataMercados);

      const resCategorias = await fetch("/api/categorias");
      const dataCategorias = await resCategorias.json();
      setCategorias(dataCategorias);
    } catch (erro) {
      console.error("Erro ao carregar os dados do API:", erro);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);
~~~
