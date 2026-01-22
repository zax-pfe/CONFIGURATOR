import Experience from "../../../Experience.js";
import * as THREE from "three"
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

export default class TimerText {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.gameTimer = this.experience.gameTimer;
        this.debug = this.experience.debug;

        this.font = this.resources.items.timerFont;
        this.currentText = "";

        this.showStarted = false;

        this.textSize = 2.5; 
        this.textDepth = 0.6;

        this.instancesConfig = [
            { id: 1, pos: { x: -26.5, y: 14.5, z: -68.4 }, rot: { x: 0, y: 1.44, z: 0 }, scale: 1 },
            { id: 2, pos: { x: 0, y: 14, z: -93 }, rot: { x: 0, y: 0, z: 0 }, scale: 1 },
            { id: 3, pos: { x: 25, y: 14.5, z: -66 }, rot: { x: 0, y: -1.41, z: 0 }, scale: 1 }
        ];

        this.meshes = [];
        this.material = new THREE.MeshStandardMaterial({ 
            color: 0xD2C7FF, 
            side: THREE.DoubleSide 
        });

        this.setInstances();
        // this.createDebug();

        this.gameTimer.on('startShowTime', () => {
            this.showStarted = true;
            this.meshes.forEach(m => m.visible = true);
        });
    }

    setInstances() {
        const geometry = new TextGeometry('00:00', {
            font: this.font,
            size: this.textSize,
            depth: this.textDepth,
            curveSegments: 6,
            bevelEnabled: true,
            bevelThickness: 0.01,
            bevelSize: 0.01,
            bevelOffset: 0,
            bevelSegments: 4
        });
        geometry.center();
        geometry.computeVertexNormals();

        // 3 meshes avec la meme geometry
        this.instancesConfig.forEach((config) => {
            const mesh = new THREE.Mesh(geometry, this.material);
            
            mesh.position.set(config.pos.x, config.pos.y, config.pos.z);
            mesh.rotation.set(config.rot.x, config.rot.y, config.rot.z);
            mesh.scale.set(config.scale, config.scale, config.scale);
            
            this.scene.add(mesh);
            this.meshes.push(mesh);
        });
    }

    updateGeometry(string) {
        const newGeometry = new TextGeometry(string, {
            font: this.font,
            size: this.textSize,
            depth: this.textDepth,
            curveSegments: 6,
            bevelEnabled: true,
            bevelThickness: 0.01,
            bevelSize: 0.01,
            bevelOffset: 0,
            bevelSegments: 4
        });
        newGeometry.center();
        newGeometry.computeVertexNormals();


        // nettoie ancienne geometrie
        const oldGeometry = this.meshes[0].geometry;
        
        this.meshes.forEach(mesh => {
            mesh.geometry = newGeometry;
        });

        oldGeometry.dispose();
    }

    createDebug() {
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder("Timer 3D Texts");

            const globalFolder = this.debugFolder.addFolder("Global Settings");
            globalFolder.add(this, 'textSize', 0.1, 5, 0.1).name('FontSize').onChange(() => {
                this.updateGeometry(this.gameTimer.getFormattedTime());
            });
            globalFolder.add(this, 'textDepth', 0.01, 1, 0.01).name('Depth').onChange(() => {
                this.updateGeometry(this.gameTimer.getFormattedTime());
            });

            this.instancesConfig.forEach((config, index) => {
                const folder = this.debugFolder.addFolder(`Instance ${config.id}`);
                const mesh = this.meshes[index];

                // Position
                folder.add(mesh.position, 'x', -200, 30, 0.1).name('posX');
                folder.add(mesh.position, 'y', -200, 30, 0.1).name('posY');
                folder.add(mesh.position, 'z', -200, 30, 0.1).name('posZ');

                // Rotation
                folder.add(mesh.rotation, 'x', -Math.PI, Math.PI, 0.01).name('rotX');
                folder.add(mesh.rotation, 'y', -Math.PI, Math.PI, 0.01).name('rotY');
                folder.add(mesh.rotation, 'z', -Math.PI, Math.PI, 0.01).name('rotZ');

                // Scale
                folder.add(config, 'scale', 0.1, 5, 0.1).name('scale').onChange((value) => {
                    mesh.scale.set(value, value, value);
                });
            });
        }
    }

    update() {
        let targetString = "";
        let shouldBlink = false;

        // si le show a débuté
        if (this.showStarted) {
            targetString = "SHOW TIME";
            shouldBlink = true;
        } 
        // temps fini mais star pas envoyée
        else if (this.gameTimer.remaining <= 0) {
            targetString = "00:00";
            shouldBlink = true;
        } 
        // chrono tourne
        else {
            targetString = this.gameTimer.getFormattedTime();
            shouldBlink = false;
        }

        // update la geometry
        if (this.currentText !== targetString) {
            this.updateGeometry(targetString);
        }

        // clignotement
        if (shouldBlink) {
            const isVisible = Math.sin(this.experience.time.elapsed * 0.005) > 0;
            this.meshes.forEach(m => m.visible = isVisible);
        } else {
            this.meshes.forEach(m => m.visible = true);
        }
    }
}