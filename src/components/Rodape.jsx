// =========================================================
// Rodape.jsx - rodapé com meu nome e links para voltar às seções
// =========================================================

	import { secoes } from "../utils/dados.js";
  
export default function Rodape() {
  return (
    <footer className="foot">
      <p><img className="x-foot-mark" src="logo-nathalia-mark.png" alt="" width="319" height="313" />Nathália Nishimuta · AI Product Design Engineer · São Paulo, Brasil</p>
      <nav aria-label="Voltar às seções">
        <a href="#top">Top</a>
        {secoes.map((secao) => (
          <a key={secao.id} href={"#" + secao.id}>{secao.nome}</a>
        ))}
      </nav>
    </footer>
  );
}
