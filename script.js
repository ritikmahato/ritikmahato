const progress = document.querySelector('.progress');

function updateProgress(){
  const h = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.width = h > 0 ? (window.scrollY / h * 100) + '%' : '0%';
}
window.addEventListener('scroll', updateProgress, {passive:true});
updateProgress();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, {threshold:0.12});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

/* PHOTO GALLERY */
const gallery = document.getElementById('photoGallery');

async function loadGallery() {
  if (!gallery) return;

  gallery.innerHTML = '<div class="gallery-note">Loading photos...</div>';

  try {
    const response = await fetch(
      'https://api.github.com/repos/ritikmahato/ritikmahato/contents/?ref=main'
    );

    if (!response.ok) throw new Error('Photos could not be loaded.');

    const files = await response.json();

    const photos = files
      .filter(file => file.type === 'file' && /\.(jpe?g)$/i.test(file.name))
      .filter(file => file.name.toLowerCase() !== 'profile.jpg')
      .sort((a, b) =>
        a.name.localeCompare(b.name, undefined, {numeric:true})
      );

    if (!photos.length) {
      gallery.innerHTML = '<div class="gallery-note">No gallery photos found.</div>';
      return;
    }

    gallery.innerHTML = '';

    photos.forEach((photo, index) => {
      const figure = document.createElement('figure');
      figure.className = 'gallery-item reveal show';

      const img = document.createElement('img');
      img.src = photo.download_url;
      img.alt = 'Ritik Mahato - Railway Signal Training Photo ' + (index + 1);
      img.loading = 'lazy';

      const caption = document.createElement('figcaption');
      caption.textContent = 'Railway • Signal Department • Training';

      figure.appendChild(img);
      figure.appendChild(caption);
      gallery.appendChild(figure);
    });

  } catch (error) {
    console.error(error);
    gallery.innerHTML =
      '<div class="gallery-note">Photos could not be loaded. Please refresh the page.</div>';
  }
}

loadGallery();
