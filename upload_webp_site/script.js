// Header scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll',()=>{
    if(window.scrollY > 30) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });

  // Mobile menu
  const menuBtn = document.querySelector('.menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  if(menuBtn && mobileMenu){
    const closeMobileMenu = () => {
      menuBtn.classList.remove('is-open');
      mobileMenu.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded','false');
      mobileMenu.setAttribute('aria-hidden','true');
    };

    menuBtn.addEventListener('click',()=>{
      const isOpen = mobileMenu.classList.toggle('is-open');
      menuBtn.classList.toggle('is-open',isOpen);
      menuBtn.setAttribute('aria-expanded',String(isOpen));
      mobileMenu.setAttribute('aria-hidden',String(!isOpen));
    });

    mobileMenu.querySelectorAll('a').forEach(link=>{
      link.addEventListener('click',closeMobileMenu);
    });

    window.addEventListener('resize',()=>{
      if(window.innerWidth > 960) closeMobileMenu();
    });
  }

  // Fade in on scroll
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  },{threshold:0.14,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.fade-in').forEach(el=>io.observe(el));

  // Product filter
  const filterBtns = document.querySelectorAll('.product-nav button');
  const products = document.querySelectorAll('.product');
  filterBtns.forEach(btn=>{
    btn.addEventListener('click',()=>{
      filterBtns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      products.forEach(p=>{
        if(cat === 'all' || p.dataset.cat === cat){
          p.classList.remove('hidden');
        }else{
          p.classList.add('hidden');
        }
      });
    });
  });
