const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); //canvas의 context
const colors = document.getElementsByClassName("JsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const clearBtn = document.getElementById("jsClear");

let mouseCursor = document.querySelector(".cursor");

const DEFAULT_COLOR = "#2c2c2c";
let CANVAS_HEIGHT = canvas.offsetHeight;
let CANVAS_WIDTH = canvas.offsetWidth;



//픽셀을 다루는 canvas 크기를 알려줘야함
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
ctx.strokeStyle = DEFAULT_COLOR;//그릴 선들의 default 색상
ctx.fillStyle = DEFAULT_COLOR;
ctx.lineWidth = 2.5 ;// line range,선의 너비


let painting = false;
let filling = false;


const stopPainting=()=>{
    painting = false;
}

const startPainting=()=>{
    painting = true;
}

const onMouseMove = (event) =>{
    
    const x = event.offsetX;
    const y = event.offsetY;
    
    if(!painting){ //클릭하지 않고 마우스를 움직일때는 경로를 만들어줌.
        ctx.beginPath(); //경로생성
        ctx.moveTo(x, y); //선 시작 좌표
    } else { // 클릭할때는 선을 그어준다
        ctx.lineTo(x, y); //선 끝 좌표
        ctx.stroke(); //획을 그음
    }
}

const handleColorClick = (event)=>{
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;

}

const handleRangeChange = (event) => {
    const size = event.target.value;
    ctx.lineWidth = size;
}

const cursor = (event) => {

    mouseCursor.style.left = event.clientX + 10 + "px";
    mouseCursor.style.top = event.clientY + 25 +"px";
}

const cursorChange = (event) => {
    if(filling === true){
        mouseCursor.classList.remove("paint");
        mouseCursor.classList.add("brush")
    } 
    else {
        mouseCursor.classList.remove("brush");
        mouseCursor.classList.add("paint");
        
    }
}

const handleModeClick = (evnet) =>{
    cursorChange();
    if(filling === true ){
        filling = false;
        mode.innerText = "FILL";

    } else {

        filling = true;
        mode.innerText = "PAINT";
      
    }
}

const handleCanvasClick = () =>{
    if(filling){
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

const handleCM = (event) =>{
    event.preventDefault();
}

const handleSaveClick = (event) => {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

const handleClearClick = (event) => {
    ctx.fillStyle  = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}



const handleWindowResize = (event) => {
   
    try{
        CANVAS_HEIGHT = canvas.offsetHeight;
        CANVAS_WIDTH = canvas.offsetWidth;
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
    } catch(error){
        console.log(error);
    }
}

canvas && ( 
    canvas.addEventListener("mousemove", onMouseMove),
    canvas.addEventListener("mousedown",startPainting),
    canvas.addEventListener("mouseup", stopPainting),
    canvas.addEventListener("mouseleave",stopPainting),
    canvas.addEventListener("click",handleCanvasClick),
    canvas.addEventListener("contextmenu",handleCM) 
);

Array.from(colors).forEach(color => color.addEventListener("click",handleColorClick));

range &&  range.addEventListener("input", handleRangeChange);

mode &&  mode.addEventListener("click",handleModeClick);

saveBtn && saveBtn.addEventListener("click",handleSaveClick);

clearBtn && clearBtn.addEventListener("click",handleClearClick);

mouseCursor &&  window.addEventListener("mousemove",cursor);


//모바일 반응형 대응
window.addEventListener("resize", handleWindowResize, onMouseMove);
