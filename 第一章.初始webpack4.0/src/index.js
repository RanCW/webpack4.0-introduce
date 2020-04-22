import './css/index.css'
import './css/index.less'
import img from './imgs/img.png'
function greet (name) {
  // console.log('Hello ' + name);
  console.log(`Hello ${name} `);
}
function writeImage(imgSrc) {
  let img = new Image();
  img.src = imgSrc;
  document.getElementById('img').appendChild(img);
}

greet('Jan')
writeImage(img)