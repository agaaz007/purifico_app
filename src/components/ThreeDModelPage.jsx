import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import backgroundImage from "../assets/background2.jpg";
import { ShaderMaterial, Color } from "three";
import { PlaneGeometry, Mesh } from "three";

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

// Define glow shader
const glowVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const glowFragmentShader = `
  varying vec2 vUv;
  uniform float time;
  void main() {
    float glow = 0.8 + 0.2 * sin(time + vUv.x * 10.0); // Adjust base intensity
    glow = pow(glow, 2.0); // Increase the exponent for smoother transition
    glow = smoothstep(0.0, 1.0, glow); // Use smoothstep for smoother edges
    gl_FragColor = vec4(vec3(glow), 1.0);
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
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 300, 800);
    scene.add(directionalLight);

    // Add side lights
    const sideLight1 = new THREE.PointLight(0xffffff, 0.5, 1000);
    sideLight1.position.set(-500, 200, 0);
    scene.add(sideLight1);

    const sideLight2 = new THREE.PointLight(0xffffff, 0.5, 1000);
    sideLight2.position.set(500, 200, 0);
    scene.add(sideLight2);

    // Add spotlight
    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(0, 300, 300); // Position above and in front of the model
    spotLight.angle = Math.PI / 6; // Spotlight angle
    spotLight.penumbra = 0.1; // Soft edge
    spotLight.decay = 2; // Light decay
    spotLight.distance = 1000; // Maximum range of the light
    spotLight.castShadow = true; // Enable shadows
    scene.add(spotLight);

    // Position camera
    camera.position.set(0, 0, 0);

    // Create glow material
    const glowMaterial = new ShaderMaterial({
      vertexShader: glowVertexShader,
      fragmentShader: glowFragmentShader,
      uniforms: {
        time: { value: 0.0 },
      },
    });

    // Create a plane for the glowing background
    const glowPlaneGeometry = new PlaneGeometry(1000, 500);
    const glowPlane = new Mesh(glowPlaneGeometry, glowMaterial);
    glowPlane.rotation.x = -Math.PI / 2; // Rotate to be horizontal
    glowPlane.position.y = -100; // Slightly above the floor
    scene.add(glowPlane);

    // Load GLTF model
    const loader = new GLTFLoader();
    loader.load(
      "/threejsv3.json",
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model; // model reference

        // Ensure materials are set correctly
        model.traverse((child) => {
          if (child.isMesh) {
            const material = child.material;
            if (
              material.isMeshStandardMaterial ||
              material.isMeshPhysicalMaterial
            ) {
              // Adjust material properties if needed
              material.metalness = 1.0; // Ensure metalness is set
              material.roughness = 0.5; // Adjust roughness as needed
            }
          }
        });

        // Correct the position by subtracting the geometric center
        const geometricCenter = new THREE.Vector3(0, 1, 23);
        model.position.sub(geometricCenter); // Offset the model by its geometric center

        // Scaling
        const scale = 100;
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

      // Update time uniform for glow effect
      glowMaterial.uniforms.time.value += 0.01; // Slower increment

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
      <div className="absolute inset-0 z-0 bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 z-10 bg-black" />

      <main className="relative z-20 container mx-auto px-4 py-8 sm:py-12 lg:py-16 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-7xl mt-12 sm:mt-24 lg:mt-24 mb-4 sm:mb-6 font-medium tracking-tight font-SuisseIntlRegular bg-gradient-to-r from bg-zinc-300 via-white to-zinc-300  bg-[length:200%_100%] inline-block text-transparent bg-clip-text">
          Purifico Hand Dryers
        </h2>
        <p className="mb-6 sm:mb-8 max-w-4xl mx-auto text-zinc-400 leading-7 sm:leading-8 text-base sm:text-lg lg:text-xl">
          Our mission is to create a{" "}
          <span className="text-white">clean, affordable</span> and{" "}
          <span className="text-white">environmentally friendly</span> product
          that makes a difference in people's lives.
        </p>
        <div
          ref={mountRef}
          className="w-full sm:w-4/5 lg:w-5/5 h-[300px] sm:h-[400px] lg:h-[600px] mx-auto bg-transparent rounded-lg shadow-lg"
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
