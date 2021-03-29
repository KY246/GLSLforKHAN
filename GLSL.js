//{
var θpageBasics = `<!DOCTYPE html>
<html>
  <head>
    <link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet">
    <title>WIP</title>
	<style>
      html, body {
        height: 100%; 
        margin: 0px;  
      }pre{
        margin: 40px;
      }.b{
        border: 1px solid;
        padding: 15px;
      }.b:hover{
        cursor: hand;
      }#θeditor{
        height:300px;
        width:600px;
        font-size:15px;
      }#θjs{
        height:240px;
        width:600px;
        font-size:15px;
      }#θgl{
	    width: 600px;
		height: 600px;
		background-color: black;
		position: fixed;
		top: 0px;
		left: 600px;
	  }#θbuttons{
	    height: 60px;
		background-color: #303030;
		width: 600px;
	  }#θbuttons *{
	    border-radius: 1em;
		background-color: #0F0F0F;
		height: 40px;
		line-height: 40px;
		width: 40px;
		margin-top: 3px;
		margin-left: 100px;
		text-align: center;
		color: white;
		font-size: 27px;
		text-decoration: none;
	  }#θohno{
	    position:fixed;
		z-index: 5;
		top: 140px;
		left: 625px;
		background: white;
		width: 250px;
		height: 150px;
		border-radius: 25px 25px 25px 0px;
		padding: 20px;
		font-family: monospace;
		font-size: 17px;
	  }#θhelp{
	    position:fixed;
		z-index: 6;
		top: 200px;
		left: 400px;
		background: white;
		width: 400px;
		height: 200px;
		border-radius: 50px;
		padding: 20px;
		font-family: serif;
		font-size: 17px;
		text-align: center;
		visibility:hidden;
	  }
    </style> 
  </head>
  <body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.1.9/ace.js"></script>
	<div id="θeditor"></div>
    <div id="θbuttons">
	  <a href="https://www.khanacademy.org/computer-programming/glslforka-editor-home/5313525003010048" class="material-icons">home</a>
	  <a href="javascript:θhelp(1);" class="material-icons">help</a>
	  <a href="javascript:θrunP();" class="material-icons">play_arrow</a>
	  <img id = "θeb" style="background-color: #00000000;position:relative;top:5px;" src="https://cdn.kastatic.org/third_party/javascript-khansrc/live-editor/build/images/creatures/OhNoes-Happy.png"/>
	</div>
	<div id="θjs">var oo;
</div>
    <canvas id="θgl" width="600" height="600"></canvas>
	<div id="θohno">
	  <b>Oh Noes!</b>
	  <p id="θerror"></p>
	  <a id="θwhere"><b>Show me where</b></a>
	</div>
	<div id="θhelp">
	  <b>What Is this?</b>
	  <p style="text-align: left;">
	    This is <a href="https://www.khanacademy.org/profile/KyProgramming/projects">Ky</a>'s GLSL Editor (v1). The GLSL code goes ontop, and the JavaScript goes on the bottom. To run the program, simply press the triangle play button.
	  </p>
	  <p style="text-align: left;">
	    To learn how to use this, or see a list of good GLSL tutorials and resources, please visit the <a href="https://www.khanacademy.org/computer-programming/glslforka-editor-home/5313525003010048">homepage</a>.
	  </p>
	  <a href="javascript:θhelp(0);">[Close popup]</a>
	</div>
	<!--Vertex Shader-->
    <script type="not-js" id="θvs">
attribute vec4 avtx_pos;
void main(){
  gl_Position = avtx_pos;
}
    </script>
    <!--Fragment Shader-->
    <script type="not-js" id="θfs">θθINSERTθθ</script>
    <script id="θjsC" type="notjs">θθINSERTθθ</script>
    <script src="https://cdn.jsdelivr.net/gh/KY246/GLSLforKHAN@13/GLSL.js"></script>
    <script>
// Credit to Bluebird for this section.
// @birdwatcher03 on Khan Academy
var θsave = function(){
  var code = θpageBasics[0].replace("<title>WIP</title>", "<title>"+document.title+"</title>") + θeditor.getValue() + θpageBasics[1] + θeditor2.getValue() + θpageBasics[2];
  
  window.top.postMessage(JSON.stringify({
    code: code
  }), "https://www.khanacademy.org");
  
  window.top.postMessage(θpic, "https://www.khanacademy.org/");
};
var θhandleSave = function(e) {
  if (JSON.parse(e.data).screenshot) {
    setTimeout(function() {
      console.log("Saving...");
      θsave();
    }, 1000)
  }
};
window.parent.savers = window.parent.savers || 0;
window.parent.addEventListener('message', θhandleSave);
window.parent.savers += 1;
for (window.parent.savers; window.parent.savers > 1; window.parent.savers -= 1) {
  window.parent.removeEventListener('message', θhandleSave)
}
    </script>
  </body>
</html>`.split("θθINSERTθθ");
//}

var draw = () => {};
var mouseClicked = () => {};
var mouseMoved = () => {};
var mouseDown = () => {};
var mouseUp = () => {};
var keyPressed = () => {};
var keyReleased = () => {};
var mouseX = 0;
var mouseY = 0;
var keys = [];
var keyIsPressed = 0;
var mouseIsPressed = 0;
var frameCount = 0;
var focused = 0;

var θohno = document.getElementById("θohno");
var θoerr = document.getElementById("θerror");
var θowhr = document.getElementById("θwhere");
var θeb = document.getElementById("θeb");
θohno.style.visibility = "hidden";

document.getElementById("θeditor").innerHTML=(document.getElementById("θfs").innerHTML).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
document.getElementById("θjs").innerHTML=(document.getElementById("θjsC").innerHTML).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

var θeditor = ace.edit("θeditor");
θeditor.setTheme("ace/theme/monokai");
θeditor.session.setMode("ace/mode/glsl");
θeditor.setOption("tabSize", 2);
θeditor.session.setUseWrapMode(true);

var θeditor2 = ace.edit("θjs");
θeditor2.setTheme("ace/theme/monokai");
θeditor2.session.setMode("ace/mode/javascript");
θeditor2.setOption("tabSize", 2);
θeditor2.session.setUseWrapMode(true);
	  
var θmouse = {x: 0, y: 0};
var θrunning = false;

var θreserved = ["θ", "window", "document", "requestAnimationFrame", "setTimeout", "setInterval", "addEventListener", "import"];
var θpic = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
var θtake_pic = true;

function  θgetMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  var scaX = canvas.width / rect.width;
  var scaY = canvas.height / rect.height;

  θmouse = {
    x: (evt.clientX - rect.left) * scaX,
    y: (evt.clientY - rect.top) * scaY
  }
}
function θhelp(vis){
  document.getElementById("θhelp").style.visibility = vis?"visible":"hidden";
}


var θfc = 0;
var θpInfo = {};

var θcanvas=document.getElementById("θgl");

var width = θcanvas.clientWidth;
var height = θcanvas.clientHeight;

var θgl=θcanvas.getContext("webgl")||canvas.getContext("experimental-webgl")||canvas.getContext('moz-webkit');
//set the clear depth
θgl.clearDepth(1.0);
//vertex shader
var θvtxs=document.getElementById("θvs").innerHTML;
//allows javascript access the shaders
function θloadshdr(type,source){
  //create the shader
  var shader=θgl.createShader(type);
  //link it with the GLSL code.
  θgl.shaderSource(shader,source);
  //get it ready for drawing
  θgl.compileShader(shader);
  //ommit it.
  return shader;
}
//load the vertex shader
var θvtxShdr=θloadshdr(θgl.VERTEX_SHADER,θvtxs);
//The fragment shader
var θfrgShdr;

function θmakeFrag(){
  var frgs=θeditor.getValue();
  θfrgShdr = θloadshdr(θgl.FRAGMENT_SHADER,frgs);
  var errors = θgl.getShaderInfoLog(θfrgShdr);
  if(errors.length == 0){
    θrunning = true;
	return frgs;
  }else{
    θrunning = false;
    console.log(errors);
	return errors;
  }
}

var θprogram;

var u_int   = (p, v) => θgl.uniform1i(θpInfo.uPlaces[p], v);
var u_float = (p, v) => θgl.uniform1f(θpInfo.uPlaces[p], v);
var u_1vec2 = (p, v1, v2) => θgl.uniform2i(θpInfo.uPlaces[p], v1, v2);
var u_vec2  = (p, v1, v2) => θgl.uniform2f(θpInfo.uPlaces[p], v1, v2);
var u_1vec3 = (p, v1, v2, v3) => θgl.uniform3i(θpInfo.uPlaces[p], v1, v2, v3);
var u_vec3  = (p, v1, v2, v3) => θgl.uniform3f(θpInfo.uPlaces[p], v1, v2, v3);
var u_1vec4 = (p, v1, v2, v3, v4) => θgl.uniform4i(θpInfo.uPlaces[p], v1, v2, v3, v4);
var u_vec4  = (p, v1, v2, v3, v4) => θgl.uniform4f(θpInfo.uPlaces[p], v1, v2, v3, v4);

//initiate the buffer : turn the graphics info into buffers, which the GLSL can use
function θinitB(position,normal){
  //create the buffer for the positions
  var positBuffer=θgl.createBuffer();
  //bind the buffer to the top webGL buffer editing interface
  θgl.bindBuffer(θgl.ARRAY_BUFFER,positBuffer);
  //set the vertices 
  //add the positions array data to the positions buffer.
  θgl.bufferData(θgl.ARRAY_BUFFER,new Float32Array(position),θgl.STATIC_DRAW);
  
  return positBuffer;
}

var θbuffer=θinitB([-2,-2,0,2,-2,0,2,2,0,-2,2,0]);

//makes the WebGL display everything on the canvas again
θgl.bindFramebuffer(θgl.FRAMEBUFFER, null);
//tells the WebGL how big the canvas is.
θgl.viewport(0,0,θcanvas.clientWidth,θcanvas.clientHeight);
//makes the background blue (not that it matters when the whole thing is being covered be a big white plane).
θgl.clearColor(0,0,0,1);
//With all this preparation, why not actually display the great 3D?
function θdrawW(){
  //sets the background color, and deletes any old canvas drawing data, speeding up the webGL.
  θgl.clear(θgl.COLOR_BUFFER_BIT|θgl.DEPTH_BUFFER_BIT);
  
  
  θgl.bindBuffer(θgl.ARRAY_BUFFER,θbuffer);
  //send those positions to the vertex shader.
  θgl.vertexAttribPointer(θpInfo.aPlaces.vtx_pos,3,θgl.FLOAT,false,0,0);
  //enable those positions
  θgl.enableVertexAttribArray(θpInfo.aPlaces.vtx_pos);
  
  draw();
  
  //Draw, Draw, Draw! Finally!
  θgl.drawArrays(θgl.TRIANGLE_FAN,0,4);
}
//}WebGL:Credit to Mozilla for 𝑚𝑜𝑠𝑡 of the code.
        //{Draw

function θrender(){
  if(θrunning){
    frameCount = θfc;
	keyIsPressed = keys.length > 0 ? 1 : 0;
    θdrawW();
  }else{
    θgl.clear(θgl.COLOR_BUFFER_BIT|θgl.DEPTH_BUFFER_BIT);
  }
  
  if(θtake_pic){
    θpic = θcanvas.toDataURL("image/png");
    θtake_pic = false;
  }
  setTimeout(() => {
    window.requestAnimationFrame(θrender);
  }, 10);
  
  θfc ++;
}


θcanvas.onmousemove = (ev) => {
  if(θrunning){
    θgetMousePos(θgl.canvas, ev);
    mouseX = θmouse.x;
    mouseY = θmouse.y;
    mouseMoved(ev);
  }
};
θcanvas.onmousedown = (ev) => {
  if(θrunning){
    mouseIsPressed = 1;
    mouseDown(ev);
  }
}
θcanvas.onmouseup = (ev) => {
  if(θrunning){
    mouseIsPressed = 0;
    mouseUp(ev);
  }
}
θcanvas.onclick = (ev) => {
  if(θrunning){
    mouseClicked(ev);
  }
}
window.addEventListener("click", (ev) => {
  if(ev.target.tagName == "CANVAS"){
    focused = 1;
  }else{
    focused = 0;
  }
});
window.addEventListener("keydown", (ev) => {
  if(θrunning && focused){
    keys[ev.key] = 1;
    keyReleased(ev);
  }
});
window.addEventListener("keyup", (ev) => {
  delete keys[ev.key];
  if(θrunning && focused){
    keyPressed(ev);
    if(ev.key == "q" && (ev.ctrlKey || ev.metaKey)){
      θtake_pic = true;
    }
  }
});

function θrunP(){
  var θerrors = θmakeFrag();
  if(θrunning){
    var θjs = θeditor2.getValue();
	var θneedToBeC = θjs.split("\n");
	var θjsErrs = false;
	for(var i = 0; i < θneedToBeC.length; i++){
	  for(var j = 0; j < θreserved.length; j++){
	    if(θneedToBeC[i].match(θreserved[j])){
		  θjsErrs = [i, θreserved[j]];
		  break;
		}
		if(θjsErrs){
		  break;
		}
	  }
	}
	
	if(!θjsErrs){
	  var θ_check = true;
	  eval("try{"+θjs+"}catch(Error){θ_check=false;running=false;}");
	  if(θ_check){
	    θfc = 0;
	    θprogram=θgl.createProgram();
        //attach the shaders to the θprogram
        θgl.attachShader(θprogram,θvtxShdr);
        θgl.attachShader(θprogram,θfrgShdr);
        //links the θprogram to the webGL interface
        θgl.linkProgram(θprogram);
        //the info on where the variable are
        θpInfo.aPlaces = {
          vtx_pos:θgl.getAttribLocation(θprogram,'avtx_pos')
        };
	    var uniforms = θerrors.match(/uniform.*?;/g);
	    θpInfo.uPlaces = {};
	    for(var i = 0; i < uniforms.length; i++){
	      uniforms[i] = uniforms[i].replace(/uniform[\s]*[\S]*[\s]*/g, "").replace(/[;|\s]/g, "");
          θpInfo.uPlaces[uniforms[i]] = θgl.getUniformLocation(θprogram,uniforms[i]);
	    }
        //allows WebGL to use and access the gl θprogram
        θgl.useProgram(θprogram);
  	  
  	    θohno.style.visibility = "hidden";
  	  
   	    θeb.src = "https://cdn.kastatic.org/third_party/javascript-khansrc/live-editor/build/images/creatures/OhNoes-Happy.png";
	  }
    }else{
      θrunning = false;
	  
      console.error(θjsErrs);
      θohno.style.visibility = "visible";
      θoerr.innerHTML = "Do not use this in your code: \"" + θjsErrs[1] + "\"";
	  
      θowhr.href = `javascript:θeditor2.resize(true);
      θeditor2.scrollToLine(${θjsErrs[0]+1}, true, true, function () {});
      θeditor2.gotoLine(${θjsErrs[0]+1}, 0, true);`;
	
      θeb.src = "https://cdn.kastatic.org/third_party/javascript-khansrc/live-editor/build/images/creatures/OhNoes.png";
	}
  }else{
    θerrors = θerrors.split("ERROR")[1].slice(4);
    console.error(θerrors);
    θohno.style.visibility = "visible";
    θoerr.innerHTML = θerrors.replace(/[0-9]*:/g, "");
    var num = θerrors.match(/[0-9]*/g)[0];
	
    θowhr.href = `javascript:θeditor.resize(true);
    θeditor.scrollToLine(${num}, true, true, function () {});
    θeditor.gotoLine(${num}, 0, true);`;
	
    θeb.src = "https://cdn.kastatic.org/third_party/javascript-khansrc/live-editor/build/images/creatures/OhNoes.png";
  }
}

θrunP();
window.requestAnimationFrame(θrender);

if(window.innerWidth < 1198 || window.innerHeight < 598){
  document.body.innerHTML = "<div style=\"background:purple;color:white;text-align:center;padding-top:160px;font-size:30px;position:fixed;width:100%;height: 600px;\">Your program screen is too small.<br/>Please add ?width=1200&height=600 to the end of your URL.</div>";
}
