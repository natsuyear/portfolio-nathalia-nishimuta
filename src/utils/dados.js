// =========================================================
// dados.js
// Aqui ficam os dados do portfólio (listas).
// Os componentes leem essas listas e usam .map() para criar o HTML.
// Para adicionar um certificado, por exemplo, é só colocar mais um item na lista.
// =========================================================

// Seções que aparecem no menu do topo e no rodapé (id da seção + nome no menu)
export const secoes = [
  { id: "sobre", nome: "Sobre mim" },
  { id: "certificados", nome: "Certificados" },
  { id: "formacao", nome: "Em formação" },
  { id: "habilidades", nome: "Habilidades" },
  { id: "projetos", nome: "Projetos" },
  { id: "fluxo", nome: "Fluxo" },
  { id: "contato", nome: "Contato" },
];

// Certificados concluídos (do mais recente ao mais antigo)
export const certificados = [
  {
    data: "03/11/2026",
    titulo: "Claude para Builders",
    por: "Tera · 5h, com testes e desafios práticos",
    link: "https://credentials.somostera.com/bb6c891ed7e27e9386516621d4a99455",
    imagem: "cert-tera-claude.jpg",
    alt: "Certificado Tera Claude para Builders",
  },
  {
    data: "26/11/2026",
    titulo: "UI/UX Design",
    por: "CalArts (Coursera)",
    link: "https://www.coursera.org/account/accomplishments/specialization/1E1YDIV81GA9",
    imagem: "coursera.uxcalarts.pdf",
    alt: "Certificado CalArts UI/UX Design",
  },
  {
    data: "22 e 23/08/2026",
    titulo: "Workshop Do Figma ao app do Zero",
    por: "Ux Unicórnio · 2 dias (16H), com exercícios práticos",
    link: "https://www.uxunicornio.com/certificado/figma-ao-app-do-zero",
    imagem: "cert-figma-ao-app.jpg",
    alt: "Certificado Ux Unicórnio - Do Figma ao app do Zero",
  },
];

// Cursos que estou fazendo agora ("quando" é opcional)
export const formacoes = [
  { quando: "Curso 2 de 8", titulo: "Google UX Design Professional Certificate", por: "Google (Coursera)" },
  { quando: "Cursos 2 de 4", titulo: "Especialização UI/UX Design", por: "CalArts (Coursera)" },
  { quando: "Dezembro 2026", titulo: "Recode", por: "Curso FullStack + Mentoria" },
  { quando: "2027", titulo: "FreeCodeCamp", por: "Full-Stack Developer Certification" },
];

// Habilidades em 3 grupos. "icone" diz qual desenho aparece no cartão.
// "obs" é um texto pequeno opcional que aparece depois da habilidade.
export const habilidades = [
  {
    grupo: "Pessoas",
    classe: "x-note",
    icone: "coracao",
    itens: [
      { nome: "Pesquisa com usuários" },
      { nome: "Persona (experiência do usuário)" },
      { nome: "Empatia e comportamento humano", obs: "(base em Psicologia)" },
      { nome: "Design cognitivo" },
      { nome: "Design inclusivo e acessível" },
      { nome: "Design thinking" },
    ],
  },
  {
    grupo: "Design",
    classe: "x-note x-note--cream",
    icone: "lapis",
    itens: [
      { nome: "Design centrado no usuário" },
      { nome: "Wireframes e protótipos" },
      { nome: "UI visual: tipografia, cor, layout" },
      { nome: "Design responsivo" },
      { nome: "Mockups" },
      { nome: "Prototipagem" },

    ],
  },
  {
    grupo: "Ferramentas",
    classe: "x-note x-note--blush",
    icone: "lampada",
    itens: [
      { nome: "Figma" },
      { nome: "Canva" },
      { nome: "Photoshop e Illustrator" },
      { nome: "HTML, CSS e JavaScript" },
      { nome: "React" },
      { nome: "Java e APIs REST" },
      { nome: "Git e GitHub" },
      { nome: "IA generativa aplicada ao design" },
    ],
  },
];

// Função que monta a lista de slides de um estudo de caso.
// Exemplo: criarSlides("helo-slide-", 9, ".jpg") => ["helo-slide-1.jpg", ..., "helo-slide-9.jpg"]
// "doisDigitos" coloca um zero na frente (case-01.jpg, case-02.jpg...)
function criarSlides(prefixo, total, extensao, doisDigitos) {
  const lista = [];
  for (let i = 1; i <= total; i++) {
    let numero = String(i);
    if (doisDigitos && i < 10) {
      numero = "0" + i;
    }
    lista.push(prefixo + numero + extensao);
  }
  return lista;
}

// Slides de cada carrossel
// "nome" é usado no texto alternativo das imagens e no aria-label do carrossel
// "indicador" diz se embaixo aparece uma barra de progresso ou bolinhas
export const carrosseis = {
  regina: {
    nome: "Estudo de caso Regina Decorações e Celevia by Regina",
    imagens: criarSlides("case-", 29, ".jpg", true),
    indicador: "barra",
    primeiraSemLazy: true, // a primeira imagem carrega logo (as outras só quando precisar)
  },
  heloisa: {
    nome: "Estudo de caso Heloísa Nail Designer",
    imagens: criarSlides("helo-slide-", 9, ".jpg", false),
    indicador: "bolinhas",
  },
  cardiovita: {
    nome: "Estudo de caso CardioVita",
    imagens: criarSlides("cardio-slide-", 12, ".jpg", false),
    indicador: "bolinhas",
  },
  medlembra: {
    nome: "Mapa de interação e wireframe MedLembra",
    imagens: criarSlides("medlembra-", 8, png, false),
    indicador: "barra",
  },
};

// Tags de cada projeto
export const tagsProjetos = {
  regina: ["Pesquisa", "Heurísticas de Nielsen", "Proto-personas", "Jornada", "Identidade visual", "Design system", "HTML/CSS/JS"],
  cardiovita: ["Briefing", "Moodboard", "Componentes de UI", "Acessibilidade", "Protótipo com IA", "Lovable"],
  srhub: ["Java", "API REST", "SQL", "React", "Protótipos"],
};

// Links (botões) de cada projeto
export const linksProjetos = {
  reginaPdf: "https://natsuyear.github.io/portfolio-nathalia-nishimuta/estudo-de-caso-regina-celevia.pdf",
  reginaSite: "https://natsuyear.github.io/Regina-decoracoes-celevia/",
  heloisa: [
    { texto: "Ver site", link: "https://natsuyear.github.io/heloisa-nail-designer/" },
    { texto: "Abrir estudo de caso (PDF)", link: "https://natsuyear.github.io/portfolio-nathalia-nishimuta/estudo-de-caso-heloisa.pdf" },
  ],
  cardiovita: [
    { texto: "Ver protótipo", link: "https://heartwise-vital-companion.lovable.app" },
    { texto: "Abrir estudo de caso (PDF)", link: "https://natsuyear.github.io/portfolio-nathalia-nishimuta/estudo-de-caso-cardiovita.pdf" },
  ],
  medlembra: [
    { texto: "Ver protótipo", link: "https://natsuyear.github.io/portfolio-nathalia-nishimuta/medlembra_prototipo"}
    { texto: "Abrir mapa e wireframe (PDF)"} link: "https://natsuyear.github.io/portfolio-nathalia-nishimuta/MedLembra.pdf"},
  ],
  srhub: [
    { texto: "Ver código no GitHub", link: "https://github.com/natsuyear/sr-hub-api-recode" },
  ],
};
