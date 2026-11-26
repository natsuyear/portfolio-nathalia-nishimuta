# Portfólio Nathália Nishimuta (versão em React)

Meu portfólio de UX/UI Design e Front-end, refeito em **React**.
A página tem: apresentação, sobre mim, certificados, cursos em andamento, habilidades,
projetos (com carrossel de slides e slide ampliado), fluxo do usuário e contato.

## Tecnologias

- **React 18** carregado por CDN (unpkg), sem instalar nada
- **Babel Standalone**: transforma o JSX em JavaScript direto no navegador
- **CSS** puro (`style.css`)
- **Sem build e sem npm**: é só subir os arquivos

## Estrutura de arquivos

Todos os arquivos ficam soltos na mesma pasta (sem subpastas):

| Arquivo | O que faz |
| --- | --- |
| `index.html` | Carrega o CSS, o React, o Babel e os componentes |
| `style.css` | Todos os estilos da página |
| `dados.js` | Listas com os dados (seções, certificados, cursos, habilidades, slides, links) |
| `App.jsx` | Componente principal: junta tudo e controla o slide ampliado (carregado por último) |
| `Header.jsx` | Menu fixo do topo + botão de tema claro/escuro |
| `Hero.jsx` | Apresentação com foto e botões de contato |
| `Sobre.jsx` | Seção 01 - Sobre mim |
| `Certificados.jsx` | Seção 02 - Certificados concluídos |
| `Formacao.jsx` | Seção 03 - Em formação |
| `Habilidades.jsx` | Seção 04 - Habilidades |
| `Projetos.jsx` | Seção 05 - Projetos (os 4 cases) |
| `Carrossel.jsx` | Carrossel de slides (setas, arrastar, teclado) |
| `Lightbox.jsx` | Slide ampliado (contador, setas, Esc, clique fora) |
| `Fluxo.jsx` | Seção 06 - Fluxo do usuário |
| `Contato.jsx` | Seção 07 - Contato |
| `Rodape.jsx` | Rodapé com links para as seções |
| `*.jpg` / `*.png` | Imagens: foto, logos, certificados, slides e fluxo |

Os PDFs dos estudos de caso são abertos pelo endereço completo do GitHub Pages
(`https://natsuyear.github.io/portfolio-nathalia-nishimuta/...`), por isso não estão nesta pasta.

## Como rodar localmente

O Babel busca os arquivos `.jsx` pela rede, então **abrir o `index.html` com dois cliques (file://) não funciona**.
Use um servidor local:

1. Abra a pasta no **VS Code**
2. Instale a extensão **Live Server**
3. Clique com o botão direito no `index.html` → **Open with Live Server**

(Outra opção: no terminal, dentro da pasta, rode `python -m http.server` e abra `http://localhost:8000`.)

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub (ou use um que já existe)
2. Clique em **Add file → Upload files** e arraste **todos os arquivos** desta pasta (soltos, sem pasta)
3. Clique em **Commit changes**
4. Vá em **Settings → Pages**
5. Em **Build and deployment**, escolha **Deploy from a branch**, branch **main** e pasta **/ (root)** → **Save**
6. Depois de 1 ou 2 minutos o site aparece em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`

## Pendente

- Foto do certificado da SAGA (2016): quando tiver a foto, salve como `cert-saga.jpg` e troque o 📷 no `Sobre.jsx`.
