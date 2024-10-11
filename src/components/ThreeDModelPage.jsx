import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import backgroundImage from "../assets/background2.jpg";
import { ShaderMaterial, Color } from "three";

// Define vertex and fragment shaders
const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * vec4(vPosition, 1.0);
  }
`;

const fragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform vec3 lightPosition;
  uniform vec3 viewPosition;
  uniform vec3 baseColor;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 lightDir = normalize(lightPosition - vPosition);
    vec3 viewDir = normalize(viewPosition - vPosition);

    // Ambient component
    float ambientStrength = 0.1;
    vec3 ambient = ambientStrength * baseColor;

    // Diffuse component
    float diff = max(dot(normal, lightDir), 0.0);
    vec3 diffuse = diff * baseColor;

    // Specular component
    float specularStrength = 0.5;
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
    vec3 specular = specularStrength * spec * vec3(1.0);

    // Combine components
    vec3 result = ambient + diffuse + specular;
    gl_FragColor = vec4(result, 1.0);
  }
`;

const ThreeDModelPage = () => {
  const mountRef = useRef(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const modelRef = useRef(null); // Store a reference to the model
  const isDragging = useRef(false); // Track dragging state
  const previousMousePosition = useRef({ x: 0, y: 0 }); // Store previous mouse position

  useEffect(() => {
    const mount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Set the background to be transparent

    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // alpha for transparency
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 300, 800);
    scene.add(directionalLight);

    // Position camera
    camera.position.set(0, 0, 0);

    // Load GLTF model
    const loader = new GLTFLoader();
    loader.load(
      "/threejs.json",
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model; // model reference

        // Create shader material
        const shaderMaterial = new ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms: {
            lightPosition: { value: new THREE.Vector3(0, 300, 800) },
            viewPosition: { value: new THREE.Vector3(0, 0, 0) },
            baseColor: { value: new Color(0.75, 0.75, 0.75) }, // Silver color
          },
        });

        // Apply shader material to the model
        model.traverse((child) => {
          if (child.isMesh) {
            child.material = shaderMaterial;
          }
        });

        // Correct the position by subtracting the geometric center
        const geometricCenter = new THREE.Vector3(0, 1, 23);
        model.position.sub(geometricCenter); // Offset the model by its geometric center

        // Scaling
        const scale = 0.1;
        model.scale.set(scale, scale, scale);

        scene.add(model);
        setModelLoaded(true);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.error("An error occurred loading the model:", error);
      }
    );

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      if (modelRef.current && !isDragging.current) {
        modelRef.current.rotation.y += 0.005; // rotation speed
      }

      renderer.render(scene, camera);
    };
    animate();

    // Mouse controls for rotating the model
    const handleMouseDown = (event) => {
      isDragging.current = true;
      previousMousePosition.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseMove = (event) => {
      if (isDragging.current && modelRef.current) {
        const deltaMove = {
          x: event.clientX - previousMousePosition.current.x,
          y: event.clientY - previousMousePosition.current.y,
        };

        const model = modelRef.current;
        const rotateSpeed = 0.005; // sensitivity for rotation

        // Rotate around Y-axis for horizontal drag (left/right)
        model.rotation.y += deltaMove.x * rotateSpeed;

        // Rotate around X-axis for vertical drag (up/down)
        model.rotation.x += deltaMove.y * rotateSpeed;

        previousMousePosition.current = { x: event.clientX, y: event.clientY };
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    // Touch controls for rotating the model
    const handleTouchStart = (event) => {
      isDragging.current = true;
      previousMousePosition.current = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
    };

    const handleTouchMove = (event) => {
      if (isDragging.current && modelRef.current) {
        const deltaMove = {
          x: event.touches[0].clientX - previousMousePosition.current.x,
          y: event.touches[0].clientY - previousMousePosition.current.y,
        };

        const model = modelRef.current;
        const rotateSpeed = 0.005; // sensitivity for rotation

        // Rotate around Y-axis for horizontal drag (left/right)
        model.rotation.y += deltaMove.x * rotateSpeed;

        // Rotate around X-axis for vertical drag (up/down)
        model.rotation.x += deltaMove.y * rotateSpeed;

        previousMousePosition.current = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        };
      }
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    // Add mouse event listeners
    mount.addEventListener("mousedown", handleMouseDown);
    mount.addEventListener("mousemove", handleMouseMove);
    mount.addEventListener("mouseup", handleMouseUp);
    mount.addEventListener("mouseleave", handleMouseUp);

    // Add touch event listeners
    mount.addEventListener("touchstart", handleTouchStart);
    mount.addEventListener("touchmove", handleTouchMove);
    mount.addEventListener("touchend", handleTouchEnd);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
      mount.removeEventListener("mousedown", handleMouseDown);
      mount.removeEventListener("mousemove", handleMouseMove);
      mount.removeEventListener("mouseup", handleMouseUp);
      mount.removeEventListener("mouseleave", handleMouseUp);

      mount.removeEventListener("touchstart", handleTouchStart);
      mount.removeEventListener("touchmove", handleTouchMove);
      mount.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div className="relative text-white min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-green-900/70 to-transparent" />

      <main className="relative z-20 container mx-auto px-4 py-8 sm:py-12 lg:py-16 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-7xl mt-12 sm:mt-24 lg:mt-24 mb-4 sm:mb-6 font-medium tracking-tight font-SuisseIntlRegular bg-gradient-to-r from-white via-white to-blue-500 bg-[length:200%_100%] text-transparent bg-clip-text">
          Purifico Hand Dryers
        </h2>
        <p className="mb-6 sm:mb-8 max-w-4xl mx-auto text-zinc-300 leading-7 sm:leading-8 text-base sm:text-lg lg:text-xl">
          Our mission is to create a clean, affordable and environmentally
          friendly product that makes a difference in people's lives.
        </p>
        <div
          ref={mountRef}
          className="w-full sm:w-4/5 lg:w-3/5 h-[300px] sm:h-[400px] lg:h-[500px] mx-auto bg-transparent rounded-lg shadow-lg"
        />
        <p className="mt-4 text-zinc-300 text-sm sm:text-base lg:text-lg">
          {modelLoaded
            ? "3D Model of Purifico Hand Dryer"
            : "Loading 3D Model..."}
        </p>
      </main>

      <div className="absolute -bottom-5 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-blue-900 to-transparent z-30" />
    </div>
  );
};

export default ThreeDModelPage;
