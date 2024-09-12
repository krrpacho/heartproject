import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';

function HeartModel() {
  //const gltf = useLoader(GLTFLoader, '/model/scene.gltf');
  const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + '/model/scene.gltf');

  return <primitive object={gltf.scene} scale={3} />;
}

function CameraControls() {
  const { camera } = useThree();
  camera.position.set(0, 0, 5);
  return null;
}

function App() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);  
  const [showMessage, setShowMessage] = useState(true); 

  useEffect(() => {
    const toggleAudio = () => {
      if (audioRef.current) {
        if (!playing) {
          audioRef.current.play().catch((error) => console.log(error));
          setShowMessage(false);  
        } else {
          audioRef.current.pause();
        }
        setPlaying(!playing); 
      }
    };

    const addListeners = () => {
      ['click', 'keydown'].forEach((event) =>
        window.addEventListener(event, toggleAudio)
      );
    };

    const removeListeners = () => {
      ['click', 'keydown'].forEach((event) =>
        window.removeEventListener(event, toggleAudio)
      );
    };

    addListeners();

    return () => {
      removeListeners();
    };
  }, [playing]);

  return (
    <div style={{ height: '100vh', width: '100vw', backgroundColor: 'black', position: 'relative' }}>
      <Canvas>
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 5, 5]} intensity={10} />
        <directionalLight position={[-5, -5, -5]} intensity={10} />
        <pointLight position={[10, 10, 10]} intensity={10} />
        <CameraControls />
        <HeartModel />
        <OrbitControls />
      </Canvas>

      <audio ref={audioRef} src={process.env.PUBLIC_URL + '/heartbeat.wav'} loop />


      {showMessage && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '1.5rem',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '10px 20px',
            borderRadius: '10px',
            textAlign: 'center',
            zIndex: 1,  
          }}
        >
          Click to play the heartbeat sound
        </div>
      )}
    </div>
  );
}

export default App;
