import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useTheme } from '../context/ThemeContext'

interface BuildingSpec {
  position: [number, number, number]
  width: number
  depth: number
  height: number
  floors: number
}

/** A multi-storey wireframe building: an outer shell plus horizontal floor slabs. */
function Building({ spec, color }: { spec: BuildingSpec; color: string }) {
  const { width, depth, height, floors } = spec

  const floorLines = useMemo(() => {
    const ys: number[] = []
    for (let f = 1; f < floors; f++) ys.push((height / floors) * f)
    return ys
  }, [height, floors])

  return (
    <group position={spec.position}>
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[width, height, depth]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.5} />
      </mesh>
      {floorLines.map((y, i) => (
        <lineSegments key={i} position={[0, y, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(width, 0.001, depth)]} />
          <lineBasicMaterial color={color} transparent opacity={0.35} />
        </lineSegments>
      ))}
    </group>
  )
}

function City() {
  const group = useRef<THREE.Group>(null)
  const { theme } = useTheme()
  const color = theme === 'dark' ? '#5eead4' : '#0f766e'

  const buildings = useMemo(() => {
    const specs: BuildingSpec[] = []
    const grid = 3
    let seed = 7
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }
    for (let x = -grid; x <= grid; x++) {
      for (let z = -grid; z <= grid; z++) {
        if (rand() > 0.7) continue
        const dist = Math.sqrt(x * x + z * z)
        const height = Math.max(1, 4.2 - dist * 0.5 + rand() * 1.6)
        const floors = Math.max(2, Math.round(height * 1.8))
        const width = 0.7 + rand() * 0.3
        const depth = 0.7 + rand() * 0.3
        specs.push({ position: [x * 1.5, 0, z * 1.5], width, depth, height, floors })
      }
    }
    return specs
  }, [])

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.08
  })

  return (
    <group ref={group} rotation={[0.32, 0, 0]} position={[0, -1.2, 0]}>
      {/* blueprint site grid */}
      <gridHelper args={[16, 16, color, color]} position={[0, 0, 0]}>
        <lineBasicMaterial attach="material" color={color} transparent opacity={0.12} />
      </gridHelper>
      {buildings.map((spec, i) => (
        <Building key={i} spec={spec} color={color} />
      ))}
    </group>
  )
}

export function Scene3D() {
  return (
    <Canvas
      className="scene3d-canvas"
      camera={{ position: [7, 5, 9], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <City />
    </Canvas>
  )
}
