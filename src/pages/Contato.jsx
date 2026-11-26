// =========================================================
// Contato.jsx - seção 07 "Contato" (a faixa escura com papel rasgado)
// =========================================================
export default function Contato() {
  return (
    <section className="section" id="contato">
      <div className="x-torn-wrap">
        <div className="x-torn">
          {/* coraçãozinho desenhado */}
          <svg className="x-doodle x-torn__heart" viewBox="0 0 40 36" aria-hidden="true" focusable="false">
            <path d="M20 32 C 8 24, 3 17, 4 11 C 5 5, 12 2, 17 6 C 19 8, 20 10, 20 10 C 20 10, 22 6, 25 4.5 C 31 2, 37 6, 36 12 C 35 19, 29 25, 20 32 Z" />
          </svg>
          <p className="x-torn__hand" aria-hidden="true">vamos conversar?</p>
          <div className="head">
            <p className="head__eyebrow x-eyebrow"><span className="x-n">07</span> — Contato</p>
            <h2>Vou adorar conversar com você.</h2>
            <p className="head__sub">Me chame no LinkedIn ou escreva para nishimutanathalia@gmail.com.</p>
          </div>
          <div className="links">
            <a className="btn x-btn-accent" href="https://www.linkedin.com/in/nathalianishimuta" target="_blank" rel="noopener">LinkedIn</a>
            <a className="btn" href="https://github.com/natsuyear" target="_blank" rel="noopener">GitHub</a>
            <a className="btn" href="mailto:nishimutanathalia@gmail.com">nishimutanathalia@gmail.com</a>
          </div>
        </div>
      </div>
    </section>
  );
}
