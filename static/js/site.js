const nav = document.getElementById('navbar');
if (nav) { const onScroll=()=>nav.classList.toggle('scrolled',scrollY>12); addEventListener('scroll',onScroll,{passive:true});onScroll(); }
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}},{threshold:.06});
  document.documentElement.classList.add('motion-ready');
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}
const chinese=document.documentElement.lang==='zh-CN';
async function copyText(text) {
  if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(text);return;}
  const field=document.createElement('textarea');field.value=text;field.style.position='fixed';field.style.opacity='0';document.body.append(field);field.select();
  const copied=document.execCommand('copy');field.remove();if(!copied)throw new Error('Copy unavailable');
}
document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
  const target=document.getElementById(button.dataset.copy);if(!target)return;
  const original=button.textContent;const status=button.closest('section')?.querySelector('.copy-status');
  try{await copyText(target.textContent);button.textContent=chinese?'已复制':'Copied';if(status)status.textContent=chinese?'已复制，可粘贴给你的 Agent。':'Copied. Paste it into your Agent.';}
  catch{if(status)status.textContent=chinese?'自动复制不可用，请选择并复制上方文字。':'Copy is unavailable. Select and copy the text above.';else button.textContent=chinese?'请手动复制':'Select text to copy';}
  setTimeout(()=>{button.textContent=original;},2200);
}));
document.querySelectorAll('[data-play]').forEach(button=>{
 const video=document.getElementById(button.dataset.play);if(!video)return;
 button.hidden=false;
 const status=button.closest('.hero-film')?.querySelector('.play-status');
 button.addEventListener('click',async()=>{try{await video.play();button.hidden=true;}catch{button.hidden=true;video.controls=true;if(status)status.textContent=chinese?'请点击视频左下角的播放按钮。':'Use the play control at the bottom left of the video.';}});
 video.addEventListener('play',()=>{button.hidden=true;if(status)status.textContent='';});
 video.addEventListener('ended',()=>{button.hidden=false;});
});
