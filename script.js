const IMG={i1:"images/sami-books.jpg",i2:"images/garden-walk.jpg",i3:"images/paper.jpg",i4:"images/wooden-box.jpg",i5:"images/friends-search.jpg",i6:"images/friends-garden.jpg",i7:"images/school-path.jpg",i8:"images/new-friend.jpg",i9:"images/sami-sad.jpg",i10:"images/backpack.jpg",i11:"images/teacher.jpg",i12:"images/sami-happy.jpg"};
const AR='٠١٢٣٤٥٦٧٨٩',toAr=n=>String(n).replace(/\d/g,d=>AR[d]);

/* ---------- small drawing helpers ---------- */
function heart(x,y,r,c,o=1){return `<path d="M${x} ${y+r*.9} C${x-r*1.7} ${y-r*.15} ${x-r*.75} ${y-r*1.35} ${x} ${y-r*.45} C${x+r*.75} ${y-r*1.35} ${x+r*1.7} ${y-r*.15} ${x} ${y+r*.9}Z" fill="${c}" opacity="${o}"/>`}
function star(x,y,r,c,o=1){let d='';for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*.46:r;d+=(i?'L':'M')+(x+rr*Math.cos(a)).toFixed(1)+' '+(y+rr*Math.sin(a)).toFixed(1)}return `<path d="${d}Z" fill="${c}" opacity="${o}" stroke="${c}" stroke-width="1.5" stroke-linejoin="round"/>`}
function box(x,y,s=1,open=false){
 let g=`<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="2" rx="52" ry="7" fill="#16384A" opacity=".14"/>`;
 if(open)g+=`<g transform="rotate(-30 -44 -48)"><rect x="-46" y="-66" width="92" height="17" rx="5" fill="#D29660"/>${star(0,-57,5,'#FFCF4A')}</g><rect x="-16" y="-64" width="34" height="26" rx="3" fill="#FFFBEF" stroke="#E6D3A3" stroke-width="2" transform="rotate(-8 1 -51)"/><path d="M-10 -56 h20 M-10 -50 h16" stroke="#C9B98E" stroke-width="2" transform="rotate(-8 1 -51)"/>`;
 g+=`<rect x="-42" y="-48" width="84" height="48" rx="7" fill="url(#wood)"/><path d="M-42 -32 H42 M-42 -16 H42" stroke="#9C6234" stroke-width="2" opacity=".45"/>`;
 g+=star(-19,-25,10,'#FFCF4A')+heart(18,-25,9,'#FF8A5B')+star(0,-10,5,'#FFF1B8');
 if(!open)g+=`<rect x="-46" y="-60" width="92" height="16" rx="5" fill="#D29660"/>${star(-24,-52,4.5,'#FFCF4A')}${heart(0,-52,4,'#FF8A5B')}${star(24,-52,4.5,'#FFCF4A')}`;
 return g+'</g>';
}
function book(x,y,r,c){return `<g transform="translate(${x} ${y}) rotate(${r})"><rect x="-30" y="-10" width="60" height="20" rx="3" fill="${c}"/><rect x="-30" y="-10" width="8" height="20" fill="#16384A" opacity=".15"/><rect x="-18" y="-4" width="40" height="4" fill="#fff" opacity=".6"/></g>`}
function paper(x,y,r,s=1){return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><rect x="-60" y="-44" width="120" height="88" rx="5" fill="#FFFBEF" stroke="#E6D3A3" stroke-width="3"/><path d="M-44 -24h88M-44 -8h76M-44 8h84M-44 24h56" stroke="#CDBE95" stroke-width="5" stroke-linecap="round"/></g>`}
function mapArt(x,y,r,s=1){return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><path d="M-80 -56 L-26 -64 L26 -56 L80 -64 L80 56 L26 64 L-26 56 L-80 64Z" fill="#F4DFA6" stroke="#D9B867" stroke-width="3"/><path d="M-26 -64 V56 M26 -56 V64" stroke="#D9B867" stroke-width="2" opacity=".6"/><circle cx="-50" cy="-28" r="12" fill="#7ADBA5"/><circle cx="-36" cy="-34" r="9" fill="#5CC98F"/><circle cx="44" cy="30" r="11" fill="#7ADBA5"/><rect x="-62" y="22" width="26" height="20" rx="3" fill="#FF9F5A"/><path d="M-66 24 L-49 10 L-32 24Z" fill="#1FB2A9"/><path d="M-44 18 Q-10 -10 10 10 T50 -30" stroke="#E2574C" stroke-width="4" stroke-dasharray="7 7" fill="none" stroke-linecap="round"/><path d="M44 -40 l14 14 m0 -14 l-14 14" stroke="#E2574C" stroke-width="6" stroke-linecap="round"/></g>`}
function bagShape(x,y,s=1,dash=false){const st=dash?`fill="none" stroke="#F08A3C" stroke-width="5" stroke-dasharray="12 9"`:'';return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-16 -74 Q0 -96 16 -74" stroke="${dash?'#F08A3C':'#E07B32'}" stroke-width="7" fill="none" stroke-linecap="round" ${dash?'stroke-dasharray="8 7"':''}/><rect x="-32" y="-76" width="64" height="76" rx="18" ${st||'fill="#FF9F5A"'}/><rect x="-22" y="-38" width="44" height="28" rx="9" ${dash?'fill="none" stroke="#F08A3C" stroke-width="4" stroke-dasharray="8 7"':'fill="#FFB98A"'}/></g>`}
const sparkle=(list)=>list.map(([x,y,r,c])=>star(x,y,r,c||'#FFCF4A',.9)).join('');
const rays=(cx,cy,c='#FFE9A6',o=.45)=>Array.from({length:12},(_,i)=>{const a=i/12*Math.PI*2;return `<path d="M${cx} ${cy} L${(cx+500*Math.cos(a)).toFixed(0)} ${(cy+500*Math.sin(a)).toFixed(0)} L${(cx+500*Math.cos(a+.14)).toFixed(0)} ${(cy+500*Math.sin(a+.14)).toFixed(0)}Z" fill="${c}" opacity="${o}"/>`}).join('');
const SV=(bg,c)=>`<svg viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice"><rect width="400" height="320" fill="${bg}"/>${c}</svg>`;

/* ---------- illustrations drawn for pages without a photo ---------- */
const ART={
 treasure:SV('#DDF3FC',rays(200,190)+`<circle cx="200" cy="200" r="120" fill="url(#glow)"/>`+box(200,236,2.1)+sparkle([[70,70,12],[330,60,10],[320,170,8,'#1FB2A9'],[80,190,8,'#1FB2A9'],[200,50,7]])),
 note:SV('#FFF6E0',`<circle cx="70" cy="60" r="60" fill="#FFE9A6" opacity=".6"/><circle cx="340" cy="270" r="80" fill="#BDEBD5" opacity=".6"/>`+mapArt(250,150,14,.75)+paper(180,165,-8,1.35)+sparkle([[340,60,10],[60,250,9,'#1FB2A9'],[110,90,6]])),
 map:SV('#EAF7FF',`<circle cx="330" cy="70" r="70" fill="#CDEFFC"/><circle cx="60" cy="280" r="80" fill="#D7F5E6"/>`+mapArt(200,165,-6,1.45)+sparkle([[60,60,10],[350,260,9,'#1FB2A9']])),
 school:SV('#BFE7FA',`<circle cx="70" cy="62" r="56" fill="url(#glow)"/><circle cx="70" cy="62" r="28" fill="#FFD45C"/><g fill="#fff" opacity=".95"><ellipse cx="300" cy="60" rx="40" ry="17"/><ellipse cx="276" cy="66" rx="24" ry="13"/><ellipse cx="326" cy="66" rx="26" ry="13"/></g><path d="M0 230 Q200 190 400 225 V320 H0Z" fill="#A5E8C9"/><path d="M160 320 L240 320 L212 236 L190 236Z" fill="#F7E2B5"/><g transform="translate(200 238) scale(.62)"><rect x="-160" y="-150" width="320" height="150" rx="10" fill="#FFF4DC"/><rect x="-172" y="-168" width="344" height="26" rx="10" fill="#1FB2A9"/><rect x="-50" y="-206" width="100" height="56" rx="8" fill="#FFF4DC"/><path d="M-62 -200 L0 -238 L62 -200Z" fill="#14857F"/><circle cx="0" cy="-178" r="15" fill="#fff" stroke="#1FB2A9" stroke-width="4"/>${[-138,-92,58,104].map(x=>[-128,-78].map(y=>`<rect x="${x}" y="${y}" width="34" height="32" rx="5" fill="#A6E3F7" stroke="#fff" stroke-width="4"/>`).join('')).join('')}<path d="M-24 0 V-44 A24 24 0 0 1 24 -44 V0Z" fill="#FF9F5A"/></g>`+sparkle([[340,140,8],[40,160,7,'#1FB2A9']])),
 boxOpen:SV('#E3F7EC',rays(200,190,'#FFF3C4',.5)+`<circle cx="200" cy="200" r="110" fill="url(#glow)"/>`+box(200,244,2.15,true)+sparkle([[80,70,10],[320,70,12],[60,200,7,'#1FB2A9'],[340,200,8,'#1FB2A9']])),
 books:SV('#FFF3D6',`<rect y="210" width="400" height="110" fill="#F6DDB0"/><path d="M0 210 H400" stroke="#E8C88E" stroke-width="6"/>`+book(110,250,-18,'#5EC4F0')+book(190,274,12,'#FFCF4A')+book(280,256,-8,'#FF8A5B')+book(330,286,24,'#B39DDB')+book(70,290,10,'#86D9B4')+book(240,300,-4,'#1FB2A9')+`<path d="M150 150 l-14 -26 M200 140 v-30 M250 150 l14 -26" stroke="#F08A3C" stroke-width="7" stroke-linecap="round"/>`+sparkle([[60,80,9],[340,90,10]])),
 hand:SV('#FFF6DF',`<circle cx="200" cy="165" r="120" fill="url(#glow)"/><path d="M110 170 Q200 270 290 170 Q284 216 200 232 Q116 216 110 170Z" fill="#EDB98F"/><path d="M110 170 Q200 270 290 170" stroke="#D49A6E" stroke-width="4" fill="none"/>`+heart(200,128,46,'#FF8A5B')+sparkle([[80,70,12],[320,60,14],[340,160,8,'#1FB2A9'],[60,170,8,'#1FB2A9']])),
 missing:SV('#FFEFE4',`<circle cx="200" cy="170" r="110" fill="#fff" opacity=".7"/>`+bagShape(200,250,2,true)+`<text x="300" y="130" font-size="96" font-weight="800" fill="#F08A3C" font-family="Baloo Bhaijaan 2,Tahoma,sans-serif">؟</text><text x="70" y="170" font-size="64" font-weight="800" fill="#1FB2A9" font-family="Baloo Bhaijaan 2,Tahoma,sans-serif">؟</text>`),
 plant:SV('#E6F8F7',`<circle cx="200" cy="150" r="120" fill="url(#glow)"/><path d="M200 250 V130" stroke="#3FA772" stroke-width="8" stroke-linecap="round"/><path d="M200 200 Q160 180 150 150 M200 170 Q240 150 252 120" stroke="#3FA772" stroke-width="6" fill="none" stroke-linecap="round"/>`+heart(150,146,22,'#FF8A5B')+heart(254,116,24,'#FF8A5B')+heart(200,112,28,'#FF6F61')+`<path d="M150 250 h100 l-12 56 h-76Z" fill="#FF9F5A"/><rect x="142" y="242" width="116" height="18" rx="6" fill="#E07B32"/>`+heart(90,80,12,'#FF8A5B',.7)+heart(320,200,14,'#FF8A5B',.7)+sparkle([[320,70,10],[70,220,8,'#1FB2A9']])),
 secret:SV('#F1FBFA',rays(200,170,'#FFF1B8',.45)+paper(100,150,-12,.85)+mapArt(300,140,10,.7)+box(200,272,1.6,true)+sparkle([[200,60,12],[60,60,8,'#1FB2A9'],[350,260,8,'#1FB2A9']])),
 rainbow:SV('#EAF7FF',`<path d="M40 270 A160 160 0 0 1 360 270" stroke="#FF8A5B" stroke-width="22" fill="none"/><path d="M62 270 A138 138 0 0 1 338 270" stroke="#FFCF4A" stroke-width="22" fill="none"/><path d="M84 270 A116 116 0 0 1 316 270" stroke="#86D9B4" stroke-width="22" fill="none"/><path d="M106 270 A94 94 0 0 1 294 270" stroke="#5EC4F0" stroke-width="22" fill="none"/><g fill="#fff"><ellipse cx="50" cy="272" rx="44" ry="22"/><ellipse cx="350" cy="272" rx="44" ry="22"/></g>`+heart(200,200,26,'#FF6F61')+sparkle([[200,70,12],[80,90,9],[320,80,10],[140,140,6,'#1FB2A9'],[262,140,6,'#1FB2A9']])),
 playground:SV('#CFEFFC',`<circle cx="330" cy="60" r="50" fill="url(#glow)"/><circle cx="330" cy="60" r="24" fill="#FFD45C"/><g fill="#fff" opacity=".95"><ellipse cx="110" cy="58" rx="38" ry="16"/><ellipse cx="88" cy="64" rx="22" ry="12"/><ellipse cx="134" cy="64" rx="24" ry="12"/></g><path d="M0 222 Q200 196 400 222 V320 H0Z" fill="#A5E8C9"/><g transform="translate(300 232)"><path d="M-20 0 V-96 M10 0 V-96" stroke="#FF9F5A" stroke-width="6"/><path d="M-20 -24 H10 M-20 -48 H10 M-20 -72 H10" stroke="#FF9F5A" stroke-width="4"/><path d="M10 -96 Q34 -88 50 -44 T88 0" stroke="#FFCF4A" stroke-width="15" fill="none" stroke-linecap="round"/></g><circle cx="230" cy="250" r="12" fill="#FF8A5B"/><path d="M220 247 q10 7 20 0" stroke="#fff" stroke-width="3" fill="none"/><g transform="translate(110 262)"><rect x="-62" y="-30" width="124" height="11" rx="5" fill="#C98A55"/><rect x="-62" y="-50" width="124" height="10" rx="5" fill="#C98A55"/><path d="M-52 -19 V8 M52 -19 V8" stroke="#A86B3C" stroke-width="7"/><g transform="translate(-20 -30)"><path d="M-10 -40 Q0 -54 10 -40" stroke="#E0A91A" stroke-width="5" fill="none"/><rect x="-18" y="-42" width="36" height="42" rx="11" fill="#FFCF4A"/><rect x="-12" y="-20" width="24" height="15" rx="5" fill="#FFE08A"/></g></g>`),
 glowHeart:SV('#FFF7DA',rays(200,160,'#FFE9A6',.55)+`<circle cx="200" cy="160" r="130" fill="url(#glow)"/>`+heart(200,160,62,'#FF8A5B')+heart(200,160,34,'#FFB27A')+sparkle([[70,70,12],[330,70,12],[60,230,9,'#1FB2A9'],[340,240,9,'#1FB2A9'],[200,40,8]])),
 quran:`<svg viewBox="0 0 800 420" preserveAspectRatio="xMidYMid slice"><rect width="800" height="420" fill="url(#qbg)"/>${Array.from({length:14},(_,i)=>{const a=i/14*Math.PI*2;return `<path d="M400 220 L${(400+700*Math.cos(a)).toFixed(0)} ${(220+700*Math.sin(a)).toFixed(0)} L${(400+700*Math.cos(a+.12)).toFixed(0)} ${(220+700*Math.sin(a+.12)).toFixed(0)}Z" fill="#FFF1B8" opacity=".22"/>`}).join('')}<circle cx="400" cy="225" r="190" fill="url(#glow)"/><path d="M326 272 L472 394 M474 272 L328 394" stroke="#9C6234" stroke-width="24" stroke-linecap="round"/><path d="M326 272 L472 394 M474 272 L328 394" stroke="#C98A55" stroke-width="10" stroke-linecap="round" opacity=".6"/><path d="M262 210 L400 262 L400 310 L262 258Z" fill="#B97A45"/><path d="M538 210 L400 262 L400 310 L538 258Z" fill="#A86B3C"/><path d="M272 192 Q340 196 400 236 L400 290 Q340 250 272 246Z" fill="#1F7A5A"/><path d="M528 192 Q460 196 400 236 L400 290 Q460 250 528 246Z" fill="#1F7A5A"/><path d="M282 186 Q342 190 398 228 L398 280 Q342 242 282 238Z" fill="#FFFDF4" stroke="#E2C27A" stroke-width="2.5"/><path d="M518 186 Q458 190 402 228 L402 280 Q458 242 518 238Z" fill="#FFFDF4" stroke="#E2C27A" stroke-width="2.5"/>${star(170,120,8,'#FFD45C')}${star(640,106,10,'#FFD45C')}${star(600,320,6,'#fff')}${star(200,320,7,'#fff')}</svg>`
};
const ICON_HELP=`<svg viewBox="0 0 120 90"><rect x="30" y="56" width="60" height="12" rx="3" fill="#FF8A5B"/><rect x="34" y="44" width="54" height="12" rx="3" fill="#5EC4F0"/><rect x="32" y="32" width="56" height="12" rx="3" fill="#FFCF4A"/>${heart(60,18,9,'#FF8A5B')}<path d="M22 70 Q60 90 98 70" stroke="#EDB98F" stroke-width="8" fill="none" stroke-linecap="round"/></svg>`;
const ICON_WELCOME=`<svg viewBox="0 0 120 90"><circle cx="40" cy="40" r="20" fill="#F3CBA5"/><circle cx="33" cy="37" r="2.6" fill="#2A2A35"/><circle cx="47" cy="37" r="2.6" fill="#2A2A35"/><path d="M32 47 Q40 54 48 47" stroke="#7E2E33" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="82" cy="40" r="20" fill="#EDB98F"/><circle cx="75" cy="37" r="2.6" fill="#2A2A35"/><circle cx="89" cy="37" r="2.6" fill="#2A2A35"/><path d="M74 47 Q82 54 90 47" stroke="#7E2E33" stroke-width="2.5" fill="none" stroke-linecap="round"/><rect x="24" y="62" width="32" height="24" rx="9" fill="#86D9B4"/><rect x="66" y="62" width="32" height="24" rx="9" fill="#1FB2A9"/>${heart(61,16,7,'#FF8A5B')}</svg>`;
const ICON_WORD=`<svg viewBox="0 0 120 90"><path d="M24 12 h72 a14 14 0 0 1 14 14 v26 a14 14 0 0 1 -14 14 h-38 l-14 14 v-14 h-20 a14 14 0 0 1 -14 -14 v-26 a14 14 0 0 1 14 -14z" fill="#fff" stroke="#1FB2A9" stroke-width="4"/>${heart(60,42,13,'#FF8A5B')}</svg>`;

/* ---------- text helpers ---------- */
const SC={sami:'#0E8C85',ahmed:'#A86A00',newkid:'#2E8F5F',hassan:'#2F6BA0',teacher:'#8A4FB8',finder:'#D9582A',students:'#2386BD',all:'#D9661F'};
const nm=(k,t)=>`<b style="color:${SC[k]}">${t}</b>`;
const Q=(k,t)=>k==='note'?`<span class="rd">«${t}»</span>`:`<span class="qt" style="color:${SC[k]}">«${t}»</span>`;
const W=t=>`<span class="wow">${t}</span>`;
const p=t=>`<p>${t}</p>`;
const photo=(src,pos='center',zoom=1)=>({h:`<img src="${src}" alt="" style="object-position:${pos};${zoom>1?`transform:scale(${zoom});transform-origin:${pos}`:''}">`});
const cut=(src,pos='center',zoom=1)=>({h:`<img src="${src}" alt="" style="${zoom>1?`transform:scale(${zoom});transform-origin:${pos}`:''}">`,cls:'cut'});
const art=k=>({h:ART[k]});
const tag=(a,b)=>b?`<b>${a}</b> · ${b}`:a;

/* ---------- every interior page: picture on top, text below ---------- */
const STORY=[
 {t:'t0',img:art('treasure'),c:1,txt:`<div class="ttl">صُنْعُ المَعْرُوفِ كَنْزٌ حَقِيقِيٌّ</div><div class="stl">قصة سامي وأصدقائه عن حسن الخلق</div>`},
 {t:'t1',img:photo(IMG.i7,'center 60%'),tag:tag('المشهد الأول','الورقة الغامضة'),txt:p(`في يومٍ من الأيام، كان ${nm('sami','سامي')} يمشي في طريقه إلى المدرسة، والشمس تبتسم في السماء الزرقاء.`)},
 {t:'t1',img:photo(IMG.i3),txt:p(`${W('وفجأةً')} رأى ${nm('sami','سامي')} ورقةً صغيرةً على الأرض، فتعجّب وقال: ${Q('sami','ما هذه الورقة على الأرض؟')}`)},
 {t:'t1',img:art('note'),txt:p(`التقط سامي الورقة وقرأها: ${Q('note','افتح صندوق المعروف، وسترى أثر الخير بعينيك!')} ثم قال: ${Q('sami','عجيب! ومن كتب هذا؟')}`)},
 {t:'t1',img:art('map'),txt:p(`اقترب صديقه ${nm('ahmed','أحمد')} وسأله: ${Q('ahmed','ماذا وجدت؟')} فأجابه ${nm('sami','سامي')}: ${Q('sami','رسالة غريبة ومعها خريطة صغيرة!')}`)},
 {t:'t1',img:art('school'),txt:p(`ضحك ${nm('ahmed','أحمد')} وقال: ${Q('ahmed','يبدو أنها مغامرة!')} فقال ${nm('sami','سامي')} بحماس: ${Q('sami','سأكتشف الأمر بعد المدرسة.')}`)},
 {t:'t2',img:photo(IMG.i2,'center 62%'),tag:tag('المشهد الثاني','الصندوق العجيب'),txt:p(`وبعد انتهاء الدوام، حمل ${nm('sami','سامي')} الخريطة وذهب إلى الحديقة، وهو يقول: ${Q('sami','حسب الخريطة يجب أن يكون الصندوق هنا...')}`)},
 {t:'t2',img:photo(IMG.i4,'center 35%'),txt:p(`بحث ${nm('sami','سامي')} تحت الشجرة الكبيرة، حتى ${W('وجد صندوقًا خشبيًا!')} ففتحه بسرعة... ثم قال متفاجئًا: ${Q('sami','لا يوجد كنز!')}`)},
 {t:'t2',img:art('boxOpen'),txt:p(`نظر سامي داخل الصندوق، فوجد رسالةً مكتوبًا فيها: ${Q('note','ضع في هذا الصندوق كل عمل حسن تقوم به، ثم راقب ما يحدث.')}`)},
 {t:'t2',img:photo(IMG.i4,'40% 45%',1.5),txt:p(`تعجّب ${nm('sami','سامي')} وقال: ${Q('sami','وهل يمكن للأعمال الصغيرة أن تُحدث فرقًا؟')} ثم أغلق الصندوق، وفكّر قليلًا، وقال: ${Q('sami','سأجرب.')}`)},
 {t:'t3',img:art('books'),tag:tag('المشهد الثالث','أعمال صغيرة'),txt:p(`وفي المدرسة، سقطت الكتب من ${nm('hassan','عمّ حسن')} عامل المدرسة، فقال: ${Q('hassan','أوه! سقطت الكتب كلها!')}`)},
 {t:'t3',img:cut(IMG.i1),txt:p(`أسرع ${nm('sami','سامي')} إليه وقال: ${Q('sami','لا تقلق يا عم حسن، سأساعدك.')} فابتسم ${nm('hassan','عمّ حسن')} وقال: ${Q('hassan','بارك الله فيك يا بني.')}`)},
 {t:'t3',img:art('playground'),txt:p(`وفي الفسحة، رأى سامي ${nm('newkid','تلميذًا جديدًا')} يقف وحده، فقال التلميذ الجديد: ${Q('newkid','لا أعرف أحدًا هنا.')}`)},
 {t:'t3',img:photo(IMG.i8,'center 58%'),txt:p(`فمدّ ${nm('sami','سامي')} يده إليه وقال: ${Q('sami','تعال، العب معنا.')} ففرح ${nm('newkid','التلميذ الجديد')} وقال: ${Q('newkid','حقًا؟')}`)},
 {t:'t3',img:photo(IMG.i8,'center 47%',1.45),txt:p(`فأجابه ${nm('sami','سامي')} مبتسمًا: ${Q('sami','بالطبع، الأصدقاء يرحبون بالجميع.')} فقال ${nm('newkid','التلميذ الجديد')}: ${Q('newkid','شكرًا لك يا سامي.')}`)},
 {t:'t3',img:art('hand'),c:1,txt:`<div class="big">«الكلمة الطيبة والمساعدة البسيطة تصنعان فرقًا كبيرًا».</div>`},
 {t:'t4',img:cut(IMG.i9),tag:tag('المشهد الرابع','الأزمة'),txt:p(`وبعد عدة أيام، بحث ${nm('sami','سامي')} عن حقيبته ${W('فلم يجدها!')} فقال حزينًا: ${Q('sami','أين حقيبتي؟! كانت هنا!')}`)},
 {t:'t4',img:art('missing'),txt:p(`سأله ${nm('ahmed','أحمد')}: ${Q('ahmed','هل بحثت في الفصل؟')} فقال ${nm('sami','سامي')}: ${Q('sami','نعم، لم أجدها.')}`)},
 {t:'t4',img:photo(IMG.i5,'40% center'),txt:p(`فجاء الأصدقاء ليساعدوه. قال ${nm('newkid','التلميذ الجديد')}: ${Q('newkid','سأبحث في الساحة.')} وقال ${nm('hassan','عمّ حسن')}: ${Q('hassan','وأنا سأفتش الممرات.')}`)},
 {t:'t4',img:photo(IMG.i5,'45% 40%',1.45),txt:p(`وقال ${nm('ahmed','أحمد')}: ${Q('ahmed','هيا يا أصدقاء، لنساعد سامي.')} وانطلق الجميع يبحثون في كل مكان.`)},
 {t:'t4',img:cut(IMG.i10),txt:p(`${W('وفجأةً')} صاح ${nm('finder','أحد الطلاب')}: ${Q('finder','وجدتها! الحقيبة في قاعة الأنشطة!')}`)},
 {t:'t4',img:photo(IMG.i12,'center 38%'),txt:p(`ففرح ${nm('sami','سامي')} كثيرًا وقال: ${Q('sami','وجدتموها! شكرًا لكم جميعًا.')}`)},
 {t:'t5',img:photo(IMG.i11,'center 30%'),tag:tag('المشهد الخامس','كشف السر'),txt:p(`وفي الفصل، قال ${nm('sami','سامي')} للمعلم: ${Q('sami','لا أفهم لماذا ساعدني الجميع بهذه السرعة.')} فقال ${nm('teacher','المعلم')}: ${Q('teacher','لأن الخير الذي صنعته عاد إليك.')}`)},
 {t:'t5',img:art('plant'),txt:p(`سأل سامي: ${Q('sami','ماذا تقصد؟')} فقال ${nm('teacher','المعلم')}: ${Q('teacher','عندما ساعدت الآخرين، زرعت المحبة في قلوبهم، وعندما احتجت إليهم وقفوا بجانبك.')}`)},
 {t:'t5',img:photo(IMG.i11,'55% 30%',1.5),txt:p(`ففهم ${nm('sami','سامي')} وقال: ${Q('sami','إذن هذا هو أثر المعروف!')} ثم ابتسم ${nm('teacher','المعلم')} وقال: ${Q('teacher','وهناك سر آخر...')}`)},
 {t:'t5',img:art('secret'),txt:p(`فسأله سامي: ${Q('sami','ما هو؟')} قال ${nm('teacher','المعلم')}: ${Q('teacher','أنا من وضعت الورقة والخريطة والصندوق.')} فتعجّب ${nm('students','الطلاب')} وقالوا: ${Q('students','ماذا؟!')}`)},
 {t:'t5',img:art('treasure'),txt:p(`قال ${nm('teacher','المعلم')}: ${Q('teacher','أردت أن تتعلموا أن حسن الخلق وصنائع المعروف كنزٌ حقيقي.')}`)},
 {t:'t5',img:photo(IMG.i6,'center 60%'),txt:p(`فقال ${nm('sami','سامي')}: ${Q('sami','الآن فهمت... الخير لا يضيع أبدًا.')} وقال ${nm('all','الجميع')} بصوتٍ واحد: ${Q('all','نعم، الخير يعود إلى صاحبه دائمًا.')}`)},
 {t:'t5',img:art('rainbow'),tag:'النهاية',c:1,txt:`<span class="lbl">الرسالة</span>حسن الخلق وصنائع المعروف يزرعان المحبة بين الناس، وما يقدمه الإنسان من خير يعود إليه يومًا بأجمل صورة.`},
 {t:'t0',img:art('quran'),tag:tag('نتعلم من القرآن','سورة القلم'),c:1,txt:`<div class="ayah">وَإِنَّ لَكَ لَأَجْرًا غَيْرَ مَمْنُونٍ ﴿٣﴾<br>وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ ﴿٤﴾</div><div class="src">سورة القلم، الآيتان ٣ و٤</div>`},
 {t:'t0',img:art('glowHeart'),txt:p(`في هاتين الآيتين أثنى الله تعالى على نبيّنا محمد ﷺ لعظمة أخلاقه، ووعده بأجرٍ دائمٍ لا ينقطع، وهذا معنى ${W('غَيْرَ مَمْنُونٍ')}. ونتعلم من أخلاقه ﷺ الصدق والرحمة والإحسان إلى الآخرين.`)},
 {t:'t0',img:{h:`<div class="tiles"><div>${ICON_HELP}أساعد غيري</div><div>${ICON_WELCOME}أرحّب بصديقي</div><div>${ICON_WORD}أقول كلمة طيبة</div></div>`},c:1,txt:`<span class="lbl">سؤال للتفكير</span><div class="ask">كيف نقتدي بالنبي ﷺ في حُسن الخُلُق؟</div>`},
 {t:'t0',img:photo(IMG.i6,'35% 65%',1.35),tag:'كنز المعروف',c:1,txt:`<div>«أقتدي بالنبي ﷺ في حُسن خُلُقه، وأحرص على فعل الخير كل يوم».</div><div class="ask" style="margin-top:.4em">ما عمل المعروف الذي ستقوم به اليوم؟</div>`},
 {t:'t0',img:art('boxOpen'),c:1,txt:`<div class="ttl" style="font-size:1.45em">انتهت القصة، وبقي أثر المعروف</div><div><button class="restart" data-restart>إعادة قراءة القصة</button></div>`}
];

/* reading order: front cover, story pages, back cover */
const COVER={hard:1,html:`<div class="cv"><div class="cv-t">صُنْعُ المَعْرُوفِ<br>كَنْزٌ حَقِيقِيٌّ</div><div class="cv-p"><img src="${IMG.i6}" alt=""></div><div class="cv-s">قصة سامي وأصدقائه عن حسن الخلق</div></div>`};
const BACK={hard:1,html:`<div class="cv"><svg class="box" viewBox="0 0 200 150">${box(100,140,1.8)}${sparkle([[30,30,9],[170,24,11]])}</svg><div class="cv-t" style="font-size:7cqw">الخير لا يضيع أبدًا</div><div class="cv-s">قصة سامي وأصدقائه</div></div>`};
const R=[COVER,...STORY,BACK];
const N=R.length;
if(N%2)console.warn('page count must be even');

function pageEl(pg,r){
 const d=document.createElement('div');
 d.className='page '+(r%2?'pr':'pl')+(pg.hard?' hard':' '+pg.t);
 if(pg.hard){d.dataset.density='hard';d.innerHTML=pg.html;return d}
 d.innerHTML=`<div class="pg"><div class="ill ${pg.img.cls||''}">${pg.img.h}${pg.tag?`<div class="tag">${pg.tag}</div>`:''}</div><div class="txt${pg.c?' c':''}"><div class="in">${pg.txt}</div></div></div><div class="num">${toAr(r)}</div>`;
 return d;
}
const els=R.map(pageEl);

/* make every text fit its box without shrinking too much */
function fitText(){
 const m=document.getElementById('measure');
 els.forEach(el=>{const t=el.querySelector('.txt');if(!t)return;
  m.appendChild(el);let s=4.6;t.style.fontSize=s+'cqw';
  const inn=t.querySelector('.in');
  while(s>3.7&&inn.scrollHeight>t.clientHeight-2){s-=.1;t.style.fontSize=s.toFixed(2)+'cqw'}
  if(inn.scrollHeight>t.clientHeight-2)console.warn('text too long on page',els.indexOf(el));
  el.dataset.fs=s.toFixed(2);m.removeChild(el)});
}

const stage=document.getElementById('stage'),bookEl=document.getElementById('book');
function fit(){let h=innerHeight-120,w=h*550/720;const maxW=innerWidth*.95/2;if(w>maxW)w=maxW;stage.style.width=Math.floor(w*2)+'px'}
fit();addEventListener('resize',fit);

let pf;
const ind=document.getElementById('ind'),back=document.getElementById('back'),fwd=document.getElementById('fwd'),again=document.getElementById('again'),hint=document.getElementById('hint');
function update(){
 const L=pf.getCurrentPageIndex(),front=L===N-1,backC=L===0;
 stage.classList.toggle('open',!front&&!backC);
 stage.style.transform=front?'translateX(25%)':backC?'translateX(-25%)':'none';
 let txt;
 if(front)txt='الغلاف';else if(backC)txt='الغلاف الخلفي';
 else{const a=L%2?L:L-1;txt=`الصفحة ${toAr(N-2-a)} من ${toAr(N-2)}`}
 ind.textContent=txt;back.disabled=front;fwd.disabled=backC;
 again.classList.toggle('show',L<=2);
 hint.style.opacity=front||(innerWidth<innerHeight&&innerWidth<700)?1:0;
 if(!front&&innerWidth<innerHeight&&innerWidth<700)hint.textContent='أدِر الجهاز أفقيًا لتكبير الكتاب';
}
function start(){
 fitText();
 /* the library turns pages left-to-right, so pages are added in reverse:
    the next page always turns over from the left onto the right, like an Arabic book */
 els.slice().reverse().forEach(e=>bookEl.appendChild(e));
 pf=new St.PageFlip(bookEl,{width:550,height:720,size:'stretch',minWidth:120,maxWidth:1400,minHeight:157,maxHeight:1830,
  showCover:true,usePortrait:false,mobileScrollSupport:false,maxShadowOpacity:.6,flippingTime:950,drawShadow:true,showPageCorners:true,startPage:N-1,clickEventForward:true});
 pf.loadFromHTML(bookEl.querySelectorAll('.page'));
 pf.on('flip',update);pf.on('init',update);
 setTimeout(()=>{update();stage.classList.add('ready')},60);
 fwd.onclick=()=>pf.flipPrev('bottom');back.onclick=()=>pf.flipNext('bottom');
 const restart=()=>pf.flip(N-1,'bottom');
 again.onclick=restart;
 bookEl.addEventListener('click',e=>{if(e.target.closest('[data-restart]'))restart()});
 addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key===' ')pf.flipPrev('bottom');if(e.key==='ArrowRight')pf.flipNext('bottom')});
}
document.getElementById('fs').onclick=()=>{try{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()}catch(_){}};
document.addEventListener('fullscreenchange',()=>{document.getElementById('fs').textContent=document.fullscreenElement?'الخروج من ملء الشاشة':'ملء الشاشة';setTimeout(fit,100)});
Promise.race([document.fonts?document.fonts.ready:Promise.resolve(),new Promise(r=>setTimeout(r,2500))]).then(start);
