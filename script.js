document.addEventListener('DOMContentLoaded',()=>{
  // Loader
  const loader=document.getElementById('loader');
  const loaderFill=document.querySelector('.loader-bar-fill');
  if(loader&&loaderFill){
    let progress=0;
    const interval=setInterval(()=>{
      progress+=Math.random()*15+5;
      if(progress>100)progress=100;
      loaderFill.style.width=progress+'%';
      if(progress>=100){
        clearInterval(interval);
        setTimeout(()=>loader.classList.add('hidden'),400);
      }
    },100);
  }

  // Scroll Progress
  const scrollProgress=document.getElementById('scrollProgress');
  if(scrollProgress){
    window.addEventListener('scroll',()=>{
      const h=document.documentElement;
      const pct=(h.scrollTop/(h.scrollHeight-h.clientHeight))*100;
      scrollProgress.style.width=pct+'%';
    },{passive:true});
  }

  // GSAP Setup
  if(typeof gsap==='undefined')return;
  gsap.registerPlugin(ScrollTrigger);

  const isMobile=window.innerWidth<=768;

  // Custom Cursor (desktop only)
  if(!isMobile){
    const cursor=document.querySelector('.cursor');
    const follower=document.querySelector('.cursor-follower');
    if(cursor&&follower){
      let mx=0,my=0,cx=0,cy=0;
      document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});
      (function loop(){
        cx+=(mx-cx)*0.15;cy+=(my-cy)*0.15;
        cursor.style.transform=`translate(${mx-4}px,${my-4}px)`;
        follower.style.transform=`translate(${cx-18}px,${cy-18}px)`;
        requestAnimationFrame(loop);
      })();
      document.querySelectorAll('a,button,.product-card,.eco-card,.ingredient-card').forEach(el=>{
        el.addEventListener('mouseenter',()=>follower.classList.add('hover'));
        el.addEventListener('mouseleave',()=>follower.classList.remove('hover'));
      });
    }
  }

  // Navbar Scroll
  const navbar=document.getElementById('navbar');
  let lastScroll=0;
  window.addEventListener('scroll',()=>{
    const st=window.scrollY;
    navbar.classList.toggle('scrolled',st>80);
    lastScroll=st;
  },{passive:true});

  // Hamburger
  const hamburger=document.getElementById('hamburger');
  const mobileMenu=document.getElementById('mobileMenu');
  hamburger.addEventListener('click',()=>{
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow=mobileMenu.classList.contains('active')?'hidden':'';
  });
  document.querySelectorAll('[data-mobile-nav]').forEach(link=>{
    link.addEventListener('click',()=>{
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow='';
    });
  });

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
    anchor.addEventListener('click',function(e){
      const target=document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        const offset=navbar.offsetHeight+20;
        const y=target.getBoundingClientRect().top+window.pageYOffset-offset;
        window.scrollTo({top:y,behavior:'smooth'});
      }
    });
  });

  // Hero Animations (reduced on mobile)
  const heroTl=gsap.timeline({defaults:{ease:'power3.out'}});
  heroTl
    .from('.hero-bg-img',{scale:1.2,duration:isMobile?1.2:1.8})
    .from('.hero-tag',{opacity:0,y:isMobile?20:30,duration:isMobile?0.6:0.8},'-=1')
    .from('.hero-tag .tag-line',{width:0,duration:0.6},'-=0.6')
    .from('.hero-title .line span',{y:isMobile?60:120,opacity:0,duration:isMobile?0.7:1,stagger:0.15},'-=0.6')
    .from('.hero-sub',{opacity:0,y:isMobile?20:30,duration:isMobile?0.6:0.8},'-=0.5')
    .from('.hero-cta',{opacity:0,y:isMobile?20:30,duration:isMobile?0.6:0.8},'-=0.5')
    .from('.hero-stats',{opacity:0,y:isMobile?20:30,duration:isMobile?0.6:0.8},'-=0.4')
    .from('.hero-scroll',{opacity:0,duration:0.6},'-=0.3');

  // Counter Animation
  document.querySelectorAll('[data-count]').forEach(el=>{
    const target=parseInt(el.dataset.count);
    ScrollTrigger.create({
      trigger:el,
      start:'top 90%',
      once:true,
      onEnter:()=>{
        gsap.to({val:0},{
          val:target,
          duration:isMobile?1.5:2,
          ease:'power2.out',
          onUpdate:function(){
            el.textContent=Math.floor(this.targets()[0].val).toLocaleString('id-ID');
          }
        });
      }
    });
  });

  // Reveal Animations (reduced on mobile)
  gsap.utils.toArray('[data-reveal]').forEach(el=>{
    gsap.from(el,{
      scrollTrigger:{trigger:el,start:'top 88%',once:true},
      opacity:0,y:isMobile?30:60,duration:isMobile?0.7:1,ease:'power3.out'
    });
  });

  // Parallax Hero BG (desktop only)
  if(!isMobile){
    gsap.to('.hero-bg-img',{
      scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true},
      y:200,scale:1
    });
  }

  // Ecosystem Cards Stagger
  ScrollTrigger.batch('.eco-card',{
    start:'top 85%',
    onEnter:batch=>gsap.from(batch,{opacity:0,y:isMobile?30:50,stagger:0.1,duration:isMobile?0.6:0.8,ease:'power3.out'})
  });

  // Product Cards Stagger
  ScrollTrigger.batch('.product-card',{
    start:'top 85%',
    onEnter:batch=>gsap.from(batch,{opacity:0,y:isMobile?30:50,stagger:0.08,duration:isMobile?0.6:0.8,ease:'power3.out'})
  });

  // Ingredient Cards
  ScrollTrigger.batch('.ingredient-card',{
    start:'top 90%',
    onEnter:batch=>gsap.from(batch,{opacity:0,y:isMobile?20:40,stagger:0.06,duration:isMobile?0.5:0.7,ease:'power3.out'})
  });

  // Op Image Stack
  gsap.from('.op-img-1',{
    scrollTrigger:{trigger:'.op-image-stack',start:'top 80%',once:true},
    opacity:0,scale:0.9,duration:isMobile?0.7:1,ease:'power3.out'
  });
  if(!isMobile){
    gsap.from('.op-img-2',{
      scrollTrigger:{trigger:'.op-image-stack',start:'top 70%',once:true},
      opacity:0,x:40,y:40,duration:1,ease:'power3.out',delay:0.3
    });
  }

  // Section Titles Reveal
  gsap.utils.toArray('.section-title-lg').forEach(el=>{
    gsap.from(el,{
      scrollTrigger:{trigger:el,start:'top 85%',once:true},
      opacity:0,y:isMobile?40:80,duration:isMobile?0.8:1.2,ease:'power3.out'
    });
  });

  // FAQ Toggle
  document.querySelectorAll('.faq-toggle').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const item=btn.closest('.faq-item');
      const isActive=item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('active'));
      if(!isActive)item.classList.add('active');
    });
  });

  // Touch: close mobile menu on back button
  window.addEventListener('popstate',()=>{
    if(mobileMenu.classList.contains('active')){
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow='';
    }
  });
});
