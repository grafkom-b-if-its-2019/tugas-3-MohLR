precision mediump float;

attribute vec2 vPosition;
attribute vec3 vColor;
uniform float angle;
uniform float scale;

void main() {
  mat4 translationMatrixM1 = mat4(
    1.0, 0.0, 0.0, 0.575,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  mat4 translationMatrixM2 = mat4(
    1.0, 0.0, 0.0, -0.5,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  mat4 translationMatrixL = mat4(
    1.0, 0.0, 0.0, 0.55,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  mat4 rotationMatrix = mat4(
    cos(angle), -sin(angle), 0.0, 0.0,
    sin(angle), cos(angle), 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  mat4 scalingMatrix = mat4(
    scale, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  if(vPosition.x >= -0.15 && vPosition.x <= 0.15){
    gl_Position = vec4(vPosition, 0.0, 1.0) * scalingMatrix;
    gl_Position = gl_Position * translationMatrixL;
  } else {
    gl_Position = vec4(vPosition, 0.0, 1.0) * translationMatrixM1;
    gl_Position = gl_Position * rotationMatrix;
    gl_Position = gl_Position * translationMatrixM2;
  }
}
