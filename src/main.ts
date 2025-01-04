import "./style.css";

import * as THREE from "three";

const width = globalThis.innerWidth;
const height = globalThis.innerHeight;

const canvas = document.querySelector("canvas.webgl");

if (!canvas) {
  throw new Error("Canvas not found.");
}

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas,
});
renderer.setSize(width, height);

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10);
camera.position.z = 2;

const scene = new THREE.Scene();

const geometry = new THREE.IcosahedronGeometry(1, 2);
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  flatShading: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const wireMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});
const wireMesh = new THREE.Mesh(geometry, wireMaterial);
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh);

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
scene.add(hemisphereLight);

const tick: FrameRequestCallback = (time: number) => {
  globalThis.requestAnimationFrame(tick);
  mesh.rotation.y = time * 0.0001;
  renderer.render(scene, camera);
};

tick(0);
