import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useTheme } from '../context/ThemeContext'

function BuildingBlock({
  position,
  height,
  color,
}: {
  position: [number, number, number]
  height: number
  color: string
}) {
  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[1, height, 1]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.55} />
      </mesh>
    </group>
  )
}

function BimTower() {
  const group = useRef<THREE.Group>(null)
  const { theme } = useTheme()
  const color = theme === 'dark' ? '#5eead4' : '#0f766e'

  const blocks = useMemo(() => {
    const items: { position: [number, number, number]; height: number }[] = []
    const grid = 3
    let seed = 42
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }
    for (let x = -grid; x <= grid; x++) {
      for (let z = -grid; z <= grid; z++) {
        if (rand() > 0.55) continue
        const dist = Math.sqrt(x * x + z * z)
        const height = Math.max(0.6, 3.2 - dist * 0.55 + rand() * 0.8)
        items.push({ position: [x * 1.4, 0, z * 1.4], height })
      }
    }
    return items
  }, [])

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.15
  })

  return (
    <group ref={group} rotation={[0.35, 0, 0]}>
      {blocks.map((b, i) => (
        <BuildingBlock key={i} position={b.position} height={b.height} color={color} />
      ))}
    </group>
  )
}

export function Scene3D() {
  return (
    <Canvas
      className="scene3d-canvas"
      camera={{ position: [6, 4, 8], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <BimTower />
    </Canvas>
  )
}
