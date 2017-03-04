const vertShader = `
varying vec2 vUV;

void main() {
	vUV = uv;

	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
	gl_Position = projectionMatrix * mvPosition;
}
`;

const fragShader = `
uniform sampler2D uVidStruggle;
uniform sampler2D uVidDrankCreep;
uniform bool uOverlay;

varying vec2 vUV;

void main() {
	vec4 struggleColor = texture2D(uVidStruggle, vUV);
  vec4 drankCreepColor = texture2D(uVidDrankCreep, vUV);
	gl_FragColor.rgb = drankCreepColor.rgb + struggleColor.rgb;

  if (uOverlay) {
    gl_FragColor = mix(drankCreepColor, struggleColor, 0.1);
  } else {
    gl_FragColor = struggleColor;
  }
}
`;

const videoFXShader = {
  uniforms: {
		'uOverlay': {value: false },
		'uVidStruggle': { value: null },
		'uVidDrankCreep': { value: null },
	},
  vertexShader: vertShader,
  fragmentShader: fragShader
}

export default videoFXShader;