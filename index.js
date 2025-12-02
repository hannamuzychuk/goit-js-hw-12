import{a as u,S as d,i as a}from"./assets/vendor-DvfmeZXB.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();const p="https://pixabay.com/api/",f="53360647-c263b6c497f5f63021bb419c5",m=15;async function y(n,o){const e={key:f,q:n,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:m,page:o};return(await u.get(p,{params:e})).data}const c=document.querySelector(".gallery"),l=document.querySelector(".loader");document.querySelector(".load-more-btn");const h=new d(".gallery a",{captionData:"alt",captionDelay:250});function g(n){const o=n.map(e=>`
                <li class="gallery-item">
                    <a href="${e.largeImageURL}">
                        <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
                    </a>
                    <div class="info">
                     <p><b>Likes </b>${e.likes}</p>
                     <p><b>Views </b>${e.views}</p>
                     <p><b>Comments </b>${e.comments}</p>
                     <p><b>Downloads </b>${e.downloads}</p>
                    </div>
                </li>`).join("");c.insertAdjacentElement("beforeend",o),h.refresh()}function b(){c.innerHTML=""}function L(){l.classList.remove("hidden")}function S(){l.classList.add("hidden")}const w=document.querySelector(".form"),E=document.querySelector('input[name="search-text"]');w.addEventListener("submit",q);function q(n){n.preventDefault();const o=E.value.trim();if(!o){a.error({title:"Error",message:"Search field cannot be empty!",position:"topRight"});return}b(),L(),y(o).then(e=>{if(e.hits.length===0){a.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}g(e.hits)}).catch(e=>{console.error(e),a.error({title:"Error",message:"Something went wrong!",position:"topRight"})}).finally(()=>{S()})}
//# sourceMappingURL=index.js.map
