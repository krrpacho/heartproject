import React from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';


function HeartModel() {
  const gltf = useLoader(GLTFLoader, '/model/scene.gltf');

  return <primitive object={gltf.scene} scale={3} />;
}

function CameraControls() {
  const { camera } = useThree();

  camera.position.set(0, 0, 5); 

  return null;
}

function App() {
  return (
    <div style={{ height: '100vh', width: '100vw',  backgroundColor: 'black' }}>
      <Canvas>
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 5, 5]} intensity={10} />
        <directionalLight position={[-5, -5, -5]} intensity={10} />
        <pointLight position={[10, 10, 10]} intensity={10} />
        <CameraControls />
        <HeartModel />
        <OrbitControls /> 
      </Canvas>
    </div>
  );
}

export default App;

