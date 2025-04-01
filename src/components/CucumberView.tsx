/* eslint-disable @typescript-eslint/no-empty-object-type */
import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Float, Center } from '@react-three/drei'
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

function MouseTrackingCucumber() {
  const group = useRef<THREE.Group>(null)

  const mouse = useRef({ x: 0, y: 0 })

  useFrame(({ mouse: { x, y } }) => {
    mouse.current.x = x
    mouse.current.y = y

    if (group.current) {
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        -y * 0.4,
        0.1
      )
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        x * 0.6,
        0.1
      )
    }
  })

  return (
    <Float speed={1} floatIntensity={0.5} floatingRange={[-0.05, 0.05]}>
      <Center>
        <group ref={group} scale={1.5}>
          <Model />
        </group>
      </Center>
    </Float>
  )
}

export default function CucumberViewer() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 0, 1.5], fov: 35 }} dpr={[1, 2]}>
        <ambientLight intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <MouseTrackingCucumber />
      </Canvas>
    </div>
  )
}

useGLTF.preload('https://roman1510.github.io/files/cucumber99new.glb')
