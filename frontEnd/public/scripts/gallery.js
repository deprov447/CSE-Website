
const portfolioItems = document.querySelectorAll('.portfolio-item-wrapper');

portfolioItems.forEach(portfolioItem => {
portfolioItem.addEventListener('mouseover', () => {
  console.log(portfolioItem.childNodes[1].classList)
  portfolioItem.childNodes[1].classList.add('image-blur');
});

portfolioItem.addEventListener('mouseout', () => {
  console.log(portfolioItem.childNodes[1].classList)
  portfolioItem.childNodes[1].classList.remove('image-blur');
});
});

AOS.init();