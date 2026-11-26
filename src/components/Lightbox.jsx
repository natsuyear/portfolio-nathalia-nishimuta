// =========================================================
// Lightbox.jsx - mostra um slide (ou a imagem do fluxo) ampliado por cima da página
// - contador "3/29", setas anterior/próximo
// - fecha no X, na tecla Esc ou clicando fora da imagem
// - setas do teclado e deslizar o dedo trocam de slide
// - zoom: rodinha do mouse, pinça com dois dedos ou duplo clique/toque; arrastar move a imagem ampliada
// Props: aberto, imagens [{src, alt}], inicio (índice), rotulo, aoFechar(indice)
// =========================================================

import React from "react";

// gif transparente de 1px para quando não tem imagem
const IMAGEM_VAZIA = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export default function Lightbox(props) {
  const [indice, setIndice] = React.useState(0);
  const [visivel, setVisivel] = React.useState(false); // classe is-open (para a animação de aparecer)

  const fecharRef = React.useRef(null); // botão X
  const anteriorRef = React.useRef(null);
  const proximoRef = React.useRef(null);
  const quemAbriuRef = React.useRef(null); // elemento que tinha o foco antes de abrir
  const toqueRef = React.useRef(null);

  // ---- zoom da imagem ----
  const imgRef = React.useRef(null);
  const [zoom, setZoom] = React.useState({ escala: 1, x: 0, y: 0 });
  const zoomRef = React.useRef(zoom); // cópia para usar dentro dos eventos
  zoomRef.current = zoom;
  const gestoRef = React.useRef(null); // pinça ou arraste em andamento
  const ZOOM_MAX = 5;

  function aplicarZoom(escala, x, y) {
    escala = Math.max(1, Math.min(ZOOM_MAX, escala));
    if (escala === 1) { x = 0; y = 0; }
    setZoom({ escala: escala, x: x, y: y });
  }

  // amplia mantendo o ponto (px, py) da tela parado embaixo do dedo/mouse
  function zoomNoPonto(novaEscala, px, py) {
    const img = imgRef.current;
    if (!img) return;
    const z = zoomRef.current;
    novaEscala = Math.max(1, Math.min(ZOOM_MAX, novaEscala));
    const r = img.getBoundingClientRect();
    const cx = r.left + r.width / 2 - z.x; // centro da imagem sem o deslocamento
    const cy = r.top + r.height / 2 - z.y;
    const k = novaEscala / z.escala;
    const x = (px - cx) - k * (px - cx - z.x);
    const y = (py - cy) - k * (py - cy - z.y);
    aplicarZoom(novaEscala, x, y);
  }

  // rodinha do mouse (precisa ser "não passivo" para impedir a rolagem)
  React.useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    function aoRolar(e) {
      e.preventDefault();
      const fator = e.deltaY < 0 ? 1.2 : 1 / 1.2;
      zoomNoPonto(zoomRef.current.escala * fator, e.clientX, e.clientY);
    }
    img.addEventListener("wheel", aoRolar, { passive: false });
    return () => img.removeEventListener("wheel", aoRolar);
  }, []);

  // volta ao tamanho normal ao trocar de slide, abrir ou fechar
  React.useEffect(() => { setZoom({ escala: 1, x: 0, y: 0 }); }, [indice, props.aberto]);

  function distancia(t) {
    return Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
  }

  function aoTocarImagem(e) {
    const z = zoomRef.current;
    if (e.touches.length === 2) {
      gestoRef.current = {
        tipo: "pinca",
        dist: distancia(e.touches),
        escala: z.escala,
        px: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        py: (e.touches[0].clientY + e.touches[1].clientY) / 2,
      };
      toqueRef.current = null; // não troca de slide
    } else if (e.touches.length === 1 && z.escala > 1) {
      gestoRef.current = { tipo: "arrasto", sx: e.touches[0].clientX, sy: e.touches[0].clientY, x: z.x, y: z.y };
      toqueRef.current = null;
    }
  }

  function aoMoverDedo(e) {
    const g = gestoRef.current;
    if (!g) return;
    // (não precisa de preventDefault: o touch-action: none da imagem já impede a rolagem)
    if (g.tipo === "pinca" && e.touches.length === 2) {
      const nova = g.escala * (distancia(e.touches) / g.dist);
      zoomNoPonto(nova, g.px, g.py);
      g.escala = nova; g.dist = distancia(e.touches);
    } else if (g.tipo === "arrasto" && e.touches.length === 1) {
      const z = zoomRef.current;
      aplicarZoom(z.escala, g.x + e.touches[0].clientX - g.sx, g.y + e.touches[0].clientY - g.sy);
    }
  }

  const ultimoToqueRef = React.useRef(null); // para reconhecer o toque duplo no celular
  function aoSoltarDedo(e) {
    if (e.touches.length === 0) gestoRef.current = null;
    // toque duplo: dois toques rápidos (até 300 ms) e perto um do outro
    if (e.changedTouches.length === 1 && e.touches.length === 0) {
      const t = e.changedTouches[0];
      const agora = Date.now();
      const ult = ultimoToqueRef.current;
      if (ult && agora - ult.tempo < 300 && Math.hypot(t.clientX - ult.x, t.clientY - ult.y) < 30) {
        ultimoToqueRef.current = null;
        duploToqueRef.current = agora; // evita que o dblclick do navegador desfaça
        aoDuploClique({ clientX: t.clientX, clientY: t.clientY });
      } else {
        ultimoToqueRef.current = { tempo: agora, x: t.clientX, y: t.clientY };
      }
    }
  }

  // arrastar com o mouse quando está ampliada
  const arrastouRef = React.useRef(false);
  function aoApertarMouse(e) {
    const z = zoomRef.current;
    if (z.escala <= 1 || e.button !== 0) return;
    e.preventDefault();
    const g = { sx: e.clientX, sy: e.clientY, x: z.x, y: z.y };
    arrastouRef.current = true; // soltar o mouse fora da imagem não deve fechar
    function mover(ev) { aplicarZoom(zoomRef.current.escala, g.x + ev.clientX - g.sx, g.y + ev.clientY - g.sy); }
    function soltar() { setTimeout(() => { arrastouRef.current = false; }, 0); window.removeEventListener("mousemove", mover); window.removeEventListener("mouseup", soltar); }
    window.addEventListener("mousemove", mover);
    window.addEventListener("mouseup", soltar);
  }

  // duplo clique / duplo toque: amplia 2,5x ou volta ao normal
  const duploToqueRef = React.useRef(0);
  function aoDuploClique(e) {
    if (e.type === "dblclick" && Date.now() - duploToqueRef.current < 600) return; // já tratado pelo toque duplo
    if (zoomRef.current.escala > 1) aplicarZoom(1, 0, 0);
    else zoomNoPonto(2.5, e.clientX, e.clientY);
  }

  const imagens = props.imagens;
  const total = imagens.length;

  // quando abre ou fecha
  React.useEffect(() => {
    if (props.aberto) {
      setIndice(props.inicio);
      quemAbriuRef.current = document.activeElement;
      document.body.classList.add("x-lb-lock"); // trava a rolagem da página
      requestAnimationFrame(() => setVisivel(true));
      fecharRef.current.focus();
    } else {
      setVisivel(false);
      document.body.classList.remove("x-lb-lock");
      const quem = quemAbriuRef.current;
      if (quem && quem.focus) quem.focus({ preventScroll: true }); // devolve o foco
    }
  }, [props.aberto, props.imagens, props.inicio]);

  // mostra o slide i (sem passar do primeiro nem do último)
  function mostrar(i) {
    setIndice(Math.max(0, Math.min(total - 1, i)));
  }

  function fechar() {
    if (!props.aberto) return;
    props.aoFechar(indice);
  }

  function aoTeclar(e) {
    if (e.key === "Escape") { e.preventDefault(); fechar(); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); mostrar(indice - 1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); mostrar(indice + 1); }
    else if (e.key === "Tab") {
      // o foco fica "preso" entre os 3 botões enquanto está aberto
      e.preventDefault();
      const botoes = [fecharRef.current, anteriorRef.current, proximoRef.current];
      const atual = botoes.indexOf(document.activeElement);
      const proximo = (atual + (e.shiftKey ? botoes.length - 1 : 1)) % botoes.length;
      botoes[proximo].focus();
    }
  }

  // clicou no fundo escuro (fora da imagem e dos botões)
  function aoClicarFundo(e) {
    if (arrastouRef.current) return; // terminou um arraste, não é clique fora
    if (e.target === e.currentTarget) fechar();
  }

  // deslizar o dedo para o lado troca de slide
  function aoComecarToque(e) {
    if (e.touches.length === 1 && zoomRef.current.escala === 1) toqueRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
  function aoTerminarToque(e) {
    const inicio = toqueRef.current;
    if (!inicio) return;
    toqueRef.current = null;
    const t = e.changedTouches[0];
    const dx = t.clientX - inicio.x;
    const dy = t.clientY - inicio.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) mostrar(indice + (dx < 0 ? 1 : -1));
  }

  const atual = imagens[indice];

  return (
    <div
      className={"x-lb" + (visivel ? " is-open" : "")}
      id="x-lb"
      role="dialog"
      aria-modal="true"
      aria-label={props.aberto ? (props.rotulo || "Slide") + ", ampliado" : "Slide ampliado"}
      hidden={!props.aberto}
      onKeyDown={aoTeclar}
      onClick={aoClicarFundo}
      onTouchStart={aoComecarToque}
      onTouchEnd={aoTerminarToque}
    >
      <p className="x-lb__count" aria-live="polite"><span data-lb-current="">{indice + 1}</span>/<span data-lb-total="">{total || 1}</span></p>
      <img
        className={"x-lb__img" + (zoom.escala > 1 ? " is-zoom" : "")}
        src={atual ? atual.src : IMAGEM_VAZIA}
        alt={atual ? atual.alt : ""}
        ref={imgRef}
        draggable="false"
        style={{ transform: "translate(" + zoom.x + "px, " + zoom.y + "px) scale(" + zoom.escala + ")" }}
        onTouchStart={aoTocarImagem}
        onTouchMove={aoMoverDedo}
        onTouchEnd={aoSoltarDedo}
        onMouseDown={aoApertarMouse}
        onDoubleClick={aoDuploClique}
      />
      <button className="x-lb__btn x-lb__close" type="button" aria-label="Fechar" ref={fecharRef} onClick={fechar}>
        <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3.5 3.5 L12.5 12.5 M12.5 3.5 L3.5 12.5" /></svg>
      </button>
      <button className="x-lb__btn x-lb__prev" type="button" aria-label="Slide anterior" aria-disabled={String(indice === 0)} ref={anteriorRef} onClick={() => mostrar(indice - 1)}>
        <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M10 3 L5 8 L10 13" /></svg>
      </button>
      <button className="x-lb__btn x-lb__next" type="button" aria-label="Próximo slide" aria-disabled={String(indice >= total - 1)} ref={proximoRef} onClick={() => mostrar(indice + 1)}>
        <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M6 3 L11 8 L6 13" /></svg>
      </button>
    </div>
  );
}
