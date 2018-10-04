import React, { Component } from 'react';
import * as THREE from 'three';
import OrbitControls  from 'three-orbitcontrols';
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';
// import { withStyles } from '@material-ui/core/styles';

// Local import
import objUrl from '../assets/models/linq_low_poly_web_app.obj';
import mtlUrl from '../assets/models/linq_low_poly_web_app.mtl';
// import objUrl from '../assets/models/linq_scene_low_poly_optimised.obj';
// import mtlUrl from '../assets/models/linq_scene_low_poly_optimised.mtl';

// OrbitControls(THREE);
// OBJLoader(THREE);
// MTLLoader(THREE);

/* TODO: implement ambient occlusion using postprocessing library or baking it into the mesh in Blender https://blender.stackexchange.com/questions/13956/how-do-you-bake-ambient-occlusion-for-a-model*/

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
        const { sustainabilityStatus } = this.props;
    }*/

    componentDidMount() {
        window.addEventListener('resize', this.resizeCanvas);

        let width = this.canvas.clientWidth;
        let height = this.canvas.clientHeight;

        let fieldOfView = 45,
            aspectRatio = width / height,
            near = 1,
            far = 1000;

        const renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true,  }); //alpha: true
        const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);

        // TODO: fix shadows
        renderer.shadowMap.enabled = true;
        // renderer.shadowMap.type = THREE.BasicShadowMap;
        renderer.shadowMapType = THREE.PCFSoftShadowMap; // softer shadows
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.renderReverseSided = true;

        // renderer.gammaInput = true;
        // renderer.gammaOutput = true;

        // console.log(width / height);

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x97D6EA);
        /*const camera = new THREE.OrthographicCamera(
            width / -2,
            width / 2,
            height / 2,
            height / -2,
            1,
            1000
        );*/
        const camera = new THREE.PerspectiveCamera(
            fieldOfView,
            aspectRatio,
            near,
            far
        );
        camera.position.set(0, 0, 100);
        // camera.position.set(0, 0, 4);
        // camera.position.z = 4;

        /*setTimeout(() => {
            camera.fov *= 3;
            camera.updateProjectionMatrix();
        }, 1000);*/
        // renderer.setSize(width, height);
        scene.add(camera);

        let meshGround = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(500, 500, 1, 1),
            new THREE.MeshPhongMaterial({ color: 0xf15b27 })
            // new THREE.MeshStandardMaterial({ color: 0xffffff })
            // new THREE.MeshLambertMaterial({ color: 0xf15b27 })
        );
        meshGround.position.y = -36; // 2.4 per 0.25 scale
        meshGround.rotation.x = -Math.PI / 2; // Rotate ground 90 degrees
        meshGround.receiveShadow = true;
        scene.add(meshGround);

        let loadedObject = null; // TODO: why was this needed again? 😅
        this.THREE = THREE;

        let mtlLoader = new MTLLoader();
        let objLoader = new OBJLoader();
        // let mtlLoader = new this.THREE.MTLLoader();
        // let objLoader = new this.THREE.OBJLoader();

        mtlLoader.load(mtlUrl, (materials) => {
            materials.preload();
            // let objLoader = new OBJLoader();
            objLoader.setMaterials(materials);

            objLoader.load(objUrl,
                // called when resource is loaded
                (object) => {
                    loadedObject = object;
                    /*loadedObject = object;
                    this.loadedObject = loadedObject;*/
                    // console.log(object);

                    // console.log(loadedObject.children);
                    loadedObject.children[0].material.transparent = true;
                    loadedObject.children[0].material.opacity = 0.25;
                    /*for (let i = 0; i < 7; i++) {
                        loadedObject.children[i].material.transparent = true;
                        loadedObject.children[i].material.opacity = 0.25;
                    }*/

                    object.traverse((node) => {
                        if (node instanceof THREE.Mesh) {
                            // console.log(node.material);
                            // node.material = new THREE.MeshLambertMaterial({ color: 0xf15b27, flatShading: true });
                            node.material.flatShading = true; // TODO: make group for shading?
                            node.material.shininess = 0;

                            // enable casting shadows
                            node.castShadow = true;
                            node.receiveShadow = true;
                        }
                    });

                    scene.add(object);
                },
                // called when loading is in progresses
                (xhr) => {
                    // console.log('Model ' + (xhr.loaded / xhr.total * 100) + '% loaded');
                },
                // called when loading has errors
                (error) => {
                    console.log('An error happened: ' + error);
                });
        });

        let lights = [];
        lights[0] = new THREE.AmbientLight(0x97D6EA, 0.30);
        scene.add(lights[0]);

        lights[1] = new THREE.DirectionalLight(0xffffff, 0.6, 1000);
        lights[1].target = meshGround;
        lights[1].position.set(50, 100, 150);
        lights[1].castShadow = true;

        // shadow properties for the light
        lights[1].shadow.mapSize.width = 2048; //512 = default
        lights[1].shadow.mapSize.height = 2048;
        lights[1].shadow.camera.near = 0.5;    // default
        lights[1].shadow.camera.far = 500;     // default
        lights[1].shadow.camera = new THREE.OrthographicCamera(-100, 100, 100, -100, 0.5, 1000);
        // lights[1].shadowCameraLeft;
        scene.add(lights[1]);

        /* interior light(s) */
        lights[2] = new THREE.PointLight(
            0xfffd99, //0xff0000
            0.35,
            0,
            2,
            // power: 4 * Math.PI,
        );
        lights[2].position.set(11, 4, -11);
        scene.add(lights[2]);

        /*lights[2] = new THREE.SpotLight(0xffffff, 1);
        lights[2].position.set(15, 30, 35);
        lights[2].rotation.x = -1; // Rotate ground 90 degrees
        lights[2].angle = Math.PI / 6;
        lights[2].penumbra = 0.5;
        lights[2].decay = 2;
        lights[2].distance = 100;
        lights[2].castShadow = true;

        //Set up shadow properties for the light
        lights[2].shadow.mapSize.width = 1024;  // default
        lights[2].shadow.mapSize.height = 1024; // default
        lights[2].shadowCameraNear = 10;
        lights[2].shadowCameraFar = 200;
        // lights[1].shadow.camera.near = 0.5;       // default
        // lights[1].shadow.camera.far = 500;      // default
        scene.add(lights[2]);*/

        /* for debugging */
        let controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;

        let axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);

        let lightHelpers = [];
        lightHelpers[1] = new THREE.DirectionalLightHelper(lights[1]);
        lightHelpers[2] = new THREE.PointLightHelper(lights[2], 0.5);
        // lightHelpers[2] = new THREE.SpotLightHelper(lights[2]);
        scene.add(lightHelpers[1]);
        scene.add(lightHelpers[2]);

        // renderer.setClearColor( scene.fog.color );

        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.lights = lights;

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

        /*if (this.lights[1]) {
            alpha += 0.5;

            this.lights[1].position.x = 50 * Math.sin(THREE.Math.degToRad(alpha));
            this.lights[1].position.z = 10 * Math.cos(THREE.Math.degToRad(alpha));
        }*/

        /*if (this.loadedObject) {
            alpha += 0.2;

            this.loadedObject.rotation.y += 0.002;
            this.loadedObject.rotation.x = 0.5 + 0.55 * Math.cos(THREE.Math.degToRad(alpha));
        }*/

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

        // console.log(this.canvas.clientWidth, this.canvas.clientHeight);

        this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
        this.camera.updateProjectionMatrix(); // TODO: only check when state is updated + then also update the size of renderer with this.renderer.setSize(window.innerWidth, window.innerHeight);

        /*let currentValue
        function handleChange() {
            let previousValue = currentValue
            currentValue = select(store.getState())
​
            if (previousValue !== currentValue) {
              console.log(
                  'Some deep nested property changed from',
                  previousValue,
                  'to',
                  currentValue
              )
            }
        }*/
    }

    resizeCanvas = () => {
        this.canvas.style.width = '100%';
        this.canvas.style.height= '100%';

        // for debugging
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        /*if (this.props.sustainabilityStatus.fullscreen) {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        } else {
            this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        }*/

        /*if (this.props.sustainabilityStatus.fullscreen) {
            setTimeout(() => {
                this.camera.aspect = window.innerWidth / window.innerHeight;
                this.camera.updateProjectionMatrix();

                this.renderer.setSize(window.innerWidth, window.innerHeight);
            }, 5000);
        } else {
            this.camera.aspect = 1;
            this.camera.updateProjectionMatrix();
        }*/
    };

    render() {
        const { classes } = this.props;
        // const { sustainabilityStatus } = this.props;

        /*if (this.canvas) {
            this.resizeCanvas();
            // this.updateAspectRatio(sustainabilityStatus.fullscreen);
        }*/
        // this.resizeCanvas(sustainabilityStatus.fullscreen);

        return (
            <canvas
                // className={ this.props.fullScreen ? '' : classes.canvasCircle }
                // style={{ width: '100%', height: '100%' }}
                ref={ (canvas) => { this.canvas = canvas }}
            />
        )
    }
}

export default Scene;
// export default withStyles(styles)(Scene);
