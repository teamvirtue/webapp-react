import React, { Component } from 'react';
import * as THREE from 'three';
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';
// import * as OBJLoader from 'three-obj-loader';
import objUrl from '../assets/models/linq_low_poly.obj';
import mtlUrl from '../assets/models/linq_low_poly.mtl';

import elementResizeDetectorMaker from 'element-resize-detector';

let canvasHalfWidth;
let canvasHalfHeight;

OBJLoader(THREE);
MTLLoader(THREE);
// TODO: check https://www.youtube.com/watch?v=DJ-oSy0tN_U

class Scene extends Component { // code from https://stackoverflow.com/questions/41248287/how-to-connect-threejs-to-react
    /*constructor(props) {
        super(props);

    }*/

    componentDidMount() {
        window.addEventListener('resize', this.resizeCanvas);

        /* Resize canvas when parent div changes in width or height (for instance during resize animations */
        /*let erd = elementResizeDetectorMaker();
        erd.listenTo(document.getElementsByClassName('linqStatusCircle'), function(element) {
            this.resizeCanvas();
        });*/

        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            40, //75
            width / height,
            0.1,
            1000
        );
        scene.add(camera);

        let ambientLight = new THREE.AmbientLight(0x8efff9, 0.4);
        scene.add( ambientLight );
        let pointLight = new THREE.PointLight(0xffef89, 0.8);
        camera.add(pointLight);

        const renderer = new THREE.WebGLRenderer({ canvas: this.mount, antialias: true });
        /*const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: '#f15b27' });
        const cube = new THREE.Mesh(geometry, material);*/

        let loadedObject = null;
        this.THREE = THREE;
        // const loader = new this.THREE.OBJLoader();
        // console.log(loader);

        let mtlLoader = new this.THREE.MTLLoader();
        let objLoader = new this.THREE.OBJLoader();

        mtlLoader.load(mtlUrl, (materials) => {
            materials.preload();
            objLoader.setMaterials(materials);
            objLoader.load(objUrl,
                // called when resource is loaded
                (object) => {
                    loadedObject = object;
                    this.loadedObject = loadedObject;

                    scene.add(object);
                },
                // called when loading is in progresses
                (xhr) => {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },
                // called when loading has errors
                (error) => {
                    console.log('An error happened ' + error);
                });
        });

        /*mtlLoader.load(mtlUrl, (materials) => {
            materials.preload();
            objLoader.setMaterials(materials);
            objLoader.load(objUrl, (object) => {
                loadedObject = object;
                this.loadedObject = loadedObject;

                scene.add(object)
            });
        });*/

        /*loader.load(url,
            // called when resource is loaded
            (object) => {
                loadedObject = object;
                this.loadedObject = loadedObject;

                scene.add(object);
            },
            // called when loading is in progresses
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            // called when loading has errors
            (error) => {
                console.log('An error happened ' + error);
            }
        );*/

        camera.position.z = 4;
        // scene.add(cube);
        renderer.setClearColor('#f1f1f1');
        renderer.setSize(width, height);

        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        // this.material = material;
        // this.cube = cube;
        // this.loadedObject = loadedObject;

        console.log(this.renderer.domElement);
        // this.mount.appendChild(this.renderer.domElement); // TODO: check purpose
        this.start();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeCanvas);
        this.stop();
        // this.mount.removeChild(this.renderer.domElement);
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

        if (this.loadedObject) {
            this.loadedObject.rotation.x += 0.01;
            this.loadedObject.rotation.y += 0.01;
            this.loadedObject.rotation.z += 0.01;
        }

        this.frameId = window.requestAnimationFrame(this.animate);
    };

    renderScene() {
        this.renderer.render(this.scene, this.camera);
    }

    resizeCanvas = () => {
        this.mount.style.width = '100%';
        this.mount.style.height= '100%';
        // this.mount.style.borderRadius = '50%';

        console.log('resize', this.mount);
    };

    render() { // TODO: move style to LinqStatus?
        return ( //<div
            <canvas
                // className={ classes.circle }
                style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                ref={ (mount) => { this.mount = mount }}
            />
        )
    }
}

export default Scene;