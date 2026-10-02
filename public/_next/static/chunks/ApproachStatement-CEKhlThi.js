import{r as e}from"./rolldown-runtime-C60lm6uB.js";import{i as t,r as n}from"./framework-BgSIrAUN.js";var r=e(n(),1),i={section:`_section_q8x5g_1`,frame:`_frame_q8x5g_16`,deck:`_deck_q8x5g_30`,card:`_card_q8x5g_37`,cardTitle:`_cardTitle_q8x5g_46`,copy:`_copy_q8x5g_56`},a=t(),o=[{id:`intro`,title:`Approach`,copy:`I’m a designer, and I like getting my hands into the work. A tricky flow, an interface that won’t come together, a brief that needs questioning.

The job can stretch from one screen to helping a whole company decide what to build next.

I bring people into that work early, while there’s still room to argue, draw over my idea, and try something bolder. I want to help the team get somewhere we couldn’t have reached on our own.`},{id:`management`,title:`Management`,copy:`I want people to bring the half-formed thought. Ask for help. Tell me an idea doesn’t work — including mine.

That takes trust, and trust comes from how we respond in those moments.

I keep processes simple and make sure we know what we’re trying to do. Then I give people room to work, with help when they need it.`},{id:`design`,title:`Design`,copy:`Give me a whiteboard and a problem we haven’t figured out yet.

I like that stage: rough sketches, crossed-out ideas, someone grabbing the marker because it’s easier to draw than explain.

We can disagree while things are still cheap to change. It’s easier to get behind a bold idea when you’ve had a hand in shaping it.`},{id:`cycle`,title:`Cycle`,copy:`Discover, build, learn. Make something real enough to test, see where it falls apart, and try again.

I like getting into the details, but a detail has to earn its place: does it help someone understand what’s happening or get something done?

Sometimes that means another iteration. Sometimes it means deleting the thing I spent all afternoon on.`}];function s(){let e=(0,r.useRef)(null),t=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let n=e.current,r=t.current;if(!n||!r)return;let i=Array.from(n.querySelectorAll(`[data-approach-card]`)),a=window.matchMedia(`(prefers-reduced-motion: reduce)`),o=null,s=()=>{if(o=null,n.dataset.animated=String(!a.matches),a.matches)return;let e=r.offsetHeight;n.style.setProperty(`--frame-height`,`${e}px`);let t=Math.min(0,window.innerHeight-e);r.style.setProperty(`--pin-top`,`${t}px`);let s=Math.max(1,n.offsetHeight-e),c=Math.min(1,Math.max(0,(t-n.getBoundingClientRect().top)/s)),l=Math.max(e,i[0].offsetHeight+(i.length-1)*10);i.forEach((e,t)=>{let n=t===0?1:Math.min(1,Math.max(0,c*(i.length-1+.8)-.4-(t-1)));e.style.setProperty(`--card-y`,`${t*10+(1-n)*l}px`)})};function c(){o===null&&(o=window.requestAnimationFrame(s))}s();let l=new ResizeObserver(c);return l.observe(r),window.addEventListener(`scroll`,c,{passive:!0}),window.addEventListener(`resize`,c),a.addEventListener(`change`,c),()=>{o!==null&&window.cancelAnimationFrame(o),l.disconnect(),window.removeEventListener(`scroll`,c),window.removeEventListener(`resize`,c),a.removeEventListener(`change`,c),delete n.dataset.animated}},[]),(0,a.jsx)(`section`,{"aria-label":`Approach`,className:i.section,id:`approach`,ref:e,children:(0,a.jsx)(`div`,{className:i.frame,ref:t,children:(0,a.jsx)(`div`,{className:i.deck,children:o.map(e=>(0,a.jsxs)(`article`,{"aria-labelledby":`approach-${e.id}-title`,className:i.card,"data-approach-card":e.id,children:[(0,a.jsx)(`h2`,{className:i.cardTitle,id:`approach-${e.id}-title`,children:e.title}),(0,a.jsx)(`div`,{className:i.copy,children:e.copy.split(`

`).map(e=>(0,a.jsx)(`p`,{children:e},e))})]},e.id))})})})}export{s as ApproachStatement};