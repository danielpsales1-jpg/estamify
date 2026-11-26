
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

const WHATSAPP = "5511927351844";

const linkWhatsApp = (mensagem) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;

const CATEGORIAS = [
  "Todos",
  "Linha Básica",
  "Infantil & Feminino",
  "Corporativo & Uniformes",
  "Esportivo & Inverno",
];

const CORES = [
  { nome: "Branco", valor: "#ffffff" },
  { nome: "Preto", valor: "#171717" },
  { nome: "Vermelho", valor: "#c62828" },
  { nome: "Azul-marinho", valor: "#172b4d" },
  { nome: "Azul", valor: "#2876bd" },
  { nome: "Verde", valor: "#276749" },
  { nome: "Amarelo", valor: "#f2cc45" },
  { nome: "Cinza", valor: "#888888" },
  { nome: "Bege", valor: "#d8c3a5" },
  { nome: "Rosa", valor: "#e7a9bb" },
  { nome: "Laranja", valor: "#e87528" },
];

function ImagemProduto({ basePath, alt, loading, cor = "#ffffff" }) {
  const extensoes = [".png", ".jpg", ".jpeg", ".webp"];
  const [extIndex, setExtIndex] = useState(0);
  const [esgotou, setEsgotou] = useState(false);

  useEffect(() => {
    setExtIndex(0);
    setEsgotou(false);
  }, [basePath]);

  const handleError = () => {
    if (extIndex + 1 < extensoes.length) {
      setExtIndex((prev) => prev + 1);
    } else {
      setEsgotou(true);
    }
  };

  if (esgotou) {
    return (
      <span className="image-unavailable">
        Imagem não encontrada: {basePath}
      </span>
    );
  }

  const imagemAtual = `${basePath}${extensoes[extIndex]}`;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <img
        src={imagemAtual}
        alt={alt}
        loading={loading}
        onError={handleError}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "center",
          display: "block",
        }}
      />

      {cor !== "#ffffff" && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: cor,
            mixBlendMode: "multiply",
            pointerEvents: "none",
            WebkitMaskImage: `url("${imagemAtual}")`,
            maskImage: `url("${imagemAtual}")`,
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        />
      )}
    </div>
  );
}

const VISTAS_PADRAO = (pasta) => [
  { rotulo: "Frente", src: `${pasta}/frente` },
  { rotulo: "Costas", src: `${pasta}/costas` },
  { rotulo: "Manga Dir.", src: `${pasta}/manga-direita` },
  { rotulo: "Manga Esq.", src: `${pasta}/manga-esquerda` },
];

const PRODUTOS = [
  {
    id: "camisetas",
    nome: "Camisetas",
    numero: "01",
    categoria: "Linha Básica",
    descricao:
      "Camisetas personalizadas para marcas, comércios e empresas. Ótimo caimento e base ideal para Silk Screen ou DTF.",
    vistas: VISTAS_PADRAO("/camisetas"),
  },
  {
    id: "camisetas-infantis",
    nome: "Camisetas infantis",
    numero: "02",
    categoria: "Infantil & Feminino",
    descricao:
      "Modelos confortáveis e resistentes para eventos escolares, ações promocionais e personalização infantil.",
    vistas: VISTAS_PADRAO("/infantil"),
  },
  {
    id: "baby-look",
    nome: "Baby Look",
    numero: "03",
    categoria: "Infantil & Feminino",
    descricao:
      "Modelagem feminina acinturada para marcas autorais, equipes de atendimento e negócios.",
    vistas: VISTAS_PADRAO("/babylook"),
  },
  {
    id: "manga-longa",
    nome: "Manga longa",
    numero: "04",
    categoria: "Linha Básica",
    descricao:
      "Peças versáteis para composições de streetwear, marcas e equipes que buscam um visual mais encorpado.",
    vistas: VISTAS_PADRAO("/manga-longa"),
  },
  {
    id: "moletom-gorro",
    nome: "Moletom com gorro",
    numero: "05",
    categoria: "Esportivo & Inverno",
    descricao:
      "Conforto térmico com capuz para drops de marcas, coleções sazonais e uniformes de frio.",
    vistas: VISTAS_PADRAO("/moletom-gorro"),
  },
  {
    id: "moletom-sem-gorro",
    nome: "Moletom sem gorro",
    numero: "06",
    categoria: "Esportivo & Inverno",
    descricao:
      "Modelagem gola careca encorpada para marcas, eventos e dias mais frios.",
    vistas: VISTAS_PADRAO("/moletom-sem-gorro"),
  },
];

// Tabelas de referência individuais por produto.
// As medidas precisam ser conferidas com o fornecedor antes de serem
// consideradas medidas oficiais.

const MEDIDAS_POR_PRODUTO = {
  camisetas: [
    { tamanho: "P", largura: "51 cm", comprimento: "70 cm" },
    { tamanho: "M", largura: "53 cm", comprimento: "72,5 cm" },
    { tamanho: "G", largura: "55 cm", comprimento: "75 cm" },
    { tamanho: "GG", largura: "57 cm", comprimento: "77,5 cm" },
    { tamanho: "G1", largura: "59 cm", comprimento: "80 cm" },
  ],

  "camisetas-infantis": [
    { tamanho: "2", largura: "30 cm", comprimento: "40 cm" },
    { tamanho: "4", largura: "33 cm", comprimento: "44 cm" },
    { tamanho: "6", largura: "35 cm", comprimento: "48 cm" },
    { tamanho: "8", largura: "37 cm", comprimento: "52 cm" },
    { tamanho: "10", largura: "40 cm", comprimento: "56 cm" },
    { tamanho: "12", largura: "43 cm", comprimento: "60 cm" },
    { tamanho: "14", largura: "46 cm", comprimento: "64 cm" },
    { tamanho: "16", largura: "49 cm", comprimento: "68 cm" },
  ],

  "baby-look": [
    { tamanho: "P", largura: "42 cm", comprimento: "56 cm" },
    { tamanho: "M", largura: "48 cm", comprimento: "60 cm" },
    { tamanho: "G", largura: "51 cm", comprimento: "62 cm" },
    { tamanho: "GG", largura: "54 cm", comprimento: "64 cm" },
    { tamanho: "G1", largura: "57 cm", comprimento: "66 cm" },
  ],

  "manga-longa": [
    { tamanho: "P", largura: "51 cm", comprimento: "70 cm" },
    { tamanho: "M", largura: "53 cm", comprimento: "72,5 cm" },
    { tamanho: "G", largura: "55 cm", comprimento: "75 cm" },
    { tamanho: "GG", largura: "57 cm", comprimento: "77,5 cm" },
    { tamanho: "G1", largura: "59 cm", comprimento: "80 cm" },
  ],

  "moletom-gorro": [
    { tamanho: "P", largura: "58 cm", comprimento: "65 cm" },
    { tamanho: "M", largura: "60 cm", comprimento: "70 cm" },
    { tamanho: "G", largura: "62 cm", comprimento: "73 cm" },
    { tamanho: "GG", largura: "64 cm", comprimento: "75 cm" },
    { tamanho: "G1", largura: "66 cm", comprimento: "77 cm" },
  ],

  "moletom-sem-gorro": [
    { tamanho: "P", largura: "58 cm", comprimento: "68 cm" },
    { tamanho: "M", largura: "60 cm", comprimento: "73 cm" },
    { tamanho: "G", largura: "62 cm", comprimento: "75 cm" },
    { tamanho: "GG", largura: "64 cm", comprimento: "77 cm" },
    { tamanho: "G1", largura: "66 cm", comprimento: "79 cm" },
  ],
};

const TECNICAS = [
  {
    numero: "01",
    nome: "SILK SCREEN",
    titulo: "Silk Screen",
    descricao:
      "Técnica clássica de estamparia com excelente rendimento em tiragens, ótima durabilidade e padrão firme para marcas e uniformes.",
    pontos: [
      "Ideal para produções em quantidade",
      "Alta durabilidade nas lavagens",
      "Acabamento limpo e profissional",
    ],
  },
  {
    numero: "02",
    nome: "DTF",
    titulo: "Impressão DTF",
    descricao:
      "Solução versátil para artes com riqueza de detalhes, gradientes e múltiplas cores, mantendo boa definição de traço.",
    pontos: [
      "Cores vivas e sem limite de tons",
      "Detalhes finos e precisos",
      "Excelente versatilidade de aplicação",
    ],
  },
];

const BENEFICIOS = [
  {
    num: "01",
    titulo: "Personalização sob medida",
    texto:
      "Alinhamos estampa, aplicação e proposta visual ao posicionamento da sua marca.",
  },
  {
    num: "02",
    titulo: "Atendimento direto",
    texto:
      "Fale sem burocracia no WhatsApp para tirar dúvidas e validar seu pedido.",
  },
  {
    num: "03",
    titulo: "Prazo transparente",
    texto:
      "Produção organizada com estimativa clara informada já na etapa do orçamento.",
  },
  {
    num: "04",
    titulo: "Foco em marcas e empresas",
    texto:
      "Peças pensadas para negócios, comércios, eventos e equipes que querem se destacar.",
  },
];

const ETAPAS = [
  {
    num: "01",
    titulo: "Converse com a gente",
    texto:
      "Informe o modelo desejado, a quantidade (a partir de 20 peças) e sua ideia.",
  },
  {
    num: "02",
    titulo: "Alinhamento do projeto",
    texto:
      "Definimos arte, tamanhos, cores e a técnica mais indicada para o seu objetivo.",
  },
  {
    num: "03",
    titulo: "Produção",
    texto:
      "Após a aprovação final, iniciamos a produção com atenção aos detalhes.",
  },
  {
    num: "04",
    titulo: "Retirada ou entrega",
    texto:
      "Acompanhe o andamento e receba conforme combinado no atendimento.",
  },
];

function App() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [produtoMedidas, setProdutoMedidas] = useState(null);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("M");
  const [vistasAtivas, setVistasAtivas] = useState({});
  const [coresAtivas, setCoresAtivas] = useState({});
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const [busca, setBusca] = useState("");
  const [progressoScroll, setProgressoScroll] = useState(0);

  const heroRef = useRef(null);

  const selecionarVista = useCallback((produtoId, indice) => {
    setVistasAtivas((anterior) => ({
      ...anterior,
      [produtoId]: indice,
    }));
  }, []);

  const abrirModalMedidas = useCallback((produto) => {
    const medidas = MEDIDAS_POR_PRODUTO[produto.id] || [];

    setTamanhoSelecionado(
      medidas.some((item) => item.tamanho === "M")
        ? "M"
        : medidas[0]?.tamanho || ""
    );

    setProdutoMedidas(produto);
  }, []);

  const produtosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return PRODUTOS.filter((item) => {
      const bateCategoria =
        categoriaAtiva === "Todos" || item.categoria === categoriaAtiva;

      const bateBusca =
        !termo ||
        item.nome.toLowerCase().includes(termo) ||
        item.descricao.toLowerCase().includes(termo) ||
        item.categoria.toLowerCase().includes(termo);

      return bateCategoria && bateBusca;
    });
  }, [categoriaAtiva, busca]);

  useEffect(() => {
    const atualizarProgresso = () => {
      const alturaTotal =
        document.documentElement.scrollHeight - window.innerHeight;

      if (alturaTotal <= 0) {
        setProgressoScroll(0);
        return;
      }

      const atual = Math.min(
        100,
        Math.max(0, (window.scrollY / alturaTotal) * 100)
      );

      setProgressoScroll(atual);
    };

    atualizarProgresso();
    window.addEventListener("scroll", atualizarProgresso, { passive: true });

    return () => window.removeEventListener("scroll", atualizarProgresso);
  }, []);

  useEffect(() => {
    const elementos = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      elementos.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );

    elementos.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [produtosFiltrados]);

  useEffect(() => {
    if (!produtoMedidas) {
      document.body.classList.remove("modal-open");
      return;
    }

    document.body.classList.add("modal-open");

    const aoPressionarTecla = (evento) => {
      if (evento.key === "Escape") setProdutoMedidas(null);
    };

    window.addEventListener("keydown", aoPressionarTecla);

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", aoPressionarTecla);
    };
  }, [produtoMedidas]);

  const handleHeroMouseMove = (e) => {
    if (!heroRef.current) return;

    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    heroRef.current.style.setProperty("--spot-x", `${x.toFixed(1)}%`);
    heroRef.current.style.setProperty("--spot-y", `${y.toFixed(1)}%`);
  };

  const fecharMenu = () => setMenuAberto(false);

  return (
    <>
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${progressoScroll / 100})` }}
        aria-hidden="true"
      />

      <header className="navbar">
        <a href="#inicio" className="logo" onClick={fecharMenu}>
          ESTA<span>MIFY</span>
          <span className="logo-tag">Sua arte • Seu estilo</span>
        </a>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuAberto((prev) => !prev)}
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
          aria-controls="menu-principal"
        >
          {menuAberto ? "✕" : "☰"}
        </button>

        <nav
          id="menu-principal"
          className={menuAberto ? "nav-links open" : "nav-links"}
          aria-label="Navegação principal"
        >
          <a href="#inicio" onClick={fecharMenu}>Início</a>
          <a href="#produtos" onClick={fecharMenu}>Produtos</a>
          <a href="#tecnicas" onClick={fecharMenu}>Estamparia</a>
          <a href="#sobre" onClick={fecharMenu}>Sobre</a>
          <a href="#contato" className="nav-contact" onClick={fecharMenu}>
            Fale conosco
          </a>
        </nav>
      </header>

      <main>
        <section
          className="hero"
          id="inicio"
          ref={heroRef}
          onMouseMove={handleHeroMouseMove}
        >
          <div className="hero-content">
            <span className="eyebrow">
              SILK SCREEN • DTF • IDENTIDADE VISUAL
            </span>

            <h1>
              Sua marca.
              <br />
              Sua identidade.
              <br />
              <span>Sua estampa.</span>
            </h1>

            <p>
              Transformamos ideias em peças personalizadas para marcas,
              comércios e empresas que buscam presença real no dia a dia.
            </p>

            <div className="hero-actions">
              <a
                className="button button-gold"
                href={linkWhatsApp(
                  "Olá! Quero solicitar um orçamento com a ESTAMIFY (a partir de 20 peças)."
                )}
                target="_blank"
                rel="noreferrer"
              >
                Solicitar orçamento <span aria-hidden="true">↗</span>
              </a>

              <a className="button button-outline" href="#produtos">
                Conhecer produtos
              </a>
            </div>

            <div className="hero-meta">
              <span className="hero-meta-item">
                <span className="dot-gold" aria-hidden="true" />
                Pedido mínimo de 20 peças
              </span>

              <span className="hero-meta-item">
                <span className="dot-gold" aria-hidden="true" />
                Prazo médio de 3 a 4 dias úteis*
              </span>
            </div>
          </div>

          <div className="hero-visual">
            <img
              src="/estamify-camisetas-hero.png"
              alt="Camisetas personalizadas ESTAMIFY, frente e costas"
              loading="eager"
            />
          </div>
        </section>

        <section className="intro-section reveal" id="sobre">
          <span className="eyebrow">QUEM SOMOS</span>
          <h2>Personalização que dá forma à sua identidade.</h2>

          <p>
            A ESTAMIFY trabalha com personalização de camisetas, baby looks,
            polos, moletons, dry fit e uniformes. Atendemos marcas, comércios
            e empresas que desejam comunicar sua identidade em cada peça.
          </p>
        </section>

        <section className="products-section reveal" id="produtos">
          <div className="section-heading">
            <div>
              <span className="eyebrow">NOSSO CATÁLOGO</span>
              <h2>Encontre sua peça.</h2>
            </div>

            <p>
              Filtre por categoria ou pesquise o modelo ideal, alterne entre
              frente, costas e mangas e solicite seu orçamento no WhatsApp.
            </p>
          </div>

          <div className="catalog-toolbar">
            <div
              className="filter-tabs"
              role="tablist"
              aria-label="Filtrar produtos por categoria"
            >
              {CATEGORIAS.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={categoriaAtiva === cat}
                  className={
                    categoriaAtiva === cat ? "filter-tab active" : "filter-tab"
                  }
                  onClick={() => setCategoriaAtiva(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="search-box">
              <input
                type="search"
                className="search-input"
                placeholder="Buscar peça (ex: polo, moletom, dry fit)..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                aria-label="Buscar produto no catálogo"
              />

              {busca && (
                <button
                  type="button"
                  className="search-clear"
                  onClick={() => setBusca("")}
                  aria-label="Limpar busca"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {produtosFiltrados.length === 0 ? (
            <div className="empty-catalog">
              <p>
                Nenhuma peça encontrada para &ldquo;{busca}&rdquo; na
                categoria <strong>{categoriaAtiva}</strong>.
              </p>

              <button
                type="button"
                className="button button-outline"
                onClick={() => {
                  setCategoriaAtiva("Todos");
                  setBusca("");
                }}
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {produtosFiltrados.map((produto, idx) => {
                const indiceVista = vistasAtivas[produto.id] ?? 0;
                const vistaAtual = produto.vistas[indiceVista];
                const corAtual = coresAtivas[produto.id] ?? "#ffffff";

                return (
                  <article className="product-card" key={produto.id}>
                    <div
                      className="product-gallery-main"
                      style={{
                        position: "relative",
                        height: "300px",
                        backgroundColor: "#f5f3ef",
                        padding: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      <ImagemProduto
                        basePath={vistaAtual.src}
                        alt={`${produto.nome} - ${vistaAtual.rotulo}`}
                        loading={idx < 2 ? "eager" : "lazy"}
                        cor={corAtual}
                      />

                      <span className="product-number">{produto.numero}</span>

                      <span className="gallery-label">
                        {vistaAtual.rotulo.toUpperCase()}
                      </span>
                    </div>

                    <div
                      className="product-thumbs"
                      role="group"
                      aria-label={`Vistas de ${produto.nome}`}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                        gap: "8px",
                        padding: "14px 18px 6px",
                        margin: 0,
                        backgroundColor: "#171717",
                      }}
                    >
                      {produto.vistas.map((vista, indice) => {
                        const ativa = indiceVista === indice;

                        return (
                          <button
                            key={vista.rotulo}
                            type="button"
                            aria-pressed={ativa}
                            className={ativa ? "thumb-btn active" : "thumb-btn"}
                            onClick={() => selecionarVista(produto.id, indice)}
                          >
                            {vista.rotulo}
                          </button>
                        );
                      })}
                    </div>

                    <div
                      className="product-colors"
                      style={{
                        backgroundColor: "#171717",
                        padding: "14px 18px",
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          color: "#c9c1b5",
                          fontSize: "0.75rem",
                          width: "100%",
                          marginBottom: "2px",
                        }}
                      >
                        ESCOLHA A COR
                      </span>

                      {CORES.map((item) => {
                        const selecionada = corAtual === item.valor;

                        return (
                          <button
                            key={item.nome}
                            type="button"
                            title={item.nome}
                            aria-label={`Selecionar cor ${item.nome}`}
                            aria-pressed={selecionada}
                            onClick={() =>
                              setCoresAtivas((anterior) => ({
                                ...anterior,
                                [produto.id]: item.valor,
                              }))
                            }
                            style={{
                              width: "27px",
                              height: "27px",
                              borderRadius: "50%",
                              backgroundColor: item.valor,
                              border: selecionada
                                ? "3px solid #c9a66b"
                                : "2px solid #777",
                              outline: selecionada
                                ? "2px solid #c9a66b"
                                : "none",
                              outlineOffset: "2px",
                              cursor: "pointer",
                              padding: 0,
                              flexShrink: 0,
                            }}
                          />
                        );
                      })}

                      <span
                        style={{
                          color: "#c9c1b5",
                          fontSize: "0.75rem",
                          marginLeft: "4px",
                        }}
                      >
                        {CORES.find((item) => item.valor === corAtual)?.nome}
                      </span>
                    </div>

                    <div className="product-content">
                      <span className="product-category">
                        {produto.categoria} • {produto.numero}
                      </span>

                      <h3>{produto.nome}</h3>
                      <p>{produto.descricao}</p>

                      <div className="product-actions">
                        <button
                          type="button"
                          className="text-button"
                          onClick={() => abrirModalMedidas(produto)}
                        >
                          Ver medidas <span aria-hidden="true">↗</span>
                        </button>

                        <a
                          className="product-whatsapp"
                          href={linkWhatsApp(
                            `Olá! Tenho interesse em *${produto.nome}* (mín. 20 peças). Gostaria de solicitar um orçamento.`
                          )}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Consultar <span aria-hidden="true">↗</span>
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <p className="catalog-note">
            Imagens ilustrativas. Cores, gramaturas, modelos e disponibilidade
            devem ser confirmados no atendimento.
          </p>
        </section>

        <section className="techniques-section reveal" id="tecnicas">
          <div className="section-heading">
            <div>
              <span className="eyebrow">NOSSA ESTAMPARIA</span>
              <h2>Tecnologia e acabamento.</h2>
            </div>

            <p>
              Indicamos a técnica ideal de acordo com a sua arte, tecido e
              volume de produção.
            </p>
          </div>

          <div className="technique-grid">
            {TECNICAS.map((tecnica) => (
              <article className="technique-card" key={tecnica.nome}>
                <span className="tech-number">{tecnica.numero}</span>
                <span className="tech-label">{tecnica.nome}</span>
                <h3>{tecnica.titulo}</h3>
                <p>{tecnica.descricao}</p>

                <ul>
                  {tecnica.pontos.map((ponto) => (
                    <li key={ponto}>{ponto}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="benefits-section reveal">
          <span className="eyebrow">POR QUE ESTAMIFY?</span>
          <h2>Seu projeto merece atenção em cada detalhe.</h2>

          <div className="benefits-grid">
            {BENEFICIOS.map((item) => (
              <div className="benefit" key={item.num}>
                <span>{item.num}</span>
                <h3>{item.titulo}</h3>
                <p>{item.texto}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="process-section reveal">
          <span className="eyebrow">COMO FUNCIONA</span>
          <h2>Do primeiro contato à peça pronta.</h2>

          <div className="process-grid">
            {ETAPAS.map((etapa) => (
              <div key={etapa.num}>
                <span>{etapa.num}</span>
                <h3>{etapa.titulo}</h3>
                <p>{etapa.texto}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="order-section reveal">
          <div>
            <span className="eyebrow">INFORMAÇÕES IMPORTANTES</span>
            <h2>Vamos tirar sua ideia do papel?</h2>

            <p>
              Trabalhamos com <strong>pedido mínimo de 20 peças</strong>. O
              prazo estimado de produção é de <strong>3 a 4 dias</strong>,
              sujeito à confirmação conforme o modelo, quantidade e detalhes
              do pedido.
            </p>
          </div>

          <a
            className="button button-gold"
            href={linkWhatsApp(
              "Olá! Quero conversar sobre um pedido (mínimo 20 peças) para minha marca/empresa."
            )}
            target="_blank"
            rel="noreferrer"
          >
            Conversar pelo WhatsApp <span aria-hidden="true">↗</span>
          </a>
        </section>

        <section className="contact-section reveal" id="contato">
          <span className="eyebrow">FALE COM A ESTAMIFY</span>
          <h2>Seu próximo projeto começa aqui.</h2>

          <p>
            Fale com nossa equipe para consultar modelos, tamanhos, técnicas
            de estampa, quantidades e orçamento personalizado.
          </p>

          <a
            className="button button-gold"
            href={linkWhatsApp(
              "Olá! Vim pelo site da ESTAMIFY e gostaria de solicitar um orçamento."
            )}
            target="_blank"
            rel="noreferrer"
          >
            <span>WhatsApp</span> <span aria-hidden="true">↗</span>
          </a>
        </section>
      </main>

      <footer className="footer">
        <a href="#inicio" className="logo">
          ESTA<span>MIFY</span>
        </a>

        <p>
          SUA ARTE. SEU ESTILO. • Personalização que representa sua marca.
        </p>

        <span>
          © {new Date().getFullYear()} ESTAMIFY. Todos os direitos reservados.
        </span>
      </footer>

      <a
        className="floating-whatsapp"
        href={linkWhatsApp("Olá! Gostaria de falar com a ESTAMIFY.")}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com a ESTAMIFY pelo WhatsApp"
      >
        WhatsApp <span aria-hidden="true">↗</span>
      </a>

      {produtoMedidas && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="titulo-modal-medidas"
          onClick={() => setProdutoMedidas(null)}
        >
          <div
            className="measure-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setProdutoMedidas(null)}
              aria-label="Fechar guia de tamanhos"
            >
              ×
            </button>

            <span className="eyebrow">GUIA DE TAMANHOS</span>

            <h2 id="titulo-modal-medidas">
              {produtoMedidas.nome}
            </h2>

            <p className="modal-description">
              Tabela de referência (largura × comprimento). As medidas podem
              variar conforme o tecido, corte e modelagem. Selecione um tamanho
              para consultar pelo WhatsApp:
            </p>

            <div
              className="size-selector"
              role="group"
              aria-label="Selecionar tamanho"
            >
              {MEDIDAS_POR_PRODUTO[produtoMedidas.id].map((m) => (
                <button
                  key={m.tamanho}
                  type="button"
                  className={
                    tamanhoSelecionado === m.tamanho
                      ? "size-pill active"
                      : "size-pill"
                  }
                  onClick={() => setTamanhoSelecionado(m.tamanho)}
                >
                  {m.tamanho}
                </button>
              ))}
            </div>

            <div className="measure-table-wrap">
              <table className="measure-table">
                <thead>
                  <tr>
                    <th>Tamanho</th>
                    <th>Largura</th>
                    <th>Comprimento</th>
                  </tr>
                </thead>

                <tbody>
                  {MEDIDAS_POR_PRODUTO[produtoMedidas.id].map((item) => (
                    <tr
                      key={item.tamanho}
                      className={
                        tamanhoSelecionado === item.tamanho
                          ? "selected-row"
                          : undefined
                      }
                      onClick={() => setTamanhoSelecionado(item.tamanho)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>
                        <strong>{item.tamanho}</strong>
                      </td>
                      <td>{item.largura}</td>
                      <td>{item.comprimento}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <a
              className="button button-gold modal-cta"
              href={linkWhatsApp(
                `Olá! Gostaria de confirmar as medidas de *${produtoMedidas.nome}*, tamanho *${tamanhoSelecionado}* (mín. 20 peças).`
              )}
              target="_blank"
              rel="noreferrer"
            >
              Confirmar {tamanhoSelecionado} no WhatsApp{" "}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
