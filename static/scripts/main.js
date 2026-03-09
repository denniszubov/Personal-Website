$(document).ready(function () {
  document.getElementById('year').textContent = new Date().getFullYear();

  fetch('data.json')
    .then(res => res.json())
    .then(data => {
      renderHero(data);
      renderAbout(data.about);
      renderEducation(data.education);
      renderSkills(data.skills);
      renderExperience(data.experience);
      renderCertifications(data.certifications);
      renderProjects(data.projects);
      renderFooter(data.links);

      AOS.init({ once: true, duration: 600, offset: 80, easing: 'ease-out' });
    });
});

// --- Hero ---

function renderHero(data) {
  document.getElementById('hero-name').textContent = data.name;
  document.getElementById('hero-tagline').textContent = data.tagline;

  document.getElementById('social-buttons').innerHTML =
    `<a class="btn btn-default btn-round btn-lg btn-icon" href="${data.links.linkedin}" rel="tooltip" title="Follow me on Linkedin" target="_blank"><i class="fa fa-linkedin"></i></a>` +
    `<a class="btn btn-default btn-round btn-lg btn-icon" href="${data.links.github}" rel="tooltip" title="Follow me on GitHub" target="_blank"><i class="fa fa-github"></i></a>`;
}

// --- About ---

function renderAbout(about) {
  document.getElementById('about-text').innerHTML =
    about.paragraphs.map(p => `<p>${p}</p>`).join('');

  document.getElementById('basic-info').innerHTML =
    Object.entries(about.info).map(([key, val], i) =>
      `<div class="row${i > 0 ? ' mt-3' : ''}">
        <div class="col-sm-4"><strong class="text-uppercase">${key}:</strong></div>
        <div class="col-sm-8">${val}</div>
      </div>`
    ).join('');
}

// --- Shared card renderer (education, experience, certifications) ---

function renderCard(item, i, contentHtml) {
  const delay = i * 100;
  const logoImg = item.link
    ? `<a href="${item.link}" target="_blank"><img src="${item.logo}" alt="${item.logoAlt}"/></a>`
    : `<img src="${item.logo}" alt="${item.logoAlt}"/>`;

  return `
    <div class="card" data-aos="fade-up" data-aos-delay="${delay}">
      <div class="row">
        <div class="col-md-3">
          <div class="card-body cc-education-header">${logoImg}</div>
        </div>
        <div class="col-md-9">
          <div class="card-body">${contentHtml}</div>
        </div>
      </div>
    </div>`;
}

// --- Education ---

function renderEducation(education) {
  document.getElementById('education-list').innerHTML = education.map((edu, i) => {
    const details = edu.details.map(d => `<li>${d}</li>`).join('');
    const content = `
      <div class="h5">${edu.title}</div>
      <p class="category">${edu.school}<br>${edu.dates}</p>
      <ul>${details}</ul>`;
    return renderCard(edu, i, content);
  }).join('');
}

// --- Skills ---

function renderSkills(skills) {
  const entries = Object.entries(skills);
  const half = Math.ceil(entries.length / 2);

  const buildCol = items => items.map(([key, val]) =>
    `<div class="skill-category">
      <div class="h6 skill-category-title">${key}</div>
      <p>${val}</p>
    </div>`
  ).join('');

  document.getElementById('skills-content').innerHTML =
    `<div class="col-md-6">${buildCol(entries.slice(0, half))}</div>` +
    `<div class="col-md-6">${buildCol(entries.slice(half))}</div>`;
}

// --- Experience ---

function renderExperience(experience) {
  document.getElementById('experience-list').innerHTML = experience.map((exp, i) => {
    let titleBlock;
    if (exp.roles) {
      titleBlock = `
        <div class="role-timeline">
          ${exp.roles.map((role, j) => `
            <div class="role-entry${j === 0 ? ' role-current' : ''}">
              <div class="h5 role-title">${role.title}</div>
              <div class="role-dates">${role.dates}</div>
            </div>
          `).join('')}
        </div>
        <p class="category">${exp.company}<br>${exp.location}<br>${exp.dates}</p>`;
    } else {
      titleBlock = `
        <div class="h5">${exp.title}</div>
        <p class="category">${exp.company}<br>${exp.location}<br>${exp.dates}</p>`;
    }
    const content = titleBlock + `<p>${exp.description}</p>`;
    return renderCard(exp, i, content);
  }).join('');
}

// --- Certifications ---

function renderCertifications(certifications) {
  document.getElementById('certifications-list').innerHTML = certifications.map((cert, i) => {
    const item = { logo: cert.logo, logoAlt: cert.logoAlt, link: cert.logoLink };
    const content = `
      <div class="h5">${cert.title}</div>
      <p class="category">${cert.date}</p>
      <p><a class="link-primary" href="${cert.certLink}" target="_blank"><b>View certification</b></a></p>
      <p>${cert.contents}</p>`;
    return renderCard(item, i, content);
  }).join('');
}

// --- Projects ---

function renderProjects(projects) {
  document.getElementById('projects-list').innerHTML = projects.map((proj, i) => {
    const delay = i * 100;
    const linksHtml = proj.links && proj.links.length > 0
      ? `<div class="project-links">${proj.links.map(l =>
          `<a href="${l.url}" target="_blank" class="btn btn-default btn-sm">${l.label}</a>`
        ).join(' ')}</div>`
      : '';

    return `
      <div class="col-md-6">
        <div class="card" data-aos="fade-up" data-aos-delay="${delay}">
          <div class="card-body text-center">
            <div class="h5">${proj.title}</div>
            <img class="project-image img-raised" src="${proj.image}" alt="${proj.imageAlt}"/>
            ${linksHtml}
          </div>
        </div>
      </div>`;
  }).join('');
}

// --- Footer ---

function renderFooter(links) {
  document.getElementById('footer-social').innerHTML =
    `<a class="cc-linkedin btn btn-link" href="${links.linkedin}" target="_blank"><i class="fa fa-linkedin fa-2x" aria-hidden="true"></i></a>` +
    `<a class="cc-github btn btn-link" href="${links.github}" target="_blank"><i class="fa fa-github fa-2x" aria-hidden="true"></i></a>`;
}

// --- Smooth scroll ---

$('a.smooth-scroll').click(function (event) {
  if (
    location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
    location.hostname === this.hostname
  ) {
    let target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      event.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top }, 1000, function () {
        const $target = $(target);
        $target.focus();
        if (!$target.is(':focus')) {
          $target.attr('tabindex', '-1');
          $target.focus();
        }
      });
    }
  }
});
