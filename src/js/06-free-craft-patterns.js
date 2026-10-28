
/* ============ FREE CRAFT PATTERNS ============ */
const PATTERNS={
 crochet:{name:'Crochet',emoji:'🧶',img:'pattern-crochet.png',items:[
   {name:'Single-Crochet Scarf',level:'Beginner',time:'~3 hrs',
    materials:['1 ball medium/worsted yarn','5.0 mm (H) crochet hook','Scissors','Tapestry needle'],
    steps:['Make a slip knot on the hook.','Chain 21 (20 stitches plus 1 turning chain), or any even width you like.','Row 1: single crochet (sc) into the 2nd chain from the hook, then sc in every chain across (20 sc).','Chain 1 and turn your work.','Row 2: sc in each stitch across (20 sc).','Repeat the last two steps until the scarf is about 150 cm long.','Cut the yarn and pull it through the last loop to fasten off.','Weave in the loose ends with the tapestry needle.'],
    tip:'Keep your stitch count the same every row so the edges stay straight.'},
   {name:'Classic Granny Square',level:'Beginner +',time:'~1 hr',
    materials:['Yarn in 1 to 2 colours','4.0 mm (G) crochet hook','Tapestry needle'],
    steps:['Chain 4 and join with a slip stitch to the first chain to form a ring.','Round 1: chain 3 (counts as 1 double crochet), work 2 dc into the ring, then [chain 2, 3 dc] three times, chain 2, and join with a slip stitch.','Round 2: slip into the first chain-2 space; in each corner space work (3 dc, chain 2, 3 dc), with chain 1 between corners.','Continue adding rounds the same way, putting (3 dc, ch 2, 3 dc) in every corner.','Fasten off and weave in the ends.'],
    tip:'Join several squares together to make a blanket, bag or top.'},
   {name:'Cotton Dishcloth',level:'Beginner',time:'~1.5 hrs',
    materials:['Cotton yarn','5.0 mm hook','Scissors'],
    steps:['Chain 26.','Row 1: sc in the 2nd chain from the hook and across (25 sc).','Chain 1 and turn.','Repeat sc rows until the piece is square.','Fasten off and weave in the ends.'],
    tip:'Cotton works best here because it absorbs water and washes well.'}
 ]},
 sewing:{name:'Sewing',emoji:'🧵',img:'pattern-sewing.png',items:[
   {name:'Simple Tote Bag',level:'Beginner',time:'~1 hr',
    materials:['2 fabric rectangles about 40 x 40 cm','2 strips about 60 x 8 cm for straps','Matching thread','Pins','Scissors','Sewing machine or needle'],
    steps:['Place the two big rectangles right sides together and pin.','Sew down both sides and across the bottom with a 1.5 cm seam, leaving the top open.','For each strap, fold the strip in half lengthwise (right sides in), sew the long edge, turn it right side out and press.','Fold the top edge of the bag over twice (about 1 cm) and press to make a hem.','Pin the strap ends inside the top edge and sew around the hem, catching the straps.','Turn the bag right side out and press.'],
    tip:'Iron each seam as you go — it makes the bag look neat and professional.'},
   {name:'Envelope Pillowcase',level:'Beginner',time:'~45 min',
    materials:['Fabric to fit your pillow plus seam allowance','Thread','Pins','Scissors'],
    steps:['Measure your pillow; cut one piece the height of the pillow and about 1.7 times its width.','Hem the two short ends by folding over twice and sewing.','Lay the fabric right side up, then fold both hemmed ends toward the middle so they overlap and form a pocket the size of the pillow.','Pin, then sew the top and bottom edges with a 1.5 cm seam.','Turn it right side out, push out the corners, and insert the pillow.'],
    tip:'The overlapping back means no zip or buttons are needed.'},
   {name:'Drawstring Bag',level:'Beginner',time:'~40 min',
    materials:['Fabric rectangle about 30 x 50 cm','Cord or ribbon about 80 cm','Thread','Safety pin'],
    steps:['Fold the fabric in half (right sides together) into a 30 x 25 cm shape.','Sew the two sides, stopping about 4 cm from the top.','Fold the top edge down twice to make a channel and sew around it, leaving the ends open.','Attach the cord to a safety pin and thread it through the channel all the way around.','Turn it right side out and pull the cord to close.'],
    tip:'Great for storing shoes, toys, or market produce.'}
 ]},
 beading:{name:'Beading',emoji:'📿',img:'pattern-beading.png',items:[
   {name:'Stretch Beaded Bracelet',level:'Beginner',time:'~20 min',
    materials:['Seed or pony beads','Elastic beading cord','Scissors','Clear glue (optional)'],
    steps:['Cut about 25 cm of elastic cord.','String beads until the line fits comfortably around your wrist.','Tie the two ends together with a double (surgeon) knot.','Add a tiny dab of clear glue to the knot and let it dry.','Trim the excess cord and slide the knot inside the nearest bead to hide it.'],
    tip:'Leave a little stretch room so the bracelet slides over your hand.'},
   {name:'Beaded Keychain',level:'Beginner',time:'~25 min',
    materials:['Assorted beads','Nylon beading thread or wire','1 key ring','Scissors'],
    steps:['Cut about 20 cm of thread and fold it in half through the key ring.','Thread both strands through your first bead and slide it up to the ring.','Continue adding beads in your chosen pattern.','At the end, tie a secure double knot and trim the thread.'],
    tip:'Use a big, bold bead at the bottom so the design hangs nicely.'},
   {name:'Simple Beaded Necklace',level:'Beginner',time:'~30 min',
    materials:['Beads','Beading thread','2 crimp beads','1 clasp set','Flat-nose pliers'],
    steps:['Cut the thread to your chosen length plus 10 cm.','Slide on a crimp bead and one half of the clasp, loop the thread back through the crimp, and squeeze it flat with pliers.','String your beads in the pattern you like.','At the other end, add the second crimp bead and the other half of the clasp, loop back, and crimp.','Trim the extra thread close to the crimp.'],
    tip:'Crimp tightly at both ends so the beads cannot slip off.'}
 ]}
};
let patCat='crochet';
function patternsBanner(){const d=document.createElement('div');d.className='panel';
  d.innerHTML='<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap"><div style="font-size:30px">📐</div><div style="flex:1;min-width:160px"><h2 class="title" style="margin:0">Free craft patterns</h2><p class="sub" style="margin:2px 0 0">Step-by-step crochet, sewing &amp; beading projects — free forever.</p></div><button class="btn gold" onclick="show(\'patterns\')">Browse patterns</button></div>';
  return d;}
function setPatCat(k){patCat=k;renderPatterns();}
function renderPatterns(){const w=document.getElementById('patWrap');if(!w)return;
  let chips='';Object.keys(PATTERNS).forEach(k=>{const c=PATTERNS[k];chips+='<button class="onb-chip'+(patCat===k?' sel':'')+'" onclick="setPatCat(\''+k+'\')">'+c.emoji+' '+c.name+'</button>';});
  let cards='';PATTERNS[patCat].items.forEach((p,i)=>{cards+='<div class="deck" onclick="openPattern(\''+patCat+'\','+i+')"><div class="emoji">'+PATTERNS[patCat].emoji+'</div><h3>'+esc(p.name)+'</h3><div class="meta"><span class="chip">'+p.level+'</span><span class="chip">⏱️ '+p.time+'</span></div></div>';});
  w.innerHTML='<div class="panel"><button class="btn ghost sm" onclick="show(\'home\')">← Back</button><h2 class="title" style="margin-top:10px">📐 Free Patterns</h2><p class="sub">Pick a craft, then tap a project for full materials &amp; steps.</p><div class="onb-chips">'+chips+'</div></div><div class="deckgrid">'+cards+'</div>';}
function openPattern(cat,i){const w=document.getElementById('patWrap');if(!w)return;const p=PATTERNS[cat].items[i];const cimg=PATTERNS[cat].img;
  const vurl='https://www.youtube.com/results?search_query=how+to+'+encodeURIComponent(p.name+' '+PATTERNS[cat].name);
  w.innerHTML='<div class="panel"><button class="btn ghost sm" onclick="renderPatterns()">← All patterns</button>'+
    (cimg?'<img src="'+cimg+'" alt="" style="width:100%;border-radius:14px;margin-top:10px">':'')+
    '<h2 class="title" style="margin-top:10px">'+esc(p.name)+'</h2><div class="meta" style="margin-bottom:10px"><span class="chip">'+p.level+'</span><span class="chip">⏱️ '+p.time+'</span></div>'+
    '<div class="row-actions"><button class="btn ghost sm" onclick="speakPattern(\''+cat+'\','+i+')">🔊 Read aloud</button><a class="btn ghost sm" href="'+vurl+'" target="_blank" rel="noopener">▶ Watch how-to</a></div>'+
    '<h3 style="color:var(--accent2);margin-top:14px">🧰 Materials</h3><ul class="patlist">'+p.materials.map(m=>'<li>'+esc(m)+'</li>').join('')+'</ul>'+
    '<h3 style="color:var(--accent2);margin-top:14px">📋 Steps</h3><ol class="patsteps">'+p.steps.map(s=>'<li>'+esc(s)+'</li>').join('')+'</ol>'+
    (p.tip?'<div class="why" style="margin-top:14px"><b>💡 Tip:</b> '+esc(p.tip)+'</div>':'')+'</div>';}
