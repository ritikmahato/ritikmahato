const progress = document.querySelector('.progress');

function updateProgress(){
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = h > 0 ? (window.scrollY / h * 100) + '%' : '0%';
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

/*
  Gallery:
  Put your extracted photos inside:
    training/
    personal/
  Then add their exact filenames below.
  Example:
    {src:'training/photo1.jpg', title:'STTC Kharagpur Training'}
*/
const galleryPhotos = [
  // Add exact uploaded photo paths here after the GitHub upload.
];

const gallery = document.getElementById('photoGallery');
if (gallery) {
  if (!galleryPhotos.length) {
    gallery.innerHTML = '<div class="gallery-note">Training and personal photos are ready to be added here after the photo files are uploaded to the repository.</div>';
  } else {
    galleryPhotos.forEach(photo => {
      const figure = document.createElement('figure');
      figure.className = 'gallery-item';
      figure.innerHTML = `<img src="${photo.src}" alt="${photo.title}" loading="lazy"><figcaption>${photo.title}</figcaption>`;
      gallery.appendChild(figure);
    });
  }
}
