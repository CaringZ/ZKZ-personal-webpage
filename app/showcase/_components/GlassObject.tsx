'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface GlassObjectProps {
    position: [number, number, number];
    color?: string;
    shape?: 'box' | 'sphere' | 'torus' | 'octahedron' | 'icosahedron' | 'knot';
    scale?: number;
    quality?: 'high' | 'balanced';
}

// GLSL 3D Simplex Noise
const noiseGLSL = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  // First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;

  // Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

  // Permutations
  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  // Gradients: 7x7 points over a square, mapped onto an octahedron.
  // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  //Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  // Mix final noise value
  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 105.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}
`;

export default function GlassObject({ position, color = '#ffffff', shape = 'box', scale = 1, quality = 'balanced' }: GlassObjectProps) {
    const mesh = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);
    const [randomFactor] = useState(() => Math.random());
    const [inView, setInView] = useState(true);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.x = state.clock.elapsedTime * (0.2 + randomFactor * 0.1);
            mesh.current.rotation.y = state.clock.elapsedTime * (0.3 + randomFactor * 0.1);
        }

        if (groupRef.current) {
            const distance = state.camera.position.distanceTo(groupRef.current.position);
            setInView(distance < 25);
        }
    });

    const geometry = useMemo(() => {
        const geometries = {
            box: <boxGeometry args={[2, 2, 2]} />,
            sphere: <sphereGeometry args={[1.2, 64, 64]} />,
            torus: <torusGeometry args={[1.2, 0.4, 32, 128]} />,
            octahedron: <octahedronGeometry args={[1.5]} />,
            icosahedron: <icosahedronGeometry args={[1.5, 0]} />,
            knot: <torusKnotGeometry args={[1, 0.3, 100, 16]} />,
        };
        return geometries[shape];
    }, [shape]);

    // Custom Shader Logic to inject 3D Noise
    const onBeforeCompile = useMemo(() => (shader: any) => {
        // VERTEX SHADER INJECTION
        shader.vertexShader = `
            varying vec3 vWorldPosition;
            ${shader.vertexShader}
        `.replace(
            '#include <worldpos_vertex>',
            `
            #include <worldpos_vertex>
            vWorldPosition = (modelMatrix * vec4(transformed, 1.0)).xyz;
            `
        );

        // FRAGMENT SHADER INJECTION
        shader.fragmentShader = `
            varying vec3 vWorldPosition;
            ${noiseGLSL}
            ${shader.fragmentShader}
        `.replace(
            '#include <roughnessmap_fragment>',
            `
            // Define roughnessFactor (was originally in the chunk or before it, but missing now)
            float roughnessFactor = roughness;
            
            // Calculate 3D noise based on world position
            // Scale: 0.3 for very large, macro cloud look (was 0.8)
            float noiseVal = snoise(vWorldPosition * 0.3);
            
            // Remap noise from [-1, 1] to [0, 1]
            noiseVal = noiseVal * 0.5 + 0.5;
            
            // Soften the noise (gamma correction-like)
            noiseVal = pow(noiseVal, 1.2);
            
            // Apply to roughness: 
            // Base roughness is defined in material (0.25)
            // We modulate it: darker noise = smoother (0.1), lighter noise = rougher (0.5)
            float roughnessMod = mix(0.15, 0.5, noiseVal);
            
            roughnessFactor = roughnessMod;
            `
        ).replace(
            '#include <normal_fragment_maps>',
            `
            #include <normal_fragment_maps>
            
            // Bump Mapping using Noise Gradient
            // We approximate gradient by sampling noise at small offsets
            float eps = 0.001;
            float n0 = snoise(vWorldPosition * 0.3);
            float nX = snoise((vWorldPosition + vec3(eps, 0.0, 0.0)) * 0.3);
            float nY = snoise((vWorldPosition + vec3(0.0, eps, 0.0)) * 0.3);
            float nZ = snoise((vWorldPosition + vec3(0.0, 0.0, eps)) * 0.3);
            
            // Calculate gradient
            vec3 noiseGrad = vec3(nX - n0, nY - n0, nZ - n0) / eps;
            
            // Perturb normal
            // Strength: 0.15 for subtle bump
            vec3 bumpNormal = normalize(normal + noiseGrad * -0.15);
            
            // Mix with original normal (if any)
            normal = bumpNormal; 
            `
        );
    }, []);

    // Base material properties (will be augmented by shader)
    const materialProps = useMemo(() => {
        return {
            transmission: 0,
            transparent: false,
            metalness: 0.7,
            roughness: 0.25, // Will be overridden by shader
            clearcoat: 1,
            clearcoatRoughness: 0.1,
            emissive: new THREE.Color(color),
            emissiveIntensity: 0.05,
            color: new THREE.Color(color),
            envMapIntensity: 2.0,
            reflectivity: 1,
            ior: 2.5,
            side: THREE.DoubleSide,
            sheen: 0.6,
            sheenRoughness: 0.4,
            sheenColor: new THREE.Color(color).multiplyScalar(0.4),
        };
    }, [color]);

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
            <group ref={groupRef} position={position} scale={scale}>
                <mesh ref={mesh}>
                    {geometry}
                    <meshPhysicalMaterial
                        {...materialProps}
                        onBeforeCompile={onBeforeCompile}
                    />
                </mesh>
            </group>
        </Float>
    );
}
