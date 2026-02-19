// Seletor da seção about(Section)
const about = document.querySelector("#about");

// Seletor da seção Projects (Carrocel)
const swiperWrapper = document.querySelector(".swiper-wrapper");

// Seletor de Formulário
const formulario = document.querySelector("#formulario");

// Regex de validação do e-mail
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Função para buscar os dados do Perfil do Github
async function getAboutGithub() {
  try {
    const resposta = await fetch("https://api.github.com/users/allysonaggp");
    const perfil = await resposta.json();
    about.innerHTML = " ";
    about.innerHTML = `
            <figure class="about-image">
                <img src="${perfil.avatar_url}" alt="foto do perfil - ${perfil.name}">
            </figure>
            <article class="about-content">
                <h2>Sobre min</h2>
                <p>Sou Desenvolvedor Full Stack em transição de carreira, atualmente cursando Análise e Desenvolvimento de
                Sistemas e participando do bootcamp intensivo da Generation Brasil.Minha trajetória começou na Força Aérea
                Brasileira, onde desenvolvi liderança, disciplina e resiliência. Também tive a oportunidade de atuar como 
                representante comercial, onde aprendi gestão do tempo, técnicas de negociação, comunicação eficaz e foco em resultados, 
                me proporcionando habilidades como resolução de problemas, empatia, trabalho em equipe e adaptabilidade.
                Tenho conhecimento em JavaScript, TypeScript, Python, MySQL, PostgreSQL, NestJS e arquitetura MVC, e
                estou aprofundando meus estudos em React, Node.js e práticas de desenvolvimento ágil.</p>
            
                <div class="about-buttons-data">
                    <div class="buttons-container">
                        <a href="${perfil.html_url}" target="_blank" class="botao">GitHub</a>
                        <a href="./assets/curriculo/allyson-curriculo.pdf" target="_blank" class="botao-outline">Currículo</a>
                    </div>
                    <div class="data-container">
                        <div class="data-item">
                            <span class="data-number">${perfil.followers}</span>
                            <span class="data-label">Seguidores</span>
                        </div>
                        <div class="data-item">
                            <span class="data-number">${perfil.public_repos}</span>
                            <span class="data-label">Repositores</span>
                        </div>
                    </div>
                </div>
            </article>`;
  } catch (error) {
    console.error("Erro ao buuscar os dados do GitHub:", error);
  }
}

async function getProjectsGithub() {
  try {
    const resposta = await fetch(
      "https://api.github.com/users/allysonaggp/repos?sort=updated&per_page=6",
    );
    const repositorios = await resposta.json();
    swiperWrapper.innerHTML = " ";

    // Cores e icones das linguagens
    const linguagens = {
      JavaScript: { icone: "javascript" },
      TypeScript: { icone: "typescript" },
      Python: { icone: "python" },
      java: { icone: "java" },
      HTML: { icone: "html" },
      CSS: { icone: "css" },
      PHP: { icone: "php" },
      "C#": { icone: "csharp" },
      Go: { icone: "go" },
      Kotlin: { icone: "kotlin" },
      Swift: { icone: "swift" },
    };
    repositorios.forEach((repositorio) => {
      const linguagemExibir = repositorio.language || "GitHub";
      const config = linguagens[repositorio.language] || { icone: "github" };
      const urlIcone = `./assets/icons/languages/${config.icone}.svg`;

      const nomeFormatado = repositorio.name
        .replace(/[-_]/g, " ")
        .replace(/[a-zA-Z0-9\s]/g, " ")
        .toUpperCase();

      const descricao = repositorio.description
        ? repositorio.description.length > 100
          ? repositorio.description.substring(0, 97) + "..."
          : repositorio.description
        : "Projeto desenvolvido no GitHub";

      // Tags
      const tags =
        repositorio.topics?.length > 0
          ? repositorio.topics
              .slice(0, 3)
              .map((topic) => `<span class="tag">${topic}</span>`)
              .join("")
          : `<span class="tag">${linguagemExibir}</span>`;

      // Botões de ação
      const botoesAcao = `
            <div class="project-buttons">
                <a href="${repositorio.html_url}" target="_blank" class="botao botao-sm">
                    GitHub
                </a>
                ${
                  repositorio.homepage
                    ? `
                <a href="${repositorio.homepage}" target="_blank" class="botao-outline botao-sm">
                    Deploy
                </a>
                `
                    : ""
                }
                </div>
            `;

      swiperWrapper.innerHTML += `
                <div class="swiper-slide">
                    <article class="project-card">
                        <div class="project-image">
                            <img src="${urlIcone}" alt="Ícone ${linguagemExibir}"
                                 onerror="this.onerror=null; this.src='./assets/icons/languages/github.svg';">
                        </div>
                        <div class="project-content">
                            <h3>${nomeFormatado}</h3>
                            <p>${descricao}</p>
                            <div class="project-tags">${tags}</div>
                            ${botoesAcao}
                        </div>
                    </article>
                </div>
            `;
    });
    iniciarSwiper();
  } catch (error) {
    console.error("Erro ao buscar rpositorios:", error);
  }
}

// Função de inicialização do Carrossel - Swiper
function iniciarSwiper() {
  new Swiper(".projects-swiper", {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 24,
    centeredSlides: false,
    loop: true,
    watchOverflow: true,

    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 40,
        centeredSlides: false,
      },
      769: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 40,
        centeredSlides: false,
      },
      1025: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 54,
        centeredSlides: false,
      },
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },

    autoplay: {
      delay: 5000,
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    },

    grabCursor: true,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
  });
}

// função de validação do formulário
formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  document.querySelectorAll("form span")
    .forEach((span) => (span.innerHTML = ""));

  let isValid = true;

  const nome = document.querySelector("#nome");
  const erroNome = document.querySelector("#erro-nome");

  if (nome.value.trim().lenght < 3) {
    erroNome.innerHTML = "O nome deve ter no mínimo 3 caracteres";
    if (isValid) nome.focus();
    isValid = false;
  }

  const email = document.querySelector("#email");
  const erroEmail = document.querySelector("#erro-email");

  if (!email.value.trim().match(emailRegex)) {
    erroEmail.innerHTML = "Digite um e-mailVálido.";
    if (isValid) email.focus();
    isValid = false;
  }

  const assunto = document.querySelector("#assunto");
  const erroAssunto = document.querySelector("erro-assunto");

  if (assunto.value.trim().length < 5) {
    erroAssunto.innerHTML = "O Assunto deve ter no mínimo 5 caracters";
    if (isValid) assunto.focus();
    isValid = false;
  }

  const mensagem = document.querySelector("#mensagem");
  const erroMensagem = document.querySelector("#erro-mensagem");

  if (mensagem.value.trim().length === 0) {
    erroMensagem.innerHTML = "A mensagem não pode der vazia.";
    if (isValid) mensagem.focus();
    isValid = false;
  }

  if(isValid){
    const submitButton = formulario.querySelector("button[type='submit']")
    submitButton.disabled=true
    submitButton.textContent = "Enviando..."

    formulario.submit()
  }
});

// Executar afunção ao carregar o script
getAboutGithub();
getProjectsGithub();
