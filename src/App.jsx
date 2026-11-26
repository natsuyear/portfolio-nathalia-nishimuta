// =========================================================
// App.jsx - componente principal
// Junta todas as partes da página e controla o Lightbox (slide ampliado).
// Este arquivo é carregado por último, porque usa todos os outros componentes.
// =========================================================
import React from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Sobre from "./pages/Sobre.jsx";
import Certificados from "./pages/Certificados.jsx";
import Formacao from "./pages/Formacao.jsx";
import Habilidades from "./pages/Habilidades.jsx";
import Projetos from "./pages/Projetos.jsx";
import Fluxo from "./components/Fluxo.jsx";
import Contato from "./pages/Contato.jsx";
import Rodape from "./components/Rodape.jsx";
import Lightbox from "./components/Lightbox.jsx"; 

export default function App() {
  // estado do lightbox: se está aberto, quais imagens, em qual começa...
  const [lightbox, setLightbox] = React.useState({
    aberto: false,
    imagens: [],
    inicio: 0,
    rotulo: "",
    aoFechar: null,
  });

  // os carrosséis e o fluxo chamam esta função para abrir o lightbox
  function abrirLightbox(imagens, inicio, rotulo, aoFechar) {
    setLightbox({ aberto: true, imagens: imagens, inicio: inicio, rotulo: rotulo, aoFechar: aoFechar });
  }

  // fecha o lightbox e avisa quem abriu em qual slide parou
  function fecharLightbox(indiceFinal) {
    if (lightbox.aoFechar) lightbox.aoFechar(indiceFinal);
    setLightbox({ ...lightbox, aberto: false });
  }

  // Efeito de "aparecer ao rolar": cada bloco das seções ganha a classe is-in
  // quando entra na tela (o CSS faz a animação). Só funciona se o <html> tiver a classe x-js.
  React.useEffect(() => {
    if (!document.documentElement.classList.contains("x-js")) return;
    const blocos = document.querySelectorAll(".main .section > *");
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("is-in");
          observador.unobserve(entrada.target);
        }
      });
    }, { rootMargin: "0px 0px -6% 0px" });
    blocos.forEach((bloco) => observador.observe(bloco));
    return () => observador.disconnect();
  }, []);

  return (
    <>
      <div className="page" id="top">
        <Header />
        <main className="main">
          <Hero />
          <Sobre abrirLightbox={abrirLightbox} />
          <Certificados />
          <Formacao />
          <Habilidades />
          <Projetos abrirLightbox={abrirLightbox} />
          <Fluxo abrirLightbox={abrirLightbox} />
          <Contato />
        </main>
        <Rodape />
      </div>
      <Lightbox
        aberto={lightbox.aberto}
        imagens={lightbox.imagens}
        inicio={lightbox.inicio}
        rotulo={lightbox.rotulo}
        aoFechar={fecharLightbox}
      />
    </>
  );
}
