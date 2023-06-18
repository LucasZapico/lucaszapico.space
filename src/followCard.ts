

// export function followEl(element: HTMLDivElement){
//   function isTouchDevice() {
//     try {
//       //We try to create TouchEvent. It would fail for desktops and throw error
//       document.createEvent("TouchEvent");
//       return true;
//     } catch (e) {
//       return false;
//     }
//   }
//   const move = (e) => {
//     //Try, catch to avoid any errors for touch screens (Error thrown when user doesn't move his finger)
//     try {
//       //PageX and PageY return the position of client's cursor from top left of screen
//       var x = !isTouchDevice() ? e.pageX : e.touches[0].pageX;
//       var y = !isTouchDevice() ? e.pageY : e.touches[0].pageY;
//     } catch (e) {}
//     //set left and top of div based on mouse position
//     element.style.left = x - 50 + "px";
//     element.style.top = y - 50 + "px";
//   };
//   //For mouse
//   document.addEventListener("mousemove", (e) => {
//     move(e);
//   });
//   //For touch
//   document.addEventListener("touchmove", (e) => {
//     move(e);
//   });
// }

// export function followEl(element: HTMLDivElement){
  

// const cardMovement = (e: any) => {
  
//   if(e.target.classList.contains('card')){
     
//     const element = e.target;
//     const coordBox = element.getBoundingClientRect();
//     const centerPointX = coordBox.x + coordBox.width / 2;
//     const centerPointY = coordBox.y + coordBox.height / 2;
//     const centerPoint = `${centerPointX} || ${centerPointY}`;

//     const maxRotation = 20;
    
//     //Y rotation
//     const rotationFactorY = maxRotation / (coordBox.width / 2);
//     const yRotation = Math.ceil( (e.clientX - centerPointX) * rotationFactorY );
    
//     //X rotation
//     const rotationFactorX = maxRotation / (coordBox.height / 2);
//     const xRotation = -1 * Math.ceil( (e.clientY - centerPointY) * rotationFactorX );

//     element.style.cssText = `transform: rotateY(${yRotation}deg) rotateX(${xRotation}deg);`;


    
//   }

// }


// const cardMovementStop = (e: any) => {
  
//   if(e.target.classList.contains('element')){

//     element.style.cssText = `transform: rotateY(0deg) rotateX(0deg);`;

//   }

// }

// document.addEventListener('mousemove', cardMovement);
// document.addEventListener('mouseout', cardMovementStop);
// }



export function followEl(element: HTMLDivElement){
let constrain = 20;
let mouseOverContainer = document.getElementById("card-wraper");
let ex1Layer = document.getElementById("card");

let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

if(!ex1Layer){return -1}

ex1Layer.onmousedown = dragMouseDown;

function dragMouseDown(e: any) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

function elementDrag(e: any) {
  e = e || window.event;
  e.preventDefault();
  // calculate the new cursor position:
  pos1 = pos3 - e.clientX;
  pos2 = pos4 - e.clientY;
  pos3 = e.clientX;
  pos4 = e.clientY;
  // set the element's new position:
  if(e.target == ex1Layer) {
    e.target.style.top = (e.target.offsetTop - pos2) + "px";
    e.target.style.left = (e.target.offsetLeft - pos1) + "px";    
  }
}
function closeDragElement() {
  // stop moving when mouse button is released:
 document.onmouseup = null;
 document.onmousemove = null;
}

function transforms(x: number, y: number, el: any) {
  let box = el.getBoundingClientRect();
  let calcX = -(y - box.y - (box.height / 2)) / constrain;
  let calcY = (x - box.x - (box.width / 2)) / constrain;
  
  return "perspective(100px) "
    + "   rotateX("+ calcX +"deg) "
    + "   rotateY("+ calcY +"deg) ";
};

 function transformElement(el: any, xyEl: any) {
  el.style.transform  = transforms.apply(null, xyEl);
}

if(!mouseOverContainer){return -1}
mouseOverContainer.onmousemove = function(e) {
  let xy = [e.clientX, e.clientY];
  let position = xy.concat([ex1Layer]);

  window.requestAnimationFrame(function(){
    transformElement(ex1Layer, position);
  });
};

}