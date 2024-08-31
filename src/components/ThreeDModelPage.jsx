import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const ThreeDModelPage = () => {
  const mountRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const mouse = { x: 0, y: 0 };
  const rotation = useRef({ x: 0, y: 0 });

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
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Set up a basic cube (you can replace this with your 3D model later)
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    // Mouse event listeners
    const onMouseDown = (event) => {
      setIsDragging(true);
      event.preventDefault(); // Prevent text selection
    };

    const onMouseMove = (event) => {
      if (isDragging) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        rotation.current.x += (mouse.y * Math.PI) / 45;
        rotation.current.y += (mouse.x * Math.PI) / 45;
      }
    };

    const onMouseUp = () => {
      setIsDragging(false);
    };

    mount.addEventListener("mousedown", onMouseDown);
    mount.addEventListener("mousemove", onMouseMove);
    mount.addEventListener("mouseup", onMouseUp);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      // Apply rotation regardless of whether the user is dragging
      cube.rotation.x = rotation.current.x;
      cube.rotation.y = rotation.current.y;
      renderer.render(scene, camera);
    };
    animate();

    // Clean up on unmount
    return () => {
      mount.removeEventListener("mousedown", onMouseDown);
      mount.removeEventListener("mousemove", onMouseMove);
      mount.removeEventListener("mouseup", onMouseUp);
      mount.removeChild(renderer.domElement);
    };
  }, [isDragging]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Purifico Hand Dryers</h1>
      <p>
        Our mission is to create a clean, affordable and environmentally
        friendly product that makes a difference in people's lives. We believe
        that small changes can lead to big impacts, and that's why we're excited
        to share our latest innovation with you.
      </p>
      <div
        ref={mountRef}
        style={{
          width: "60%", // Adjusted width
          height: "500px",
          margin: "0 auto",
          backgroundColor: "#333",
          userSelect: "none", // Disable text selection
        }}
      />
      <p>Rendering of 3D model of Purifico Hand Dryer</p>
    </div>
  );
};

export default ThreeDModelPage;
