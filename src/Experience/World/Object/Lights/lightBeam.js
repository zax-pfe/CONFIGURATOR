import Experience from '../../../Experience';

import * as THREE from 'three'

export default class lightBeam {

    constructor(model, options) {

        this.model = model;
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.texture = this.experience.resources.items.lightTexture;
        this.texture.wrapS = this.texture.wrapT = THREE.ClampToEdgeWrapping;
        
        // default options if no props
        const defaults = {
            color: 'white',
            direction: new THREE.Vector3(0, -1, 0),
            radiusTop: 0,
            spreadRatio: 0.2175,
            height: 20,
            laser: false,
            opacity: 0.8,
            radialSegments: 32,
        };
        
        this.params = { ...defaults, ...options };

        this.colors = {
            white: {top: new THREE.Color(0xF5F5F5), bottom: new THREE.Color(0xF5F5F5)},
            green: {top: new THREE.Color(0xD9F203), bottom: new THREE.Color(0xD9F203)},
            blue: {top: new THREE.Color(0x75EAF1), bottom: new THREE.Color(0x75EAF1)},
            purple: {top: new THREE.Color(0x581CAF), bottom: new THREE.Color(0x581CAF)},
            pink: {top: new THREE.Color(0xD936E7), bottom: new THREE.Color(0xD936E7)},
            red: {top: new THREE.Color(0xf17575), bottom: new THREE.Color(0xf17575)},
        }
        
        this.chosenColor = this.colors[this.params.color] || this.colors.white;
        
        this.setGeometry();
        this.setMaterial();
        this.setModel();
        // this.hide(); // caché par défaut
        this.show();

    }

    setGeometry() {
        const rTop = this.params.radiusTop !== undefined ? this.params.radiusTop : 0;
        const rBottom = rTop + (this.params.height * this.params.spreadRatio);

        this.geometry = new THREE.CylinderGeometry(
            rTop,
            rBottom,
            this.params.height, 
            this.params.radialSegments, 
            1, 
            true
        );
        // on décale la geo de la moitié de sa height (20 / 2)
        this.geometry.translate(0, -this.params.height / 2, 0);
    }

    setMaterial() {
        this.material = new THREE.ShaderMaterial({
            transparent: true,
            // blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide,
            depthWrite: false,

            uniforms: {
                uColorTop: { value: this.chosenColor.top }, // couleur de la pointe
                uColorBottom: { value: this.chosenColor.bottom }, // couleur de la base
                // uAlphaMap: { value: this.texture },
                ...(!this.params.laser && { uAlphaMap: { value: this.texture } }),
                uOpacity: { value: 0.8 }
            },

            vertexShader: `
            varying vec2 vUv;
            void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
            `,

            fragmentShader: `
            uniform vec3 uColorTop;
            uniform vec3 uColorBottom;
            uniform sampler2D uAlphaMap;
            uniform float uOpacity;
            varying vec2 vUv;

            void main() {

                // On mélange les deux couleurs en fonction de vUv.y (de 0 à 1)
                vec3 gradientColor = mix(uColorBottom, uColorTop, vUv.y);

                // On récupère l'alpha de la texture
                float alphaTexture = texture2D(uAlphaMap, vUv).g; // .g ou .r

                gl_FragColor = vec4(gradientColor, alphaTexture * uOpacity);
            }
            `
        });
    }

    setModel(){

        this.light = new THREE.Mesh(this.geometry, this.material);

        // orienter le mesh avec le vecteur de direction 
        const upAxis = new THREE.Vector3(0, 1, 0);
        this.light.quaternion.setFromUnitVectors(upAxis, this.params.direction.normalize());

        this.model.add(this.light);
    }

    show() {
        if(this.light) {
            this.light.visible = true;
            // ex: gsap.to(this.light.material, { opacity: 1 ... })
        }
    }

    hide() {
        if(this.light) {
            this.light.visible = false;
        }
    }

}