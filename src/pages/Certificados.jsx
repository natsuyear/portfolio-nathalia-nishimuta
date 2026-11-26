// =========================================================
// Certificados.jsx - seção 02 "Certificados concluídos"
// Os certificados vêm da lista "certificados" no dados.js
// =========================================================

import { certificados } from "../utils/dados.js";

export default function Certificados() {
  return (
    <section className="section" id="certificados">
      <div className="head">
        <p className="head__eyebrow x-eyebrow"><span className="x-n">02</span> — Certificados concluídos</p>
        <h2><em>Três</em> certificados concluídos em 2026.</h2>
        <p className="head__sub x-hand-sub">Do mais recente ao mais antigo.</p>
      </div>

      <ol className="x-board">
        {/* um cartão para cada certificado */}
        {certificados.map((cert) => (
          <li className="x-cert" key={cert.titulo}>
            <a className="x-cert__img" href={cert.link} target="_blank" rel="noopener">
              <img src={cert.imagem} alt={cert.alt} />
            </a>
            <p className="x-cert__date">{cert.data}</p>
            <h3>{cert.titulo}</h3>
            <p className="x-cert__by">{cert.por}</p>
            <div className="x-cert__foot">
              <span className="chip x-chip-done">Concluído</span>{" "}
              <a className="link x-cert__verify" href={cert.link} target="_blank" rel="noopener">Verificar</a>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
