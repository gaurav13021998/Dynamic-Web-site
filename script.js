'use strict';

///////////////////////////////////////
// Modal window

const allSectionsLink = document.querySelector('.nav__links');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const operationalTabContainer = document.querySelector('.operations__tab-container');
const operationTab = document.querySelectorAll('.operations__tab');
const operationalContent = document.querySelectorAll('.operations__content');


const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const navHover = function(e ,opacity){
   if(e.target.classList.contains('nav__link')){
     const targetLink = e.target;
     const siblingLink = targetLink.closest('.nav').querySelectorAll('.nav__link');
     const targetLogo = targetLink.closest('.nav').querySelector('img');
     siblingLink.forEach(t => {
       if(t !== targetLink){
         t.style.opacity = opacity;
       }
       targetLogo.style.opacity = opacity;
     })
   }
    
}

nav.addEventListener('mouseover',function(e){
  e.preventDefault();
  navHover(e, 0.5);
})

nav.addEventListener('mouseout',function(e){
  e.preventDefault();
  navHover(e, 1);
})

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click',function(e){

  e.preventDefault();

  section1.scrollIntoView({behavior:'smooth'});

})

allSectionsLink.addEventListener('click',function(e){
  e.preventDefault();

  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth'});

  }
})

operationalTabContainer.addEventListener('click',function(e){
  const clicked = e.target.closest('.operations__tab');

  if(!clicked) return;

  if(clicked){
    operationTab.forEach(t => t.classList.
      remove('operations__tab--active'));
      operationalContent.forEach(c => c.classList.
        remove('operations__content--active'));
    clicked.classList.add('operations__tab--active');

    const {tab} = clicked.dataset;
    document.querySelector(`.operations__content--${tab}`).classList.add('operations__content--active');
  }
})

// const initialCoord = section1.getBoundingClientRect();
// console.log(initialCoord);

// window.addEventListener('scroll',function(){
//   console.log(window.scrollY);

//   if (window.scrollY > initialCoord.top){
//     nav.classList.add('sticky');
//   }else{
//     nav.classList.remove('sticky');
//   }
// })
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

let callBack = function(entries){
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        nav.classList.add('sticky');
      }else{
        nav.classList.remove('sticky');
      }
    });
}

let options = {
  root : null,
  rootMargin : `-${navHeight}px`,
  threshold: 0,
}

let observer = new IntersectionObserver(callBack,options);
observer.observe(header);


const allSection = document.querySelectorAll('.section');

const revealSections = function(entries, observer){
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}
  
const sectionObserver = new IntersectionObserver(revealSections,{
  root: null,
  threshold: 0.15,
})

allSection.forEach((section) =>{
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
})

const allImgTargets = document.querySelectorAll('img[data-src');

const loadImage = function(entries, observer){
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load',function(){
    entry.target.classList.remove('lazy-img');
  })
  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
})

allImgTargets.forEach(img => imgObserver.observe(img));


const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
const slides = document.querySelectorAll('.slide');

let currSlide = 0;
let maxSlide = slides.length;

const startSlide = function(slide){
  slides.forEach((s,i) => {
    s.style.transform = `translateX(${100*(i-slide)}%)`;
  })
  
}
startSlide(0);

const nextSlide = function(){
  if(currSlide === maxSlide-1){
    currSlide = 0;
  }else{
    currSlide++;
  }
  startSlide(currSlide);
}



const prevSlide = function(){
  if(currSlide === 0){
    currSlide = maxSlide-1;
  }else{
    currSlide--;
  }
  startSlide(currSlide);
}

btnRight.addEventListener('click',nextSlide);
btnLeft.addEventListener('click',prevSlide);


