// =========================================================
// Formacao.jsx - seção 03 "Em formação"
// Linha do tempo com os cursos da lista "formacoes" (dados.js)
// =========================================================
import { formacoes } from "../utils/dados.js";

export default function Formacao() {
  return (
    <section className="section" id="formacao">
      <div className="head">
        <p className="head__eyebrow x-eyebrow"><span className="x-n">03</span> — Em formação</p>
        <h2>O que estou estudando agora.</h2>
      </div>

      <ol className="x-trail">
        {formacoes.map((curso) => (
          <li key={curso.titulo}>
            <span className="x-trail__dot" aria-hidden="true"></span>{" "}
            <div>
              {/* só mostra o "quando" se ele existir */}
              {curso.quando && <p className="x-trail__when">{curso.quando}</p>}
              <p className="x-trail__title">{curso.titulo}</p>
              <p className="x-trail__by">{curso.por}</p>
            </div>{" "}
            <span className="chip x-chip-now">Em andamento</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
