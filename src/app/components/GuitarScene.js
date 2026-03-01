"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function GuitarScene() {
  const mountRef = useRef(null);
  const spotlightRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Scene, camera, renderer
    const scene = new THREE.Scene();
    
    // Fixed FOV: 500 was too high; 50 is standard for a natural look
    const camera = new THREE.PerspectiveCamera(
      50,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    const spotlight = new THREE.SpotLight(0xffffff, 15, 20, Math.PI / 4, 0.5);
    spotlight.position.set(0, 0, 5);
    spotlight.castShadow = true;
    scene.add(spotlight);
    spotlightRef.current = spotlight;

    // 3. Load Model
    const loader = new GLTFLoader();
    loader.load("/stratocaster.glb", (gltf) => {
      const guitar = gltf.scene;
      guitar.scale.set(12, 12, 12);
      
      // Orientation adjustments
      guitar.rotation.x = Math.PI / 2;
      guitar.rotation.y = (Math.PI / 2) * 3;
      scene.add(guitar);
    });

    // 4. Interaction & Auto-Float Logic
    const clock = new THREE.Clock();
    let lastInteractionTime = 0;
    let isInteracting = false;

    const updateLightPosition = (clientX, clientY) => {
      if (!spotlightRef.current) return;
      const rect = mount.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((clientY - rect.top) / rect.height) * 2 + 1;
      
      // Follow cursor/finger
      spotlightRef.current.position.x = x * 5;
      spotlightRef.current.position.y = y * 3;
      lastInteractionTime = Date.now();
      isInteracting = true;
    };

    // Event Handlers
    const onMouseMove = (e) => updateLightPosition(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        updateLightPosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onMouseLeave = () => { isInteracting = false; };

    mount.addEventListener("mousemove", onMouseMove);
    mount.addEventListener("touchmove", onTouchMove);
    mount.addEventListener("mouseleave", onMouseLeave);

    // 5. Resize Handler
    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // 6. Animation Loop
    const animate = () => {
      const requestID = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // If no interaction for 2 seconds, start floating automatically
      if (!isInteracting || Date.now() - lastInteractionTime > 2000) {
        if (spotlightRef.current) {
          spotlightRef.current.position.x = Math.sin(elapsedTime * 0.8) * 4;
          spotlightRef.current.position.y = Math.cos(elapsedTime * 0.5) * 2;
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // 7. Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      mount.removeEventListener("mousemove", onMouseMove);
      mount.removeEventListener("touchmove", onTouchMove);
      mount.removeEventListener("mouseleave", onMouseLeave);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", background: "#000" }}>
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />

      {/* OVERLAY TEXT */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          pointerEvents: "none",
          zIndex: 10,
          color: "white",
          fontFamily: "sans-serif",
          padding: "0 40px"
        }}
      >
        <div style={{ maxWidth: "40%" }}>
          <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", marginBottom: "1rem" }}>
            GUITARS AND AUDIO EQUIPMENTS
          </h1>
          <p style={{ fontSize: "clamp(1rem, 3vw, 1.2rem)" }}>Custom made just for you.</p>
        </div>
        <div style={{ textAlign: "right", maxWidth: "35%" }}>
          <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", marginBottom: "1rem" }}>CHOOSE THE TONE YOU DESIRE</h1>
          <p style={{ fontSize: "clamp(1rem, 3vw, 1.2rem)" }}>Let your ear decide.</p>
        </div>
      </div>
    </div>
  );
}