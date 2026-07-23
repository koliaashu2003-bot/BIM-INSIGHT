import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useTheme } from '../context/ThemeContext'

interface Node {
  pos: THREE.Vector3
  size: number
}

/**
 * A slowly rotating cloud of "nodes" wired together — a nod to Dynamo's
 * visual-programming graphs. Purely decorative; sits behind the hero copy.
 */
function NodeGraph() {
  const group = useRef<THREE.Group>(null)
  const { theme } = useTheme()
  const accent = theme === 'dark' ? '#5eead4' : '#0f766e'
  const accent2 = theme === 'dark' ? '#99f6e4' : '#0b5c56'

  const { nodes, edges } = useMemo(() => {
    let seed = 42
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }
    const count = 26
    const nodes: Node[] = []
    for (let i = 0; i < count; i++) {
      nodes.push({
        pos: new THREE.Vector3(
          (rand() - 0.5) * 8,
          (rand() - 0.5) * 5,
          (rand() - 0.5) * 6,
        ),
        size: 0.08 + rand() * 0.14,
      })
    }
    // Connect each node to its two nearest neighbours.
    const edges: [THREE.Vector3, THREE.Vector3][] = []
    for (let i = 0; i < nodes.length; i++) {
      const dists = nodes
        .map((n, j) => ({ j, d: nodes[i].pos.distanceTo(n.pos) }))
        .filter((x) => x.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2)
      for (const { j } of dists) edges.push([nodes[i].pos, nodes[j].pos])
    }
    return { nodes, edges }
  }, [])

  const lineGeom = useMemo(() => {
    const pts: number[] = []
    for (const [a, b] of edges) pts.push(a.x, a.y, a.z, b.x, b.y, b.z)
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
    return g
  }, [edges])

  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.12
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.12
  })

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeom}>
        <lineBasicMaterial color={accent} transparent opacity={0.28} />
      </lineSegments>
      {nodes.map((n, i) => (
        <mesh key={i} position={n.pos}>
          <icosahedronGeometry args={[n.size, 0]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? accent2 : accent}
            wireframe
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  )
}

export function HeroScene() {
  return (
    <Canvas
      className="scene3d-canvas"
      camera={{ position: [0, 0, 9], fov: 46 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <NodeGraph />
    </Canvas>
  )
}
