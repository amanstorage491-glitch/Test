import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uLensRadius;
  uniform float uStrength;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 mouse = uMouse * 0.5 * aspect;
    vec2 uvAspect = uv * aspect;
    
    float dist = distance(uvAspect, mouse);
    float factor = smoothstep(uLensRadius, 0.0, dist);
    
    vec2 direction = uvAspect - mouse;
    float dirLen = length(direction);
    if (dirLen > 0.0) {
      direction = direction / dirLen;
    }
    
    // Radial Warp
    vec2 warpedUv = uv - (direction * factor * uStrength * 0.5 / aspect);
    
    // Ripple
    float ripple = sin(dist * 30.0 - uTime * 3.0) * 0.005;
    warpedUv += (direction * ripple * factor / aspect);

    // Chromatic Aberration
    float chromaticOffset = 0.02 * factor;
    vec2 rUv = warpedUv + (direction * chromaticOffset / aspect);
    vec2 gUv = warpedUv + (direction * (chromaticOffset * 0.5) / aspect);
    
    float r = texture2D(uTexture, rUv).r;
    float g = texture2D(uTexture, gUv).g;
    float b = texture2D(uTexture, warpedUv).b;

    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

export default function EventHorizon() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    camera.position.z = 10;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Render target for post-processing
    const rtParams: THREE.RenderTargetOptions = {
      type: THREE.HalfFloatType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
    };
    const bgRenderTarget = new THREE.WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight,
      rtParams
    );

    // Lights
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x1a1a24, 0.5);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffb800, 2.0);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const ambientLight = new THREE.AmbientLight(0x1a1a24, 0.3);
    scene.add(ambientLight);

    // Background Elements - amber geometric shapes
    const amberMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffb800,
      metalness: 0.4,
      roughness: 0.2,
      emissive: 0xffb800,
      emissiveIntensity: 0.15,
    });

    const darkMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1a1a24,
      metalness: 0.6,
      roughness: 0.3,
      emissive: 0x1a1a24,
      emissiveIntensity: 0.1,
    });

    const geometries = [
      new THREE.BoxGeometry(0.8, 0.8, 0.8),
      new THREE.CylinderGeometry(0.3, 0.3, 1.2, 32),
      new THREE.IcosahedronGeometry(0.6, 0),
      new THREE.TorusGeometry(0.5, 0.15, 16, 32),
      new THREE.OctahedronGeometry(0.5, 0),
    ];

    const meshes: THREE.Mesh[] = [];
    const initialRotations: THREE.Euler[] = [];
    const floatSpeeds: number[] = [];
    const floatOffsets: number[] = [];

    for (let i = 0; i < 35; i++) {
      const geoIndex = i % geometries.length;
      const mat = i % 3 === 0 ? darkMaterial : amberMaterial;
      const mesh = new THREE.Mesh(geometries[geoIndex], mat);

      mesh.position.set(
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 10 - 2
      );

      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        0
      );

      scene.add(mesh);
      meshes.push(mesh);
      initialRotations.push(mesh.rotation.clone());
      floatSpeeds.push(0.3 + Math.random() * 0.7);
      floatOffsets.push(Math.random() * Math.PI * 2);
    }

    // Post-processing quad
    const orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const postMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: bgRenderTarget.texture },
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uTime: { value: 0.0 },
        uLensRadius: { value: 0.28 },
        uStrength: { value: 0.45 },
      },
      vertexShader,
      fragmentShader,
    });

    const postScene = new THREE.Scene();
    const postMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      postMaterial
    );
    postScene.add(postMesh);

    // Interaction
    const targetMouse = new THREE.Vector2(0, 0);
    const currentMouse = new THREE.Vector2(0, 0);

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      bgRenderTarget.setSize(w, h);
      postMaterial.uniforms.uResolution.value.set(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    const clock = new THREE.Clock();

    function animate() {
      frameRef.current = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth Mouse Lerp
      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.08;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.08;
      postMaterial.uniforms.uMouse.value.copy(currentMouse);
      postMaterial.uniforms.uTime.value = time;

      // Gentle rotation and floating of scene elements
      meshes.forEach((mesh, i) => {
        const speed = floatSpeeds[i];
        const offset = floatOffsets[i];
        mesh.rotation.x =
          initialRotations[i].x + Math.sin(time * speed * 0.5 + offset) * 0.15;
        mesh.rotation.y =
          initialRotations[i].y + Math.cos(time * speed * 0.4 + offset) * 0.15;
        mesh.position.y += Math.sin(time * speed + offset) * 0.002;
      });

      // Render 3D Scene to Texture
      renderer.setRenderTarget(bgRenderTarget);
      renderer.render(scene, camera);

      // Render Post-Processing Quad to Screen
      renderer.setRenderTarget(null);
      renderer.render(postScene, orthoCamera);
    }

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameRef.current);
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      bgRenderTarget.dispose();
      postMaterial.dispose();
      amberMaterial.dispose();
      darkMaterial.dispose();
      geometries.forEach((g) => g.dispose());
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
