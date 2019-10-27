(function() {

  glUtils.SL.init({ callback: function() { main(); } });

  function main() {
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);
  
    // Inisialisasi shaders dan program
    console.log("\nVERTEX SOURCE CODE:\n" + glUtils.SL.Shaders.v1.vertex);
    console.log("\nFRAGMENT SOURCE CODE:\n" + glUtils.SL.Shaders.v1.fragment);
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
  
    // Definisi vertex dan buffer
    var triangleVertices = [
      -0.8, -0.6,  -0.8, +0.6,  -0.75, -0.6,  
      -0.75, -0.6,  -0.75, +0.6,  -0.8, +0.6,
      -0.75, +0.4,  -0.75, +0.6,  -0.575, +0.1,  
      -0.75, +0.4,  -0.575, -0.1,  -0.575, +0.1,
      -0.4, +0.6,  -0.575, -0.1,  -0.575, +0.1,
      -0.4, +0.6,  -0.4, +0.4,  -0.575, -0.1,
      -0.4, +0.6,  -0.4, -0.6,  -0.35, -0.6,
      -0.4, +0.6,  -0.35, +0.6,  -0.35, -0.6,
      -0.15, +0.6,  -0.1, +0.6,  -0.15, -0.6,
      -0.15, -0.6,  -0.1, +0.6,  -0.1, -0.6,
      -0.1, -0.6,  -0.1, -0.5,  +0.15, -0.5,
      -0.1, -0.6,  +0.15, -0.6,  +0.15, -0.5
    ];
    var point = triangleVertices.length / 2;

    var triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, 'vPosition');
    // var vColor = gl.getAttribLocation(program, 'vColor');
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, gl.FALSE, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
    // gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);

    gl.enableVertexAttribArray(vPosition);
    // gl.enableVertexAttribArray(vColor);

    gl.useProgram(program);
    
    var thetaLoc = gl.getUniformLocation(program, 'angle');
    var angle = 0;
    var scaleLoc = gl.getUniformLocation(program, 'scale');
    var scale = 1;
    var flag = true;
    
    function render() {
      // Bersihkan layar jadi hitam
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      
      angle += Math.PI * 0.0038;
      gl.uniform1f(thetaLoc, angle);
      if(flag){
        scale = scale + 0.0038;
        if(scale >= 1.0) {
          flag = false;
        }
      } else {
        scale = scale - 0.0038;
        if(scale <= -1.0) {
          flag = true;
        }
      }
      gl.uniform1f(scaleLoc, scale);

      // Bersihkan buffernya canvas
      gl.clear(gl.COLOR_BUFFER_BIT);
    
      gl.drawArrays(gl.TRIANGLES, 0, point);
      requestAnimationFrame(render);
    }
    render();
  }

})();
