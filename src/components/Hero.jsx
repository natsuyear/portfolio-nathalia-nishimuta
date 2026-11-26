// =========================================================
// Hero.jsx - primeira parte da página (apresentação)
// Tem meu nome, uma frase, os botões de contato e a "câmera" com a minha foto.
// =========================================================
export default function Hero() {
  return (
    <section className="x-hero" aria-label="Apresentação">
      {/* bolhas coloridas do fundo (só decoração) */}
      <div className="x-blobs" aria-hidden="true"><span></span><span></span><span></span></div>

      <div className="x-hero__copy">
        <p className="x-hero__eyebrow">Portfólio</p>
        <h1>
          <span className="x-name">Nathália <em>Nishimuta</em></span>{" "}
          <span className="x-role">— AI Product Design Engineer júnior</span>
        </h1>
        <p className="x-hero__sub">Venho da Psicologia para o design: quero criar produtos que entendem as pessoas.</p>
        <p className="x-hero__meta">São Paulo, Brasil · 3 certificados concluídos · 3 formações em andamento · 4 projetos</p>
        <aside className="x-next" aria-label="Próximo passo">
          <p className="x-next__head">Próximo passo</p>
          <p><strong>Vamos conversar?</strong> Estou aberta a oportunidades em vagas júnior de Design de Produto, Front-end e Ui/Ux Designer.</p>{" "}
          <a className="btn x-btn-accent" href="https://www.linkedin.com/in/nathalianishimuta" target="_blank" rel="noopener">Fale comigo no LinkedIn</a>{" "}
          <a className="btn" href="https://github.com/natsuyear" target="_blank" rel="noopener">Meu GitHub</a>
        </aside>
      </div>

      <div className="x-collage">
        {/* minha foto dentro de uma câmera digital antiga feita com CSS */}
        <figure className="x-cam">
          <div className="x-cam__top" aria-hidden="true">
            <span><b>NN</b> · DIGITAL 3.2MP</span>{" "}
            <span className="x-cam__bits"><span className="x-cam__vf"></span><span className="x-cam__led"></span></span>
          </div>
          <div className="x-cam__screen">
            <img src="FotoPerfil.jpg" alt="Foto de Nathália Nishimuta" width="560" height="560" />
            {/* informações da "tela" da câmera */}
            <div className="x-hud" aria-hidden="true">
              <span className="x-hud__rec">REC</span>{" "}
              <span className="x-hud__mode">AUTO</span>{" "}
              <span className="x-hud__batt"><span className="x-batt"><i></i><i></i><i></i></span></span>{" "}
              <span className="x-hud__focus"></span>{" "}
              <span className="x-hud__count">037/120</span>{" "}
              <span className="x-hud__date">13.10.2026</span>
            </div>
          </div>
          <div className="x-cam__base"><span aria-hidden="true"></span><span className="x-cam__btns" aria-hidden="true"><i></i><i></i><i></i></span></div>
        </figure>
        <div className="x-logo">
          <img src="logo-nathalia-mark.png" alt="Logo de Nathália Nishimuta: monograma N em preto, laranja e rosa" width="319" height="313" />
        </div>
      </div>
    </section>
  );
}
