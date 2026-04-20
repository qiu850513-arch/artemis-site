const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../images');
const outputFile = path.join(__dirname, '../gallery.json');

function generateGallery() {
  const files = fs.readdirSync(imagesDir);

  const works = files
    .filter(file => file.startsWith('work') && file.endsWith('.jpg'))
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/));
      const numB = parseInt(b.match(/\d+/));
      return numA - numB;
    })
    .map((file, index) => {
      const num = index + 1;

      return {
        id: num,
        image: `images/${file}`,
        category: {
          zh: "角色藝術",
          en: "Character Art"
        },
        name: {
          zh: `作品${num}`,
          en: `Artwork ${num}`
        },
        blurb: {
          zh: "角色插畫展示",
          en: "Character illustration"
        }
      };
    });

  fs.writeFileSync(outputFile, JSON.stringify(works, null, 2));
  console.log(`✅ 已生成 gallery.json，共 ${works.length} 筆`);
}

generateGallery();
