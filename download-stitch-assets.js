import fs from 'fs';
import path from 'path';

const ASSETS = [
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAReUaUjbUd99SGnN25c6tAA7emaTCgsBwClglm8fzgL2lGA8S5m6Uy0iaX2WAjF9YdXWJGdoUQNvXBh9zmbd-yYVxp8Y7pGrcVuXFXaBqHYb12TMzwWivp_yQ7SdYVptBihcbMN34va7h3bVj-0LIxeuls3lSPMxoJpIvY6uWhVt5ZuSRMCiBBs25oJt2UtuE63ZwbzFF7CvNPbQUSVqIXmfmZ7VqhTd2Fux_iEAVxK3y8cyWiysYL',
    dest: 'public/hero-students.jpg'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida/AEtjO1V23w7Lh-D538ZH-G3NZKUw4vvh7q64SoO1wA5-BI9HqmPlBC0qHyh-95sj5EV0rEiAZMeyKh0V-3t_X5hXRwj-PX1ZOxsQ6pBgGcLXNas9d6gvAkeFAbc3DY3rDP1jTNfF5VdjYFQneHyXivCuKhXx3ohT2NQh68jE40_5TLz-4C4Ke3JSLsaCV-icOl8qsqQxBuhoC8nCp4ONhngk1377NXbBWoDlDi052oSz7IVNgngD62wA_OpPpg',
    dest: 'public/stitch-logo.png'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida/AEtjO1Xs4c03gPZbDjoMOBUy9F_MR16GFZjUZgc0q1Xa-P_uz77QRHjpKpgEUHrVt_aeLwRd7lWly6auxMsKMuFRwPqadp7Kow4y4pBjlfXaPw5YP9plfJ4Eqv27ayrw0_Mg5n6zmI_biJRW_UnXN4xW1GGhcdg1Y3nJOMkzSYV94Ab8WoywADfrUPUrQreBrOGzuJ73wKXZzCK0_0lUAXW-AdagnK55QIKqX9ihmZE9WtoJAGD5I43TGID3Cg',
    dest: 'public/stitch-avatar.jpg'
  }
];

async function downloadAll() {
  for (const item of ASSETS) {
    try {
      console.log(`Downloading: ${item.url} -> ${item.dest}`);
      const res = await fetch(item.url);
      if (!res.ok) {
        console.error(`Failed ${item.url}: status ${res.status}`);
        continue;
      }
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(item.dest, buffer);
      console.log(`Saved: ${item.dest} (${buffer.length} bytes)`);
    } catch (err) {
      console.error(`Error downloading ${item.dest}:`, err);
    }
  }
}

downloadAll();
