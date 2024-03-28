const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl');

if (!gl) {
    throw new Error('WebGL not supported');
}

const vertexDataTriangles = [
    // Triangle 1
    0.45, -0.56, 0,
    0.45, -0.9, 0,
    0.80, -0.9, 0,
    // Triangle 2
    0.45, -0.56, 0,
    0.20, -0.56, 0,
    0.20, -0.3, 0,
    // Triangle 3
    -0.2, -0.56, 0,
    -0.47, -0.56, 0,
    -0.2, -0.3, 0,
    // Triangle 4
    -0.60, -0.56, 0,
    -0.60, -0.9, 0,
    -0.80, -0.56, 0,
];

const vertexDataDot = [
    0.4, -0.9, 0,
    -0.4, -0.9, 0,
];

const vertexDataLines = [
    // Line 2
    0.4, -0.9, 0,
    -0.35, -0.9, 0,
    // Line 4
    -0.6, -0.9, 0,
    -0.45, -0.9, 0,
    // Line 3
    0.2, -0.3, 0,
    -0.2, -0.3, 0,
    // Line 1
    -0.6, -0.56, 0,
    0.2, -0.56, 0,
//line 6
    0, -0.56, 0,
    0, -0.3, 0,

//line 7
   -0.1, -0.56, 0,
   0.1, -0.9, 0,    
];

const bufferTriangles = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, bufferTriangles);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexDataTriangles), gl.STATIC_DRAW);

const bufferDot = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, bufferDot);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexDataDot), gl.STATIC_DRAW);

const bufferLines = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, bufferLines);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexDataLines), gl.STATIC_DRAW);

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, `
attribute vec3 position;
void main() {
    gl_Position = vec4(position, 1);
    gl_PointSize = 40.0;
}
`);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, `
void main() {
    gl_FragColor = vec4(0.5, 1, 0, 1);
}
`);
gl.compileShader(fragmentShader);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

const positionLocation = gl.getAttribLocation(program, `position`);
gl.useProgram(program);

// Draw triangles
gl.bindBuffer(gl.ARRAY_BUFFER, bufferTriangles);
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
gl.drawArrays(gl.TRIANGLES, 0, 12);

// Draw dot
gl.bindBuffer(gl.ARRAY_BUFFER, bufferDot);
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
gl.drawArrays(gl.POINTS, 0, 2);

// Draw lines
gl.bindBuffer(gl.ARRAY_BUFFER, bufferLines);
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
gl.drawArrays(gl.LINES, 0, 12);
