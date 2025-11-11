function initSliders(){
  const wraps = document.querySelectorAll('.il-slider-wrap');
  wraps.forEach(wrap => {
    const track = wrap.querySelector('.il-slider');
    const prev = wrap.querySelector('.il-prev');
    const next = wrap.querySelector('.il-next');
    if(!track || !prev || !next) return;

    const update = () => {
      const maxScroll = track.scrollWidth - track.clientWidth - 1;
      prev.disabled = track.scrollLeft <= 0;
      next.disabled = track.scrollLeft >= maxScroll;
    };

    const scrollBySlide = (dir) => {
      const slide = track.querySelector('.il-slide');
      const styles = getComputedStyle(track);
      const gap = parseFloat(styles.gap || 0);
      const step = slide ? slide.clientWidth + gap : track.clientWidth * 0.9;
      track.scrollBy({ left: dir * step, behavior: 'smooth' });
      setTimeout(update, 300);
    };

    prev.addEventListener('click', () => scrollBySlide(-1));
    next.addEventListener('click', () => scrollBySlide(1));

    wrap.addEventListener('keydown', (e)=>{
      if(e.key === 'ArrowLeft'){ e.preventDefault(); scrollBySlide(-1); }
      if(e.key === 'ArrowRight'){ e.preventDefault(); scrollBySlide(1); }
    });

    track.addEventListener('scroll', () => update(), { passive:true });
    window.addEventListener('resize', update, { passive:true });
    update();
  });
}