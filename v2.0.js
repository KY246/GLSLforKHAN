//Line 106

var getInfoKey = (data) => {
  let d=data ? data.revision.code : "";
  d = d.match(/var ky__importantKey = \"[0-9]+\";/g);
  d = d ? d[0].match(/[0-9]+/g)[0] : false;
  console.log(d);
  if(d == ky__importantKey){
    document.body.innerHTML = `
      <div style=\"position:fixed;top:0px;left:0px;background:url('https://www.khanacademy.org/computer-programming/basic-raymarcher/6234537789964288/4877193906700288.png') no-repeat center; background-size: cover;color:white;text-align:center;padding-top:80px;font-size:25px;position:fixed;width:100%;height: 600px;text-shadow: 0px 0px 4px black;\">
        Your program screen is too small.
        <br/><br/><br/>
        <a href="https://www.khanacademy.org/computer-programming/-/${ky__prgmID}?width=1200&height=600" target="_blank" style="color:white">Click here to view program with GLSL editor.</a>
        <br/><br/>
        <a href="https://www.khanacademy.org/computer-programming/-/${ky__prgmID}?width=${ky__width}&height=${ky__height}&editor=no" target="_blank" style="color:white">Click here to view program without GLSL editor.</a>
      </div>`;
  }else{
    document.body.innerHTML = `
      <div style=\"position:fixed;top:0px;left:0px;background:url('https://www.khanacademy.org/computer-programming/basic-raymarcher/6234537789964288/4877193906700288.png') no-repeat center; background-size: cover;color:white;text-align:center;padding-top:80px;font-size:25px;position:fixed;width:100%;height: 600px;text-shadow: 0px 0px 4px black;\">
        Your program screen is too small.
        <br/><br/><br/>
        Please add ?width=1200&height=600 to the end of your URL to view program with GLSL editor.
        <br/><br/>
        Or add ?width=${ky__width}&height=${ky__height}&editor=no to the end of your URL to view without GLSL editor.
      </div>`;
  }
};

if((window.innerWidth < 1198 || window.innerHeight < 598) && (Math.abs(window.innerWidth - ky__width) > 2 || Math.abs(window.innerHeight - ky__height) > 2)){
  document.getElementById("jscbk").src="https://www.khanacademy.org/api/internal/scratchpads/"+ ky__prgmID +"?callback=getInfoKey&unique="+Math.random();
}else{

//vars
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

var ky__mouse = {x: 0, y: 0};
var ky__running = false;

var ky__reserved = ["window", "document", "requestAnimationFrame", "setTimeout", "setInterval", "addEventListener", "import"];
var ky__pic = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
var ky__take_pic = true;

function  ky__getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  var scaX = canvas.clientWidth / rect.clientWidth;
  var scaY = canvas.clientHeight / rect.clientHeight;

  ky__mouse = {
    x: (evt.clientX - rect.left) * scaX,
    y: (evt.clientY - rect.top) * scaY
  }
}

var ky__pageBasics = `<!DOCTYPE html>
<!--
GLSLforKHAN Editor
Version 2.0

Permission is granted to all to copy and use this code found here with no restrictions. -Ky @KyProgramming

Please see the GLSLforKHAN home page here:
https://www.khanacademy.org/computer-programming/glslforka-editor-home/5313525003010048

Also use the above link to report any errors.

Credit to Bluebird @birdwatcher03 for the autosave code.
Credit to Mozilla for some of the WebGL
-->

<!--
Please do NOT edit this code here, because the autosaver will delete any changes you make to it. If you would like to request a feature please go to the homepage.
-->
<html>
  <head>
    <link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet">
    <title>New Shader</title>
	  <style id="style"></style>
    <script type="application/javascript">øøINSERTøø</script>
  </head>
  <body>
	<!--Vertex Shader-->
    <script type="not-js" id="ky__vs">
attribute vec4 avtx_pos;
void main(){
  gl_Position = avtx_pos;
}
    </script>
    <!--Fragment Shader-->
    <script type="not-js" id="ky__fs">øøINSERTøø</script>
    <script id="ky__jsC" type="notjs">øøINSERTøø</script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.1.9/ace.js"></script>
    <script id="jscbk" type="application/javascript"></script>
    <script src="https://cdn.jsdelivr.net/gh/KY246/GLSLforKHAN@26/v2.0.js"></script>
    <script type="application/javascript">
// Credit to Bluebird for this section.
// @birdwatcher03 on Khan Academy

var bb__save = function(){
  var code = ky__pageBasics[0].replace("<title>WIP</title>", "<title>"+document.title+"</title>") + "\\n      var ky__width = " + ky__width + ";\\n      var ky__height = " + ky__height + ";\\n      var ky__prgmID = \\"" + ky__prgmID + "\\";\\n      var ky__importantKey = \\""+ Math.floor(Math.random() * 100000000) +"\\";\\n    " + ky__pageBasics[1] + ky__editor.getValue() + ky__pageBasics[2] + ky__editor2.getValue() + ky__pageBasics[3];
  
  window.top.postMessage(JSON.stringify({
    code: code
  }), "https://www.khanacademy.org");
  
  window.top.postMessage(ky__pic, "https://www.khanacademy.org/");
};
var bb__handleSave = function(e) {
  if (JSON.parse(e.data).screenshot) {
    setTimeout(function() {
      console.log("Saving...");
      bb__save();
    }, 1000)
  }
};
window.parent.savers = window.parent.savers || 0;
window.parent.addEventListener('message', bb__handleSave);
window.parent.savers += 1;
for (window.parent.savers; window.parent.savers > 1; window.parent.savers -= 1) {
  window.parent.removeEventListener('message', bb__handleSave)
}
    </script>
  </body>
</html>`.split("øøINSERTøø");
//}

//setup
document.body.innerHTML = `<div class="notC">
    <div id="ky__editor"></div>
    <div id="ky__buttons">
    <a  href="https://www.khanacademy.org/computer-programming/glslforka-editor-home/5313525003010048" target="_blank" class="material-icons">home</a>
    <a href="javascript:ky__help(1);" class="material-icons">help</a>
    <a href="javascript:ky__settings(1);" class="material-icons">settings</a>
    <a href="javascript:ky__runP();" class="material-icons">play_arrow</a>
    <img id = "ky__eb" style="background-color: #00000000;position:relative;top:5px;" src="https://cdn.kastatic.org/third_party/javascript-khansrc/live-editor/build/images/creatures/OhNoes-Happy.png"/>
  </div>
  <div id="ky__js"></div></div>
    <canvas id="ky__gl" width="600" height="600"></canvas><div class="notC">
  <div id="ky__ohno">
    <b>Oh Noes!</b>
    <p id="ky__error"></p>
    <a id="ky__where"><b>Show me where</b></a>
  </div>
  <div id="ky__help" class="popup">
    <b>What Is this?</b>
    <p style="text-align: left;">
      This is <a href="https://www.khanacademy.org/profile/KyProgramming/projects" target="_blank">Ky</a>'s GLSL Editor (v2.0). The GLSL code goes ontop, and the JavaScript goes on the bottom. To run the program, simply press the triangle play button.
    </p>
    <p style="text-align: left;">
      To learn how to use this, or see a list of good GLSL tutorials and resources, please visit the <a href="https://www.khanacademy.org/computer-programming/glslforka-editor-home/5313525003010048" target="_blank">homepage</a>.
    </p>
    <a href="javascript:ky__help(0);">[Close popup]</a>
  </div>
  <div id="ky__settings" class="popup">
    <b>Settings</b>
    <p>
      Program ID: <input type="number" id="pgmid" placeholder="${ky__prgmID}"></input>
      <br/><br/>
    Program Width: 
    <select name="width" id="wdpd" value="600">
          <option value="500" ${ky__width == 500 ? "selected=\"selected\"" : ""}>500</option>
          <option value="600" ${ky__width == 600 ? "selected=\"selected\"" : ""}>600</option>
          <option value="700" ${ky__width == 700 ? "selected=\"selected\"" : ""}>700</option>
          <option value="800" ${ky__width == 800 ? "selected=\"selected\"" : ""}>800</option>
          <option value="900" ${ky__width == 900 ? "selected=\"selected\"" : ""}>900</option>
          <option value="1000" ${ky__width == 1000 ? "selected=\"selected\"" : ""}>1000</option>
        </select>
    <br/><br/>
    Program Height: 
    <select name="height" id="hdpd">
          <option value="500" ${ky__height == 500 ? "selected=\"selected\"" : ""}>500</option>
          <option value="600" ${ky__height == 600 ? "selected=\"selected\"" : ""}>600</option>
          <option value="700" ${ky__height == 700 ? "selected=\"selected\"" : ""}>700</option>
        </select>
    </p>
    Need help? Please visit the <a href="https://www.khanacademy.org/computer-programming/glslforka-editor-home/5313525003010048" target="_blank">homepage</a>.
    <br/>
    <a href="javascript:ky__settings(0);">[Close popup]</a>
  </div></div>` + document.body.innerHTML;
  
var ky__ohno = document.getElementById("ky__ohno");
var ky__oerr = document.getElementById("ky__error");
var ky__owhr = document.getElementById("ky__where");
var ky__eb = document.getElementById("ky__eb");
ky__ohno.style.visibility = "hidden";

document.getElementById("ky__editor").innerHTML=(document.getElementById("ky__fs").innerHTML).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
document.getElementById("ky__js").innerHTML=(document.getElementById("ky__jsC").innerHTML).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
document.getElementById("style").innerHTML = `
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
  }#ky__editor{
    height:300px;
    width:600px;
    font-size:15px;
  }#ky__js{
    height:240px;
    width:600px;
    font-size:15px;
  }#ky__gl{
    width: 600px;
  height: 600px;
  background-color: black;
  position: fixed;
  top: 0px;
  left: 600px;
  }#ky__buttons{
    height: 60px;
  background-color: #303030;
  width: 600px;
  }#ky__buttons *{
    border-radius: 1em;
  background-color: #0F0F0F;
  height: 40px;
  line-height: 40px;
  width: 40px;
  margin-top: 3px;
  margin-left: 70px;
  text-align: center;
  color: white;
  font-size: 27px;
  text-decoration: none;
  }#ky__ohno{
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
  }.popup{
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
`;


var ky__fc = 0;
var ky__pInfo = {};

var ky__canvas=document.getElementById("ky__gl");
if(window.innerWidth < 1198 || window.innerHeight < 598){
  ky__canvas.style.top = "0px";
  ky__canvas.style.left = "0px";
  ky__canvas.style.width = ky__width + "px";
  ky__canvas.style.height = ky__height + "px";
}

var width = ky__canvas.clientWidth;
var height = ky__canvas.clientHeight;

var ky__gl=ky__canvas.getContext("webgl")||ky__canvas.getContext("experimental-webgl")||ky__canvas.getContext('moz-webkit');
//set the clear depth
ky__gl.clearDepth(1.0);
//vertex shader
var ky__vtxs=document.getElementById("ky__vs").innerHTML;
//allows javascript access the shaders
function ky__loadshdr(type,source){
  //create the shader
  var shader=ky__gl.createShader(type);
  //link it with the GLSL code.
  ky__gl.shaderSource(shader,source);
  //get it ready for drawing
  ky__gl.compileShader(shader);
  //ommit it.
  return shader;
}
//load the vertex shader
var ky__vtxShdr=ky__loadshdr(ky__gl.VERTEX_SHADER,ky__vtxs);
//The fragment shader
var ky__frgShdr;

function ky__makeFrag(txt){
  var frgs=txt;
  ky__frgShdr = ky__loadshdr(ky__gl.FRAGMENT_SHADER,frgs);
  var errors = ky__gl.getShaderInfoLog(ky__frgShdr);
  if(errors.length == 0){
    ky__running = true;
  return frgs;
  }else{
    ky__running = false;
    console.log(errors);
  return errors;
  }
}

var ky__program;

var u_int   = (p, v) => ky__gl.uniform1i(ky__pInfo.uPlaces[p], v);
var u_float = (p, v) => ky__gl.uniform1f(ky__pInfo.uPlaces[p], v);
var u_1vec2 = (p, v1, v2) => ky__gl.uniform2i(ky__pInfo.uPlaces[p], v1, v2);
var u_vec2  = (p, v1, v2) => ky__gl.uniform2f(ky__pInfo.uPlaces[p], v1, v2);
var u_1vec3 = (p, v1, v2, v3) => ky__gl.uniform3i(ky__pInfo.uPlaces[p], v1, v2, v3);
var u_vec3  = (p, v1, v2, v3) => ky__gl.uniform3f(ky__pInfo.uPlaces[p], v1, v2, v3);
var u_1vec4 = (p, v1, v2, v3, v4) => ky__gl.uniform4i(ky__pInfo.uPlaces[p], v1, v2, v3, v4);
var u_vec4  = (p, v1, v2, v3, v4) => ky__gl.uniform4f(ky__pInfo.uPlaces[p], v1, v2, v3, v4);

//initiate the buffer : turn the graphics info into buffers, which the GLSL can use
function ky__initB(position,normal){
  //create the buffer for the positions
  var positBuffer=ky__gl.createBuffer();
  //bind the buffer to the top webGL buffer editing interface
  ky__gl.bindBuffer(ky__gl.ARRAY_BUFFER,positBuffer);
  //set the vertices 
  //add the positions array data to the positions buffer.
  ky__gl.bufferData(ky__gl.ARRAY_BUFFER,new Float32Array(position),ky__gl.STATIC_DRAW);
  
  return positBuffer;
}

var ky__buffer=ky__initB([-2,-2,0,2,-2,0,2,2,0,-2,2,0]);

//makes the WebGL display everything on the canvas again
ky__gl.bindFramebuffer(ky__gl.FRAMEBUFFER, null);
//tells the WebGL how big the canvas is.
ky__gl.viewport(0,0,ky__canvas.clientWidth,ky__canvas.clientHeight);
//makes the background blue (not that it matters when the whole thing is being covered be a big white plane).
ky__gl.clearColor(0,0,0,1);
//With all this preparation, why not actually display the great 3D?
function ky__drawW(){
  //sets the background color, and deletes any old canvas drawing data, speeding up the webGL.
  ky__gl.clear(ky__gl.COLOR_BUFFER_BIT|ky__gl.DEPTH_BUFFER_BIT);
  
  
  ky__gl.bindBuffer(ky__gl.ARRAY_BUFFER,ky__buffer);
  //send those positions to the vertex shader.
  ky__gl.vertexAttribPointer(ky__pInfo.aPlaces.vtx_pos,3,ky__gl.FLOAT,false,0,0);
  //enable those positions
  ky__gl.enableVertexAttribArray(ky__pInfo.aPlaces.vtx_pos);
  
  draw();
  
  //Draw, Draw, Draw! Finally!
  ky__gl.drawArrays(ky__gl.TRIANGLE_FAN,0,4);
}
//}WebGL:Credit to Mozilla for 𝑚𝑜𝑠𝑡 of the code.
        //{Draw

function ky__render(){
  if(ky__running){
    frameCount = ky__fc;
  keyIsPressed = keys.length > 0 ? 1 : 0;
    ky__drawW();
  }else{
    ky__gl.clear(ky__gl.COLOR_BUFFER_BIT|ky__gl.DEPTH_BUFFER_BIT);
  }
  
  if(ky__take_pic){
    ky__pic = ky__canvas.toDataURL("image/png");
    ky__take_pic = false;
  }
  setTimeout(() => {
    window.requestAnimationFrame(ky__render);
  }, 10);
  
  ky__fc ++;
}


ky__canvas.onmousemove = (ev) => {
  if(ky__running){
    ky__getMousePos(ky__gl.canvas, ev);
    mouseX = ky__mouse.x;
    mouseY = ky__mouse.y;
    mouseMoved(ev);
  }
};
ky__canvas.onmousedown = (ev) => {
  if(ky__running){
    mouseIsPressed = 1;
    mouseDown(ev);
  }
}
ky__canvas.onmouseup = (ev) => {
  if(ky__running){
    mouseIsPressed = 0;
    mouseUp(ev);
  }
}
ky__canvas.onclick = (ev) => {
  if(ky__running){
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
  if(ky__running && focused){
    keys[ev.key] = 1;
    keyReleased(ev);
  }
});
window.addEventListener("keyup", (ev) => {
  delete keys[ev.key];
  if(ky__running && focused){
    keyPressed(ev);
    if(ev.key == "q" && (ev.ctrlKey || ev.metaKey)){
      ky__take_pic = true;
    }
  }
});


if(window.innerWidth < 1198 || window.innerHeight < 598){
  var bye = document.getElementsByClassName("notC");
  for(let i = 0; i < bye.length; i++){
    bye[i].parentNode.removeChild(bye[i]);
  }
  
  
  if(Math.abs(window.innerWidth - ky__width) <= 2 || Math.abs(window.innerHeight - ky__height) <= 2){
    function ky__runP(){
      var ky__errors = ky__makeFrag(document.getElementById("ky__fs").innerHTML);
      if(ky__running){
        var ky__js = document.getElementById("ky__jsC").innerHTML;
        var ky__needToBeC = ky__js.split("\n");
        var ky__jsErrs = false;
        for(var i = 0; i < ky__needToBeC.length; i++){
          for(var j = 0; j < ky__reserved.length; j++){
            if(ky__needToBeC[i].match(ky__reserved[j])){
              ky__jsErrs = [i, ky__reserved[j]];
              break;
            }
            if(ky__jsErrs){
              break;
            }
          }
        }
      
        if(!ky__jsErrs){
          var ky___check = true;
          eval("try{"+ky__js+"}catch(Error){ky___check=false;running=false;}");
          if(ky___check){
            ky__fc = 0;
            ky__program=ky__gl.createProgram();
            //attach the shaders to the ky__program
            ky__gl.attachShader(ky__program,ky__vtxShdr);
            ky__gl.attachShader(ky__program,ky__frgShdr);
            //links the ky__program to the webGL interface
            ky__gl.linkProgram(ky__program);
            //the info on where the variable are
            ky__pInfo.aPlaces = {
              vtx_pos:ky__gl.getAttribLocation(ky__program,'avtx_pos')
            };
          var uniforms = ky__errors.match(/uniform.*?;/g);
          ky__pInfo.uPlaces = {};
          for(var i = 0; i < uniforms.length; i++){
            uniforms[i] = uniforms[i].replace(/uniform[\s]*[\S]*[\s]*/g, "").replace(/[;|\s]/g, "");
              ky__pInfo.uPlaces[uniforms[i]] = ky__gl.getUniformLocation(ky__program,uniforms[i]);
          }
          //allows WebGL to use and access the gl ky__program
          ky__gl.useProgram(ky__program);
        }
        }else{
          ky__running = false;
        
          console.error(ky__jsErrs);
        }
      }else{
        ky__running = false;
        
        console.error(ky__errors);
      }
    }

    ky__runP();
    window.requestAnimationFrame(ky__render);
  }
}else{
  //{
  var ky__editor = ace.edit("ky__editor");
  ky__editor.setTheme("ace/theme/monokai");
  ky__editor.session.setMode("ace/mode/glsl");
  ky__editor.setOption("tabSize", 2);
  ky__editor.session.setUseWrapMode(true);

  var ky__editor2 = ace.edit("ky__js");
  ky__editor2.setTheme("ace/theme/monokai");
  ky__editor2.session.setMode("ace/mode/javascript");
  ky__editor2.setOption("tabSize", 2);
  ky__editor2.session.setUseWrapMode(true);
      

  function ky__help(vis){
    document.getElementById("ky__help").style.visibility = vis?"visible":"hidden";
  }
  function ky__settings(vis){
    document.getElementById("ky__settings").style.visibility = vis?"visible":"hidden";
    if(!vis){
      ky__prgmID = document.getElementById("pgmid").value || ky__prgmID;
      
      ky__width = document.getElementById("wdpd").value;
      ky__height = document.getElementById("hdpd").value;
    }
  }
  
  function ky__runP(){
    var ky__errors = ky__makeFrag(ky__editor.getValue());
    if(ky__running){
      var ky__js = ky__editor2.getValue();
    var ky__needToBeC = ky__js.split("\n");
    var ky__jsErrs = false;
    for(var i = 0; i < ky__needToBeC.length; i++){
      for(var j = 0; j < ky__reserved.length; j++){
        if(ky__needToBeC[i].match(ky__reserved[j])){
        ky__jsErrs = [i, ky__reserved[j]];
        break;
      }
      if(ky__jsErrs){
        break;
      }
      }
    }
    
    if(!ky__jsErrs){
      var ky___check = true;
      eval("try{"+ky__js+"}catch(Error){ky___check=false;running=false;}");
      if(ky___check){
        ky__fc = 0;
        ky__program=ky__gl.createProgram();
          //attach the shaders to the ky__program
          ky__gl.attachShader(ky__program,ky__vtxShdr);
          ky__gl.attachShader(ky__program,ky__frgShdr);
          //links the ky__program to the webGL interface
          ky__gl.linkProgram(ky__program);
          //the info on where the variable are
          ky__pInfo.aPlaces = {
            vtx_pos:ky__gl.getAttribLocation(ky__program,'avtx_pos')
          };
        var uniforms = ky__errors.match(/uniform.*?;/g);
        ky__pInfo.uPlaces = {};
        for(var i = 0; i < uniforms.length; i++){
          uniforms[i] = uniforms[i].replace(/uniform[\s]*[\S]*[\s]*/g, "").replace(/[;|\s]/g, "");
            ky__pInfo.uPlaces[uniforms[i]] = ky__gl.getUniformLocation(ky__program,uniforms[i]);
        }
          //allows WebGL to use and access the gl ky__program
          ky__gl.useProgram(ky__program);
        
          ky__ohno.style.visibility = "hidden";
        
          ky__eb.src = "https://cdn.kastatic.org/third_party/javascript-khansrc/live-editor/build/images/creatures/OhNoes-Happy.png";
      }
      }else{
        ky__running = false;
      
        console.error(ky__jsErrs);
        ky__ohno.style.visibility = "visible";
        ky__oerr.innerHTML = "Do not use this in your code: \"" + ky__jsErrs[1] + "\"";
      
        ky__owhr.href = `javascript:ky__editor2.resize(true);
        ky__editor2.scrollToLine(${ky__jsErrs[0]+1}, true, true, function () {});
        ky__editor2.gotoLine(${ky__jsErrs[0]+1}, 0, true);`;
    
        ky__eb.src = "https://cdn.kastatic.org/third_party/javascript-khansrc/live-editor/build/images/creatures/OhNoes.png";
    }
    }else{
      ky__errors = ky__errors.split("ERROR")[1].slice(4);
      console.error(ky__errors);
      ky__ohno.style.visibility = "visible";
      ky__oerr.innerHTML = ky__errors.replace(/[0-9]*:/g, "");
      var num = ky__errors.match(/[0-9]*/g)[0];
    
      ky__owhr.href = `javascript:ky__editor.resize(true);
      ky__editor.scrollToLine(${num}, true, true, function () {});
      ky__editor.gotoLine(${num}, 0, true);`;
    
      ky__eb.src = "https://cdn.kastatic.org/third_party/javascript-khansrc/live-editor/build/images/creatures/OhNoes.png";
    }
  }

  ky__runP();
  window.requestAnimationFrame(ky__render);
  
}
}
