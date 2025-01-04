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
const material = new THREE.MeshBasicMaterial({
  color: 0xccff,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const tick = () => {
  globalThis.requestAnimationFrame(tick);
  renderer.render(scene, camera);
};

tick();
