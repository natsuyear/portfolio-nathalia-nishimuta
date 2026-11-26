// =========================================================
// Header.jsx - menu fixo do topo
// - cria um link para cada seção da lista "secoes" (dados.js)
// - marca o link da seção que está na tela (aria-current)
// - no celular o menu rola para o lado, então ele rola sozinho até o link ativo
// - tem o botão de trocar tema (claro / escuro)
// =========================================================
import { secoes } from "../utils/dados.js";
import Carrossel from "../components/Carrossel.jsx";
import React from "react";

export default function Header() {
  // índice do link ativo (-1 = nenhum, quando estou no topo da página)
  const [ativo, setAtivo] = React.useState(-1);
  const menuRef = React.useRef(null);

  // Descobre qual seção está passando pela "linha" a 32% da altura da tela
  React.useEffect(() => {
   function verificarSecao() {
      const linha = window.innerHeight * 0.32;
      let atual = -1;
      secoes.forEach((secao, i) => {
        const el = document.getElementById(secao.id);
        if (el && el.getBoundingClientRect().top <= linha) {
          atual = i;
        }
      });
      setAtivo(atual);
    }

    let esperando = false;
    function aoRolar() {
      if (esperando) return;
      esperando = true;
      requestAnimationFrame(() => {
        verificarSecao();
        esperando = false;
      });
    }

    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", verificarSecao);
    if (document.fonts) document.fonts.ready.then(verificarSecao); // de novo depois que as fontes carregam
    verificarSecao();

    // limpa os eventos quando o componente sai da tela
    return () => {
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", verificarSecao);
    };
  }, []);

  // Quando o link ativo muda, rola o menu (no celular) para ele aparecer
  React.useEffect(() => {
    const menu = menuRef.current;
    if (!menu || ativo < 0) return;
    const link = menu.querySelectorAll("a")[ativo];
    const esquerda = link.offsetLeft - 8;
    const direita = link.offsetLeft + link.offsetWidth + 8;
    if (esquerda < menu.scrollLeft || direita > menu.scrollLeft + menu.clientWidth) {
      const semAnimacao = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      menu.scrollTo({ left: esquerda, behavior: semAnimacao ? "auto" : "smooth" });
    }
  }, [ativo]);

  return (
    <header className="nav glass">
      <nav className="seg" aria-label="Seções" ref={menuRef}>
        {secoes.map((secao, i) => (
          <a key={secao.id} href={"#" + secao.id} aria-current={i === ativo ? "true" : undefined}>
            {secao.nome}
          </a>
        ))}
      </nav>
      <BotaoTema />
    </header>
  );
}

// Botão que troca entre tema claro e escuro e guarda a escolha no navegador
function BotaoTema() {
  const [tema, setTema] = React.useState(() => {
    // tenta ler a escolha salva da última visita
    try {
      const salvo = localStorage.getItem("tema");
      if (salvo === "light" || salvo === "dark") return salvo;
    } catch (e) {
      // se o navegador bloquear o localStorage, segue sem salvar
    }
    return "light";
  });

  // sempre que o tema muda, coloca no <html data-theme="...">
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", tema);
  }, [tema]);

  function trocarTema() {
    const novo = tema === "dark" ? "light" : "dark";
    setTema(novo);
    try {
      localStorage.setItem("tema", novo);
    } catch (e) {
      // sem localStorage a escolha vale só nesta visita
    }
  }

  return (
    <button
      className="theme-btn"
      id="theme-btn"
      type="button"
      aria-label={tema === "dark" ? "Mudar para o tema claro" : "Mudar para o tema escuro"}
      onClick={trocarTema}
    ></button>
  );
}
