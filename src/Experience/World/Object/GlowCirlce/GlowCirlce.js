import Experience from '../../../Experience';
import * as THREE from 'three';

export default class GlowCircle {
    constructor(options) {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.texture = this.experience.resources.items.lightTexture;
        
        const defaults = {
            size: 8,
            opacity: 0.6,
            color: new THREE.Color(0xffffff),
            glowInternalRadius: 0.0, // debut degrade
            glowExternalRadius: 0.5  // fin degrade
        };

        this.params = { ...defaults, ...options };

        this.setGeometry();
        this.setMaterial();
        this.setMesh();
    }

    setGeometry() {
        this.geometry = new THREE.PlaneGeometry(1, 1);
    }

    setMaterial() {
        this.material = new THREE.ShaderMaterial({
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.DoubleSide,
            uniforms: {
                uColor: { value: this.params.color },
                uOpacity: { value: this.params.opacity },
                uAlphaMap: { value: this.texture }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 uColor;
                uniform float uOpacity;
                uniform sampler2D uAlphaMap;
                varying vec2 vUv;

                void main() {
                    // calcul distance par rapport au centre (0.5, 0.5)
                    float dist = distance(vUv, vec2(0.5));

                    // masque circulaire doux
                    // Plus on s'éloigne du centre (0.5), plus c'est transparent
                    float strength = smoothstep(0.5, 0.1, dist);

                    // recuperer détail de ta texture
                    float textureAlpha = texture2D(uAlphaMap, vUv).r;

                    // couleur + masque circulaire + texture + opacite globale
                    gl_FragColor = vec4(uColor, strength * textureAlpha * uOpacity);
                }
            `
        });
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.scale.set(this.params.size, this.params.size, 1);
        this.scene.add(this.mesh);
        this.mesh.visible = false;
    }

    setPosition(x, y, z) {
        this.mesh.position.set(x, y, z);
    }

    show() {
        this.mesh.visible = true;
    }

    destroy() {
        this.scene.remove(this.mesh);
        this.geometry.dispose();
        this.material.dispose();
    }
}