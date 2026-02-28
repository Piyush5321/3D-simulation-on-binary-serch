import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import './CubeGrid3D.css'

export default function CubeGrid3D({ data = [], currentStep = -1, foundIndex = -1, eliminatedIndices = [], isAnimating = false }) {
    const containerRef = useRef(null)
    const sceneRef = useRef(null)
    const cubesRef = useRef([])
    const markersRef = useRef([])
    const rendererRef = useRef(null)
    const cameraRef = useRef(null)
    const [isRotating, setIsRotating] = useState(false)
    const rotationSpeedRef = useRef(0.005)
    const [lowIndex, setLowIndex] = useState(-1)
    const [midIndex, setMidIndex] = useState(-1)
    const [highIndex, setHighIndex] = useState(-1)

    useEffect(() => {
        if (!containerRef.current) return

        // Scene setup
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0x0a0e27)
        sceneRef.current = scene

        const width = containerRef.current.clientWidth
        const height = containerRef.current.clientHeight

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
        camera.position.z = Math.max(data.length * 1.5, 20)
        cameraRef.current = camera

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setSize(width, height)
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFShadowShadowMap
        rendererRef.current = renderer
        containerRef.current.appendChild(renderer.domElement)

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0x00d4ff, 0.8)
        directionalLight.position.set(20, 20, 20)
        directionalLight.castShadow = true
        directionalLight.shadow.mapSize.width = 2048
        directionalLight.shadow.mapSize.height = 2048
        scene.add(directionalLight)

        // Create cubes
        const cubes = []
        const spacing = 3
        const startX = -(data.length * spacing) / 2

        data.forEach((value, index) => {
            const geometry = new THREE.BoxGeometry(2, 2, 2)

            // Gradient color based on value - from purple to cyan
            const hue = (value / Math.max(...data)) * 0.6 // 0.6 = cyan, 0.8 = purple
            const color = new THREE.Color().setHSL(hue, 0.8, 0.5)

            const material = new THREE.MeshStandardMaterial({
                color: color,
                metalness: 0.6,
                roughness: 0.2,
                emissive: color,
                emissiveIntensity: 0.3,
                wireframe: false
            })

            const cube = new THREE.Mesh(geometry, material)
            cube.position.x = startX + index * spacing
            cube.castShadow = true
            cube.receiveShadow = true
            cube.userData = { value, index, originalColor: color.getHex() }

            // Add text label with pure white color
            const canvas = document.createElement('canvas')
            canvas.width = 512
            canvas.height = 512
            const ctx = canvas.getContext('2d')

            // Create gradient background
            const gradient = ctx.createLinearGradient(0, 0, 512, 512)
            gradient.addColorStop(0, 'rgba(100, 50, 150, 0.9)')
            gradient.addColorStop(0.5, 'rgba(50, 100, 200, 0.9)')
            gradient.addColorStop(1, 'rgba(0, 200, 255, 0.9)')

            // Draw rounded rectangle background
            ctx.fillStyle = gradient
            ctx.beginPath()
            ctx.moveTo(40, 20)
            ctx.lineTo(472, 20)
            ctx.quadraticCurveTo(492, 20, 492, 40)
            ctx.lineTo(492, 472)
            ctx.quadraticCurveTo(492, 492, 472, 492)
            ctx.lineTo(40, 492)
            ctx.quadraticCurveTo(20, 492, 20, 472)
            ctx.lineTo(20, 40)
            ctx.quadraticCurveTo(20, 20, 40, 20)
            ctx.fill()

            // Add border glow
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)'
            ctx.lineWidth = 6
            ctx.stroke()

            // Add text with glow effect
            ctx.shadowColor = 'rgba(0, 212, 255, 0.9)'
            ctx.shadowBlur = 40
            ctx.shadowOffsetX = 0
            ctx.shadowOffsetY = 0

            ctx.fillStyle = '#ffffff'
            ctx.font = 'bold 280px Arial'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(value, 256, 256)

            // Add decorative corner accents
            ctx.fillStyle = 'rgba(255, 215, 0, 0.8)'
            ctx.fillRect(30, 30, 25, 25)
            ctx.fillRect(457, 30, 25, 25)
            ctx.fillRect(30, 457, 25, 25)
            ctx.fillRect(457, 457, 25, 25)

            const texture = new THREE.CanvasTexture(canvas)
            const textMaterial = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                emissive: 0x00d4ff,
                emissiveIntensity: 0.3
            })

            const textGeometry = new THREE.PlaneGeometry(2.35, 2.35)
            const textMesh = new THREE.Mesh(textGeometry, textMaterial)
            textMesh.position.z = 1.05
            cube.add(textMesh)

            scene.add(cube)
            cubes.push(cube)
        })

        cubesRef.current = cubes

        // Mouse controls
        let isDragging = false
        let previousMousePosition = { x: 0, y: 0 }

        renderer.domElement.addEventListener('mousedown', (e) => {
            isDragging = true
            previousMousePosition = { x: e.clientX, y: e.clientY }
        })

        renderer.domElement.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const deltaX = e.clientX - previousMousePosition.x
                const deltaY = e.clientY - previousMousePosition.y

                scene.rotation.y += deltaX * 0.01
                scene.rotation.x += deltaY * 0.01

                previousMousePosition = { x: e.clientX, y: e.clientY }
            }
        })

        renderer.domElement.addEventListener('mouseup', () => {
            isDragging = false
        })

        renderer.domElement.addEventListener('wheel', (e) => {
            e.preventDefault()
            camera.position.z += e.deltaY * 0.05
            camera.position.z = Math.max(5, Math.min(100, camera.position.z))
        })

        // Animation loop
        let animationId
        const animate = () => {
            animationId = requestAnimationFrame(animate)

            // Only rotate if isRotating is true
            if (isRotating) {
                scene.rotation.x += rotationSpeedRef.current
                scene.rotation.y += rotationSpeedRef.current * 1.5
            }

            cubes.forEach((cube, index) => {
                // Check if cube is eliminated
                const isEliminated = eliminatedIndices.includes(index)

                // Update colors and visibility
                if (isEliminated) {
                    // Eliminated cubes - dark gray with low glow
                    cube.material.color.setHex(0x404040)
                    cube.material.emissive.setHex(0x202020)
                    cube.material.emissiveIntensity = 0.1
                    cube.scale.set(0.5, 0.5, 0.5)
                    cube.material.opacity = 0.6
                } else if (index === foundIndex) {
                    // Found cube - bright gold/yellow with strong glow
                    cube.material.color.setHex(0xffd700)
                    cube.material.emissive.setHex(0xffa500)
                    cube.material.emissiveIntensity = 0.8
                    cube.scale.set(1.3, 1.3, 1.3)
                    cube.material.opacity = 1
                } else if (index === currentStep) {
                    // Current step - bright pink/magenta
                    cube.material.color.setHex(0xff1493)
                    cube.material.emissive.setHex(0xff69b4)
                    cube.material.emissiveIntensity = 0.6
                    cube.scale.set(1.15, 1.15, 1.15)
                    cube.material.opacity = 1
                } else {
                    // Default - gradient color based on value
                    const hue = (cube.userData.value / Math.max(...data)) * 0.6
                    const color = new THREE.Color().setHSL(hue, 0.8, 0.5)
                    cube.material.color.copy(color)
                    cube.material.emissive.copy(color)
                    cube.material.emissiveIntensity = 0.3
                    cube.scale.set(1, 1, 1)
                    cube.material.opacity = 1
                }
            })

            renderer.render(scene, camera)
        }
        animate()

        // Handle resize
        const handleResize = () => {
            if (!containerRef.current) return
            const w = containerRef.current.clientWidth
            const h = containerRef.current.clientHeight
            camera.aspect = w / h
            camera.updateProjectionMatrix()
            renderer.setSize(w, h)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            cancelAnimationFrame(animationId)
            renderer.dispose()
            if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
                containerRef.current.removeChild(renderer.domElement)
            }
        }
    }, [data, currentStep, foundIndex, eliminatedIndices, isRotating])

    return (
        <div className="cube-grid-wrapper">
            <div ref={containerRef} className="cube-grid-3d" />
            <button
                className="rotate-button"
                onClick={() => setIsRotating(!isRotating)}
                title={isRotating ? "Stop rotation" : "Start rotation"}
            >
                {isRotating ? '⏸' : '🔄'}
            </button>
        </div>
    )
}
