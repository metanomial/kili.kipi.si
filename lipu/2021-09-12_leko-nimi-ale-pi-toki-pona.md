---
title: leko nimi ale pi toki pona
tags:
- lipu
- musi-nimi
layout: lipu.njk
---

open la, o pali e lipu leko. o pana e sitelen tawa leko lili ale sama ni: linja
sitelen ale pi tawa poka en linja sitelen ale pi tawa anpa li jo e nimi. ni li
"leko nimi".

o lukin e ijo pi pana sona:

<figure>
<img src="/assets/oko-kon-ona.svg" width="120" alt="leko nimi pi te oko kon ona to">
</figure>

leko nimi mute la, nimi pi tawa poka li sama nimi pi tawa anpa. nimi pi tawa
poka li sama ala nimi pi tawa anpa la, ni li "leko nimi pi nasin tu".

toki mute li jo leko nimi mute mute. sina ken ala nanpa e leko nimi lon toki
mute. taso, sina ken nanpa e leko nimi lon toki pona a! kepeken nimi pi ku suli
(nimi 137) la, taso leko nimi 18 li alasa.

<figure>
<img src="/assets/leko-nimi-pi-ku-suli.svg" width="400" alt="leko nimi pi ku suli">
</figure>

ni li ale a! tenpo ni la, leko nimi "laso-olin-nena" li suli nanpa wan. ken la,
leko nimi pi nimi sin li kama suli nanpa wan lon tenpo kama.

o ante e nimi li alasa e leko nimi sin:

<textarea id="input" rows="12" spellcheck="false">
# nimi pi ku suli
a
akesi
ala
alasa
ale
ali
anpa
ante
anu
awen
e
en
epiku
esun
ijo
ike
ilo
insa
jaki
jan
jasima
jelo
jo
kala
kalama
kama
kasi
ken
kepeken
kijetesantakalu
kili
kin
kipisi
kiwen
ko
kokosila
kon
ku
kule
kulupu
kute
la
lanpan
lape
laso
lawa
leko
len
lete
lili
linja
lipu
loje
lon
luka
lukin
lupa
ma
mama
mani
meli
meso
mi
mije
misikeke
moku
moli
monsi
monsuta
mu
mun
musi
mute
n
namako
nanpa
nasa
nasin
nena
ni
nimi
noka
o
oko
olin
ona
open
pakala
pali
palisa
pan
pana
pi
pilin
pimeja
pini
pipi
poka
poki
pona
pu
sama
seli
selo
seme
sewi
sijelo
sike
sin
sina
sinpin
sitelen
soko
sona
soweli
suli
suno
supa
suwi
tan
taso
tawa
telo
tenpo
toki
tomo
tonsi
tu
unpa
uta
utala
walo
wan
waso
wawa
weka
wile</textarea>

<output id="output"></output>

<style>
#output .square {
  display: inline-block;
  padding: 0.4rem;
  font-family: var(--font-monospace);
  margin: 1rem;
  border: 2px solid var(--text-color);
  transform: scaleX(1.4);
  font-weight: bold;
}
</style>

<script>
const input = document.getElementById("input");
const output = document.getElementById("output");
input.addEventListener("input", render);
render();

function render() {
  output.innerHTML = "";
  const lexicon = input.value
    .split("\n")
    .filter((word) => word.length && !word.startsWith("#"))
    .sort((a, b) => a.length - b.length);
  if (!lexicon.length) return;
  const minLength = lexicon[0].length;
  const maxLength = lexicon[lexicon.length - 1].length;
  let count = 0;
  for (let height = minLength; height <= maxLength; ++height) {
    for (let width = height; width <= maxLength; ++width) {
      const rowLex = lexicon.filter((word) => word.length == width);
      const colLex = lexicon.filter((word) => word.length == height);
      const rowMap = prefixMap(rowLex);
      const colMap = prefixMap(colLex);
      void function examine(ri, ci, rows = new Array(height).fill("")) {
        const rowPrefix = rows[ri];
        const colPrefix = rows.slice(0, ri).map((row) => row[ci]).join("");
        const rowSet = rowMap.get(rowPrefix);
        const colSet = colMap.get(colPrefix);
        if (!rowSet || !colSet) return;
        const commonSet = intersection(rowSet, colSet);
        for (const char of commonSet) {
          const newRows = rows.slice();
          newRows[ri] += char;
          if (ci < width - 1) examine(ri, ci + 1, newRows);
          else if (ri < height - 1) examine(ri + 1, 0, newRows);
          else {
            const square = document.createElement("pre");
            square.innerHTML = newRows.join("<br>");
            square.classList.add("square");
            output.appendChild(square);
            ++count;
          }
        }
      }(0, 0);
    }
  }
  const total = document.createElement("p");
  total.textContent = `leko nimi ${count} li alasa.`;
  output.appendChild(total);
}

function prefixMap(rowLex) {
  const map = new Map();
  for (const word of rowLex) {
    for (let i = 0; i < word.length; ++i) {
      const prefix = word.slice(0, i);
      if (!map.has(prefix)) {
        map.set(prefix, new Set());
      }
      const set = map.get(prefix);
      set.add(word[i]);
    }
  }
  return map;
}

function intersection(a, b) {
  return new Set([...a].filter((x) => b.has(x)));
}
</script>
