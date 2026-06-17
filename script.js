document.addEventListener('DOMContentLoaded',()=>{
  // GSAP Setup
  if(typeof gsap==='undefined')return;
  gsap.registerPlugin(ScrollTrigger);

  // Custom Cursor
  const cursor=document.querySelector('.cursor');
  const follower=document.querySelector('.cursor-follower');
  if(cursor&&follower&&window.innerWidth>768){
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

  // Navbar Scroll
  const navbar=document.getElementById('navbar');
  window.addEventListener('scroll',()=>{
    navbar.classList.toggle('scrolled',window.scrollY>80);
  });

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
        target.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // Hero Animations
  const heroTl=gsap.timeline({defaults:{ease:'power3.out'}});
  heroTl
    .from('.hero-bg-img',{scale:1.2,duration:1.8})
    .from('.hero-tag',{opacity:0,y:30,duration:0.8},'-=1')
    .from('.hero-tag .tag-line',{width:0,duration:0.6},'-=0.6')
    .from('.hero-title .line span',{y:120,opacity:0,duration:1,stagger:0.15},'-=0.6')
    .from('.hero-sub',{opacity:0,y:30,duration:0.8},'-=0.5')
    .from('.hero-cta',{opacity:0,y:30,duration:0.8},'-=0.5')
    .from('.hero-stats',{opacity:0,y:30,duration:0.8},'-=0.4')
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
          duration:2,
          ease:'power2.out',
          onUpdate:function(){
            el.textContent=Math.floor(this.targets()[0].val).toLocaleString('id-ID');
          }
        });
      }
    });
  });

  // Reveal Animations
  gsap.utils.toArray('[data-reveal]').forEach(el=>{
    gsap.from(el,{
      scrollTrigger:{trigger:el,start:'top 88%',once:true},
      opacity:0,y:60,duration:1,ease:'power3.out'
    });
  });

  // Parallax Hero BG
  gsap.to('.hero-bg-img',{
    scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true},
    y:200,scale:1
  });

  // Ecosystem Cards Stagger
  ScrollTrigger.batch('.eco-card',{
    start:'top 85%',
    onEnter:batch=>gsap.from(batch,{opacity:0,y:50,stagger:0.1,duration:0.8,ease:'power3.out'})
  });

  // Product Cards Stagger
  ScrollTrigger.batch('.product-card',{
    start:'top 85%',
    onEnter:batch=>gsap.from(batch,{opacity:0,y:50,stagger:0.08,duration:0.8,ease:'power3.out'})
  });

  // Ingredient Cards
  ScrollTrigger.batch('.ingredient-card',{
    start:'top 90%',
    onEnter:batch=>gsap.from(batch,{opacity:0,y:40,stagger:0.06,duration:0.7,ease:'power3.out'})
  });

  // Op Image Stack
  gsap.from('.op-img-1',{
    scrollTrigger:{trigger:'.op-image-stack',start:'top 80%',once:true},
    opacity:0,scale:0.9,duration:1,ease:'power3.out'
  });
  gsap.from('.op-img-2',{
    scrollTrigger:{trigger:'.op-image-stack',start:'top 70%',once:true},
    opacity:0,x:40,y:40,duration:1,ease:'power3.out',delay:0.3
  });

  // Section Titles Reveal
  gsap.utils.toArray('.section-title-lg').forEach(el=>{
    gsap.from(el,{
      scrollTrigger:{trigger:el,start:'top 85%',once:true},
      opacity:0,y:80,duration:1.2,ease:'power3.out'
    });
  });

  // Marquee Speed on Scroll
  const marquee=document.querySelector('.marquee-content');
  if(marquee){
    let currentSpeed=30;
    window.addEventListener('scroll',()=>{
      const speed=Math.max(10,30-Math.abs(window.scrollY-currentSpeed)*0.01);
      marquee.style.animationDuration=speed+'s';
    });
  }
});
