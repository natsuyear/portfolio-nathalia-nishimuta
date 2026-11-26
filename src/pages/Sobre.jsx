// =========================================================
// Sobre.jsx - seção 01 "Sobre mim"
// =========================================================
export default function Sobre(props) {
  // foto do certificado da SAGA: clicando (ou Enter) ela abre ampliada
  const certSaga = { src: "cert-saga.jpg", alt: "Certificado SAGA, curso Start, 248 horas, concluído em 2016" };
  function abrirCertificado() {
    props.abrirLightbox([certSaga], 0, "", null);
  }
  function aoTeclarCertificado(e) {
    if (e.key === "Enter") { e.preventDefault(); abrirCertificado(); }
  }

  return (
    <section className="section" id="sobre">
      <div className="head">
        <p className="head__eyebrow x-eyebrow"><span className="x-n">01</span> — Sobre mim</p>
        <h2>Tecnologia, psicologia e arte, <em>juntas.</em></h2>
      </div>

      <div className="x-about">
        <div className="prose">
          <p>Estudei Psicologia na Uninove (não concluído) e hoje estou em transição de carreira para Design Engineer, unindo design de produto e front-end.</p>
          <p>Quero unir tecnologia, psicologia e arte para criar produtos que entendem as pessoas. Sou mãe de duas meninas e estudo com rotina e disciplina.</p>
          <p>Comecei no design há muitos anos, dentro da Regina Decorações, o negócio de festas da minha mãe. Hoje levo essa marca do papel ao código.</p>
        </div>
        {/* bilhete na margem */}
        <aside className="x-margin" aria-label="Nota na margem">
          <p className="x-margin__label" aria-hidden="true">Nota</p>
          <p className="x-margin__note">psicologia + arte + tecnologia ✏️</p>
          <img className="x-margin__brain" src="logo-nathalia-mark.png" alt="" width="319" height="313" />
        </aside>
      </div>

      {/* meu primeiro curso de design */}
      <div className="x-origin">
        <div>
          <p className="x-origin__hand">Onde tudo começou</p>
          <h3>Curso de Design — SAGA</h3>
          <p className="x-trail__by">School of Game, Arts and Animation</p>
          <p>Concluído em 2016 <span className="pill">2 anos</span> <span className="pill">2x por semana, 19h–21h</span></p>
        </div>
        <figure className="x-slot">
          {/* foto do certificado físico da SAGA */}
          <div className="x-slot__photo" id="slot-cert-saga">
            <img src={certSaga.src} alt={certSaga.alt} role="button" tabIndex="0" onClick={abrirCertificado} onKeyDown={aoTeclarCertificado} />
          </div>
          <figcaption>certificado SAGA · curso Start · 248h · toque para ampliar</figcaption>
        </figure>
      </div>
      <p className="fineprint">Moro em São Paulo, Brasil.</p>
    </section>
  );
}
