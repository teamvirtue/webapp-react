import React, { Component } from 'react';
import * as THREE from 'three';
import OrbitControls  from 'three-orbitcontrols';
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';
// import objUrl from '../assets/models/linq_scene_low_poly_optimised.obj';
// import mtlUrl from '../assets/models/linq_scene_low_poly_optimised.mtl';
import objUrl from '../assets/models/linq_low_poly_complex.obj';
import mtlUrl from '../assets/models/linq_low_poly_complex.mtl';
// import { withStyles } from '@material-ui/core/styles';

// OrbitControls(THREE);
// OBJLoader(THREE);
// MTLLoader(THREE);

// TODO: implement ambient occlusion using postprocessing library or baking it into the mesh in Blender

let radius = 4;
let alpha = 0;
let theta = 0;

/*
const styles = theme => ({
    canvasCircle: {
        marginTop: -this.canvas.clientHeight / 2,
        marginLeft: -this.canvas.clientWidth / 2,
        // transform: 'translate(-50%, -50%)',
    }
});
*/

class Scene extends Component { // code from https://stackoverflow.com/questions/41248287/how-to-connect-threejs-to-react
    /*constructor(props) {
        super(props);
        let theta = 0;
    }*/

    componentDidMount() {
        window.addEventListener('resize', this.resizeCanvas);

        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;

        const renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
        const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        // renderer.setSize(width, height);

        renderer.gammaInput = true;
        renderer.gammaOutput = true;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x97D6EA);
        const camera = new THREE.PerspectiveCamera(
            40, //75
            1,
            // width / height,
            0.1,
            1000
        );
        scene.add(camera);

        /* for debugging */
        /*let controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;*/

        let ambientLight = new THREE.AmbientLight(0x999999, 0.5);
        scene.add(ambientLight);

        let lights = [];
        lights[0] = new THREE.DirectionalLight(0xefefff, 1);
        lights[0].position.set(1, 1, 1);
        lights[0].castShadow = true;
        scene.add(lights[0]);

        lights[1] = new THREE.DirectionalLight(0xefefff, 1);
        lights[1].position.set(-1, -1, -1);
        scene.add(lights[1]);

        // TODO: Ambient occlusion bake: https://blender.stackexchange.com/questions/13956/how-do-you-bake-ambient-occlusion-for-a-model
        // let pointLight = new THREE.PointLight(0xffef89, 0.8);
        // camera.add(pointLight);

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
                    console.log(object);

                    // console.log(this.loadedObject.children[0].material);
                    this.loadedObject.children[0].material[1].transparent = true;
                    this.loadedObject.children[0].material[1].opacity = 0.5;
                    this.loadedObject.children[1].material[1].transparent = true;
                    this.loadedObject.children[1].material[1].opacity = 0;
                    // this.loadedObject.children[0].material[1].transparent = true;

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
                    //console.log('Model ' + (xhr.loaded / xhr.total * 100) + '% loaded');
                },
                // called when loading has errors
                (error) => {
                    console.log('An error happened: ' + error);
                });
        });

        camera.position.set(0, 0, 4);
        // camera.position.z = 4;

        /*setTimeout(() => {
            camera.fov *= 3;
            camera.updateProjectionMatrix();
        }, 1000);*/
        // renderer.setSize(width, height);

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
            this.resizeCanvas();
            this.frameId = requestAnimationFrame(this.animate);
        }
    };

    stop = () => {
        cancelAnimationFrame(this.frameId);
    };

    animate = () => {
        this.renderScene();

        if (this.loadedObject) {
            alpha += 0.2;

            this.loadedObject.rotation.y += 0.002;
            this.loadedObject.rotation.x = 0.5 + 0.55 * Math.cos(THREE.Math.degToRad(alpha));
        }

        /*if (this.loadedObject) { // Check if the object is present
            alpha += 1.2;

            // console.log(this.loadedObject.children[0].material[0]);
            // console.log(this.loadedObject.children[0].material.opacity);
            this.loadedObject.children[0].material[1].opacity = (1 - Math.sin(THREE.Math.degToRad(alpha)));
            // this.loadedObject.children[0].material[1].opacity = (1 - alpha / 100);

            // this.loadedObject.rotation.x += 0.01;
            // this.loadedObject.rotation.y += 0.01;
            // this.loadedObject.rotation.z += 0.01;
        }

        this.camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
        this.camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
        this.camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));

        this.camera.lookAt(this.scene.position);*/

        // this.camera.updateMatrixWorld();
        this.camera.updateProjectionMatrix();

        this.frameId = window.requestAnimationFrame(this.animate);
    };

    renderScene() {
        this.renderer.render(this.scene, this.camera);
    }

    resizeCanvas = () => {
        /*const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
        this.renderer.setPixelRatio(DPR);*/

        this.canvas.style.width = '100%';
        this.canvas.style.height= '100%';

        /*if (this.props.fullscreen) {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize( window.innerWidth, window.innerHeight );
        } else {
            console.log("I am confusion");
            this.canvas.style.width = '100%';
            this.canvas.style.height= '100%';
        }*/
    };

    render() {
        const { classes } = this.props;

        // console.log(this.props.fullscreen);
        /*if (this.props.fullscreen) {
            this.resizeCanvas();
        }*/

        return (
            <canvas
                // className={ this.props.fullScreen ? '' : classes.canvasCircle }
                // style={{ width: '100%', height: '100%' }}
                // style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                ref={ (canvas) => { this.canvas = canvas }}
            />
        )
    }
}

export default Scene;
// export default withStyles(styles)(Scene);
