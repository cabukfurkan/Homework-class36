'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/tree/main/2-Browsers/Week1#exercise-5-the-cat-walk
1. Create a variable to store a reference to the `<img>` element.
2. Change the style of the `<img>` to have a `left` of `0px`, so that it starts 
   at the left hand of the screen.
3. Complete the function called catWalk() to move the cat 10 pixels to the right
   of where it started, by changing the `left` style property.
4. Call that function every 50 milliseconds. Your cat should now be moving 
   across the screen from left to right. Hurrah!
5. When the cat reaches the right-hand of the screen, restart them at the left 
   hand side (`0px`). So they should keep walking from left to right across the 
   screen, forever and ever.
6. When the cat reaches the middle of the screen, replace the img with an image 
   of a cat dancing (use this URL given below), keep it dancing for 5 seconds, 
   and then replace the img with the original image and have it 
   continue the walk.
   Dancing cat URL:
   https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif
-----------------------------------------------------------------------------*/
const cat = document.querySelector('img');
let catPos = 0;
cat.style.left = catPos;
cat.style.top = '200px';
const halfOfImage = cat.width / 2 - ((cat.width / 2) % 10); // 296/2 - 14.8= 133,2
const border = window.innerWidth - (window.innerWidth % 10); // 1440-144 = 1296
// console.log(window.innerWidth);
const center = border / 2 - ((border / 2) % 10); //1296/2  - 64,8 = 583,2
let interval = 50;

function catWalk() {
  catPos += 10;
  cat.style.left = catPos + 'px';

  if (catPos + halfOfImage === center) {
    //583,2 - 133,2 = 450--- when catPos + halfImg = 450 change src
    cat.src =
      'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';
    interval = 5000;
    setTimeout(() => {
      cat.src = 'http://www.anniemation.com/clip_art/images/cat-walk.gif';
      interval = 50;
    }, 5000); //change image to original walking cat after 5 secs
  }

  if (catPos === border) {
    catPos = 0;
  }
  setTimeout(catWalk, interval);
}

window.addEventListener('load', catWalk());
