import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import backgroundImage from "../assets/background2.jpg";

const ThreeDModelPage = () => {
  const mountRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const rotation = useRef({ x: 0, y: 0 });
  const prevPosition = useRef({ x: 0, y: 0 });
  const autoRotationSpeed = 0.006; // Slower rotation speed
  const autoRotationRef = useRef(true);

  useEffect(() => {
    const mount = mountRef.current;

    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Load the STL model
    const loader = new STLLoader();
    loader.load("/src/assets/Cavity Hand Dryer v4.stl", (geometry) => {
      // Compute bounding box to center the model
      geometry.computeBoundingBox();
      geometry.center(); // Center the model geometry

      // Create the mesh with material
      const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
      const mesh = new THREE.Mesh(geometry, material);

      // Adjust scale and rotation to make it upright and oriented correctly
      mesh.scale.set(0.01, 0.01, 0.01); // Scale it down further
      mesh.rotation.set(0, Math.PI / 2, 0, Math.PI); // Correct orientation

      scene.add(mesh);

      camera.position.z = 10; // Move camera further back
    });

    // Add lights
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 3, 5);
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(0, 1, -3);
    scene.add(fillLight);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const startDragging = (clientX, clientY) => {
      setIsDragging(true);
      prevPosition.current = { x: clientX, y: clientY };
      autoRotationRef.current = false;
    };

    const stopDragging = () => {
      setIsDragging(false);
      autoRotationRef.current = true;
    };

    const drag = (clientX, clientY) => {
      if (isDragging) {
        const sensitivity = 0.005;
        const deltaX = clientX - prevPosition.current.x;
        const deltaY = clientY - prevPosition.current.y;

        rotation.current.y += deltaX * sensitivity;
        rotation.current.x += deltaY * sensitivity;

        prevPosition.current = { x: clientX, y: clientY };
      }
    };

    // Mouse event listeners
    const onMouseDown = (event) => {
      startDragging(event.clientX, event.clientY);
      autoRotationRef.current = false;
    };

    const onMouseMove = (event) => {
      drag(event.clientX, event.clientY);
    };

    const onMouseUp = () => {
      stopDragging();
      autoRotationRef.current = true;
    };

    // Touch event listeners
    const onTouchStart = (event) => {
      if (event.touches.length === 1) {
        startDragging(event.touches[0].clientX, event.touches[0].clientY);
      }
    };

    const onTouchMove = (event) => {
      if (event.touches.length === 1) {
        drag(event.touches[0].clientX, event.touches[0].clientY);
      }
    };

    const onTouchEnd = stopDragging;

    mount.addEventListener("mousedown", onMouseDown);
    mount.addEventListener("mousemove", onMouseMove);
    mount.addEventListener("mouseup", onMouseUp);
    mount.addEventListener("mouseleave", onMouseUp);

    mount.addEventListener("touchstart", onTouchStart);
    mount.addEventListener("touchmove", onTouchMove);
    mount.addEventListener("touchend", onTouchEnd);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (!isDragging && autoRotationRef.current) {
        rotation.current.y += autoRotationSpeed;
      }

      // Apply rotation to the entire scene
      scene.rotation.x = rotation.current.x;
      scene.rotation.y = rotation.current.y;

      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    // Clean up on unmount
    return () => {
      mount.removeEventListener("mousedown", onMouseDown);
      mount.removeEventListener("mousemove", onMouseMove);
      mount.removeEventListener("mouseup", onMouseUp);
      mount.removeEventListener("mouseleave", onMouseUp);
      mount.removeEventListener("touchstart", onTouchStart);
      mount.removeEventListener("touchmove", onTouchMove);
      mount.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
    };
  }, [isDragging]);

  return (
    <div className="relative text-white min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-green-900/70 to-transparent" />

      <main className="relative z-20 container mx-auto px-4 py-8 sm:py-12 lg:py-16 sm:px-6 lg:px-8 text-center">
        <h2
          className="text-4xl sm:text-5xl lg:text-7xl mt-12 sm:mt-24 lg:mt-24 mb-4 sm:mb-6 font-medium tracking-tight font-SuisseIntlRegular bg-gradient-to-r from-white via-white to-blue-500 bg-[length:200%_100%] text-transparent bg-clip-text"
          style={{ backgroundPosition: "90% 0" }}
        >
          Purifico Hand Dryers
        </h2>
        <p className="mb-6 sm:mb-8 max-w-4xl mx-auto text-zinc-300 leading-7 sm:leading-8 text-base sm:text-lg lg:text-xl">
          Our mission is to create a clean, affordable and environmentally
          friendly product that makes a difference in people's lives. We believe
          that small changes can lead to big impacts, and that's why we're
          excited to share our latest innovation with you.
        </p>
        <p className="mb-2 max-w-4xl mx-auto text-zinc-300 leading-7 sm:leading-8 text-base sm:text-lg lg:text-xl">
          Patent Pending
        </p>
        <div
          ref={mountRef}
          className="w-full sm:w-4/5 lg:w-3/5 h-[300px] sm:h-[400px] lg:h-[500px] mx-auto bg-transparent rounded-lg shadow-lg"
          style={{ userSelect: "none", touchAction: "none" }}
        />
      </main>
    </div>
  );
};

export default ThreeDModelPage;
