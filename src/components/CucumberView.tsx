/* eslint-disable @typescript-eslint/no-empty-object-type */
import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_id27: THREE.Mesh
    mesh_id48: THREE.Mesh
    mesh_id57: THREE.Mesh
  }
  materials: {
    ['67']: THREE.MeshStandardMaterial
  }
}

interface ModelProps extends React.ComponentProps<'group'> {}

function Model(props: ModelProps) {
  const { nodes, materials } = useGLTF(
    'https://roman1510.github.io/files/cucumber99new.glb'
  ) as unknown as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_id27.geometry}
        material={materials['67']}
        position={[0.015, 0.117, 0.069]}
        rotation={[0.317, 0.784, 3.061]}
        scale={[0.002, 0.001, 0.002]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_id48.geometry}
        material={materials['67']}
        position={[-0.036, 0.018, 0.021]}
        rotation={[0.893, 0.125, 2.723]}
        scale={[0.002, 0.001, 0.002]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_id57.geometry}
        material={materials['67']}
        position={[0.187, 0.004, 0.177]}
        rotation={[1.237, -0.733, 2.773]}
        scale={[0.002, 0.001, 0.002]}
      />
    </group>
  )
}

function FloatingCucumber() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 0.2) * 0.1

      groupRef.current.rotation.y += 0.001
    }
  })

  return (
    <group ref={groupRef}>
      <Model />
    </group>
  )
}

export default function CucumberViewer() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 0, 0.55] }}>
        <ambientLight intensity={1} />

        <FloatingCucumber />
      </Canvas>
    </div>
  )
}

useGLTF.preload('https://roman1510.github.io/files/cucumber99new.glb')
