import React, { Component } from 'react';
import * as THREE from 'three';
// import OrbitControls  from 'three-orbitcontrols';
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';
import objUrl from '../assets/models/linq_low_poly.obj';
import mtlUrl from '../assets/models/linq_low_poly.mtl';

// OrbitControls(THREE);
// OBJLoader(THREE);
// MTLLoader(THREE);
// TODO: check https://www.youtube.com/watch?v=DJ-oSy0tN_U
// TODO: npm module third libary import approached https://stackoverflow.com/questions/28068038/how-do-i-import-additional-plugins-for-an-already-imported-library-using-jspm

let radius = 4;
let alpha = 0;
let theta = 0;

class Scene extends Component { // code from https://stackoverflow.com/questions/41248287/how-to-connect-threejs-to-react
    /*constructor(props) {
        super(props);
        let theta = 0;
    }*/

    componentDidMount() {
        window.addEventListener('resize', this.resizeCanvas);

        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;

        const renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xfdeee9);
        const camera = new THREE.PerspectiveCamera(
            40, //75
            width / height,
            0.1,
            1000
        );
        scene.add(camera);
       /* let controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = false;*/

        let ambientLight = new THREE.AmbientLight(0x8efff9, 0.4);
        scene.add( ambientLight );
        let pointLight = new THREE.PointLight(0xffef89, 0.8);
        camera.add(pointLight);

        let loadedObject = null;
        this.THREE = THREE;

        let mtlLoader = new MTLLoader();
        let objLoader = new OBJLoader();
        // let mtlLoader = new this.THREE.MTLLoader();
        // let objLoader = new this.THREE.OBJLoader();

        mtlLoader.load(mtlUrl, (materials) => {
            materials.preload();
            objLoader.setMaterials(materials);
            objLoader.load(objUrl,
                // called when resource is loaded
                (object) => {
                    loadedObject = object;
                    this.loadedObject = loadedObject;

                    // console.log(this.loadedObject.children[0].material);
                    this.loadedObject.children[0].material[0].transparent = true;
                    this.loadedObject.children[0].material[1].transparent = true;

                    /*object.traverse(function(child) {
                        if (child instanceof THREE.Mesh) {
                            // child.material.map = texture;
                            console.log(child);

                            // enable casting shadows
                            // child.castShadow = true;
                            // child.receiveShadow = true;
                        }
                    } );*/

                    scene.add(object);
                },
                // called when loading is in progresses
                (xhr) => {
                    console.log('Model ' + (xhr.loaded / xhr.total * 100) + '% loaded');
                },
                // called when loading has errors
                (error) => {
                    console.log('An error happened ' + error);
                });
        });

        camera.position.set(0, 0, 4);
        // camera.position.z = 4;

        /*setTimeout(() => {
            camera.fov *= 3;
            camera.updateProjectionMatrix();
        }, 1000);*/
        renderer.setSize(width, height);

        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;

        this.start();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeCanvas);
        this.stop();
    }

    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate);
        }
    };

    stop = () => {
        cancelAnimationFrame(this.frameId);
    };

    animate = () => {
        this.renderScene();

        theta += 0.4;

        if (this.loadedObject) { // Check if the object is present
            alpha += 1.2;

            // console.log(this.loadedObject.children[0].material[0]);
            // console.log(this.loadedObject.children[0].material.opacity);
            this.loadedObject.children[0].material[1].opacity = (1 - Math.sin(THREE.Math.degToRad(alpha)));
            // this.loadedObject.children[0].material[1].opacity = (1 - alpha / 100);

            /*this.loadedObject.rotation.x += 0.01;
            this.loadedObject.rotation.y += 0.01;
            this.loadedObject.rotation.z += 0.01;*/
        }

        this.camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
        this.camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
        this.camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));

        this.camera.lookAt(this.scene.position);

        this.camera.updateMatrixWorld();

        this.frameId = window.requestAnimationFrame(this.animate);
    };

    renderScene() {
        this.renderer.render(this.scene, this.camera);
    }

    resizeCanvas = () => {
        this.canvas.style.width = '100%';
        this.canvas.style.height= '100%';
        // this.canvas.style.borderRadius = '50%';
    };

    render() {
        return (
            <canvas
                // className={ classes.circle }
                style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                ref={ (canvas) => { this.canvas = canvas }}
            />
        )
    }
}

export default Scene;