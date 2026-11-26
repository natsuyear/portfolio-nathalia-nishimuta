// =========================================================
// Fluxo.jsx - seção 06 "Fluxo do usuário"
// Mostra a imagem do fluxo. Clicando (ou Enter no teclado) ela abre ampliada.
// Para trocar a imagem, substitua o arquivo fluxo-portfolio.png com o mesmo nome.
// =========================================================
export default function Fluxo(props) {
  const imagem = {
    src: "fluxo-portfolio.png",
    alt: "Fluxo do usuário do portfólio: do topo ao contato, com os desvios para certificados e projetos",
  };

  function abrir() {
    props.abrirLightbox([imagem], 0, "", null);
  }

  function aoTeclar(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      abrir();
    }
  }

  return (
    <section className="section" id="fluxo">
      <div className="head">
        <p className="head__eyebrow x-eyebrow"><span className="x-n">06</span> — Fluxo do usuário</p>
        <h2>Como pensei a <em>navegação.</em></h2>
        <p className="head__sub">Mapeei o caminho de quem visita o portfólio: entra pelo topo, conhece minha história, confere certificados e projetos e termina no contato. O menu fixo deixa pular direto para qualquer seção, e cada projeto abre slides, site e PDF.</p>
      </div>
      <figure className="x-flow">
        <img
          className="x-flow__img"
          src={imagem.src}
          alt={imagem.alt}
          width="1920"
          height="1000"
          loading="lazy"
          role="button"
          tabIndex="0"
          onClick={abrir}
          onKeyDown={aoTeclar}
        />
        <figcaption className="fineprint">toque para ampliar</figcaption>
      </figure>
    </section>
  );
}
