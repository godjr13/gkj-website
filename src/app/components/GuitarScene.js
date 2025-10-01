"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function GuitarScene() {
  const mountRef = useRef(null);
  const spotlightRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    // Scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      500,
      mount.clientWidth / mount.clientHeight,
      1,
      100
    );
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Very dim ambient light so model is barely visible
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
    scene.add(ambientLight);

    // Spotlight (disabled by default)
    const spotlight = new THREE.SpotLight(0xffffff, 8, 15, Math.PI/2, 0.25);
    spotlight.castShadow = true;
    spotlight.visible = true;
    scene.add(spotlight);
    spotlightRef.current = spotlight;

    // Load GLTF guitar model
    const loader = new GLTFLoader();
    loader.load("/stratocaster.glb", (gltf) => {
      const guitar = gltf.scene;

      // Make it bigger
      guitar.scale.set(12, 12, 12);

      // Rotate 90 degrees (π/2 radians) around X and Z
      guitar.rotation.x = Math.PI/2;
      guitar.rotation.z = Math.PI*2;
      guitar.rotation.y = (Math.PI/2)*3;

      scene.add(guitar);
    });

    // Resize handler
    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Mouse move handler
    const handleMouseMove = (e) => {
      if (!spotlightRef.current) return;
      const rect = mount.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      spotlightRef.current.position.set(mouseX * 5, mouseY * 3, 3);
    };

    // Mouse enter/leave
    const handleMouseEnter = () => {
      if (spotlightRef.current) spotlightRef.current.visible = true;
    };
    const handleMouseLeave = () => {
      if (spotlightRef.current) spotlightRef.current.visible = true;
    };

    mount.addEventListener("mousemove", handleMouseMove);
    mount.addEventListener("mouseenter", handleMouseEnter);
    mount.addEventListener("mouseleave", handleMouseLeave);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      mount.removeEventListener("mousemove", handleMouseMove);
      mount.removeEventListener("mouseenter", handleMouseEnter);
      mount.removeEventListener("mouseleave", handleMouseLeave);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
}
