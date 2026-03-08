// Fetch data.json and render all sections
$(document).ready(function() {
  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  fetch('data.json')
    .then(function(res) { return res.json(); })
    .then(function(data) {
      renderHero(data);
      renderAbout(data.about);
      renderEducation(data.education);
      renderSkills(data.skills);
      renderExperience(data.experience);
      renderCertifications(data.certifications);
      renderProjects(data.projects);
      renderFooter(data.links);

      // Re-initialize AOS after content is injected
      AOS.init({
        once: true,
        duration: 600,
        offset: 80,
        easing: 'ease-out'
      });
    });
});

function renderHero(data) {
  document.getElementById('hero-name').textContent = data.name;
  document.getElementById('hero-tagline').textContent = data.tagline;

  document.getElementById('hero-linkedin').innerHTML =
    '<a class="btn btn-primary btn-contact" href="' + data.links.linkedin + '" target="_blank">Message on LinkedIn</a>';

  document.getElementById('social-buttons').innerHTML =
    '<a class="btn btn-default btn-round btn-lg btn-icon" href="' + data.links.linkedin + '" rel="tooltip" title="Follow me on Linkedin" target="_blank"><i class="fa fa-linkedin"></i></a>' +
    '<a class="btn btn-default btn-round btn-lg btn-icon" href="' + data.links.github + '" rel="tooltip" title="Follow me on GitHub" target="_blank"><i class="fa fa-github"></i></a>';
}

function renderAbout(about) {
  var aboutHtml = '';
  about.paragraphs.forEach(function(p) {
    aboutHtml += '<p>' + p + '</p>';
  });
  document.getElementById('about-text').innerHTML = aboutHtml;

  var infoHtml = '';
  var keys = Object.keys(about.info);
  keys.forEach(function(key, i) {
    var mt = i > 0 ? ' mt-3' : '';
    infoHtml +=
      '<div class="row' + mt + '">' +
        '<div class="col-sm-4"><strong class="text-uppercase">' + key + ':</strong></div>' +
        '<div class="col-sm-8">' + about.info[key] + '</div>' +
      '</div>';
  });
  document.getElementById('basic-info').innerHTML = infoHtml;
}

function renderEducation(education) {
  var html = '';
  education.forEach(function(edu, i) {
    var delay = i * 100;
    var detailsHtml = '';
    edu.details.forEach(function(d) {
      detailsHtml += '<li>' + d + '</li>';
    });
    html +=
      '<div class="card" data-aos="fade-up" data-aos-delay="' + delay + '">' +
        '<div class="row">' +
          '<div class="col-md-3">' +
            '<div class="card-body cc-education-header">' +
              '<img src="' + edu.logo + '" alt="' + edu.logoAlt + '"/>' +
            '</div>' +
          '</div>' +
          '<div class="col-md-9">' +
            '<div class="card-body">' +
              '<div class="h5">' + edu.title + '</div>' +
              '<p class="category">' + edu.school + '<br>' + edu.dates + '</p>' +
              '<p><ul>' + detailsHtml + '</ul></p>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  });
  document.getElementById('education-list').innerHTML = html;
}

function renderSkills(skills) {
  var keys = Object.keys(skills);
  var half = Math.ceil(keys.length / 2);
  var col1 = keys.slice(0, half);
  var col2 = keys.slice(half);

  function buildCol(arr) {
    var h = '';
    arr.forEach(function(key) {
      h +=
        '<div class="skill-category">' +
          '<div class="h6 skill-category-title">' + key + '</div>' +
          '<p>' + skills[key] + '</p>' +
        '</div>';
    });
    return h;
  }

  document.getElementById('skills-content').innerHTML =
    '<div class="col-md-6">' + buildCol(col1) + '</div>' +
    '<div class="col-md-6">' + buildCol(col2) + '</div>';
}

function renderExperience(experience) {
  var html = '';
  experience.forEach(function(exp, i) {
    var delay = i * 100;
    html +=
      '<div class="card" data-aos="fade-up" data-aos-delay="' + delay + '">' +
        '<div class="row">' +
          '<div class="col-md-3">' +
            '<div class="card-body cc-education-header">' +
              '<a href="' + exp.link + '" target="_blank"><img src="' + exp.logo + '" alt="' + exp.logoAlt + '"/></a>' +
            '</div>' +
          '</div>' +
          '<div class="col-md-9">' +
            '<div class="card-body">' +
              '<div class="h5">' + exp.title + '</div>' +
              '<p class="category">' + exp.company + '<br>' + exp.location + '<br>' + exp.dates + '</p>' +
              '<p>' + exp.description + '</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  });
  document.getElementById('experience-list').innerHTML = html;
}

function renderCertifications(certifications) {
  var html = '';
  certifications.forEach(function(cert, i) {
    var delay = i * 100;
    html +=
      '<div class="card" data-aos="fade-up" data-aos-delay="' + delay + '">' +
        '<div class="row">' +
          '<div class="col-md-3">' +
            '<div class="card-body cc-education-header">' +
              '<a href="' + cert.logoLink + '" target="_blank"><img src="' + cert.logo + '" alt="' + cert.logoAlt + '"/></a>' +
            '</div>' +
          '</div>' +
          '<div class="col-md-9">' +
            '<div class="card-body">' +
              '<div class="h5">' + cert.title + '</div>' +
              '<p class="category">' + cert.date + '</p>' +
              '<p><a class="link-primary" href="' + cert.certLink + '" target="_blank"><b>View certification</b></a></p>' +
              '<p>' + cert.contents + '</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  });
  document.getElementById('certifications-list').innerHTML = html;
}

function renderProjects(projects) {
  var html = '';
  projects.forEach(function(proj, i) {
    var delay = i * 100;
    var linksHtml = '';
    if (proj.links && proj.links.length > 0) {
      linksHtml = '<div class="project-links">';
      proj.links.forEach(function(link) {
        linksHtml += '<a href="' + link.url + '" target="_blank" class="btn btn-default btn-sm">' + link.label + '</a> ';
      });
      linksHtml += '</div>';
    }
    html +=
      '<div class="col-md-6">' +
        '<div class="card" data-aos="fade-up" data-aos-delay="' + delay + '">' +
          '<div class="card-body text-center">' +
            '<div class="h5">' + proj.title + '</div>' +
            '<img class="project-image img-raised" src="' + proj.image + '" alt="' + proj.imageAlt + '"/>' +
            linksHtml +
          '</div>' +
        '</div>' +
      '</div>';
  });
  document.getElementById('projects-list').innerHTML = html;
}

function renderFooter(links) {
  document.getElementById('footer-social').innerHTML =
    '<a class="cc-linkedin btn btn-link" href="' + links.linkedin + '" target="_blank"><i class="fa fa-linkedin fa-2x " aria-hidden="true"></i></a>' +
    '<a class="cc-github btn btn-link" href="' + links.github + '" target="_blank"><i class="fa fa-github fa-2x" aria-hidden="true"></i></a>';
}

// Smooth scroll for links with hashes
$('a.smooth-scroll')
.click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
    &&
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000, function() {
        // Callback after animation
        // Must change focus!
        var $target = $(target);
        $target.focus();
        if ($target.is(":focus")) { // Checking if the target was focused
          return false;
        } else {
          $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
          $target.focus(); // Set focus again
        };
      });
    }
  }
});
