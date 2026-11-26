// =========================================================
// Carrossel.jsx - carrossel de slides de um estudo de caso
// Como funciona:
// - os slides ficam numa lista que rola para o lado (CSS scroll-snap)
// - as setas vão para o slide anterior / próximo
// - dá para arrastar com o mouse, usar as setas do teclado ou deslizar no celular
// - clicar num slide abre o slide ampliado (Lightbox)
// Props: dados (um item de "carrosseis" do dados.js) e abrirLightbox (função do App)
// =========================================================

import React from "react";
export default function Carrossel(props) {
  const dados = props.dados;
  const total = dados.imagens.length;

  const [indice, setIndice] = React.useState(0); // slide atual (começa no 0)
  const [batida, setBatida] = React.useState(""); // classe da animação de "bater no fim"

  const trilhoRef = React.useRef(null); // a <ul> que rola
  const indiceRef = React.useRef(0); // cópia do índice para usar dentro dos eventos
  const toqueRef = React.useRef(null); // onde o clique/toque começou
  const arrasteRef = React.useRef(null); // dados do arraste com o mouse
  const timerRef = React.useRef(0); // timer da animação de "bater no fim"

  // atualiza o índice (state + ref)
  function atualizar(i) {
    indiceRef.current = i;
    setIndice(i);
  }

  // vai para o slide i, rolando o trilho
  function irPara(i) {
    i = Math.max(0, Math.min(total - 1, i));
    const trilho = trilhoRef.current;
    const semAnimacao = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    trilho.scrollTo({ left: i * trilho.clientWidth, behavior: semAnimacao ? "auto" : "smooth" });
    atualizar(i);
  }

  // animação de "não tem mais slide" quando clica na seta desativada
  function bater(classe) {
    setBatida("");
    requestAnimationFrame(() => setBatida(classe));
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setBatida(""), 320);
  }

  function anterior() {
    if (indice === 0) bater("x-bump-start");
    else irPara(indice - 1);
  }

  function proximo() {
    if (indice === total - 1) bater("x-bump-end");
    else irPara(indice + 1);
  }

  // Eventos que ficam ligados enquanto o carrossel existe
  React.useEffect(() => {
    const trilho = trilhoRef.current;

    // quando o usuário rola o trilho (dedo, trackpad), descobre o slide atual
    let quadro = 0;
    function aoRolar() {
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(() => {
        const i = Math.round(trilho.scrollLeft / trilho.clientWidth);
        if (i !== indiceRef.current) atualizar(i);
      });
    }

    // se a janela mudar de tamanho, mantém o mesmo slide na tela
    function aoRedimensionar() {
      trilho.scrollLeft = indiceRef.current * trilho.clientWidth;
    }

    // arrastar com o mouse
    function aoMoverMouse(e) {
      const arraste = arrasteRef.current;
      if (arraste) trilho.scrollLeft = arraste.left - (e.clientX - arraste.x);
    }
    function aoSoltarMouse(e) {
      const arraste = arrasteRef.current;
      if (!arraste) return;
      arrasteRef.current = null;
      const distancia = e.clientX - arraste.x;
      trilho.style.scrollSnapType = "";
      trilho.style.scrollBehavior = "";
      // arrastou mais de 40px? vai para o vizinho. Senão volta para o mesmo
      if (Math.abs(distancia) > 40) irPara(arraste.inicio + (distancia < 0 ? 1 : -1));
      else irPara(arraste.inicio);
    }

    trilho.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRedimensionar);
    window.addEventListener("pointermove", aoMoverMouse);
    window.addEventListener("pointerup", aoSoltarMouse);

    return () => {
      trilho.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRedimensionar);
      window.removeEventListener("pointermove", aoMoverMouse);
      window.removeEventListener("pointerup", aoSoltarMouse);
    };
  }, []);

  // começou um clique / toque no trilho
  function aoApertar(e) {
    const trilho = trilhoRef.current;
    toqueRef.current = { x: e.clientX, y: e.clientY, left: trilho.scrollLeft };
    if (e.pointerType === "mouse") {
      arrasteRef.current = { x: e.clientX, left: trilho.scrollLeft, inicio: indiceRef.current };
      trilho.style.scrollSnapType = "none";
      trilho.style.scrollBehavior = "auto";
    }
  }

  // lista de imagens no formato que o Lightbox usa
  const imagens = dados.imagens.map((src, i) => ({
    src: src,
    alt: dados.nome + ", slide " + (i + 1) + " de " + total,
  }));

  // quando o lightbox fecha, o carrossel vai para o último slide visto lá
  function aoFecharLightbox(i) {
    const trilho = trilhoRef.current;
    trilho.scrollLeft = i * trilho.clientWidth;
  }

  // clique num slide: abre o lightbox (se não foi um arraste)
  function aoClicarSlide(e, i) {
    const t = toqueRef.current;
    const trilho = trilhoRef.current;
    if (t && (Math.abs(e.clientX - t.x) > 6 || Math.abs(e.clientY - t.y) > 6 || Math.abs(trilho.scrollLeft - t.left) > 6)) return;
    props.abrirLightbox(imagens, i, dados.nome, aoFecharLightbox);
  }

  // teclado: setas, Home, End e Enter (abre o slide atual ampliado)
  function aoTeclar(e) {
    if (e.key === "ArrowLeft") { e.preventDefault(); irPara(indice - 1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); irPara(indice + 1); }
    else if (e.key === "Home") { e.preventDefault(); irPara(0); }
    else if (e.key === "End") { e.preventDefault(); irPara(total - 1); }
    else if (e.key === "Enter" && e.target === e.currentTarget) {
      e.preventDefault();
      props.abrirLightbox(imagens, indice, dados.nome, aoFecharLightbox);
    }
  }

  return (
    <div
      className={"x-carousel" + (batida ? " " + batida : "")}
      role="region"
      aria-roledescription="carrossel"
      aria-label={dados.nome}
      tabIndex="0"
      onKeyDown={aoTeclar}
    >
      <ul className="x-carousel__track" ref={trilhoRef} onPointerDown={aoApertar} onDragStart={(e) => e.preventDefault()}>
        {imagens.map((img, i) => (
          <li className="x-carousel__slide" aria-roledescription="slide" aria-label={i + 1 + " de " + total} key={img.src}>
            <img
              src={img.src}
              alt={img.alt}
              width="1280"
              height="720"
              loading={i === 0 && dados.primeiraSemLazy ? undefined : "lazy"}
              onClick={(e) => aoClicarSlide(e, i)}
            />
          </li>
        ))}
      </ul>

      <p className="x-carousel__count" aria-live="polite"><span data-current="">{indice + 1}</span>/{total}</p>
      <p className="x-carousel__hint" aria-hidden="true">
        <svg viewBox="0 0 12 12"><circle cx="5" cy="5" r="3.6" /><path d="M7.7 7.7 L11 11 M5 3.4 V6.6 M3.4 5 H6.6" /></svg>toque para ampliar
      </p>

      <button className="x-carousel__btn x-carousel__btn--prev" type="button" aria-label="Slide anterior" aria-disabled={String(indice === 0)} onClick={anterior}>
        <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M10 3 L5 8 L10 13" /></svg>
      </button>
      <button className="x-carousel__btn x-carousel__btn--next" type="button" aria-label="Próximo slide" aria-disabled={String(indice === total - 1)} onClick={proximo}>
        <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M6 3 L11 8 L6 13" /></svg>
      </button>

      {/* embaixo: barra de progresso OU bolinhas, conforme o dados.js */}
      {dados.indicador === "barra" ? (
        <div className="x-carousel__progress" aria-hidden="true">
          <span style={{ width: ((indice + 1) / total) * 100 + "%" }}></span>
        </div>
      ) : (
        <div className="x-carousel__dots" aria-hidden="true">
          {imagens.map((img, i) => (
            <span key={img.src} className={i === indice ? "is-active" : undefined}></span>
          ))}
        </div>
      )}
    </div>
  );
}
