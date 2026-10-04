const progress=document.querySelector('.progress');
window.addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=(scrollY/h*100)+'%';});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(x=>observer.observe(x));
document.getElementById('year').textContent=new Date().getFullYear();
