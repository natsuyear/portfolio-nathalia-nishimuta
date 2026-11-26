// =========================================================
// Projetos.jsx - seção 05 "Projetos"
// Quatro cases: Regina Decorações & Celevia, Heloísa Nail Designer, CardioVita e SR Hub
// Os slides, tags e links ficam no dados.js
// =========================================================
import React from "react";
import { carrosseis, tagsProjetos, linksProjetos } from "../utils/dados.js";
import Carrossel from "../components/Carrossel.jsx";

// Lista de tags (pílulas rosas) de um projeto
function Tags(props) {
  return (
    <p className="x-tags">
      {props.lista.map((tag, i) => (
        <React.Fragment key={tag}>
          {i > 0 && " "}
          <span className="pill x-tag">{tag}</span>
        </React.Fragment>
      ))}
    </p>
  );
}

// Botões de link de um projeto (Ver site, PDF...)
function Botoes(props) {
  return (
    <div className="links">
      {props.lista.map((botao) => (
        <a className="btn x-btn-accent" href={botao.link} target="_blank" rel="noopener" key={botao.link}>{botao.texto}</a>
      ))}
    </div>
  );
}

export default function Projetos(props) {
  return (
    <section className="section" id="projetos">
      <div className="head">
        <p className="head__eyebrow x-eyebrow"><span className="x-n">05</span> — Projetos</p>
        <h2>Quatro projetos, <em>do design ao código.</em></h2>
      </div>

      {/* ---------- Case 1: Regina Decorações & Celevia by Regina ---------- */}
      <article className="x-main" aria-labelledby="case-regina">
        <header className="x-main__head">
          <div>
            <p className="x-case__label">Case principal · Santo André, Grande ABC</p>
            <h3 id="case-regina">Regina Decorações &amp; Celevia by Regina</h3>
            <p className="x-main__sub">Uma casa de festas de 27 anos, duas formas de celebrar · Marca · UX/UI · Front-end</p>
          </div>
          <div className="x-main__logos">
            <img src="logo-regina.png" alt="Logo Regina Decorações" width="1748" height="1240" />{" "}
            <img src="logo-celevia-v2.png" alt="Logo Celevia by Regina" width="1254" height="1254" />
          </div>
          <div className="x-main__intro prose">
            <p>A Regina Decorações é o negócio de festas da minha mãe, em Santo André, desde 1999. A Celevia by Regina é a nova submarca de aluguel de kits: pegue, monte e devolva. <strong>Levou. Montou. Celebrou.</strong></p>
          </div>
          <p className="x-main__sub"><strong>Como usei IA:</strong> desenhei a marca e as telas primeiro e usei IA para transformar o design em HTML, CSS e JavaScript. Depois revisei o código, ajustei espaçamentos, cores e textos e testei no celular.</p>
          <Tags lista={tagsProjetos.regina} />
        </header>

        {/* parte a: estudo de caso em slides */}
        <div className="x-part">
          <div className="x-part__head">
            <div>
              <p className="x-case__label"><span className="x-n">a</span> · 29 slides</p>
              <h4>Estudo de caso</h4>
            </div>
            <a className="btn x-btn-accent" href={linksProjetos.reginaPdf} target="_blank" rel="noopener">Abrir estudo de caso (PDF)</a>
          </div>
          <Carrossel dados={carrosseis.regina} abrirLightbox={props.abrirLightbox} />
        </div>

        {/* parte b: o site */}
        <div className="x-part">
          <div className="x-site">
            <p className="x-case__label"><span className="x-n">b</span> · Front-end</p>
            <h4>Site</h4>
            <p>Site da Regina Decorações com a aba Celevia by Regina: portfólio por tipo de festa, orçamento guiado pelo WhatsApp, contrato prévio exibido para dar credibilidade e aluguel de kits com datas, caução e checkout.</p>
            <p className="x-site__cta"><a className="btn x-btn-accent" href={linksProjetos.reginaSite} target="_blank" rel="noopener">Ver site</a></p>
          </div>
        </div>
      </article>

      {/* ---------- Case 2: Heloísa Nail Designer ---------- */}
      <article className="x-main" aria-labelledby="case-heloisa">
        <header className="x-main__head">
          <div>
            <p className="x-case__label">Santo André · 9 slides</p>
            <h3 id="case-heloisa">Estudo de caso · Heloísa Nail Designer</h3>
            <p className="x-main__sub">Marca, site e agendamento pelo WhatsApp para uma nail designer de Santo André.</p>
            <p className="x-main__sub"><strong>Como usei IA:</strong> usei IA para gerar a primeira versão do site a partir da minha identidade visual e ajustei o resultado até ficar fiel ao design, com o agendamento pelo WhatsApp.</p>
          </div>
        </header>

        <div className="x-part">
          <div className="x-part__head">
            <div></div>
            <Botoes lista={linksProjetos.heloisa} />
          </div>
          <Carrossel dados={carrosseis.heloisa} abrirLightbox={props.abrirLightbox} />
        </div>
      </article>

      {/* ---------- Case 3: CardioVita ---------- */}
      <article className="x-main" aria-labelledby="case-cardiovita">
        <header className="x-main__head">
          <div>
            <p className="x-case__label">Meu primeiro projeto de UX · Curso Google UX Design · 12 slides</p>
            <h3 id="case-cardiovita">CardioVita</h3>
            <p className="x-main__sub">Porque cada batida importa.</p>
          </div>
          <div className="x-main__intro prose">
            <p>Foi o primeiro app que desenhei, idealizado em 2025 no curso de UX Design do Google (Coursera): um monitor cardíaco digital para quem precisa de cuidado extra. Acompanha batimentos e sinais vitais, avisa com calma quando algo muda, mostra relatórios fáceis de ler e dá dicas simples. Em 2026 transformei o briefing, o moodboard e os componentes em um protótipo funcional com IA no Lovable. A filosofia do projeto: cuidar sem assustar.</p>
          </div>
          <p className="x-main__sub"><strong>Como usei IA:</strong> levei o briefing, o moodboard e os componentes que eu tinha criado para o Lovable e transformei tudo num protótipo funcional, revisando cada tela para manter o tom de cuidar sem assustar.</p>
          <Tags lista={tagsProjetos.cardiovita} />
        </header>

        <div className="x-part">
          <div className="x-part__head">
            <div></div>
            <Botoes lista={linksProjetos.cardiovita} />
          </div>
          <Carrossel dados={carrosseis.cardiovita} abrirLightbox={props.abrirLightbox} />
        </div>
      </article>

      {/* ---------- Case 4: SR Hub (sem carrossel, só o link do código) ---------- */}
      <article className="x-main" aria-labelledby="case-srhub">
        <header className="x-main__head">
          <div>
            <p className="x-case__label">Projeto Full-Stack · Recode · em desenvolvimento</p>
            <h3 id="case-srhub">SR Hub</h3>
            <p className="x-main__sub">Vagas e cursos para mulheres, num só lugar.</p>
          </div>
          <div className="x-main__intro prose">
            <p>Plataforma full-stack desenvolvida por mim com o auxílio do Hark no curso da Recode. Empresas parceiras publicam vagas direto no SR Hub, com curadoria antes de ir ao ar, e as usuárias encontram vagas e cursos e se candidatam pela própria plataforma.</p>
            <p>O back-end já está pronto: uma API REST em Java com quatro recursos (usuárias, vagas, cursos e candidaturas), cada um com cadastro, consulta, edição e exclusão, e banco de dados SQL. Agora estou construindo o front-end em React a partir dos meus protótipos.</p>
          </div>
          <p className="x-main__sub"><strong>Como usei IA:</strong> usei o Hark para tirar dúvidas, revisar meu código e entender cada parte da API antes de subir para o GitHub.</p>
          <Tags lista={tagsProjetos.srhub} />
        </header>
        <div className="x-part">
          <div className="x-part__head">
            <div></div>
            <Botoes lista={linksProjetos.srhub} />
          </div>
        </div>
      </article>
    </section>
  );
}
