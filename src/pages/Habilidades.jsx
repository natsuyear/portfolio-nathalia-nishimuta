// =========================================================
// Habilidades.jsx - seção 04 "Habilidades"
// Três "post-its" (Pessoas, Design, Ferramentas) com a lista do dados.js
// =========================================================
import React from "react";
import { habilidades } from "../utils/dados.js";

// Desenhos pequenos que aparecem no canto de cada post-it
function Desenho(props) {
  if (props.tipo === "coracao") {
    return (
      <svg className="x-doodle x-note__doodle" viewBox="0 0 40 36" aria-hidden="true" focusable="false">
        <path d="M20 32 C 8 24, 3 17, 4 11 C 5 5, 12 2, 17 6 C 19 8, 20 10, 20 10 C 20 10, 22 6, 25 4.5 C 31 2, 37 6, 36 12 C 35 19, 29 25, 20 32 Z" />
      </svg>
    );
  }
  if (props.tipo === "lapis") {
    return (
      <svg className="x-doodle x-note__doodle" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <path d="M8 40 L12 28 L34 6 L42 14 L20 36 Z" />
        <path d="M12 28 L20 36" />
        <path d="M30 10 L38 18" />
      </svg>
    );
  }
  // lâmpada
  return (
    <svg className="x-doodle x-note__doodle" viewBox="0 0 40 48" aria-hidden="true" focusable="false">
      <path d="M20 6 C 11 6, 6 13, 7 20 C 8 26, 13 29, 14 35 L26 35 C 27 29, 32 26, 33 20 C 34 13, 29 6, 20 6 Z" />
      <path d="M15 40 L25 40" />
      <path d="M17 44 L23 44" />
      <path d="M3 8 L7 11" />
      <path d="M37 8 L33 11" />
    </svg>
  );
}

export default function Habilidades() {
  return (
    <section className="section" id="habilidades">
      <div className="head">
        <p className="head__eyebrow x-eyebrow"><span className="x-n">04</span> — Habilidades</p>
        <h2>Entendo pessoas <em>antes</em> de desenhar telas.</h2>
      </div>

      <div className="x-notes">
        {habilidades.map((grupo) => (
          <div className={grupo.classe} key={grupo.grupo}>
            <Desenho tipo={grupo.icone} />
            <h3>{grupo.grupo}</h3>
            <ul>
              {grupo.itens.map((item) => (
                <li key={item.nome}>
                  {item.nome}
                  {/* texto pequeno opcional, ex: (base em Psicologia) */}
                  {item.obs && <> <small>{item.obs}</small></>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
