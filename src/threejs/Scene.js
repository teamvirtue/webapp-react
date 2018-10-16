import React, { Component } from 'react';
import * as THREE from 'three';
import OrbitControls  from 'three-orbitcontrols';
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';
import { Easing, Tween } from 'es6-tween';
// import * as TWEEN from '@tweenjs/tween.js';

// Local import
import objUrl from '../assets/models/linq_low_poly_web_app.obj';
import mtlUrl from '../assets/models/linq_low_poly_web_app.mtl';

let levels = ['MY', 'LINQ', 'DISTRICT'];
let selectedObject = null;
let alpha = 0;

let opacityTween,
    cameraTween;

// let currentOpacity = opacity === 1 ? 0.25 : 1;
/*let opacity = { o: 1 };
let tween = new Tween(opacity)
    .to({ o: 0.25 }, 1000)
    .on('update', ({ o }) => {
        console.log(`Opacity: ${ o }`);
    });*/

/*let coordinates = { x: 0, y: 0 };
let tween = new Tween(coordinates)
    .to({ x: 100, y: 100 }, 1000)
    .on('update', ({x, y}) => {
        console.log(`The values is x: ${x} and y: ${y}`);
    });
    // .start();*/

/* TODO: implement ambient occlusion using postprocessing library or baking it into the mesh in Blender https://blender.stackexchange.com/questions/13956/how-do-you-bake-ambient-occlusion-for-a-model*/
class Scene extends Component { // code based on https://stackoverflow.com/questions/41248287/how-to-connect-threejs-to-react

    componentDidMount() {
        window.addEventListener('resize', this.resizeCanvas);
        this.canvas.addEventListener('touchstart', this.onClick);
        this.canvas.addEventListener('click', this.onClick);
        // this.canvas.addEventListener('click', this.onClick, false);
        // window.addEventListener('mousemove', this.onMouseMove, false);

        let width = this.canvas.clientWidth;
        let height = this.canvas.clientHeight;

        /*let fieldOfView = 45,
            aspectRatio = width / height,
            near = 1,
            far = 1000;*/

        const renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
        const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);
        renderer.shadowMap.enabled = true; // TODO: fix light from inside LINQ
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // softer shadows
        // renderer.shadowMap.type = THREE.BasicShadowMap;
        renderer.shadowMap.enabled = true;
        // renderer.shadowMap.renderReverseSided = true;
        // renderer.setClearColor( scene.fog.color );
        // renderer.gammaInput = true;
        // renderer.gammaOutput = true;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x97D6EA);
        const camera = new THREE.OrthographicCamera(
            width / -2,
            width / 2,
            height / 2,
            height / -2,
            1,
            1000
        );

        /*const camera = new THREE.PerspectiveCamera(
            fieldOfView,
            aspectRatio,
            near,
            far
        );*/
        camera.position.set(100, 75, 100);
        camera.lookAt(0, 0, 0);

        /*setTimeout(() => {
            camera.fov *= 3;
            camera.updateProjectionMatrix();
        }, 1000);*/
        // renderer.setSize(width, height);
        scene.add(camera);

        let MYLINQ_GROUP = new THREE.Group();
        let LINQ_GROUP = new THREE.Group();
        let DISTRICT_GROUP = new THREE.Group();

        // group names = same as Redux sustainabilityStatus state
        MYLINQ_GROUP.name = 'mylinq';
        LINQ_GROUP.name = 'linq';
        DISTRICT_GROUP.name = 'district';

        // let objects = [];
        let mylinqObjects = [];
        let linqObjects = [];
        let districtObjects = [];

        // let loadedObject = null;
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
                    // loadedObject = object;

                    // console.log(object.children[1]);
                    /*for (let i = 0; i < object.children[1].material.length; i++) {
                        object.children[1].material[i].transparent = true;
                        object.children[1].material[i].opacity = 0.25;
                    }*/

                    object.traverse((node) => {
                        if (node instanceof THREE.Mesh) {
                            // child.geometry.computeFaceNormals();
                            // node.material = new THREE.MeshLambertMaterial({ color: 0xf15b27, flatShading: true });
                            // node.material.side = THREE.DoubleSide;
                            node.material.flatShading = true; // TODO: make group for shading?
                            node.material.shininess = 0;

                            // console.log(node);

                            // enable casting shadows
                            node.castShadow = true;
                            node.receiveShadow = true;

                            // store objects in correct array for levels
                            if (node.name.includes(levels[0])) {
                                mylinqObjects.push(node);
                                node.userData.parent = MYLINQ_GROUP;
                            } else if (node.name.includes(levels[1])) {
                                linqObjects.push(node);
                                node.userData.parent = LINQ_GROUP;
                            } else if (node.name.includes(levels[2])) {
                                districtObjects.push(node);
                                node.userData.parent = DISTRICT_GROUP;
                            } else {
                                districtObjects.push(node);
                                node.userData.parent = DISTRICT_GROUP;
                            }
                        }
                    });
                    // add filled arrays to correct THREE.js group
                    MYLINQ_GROUP.children = mylinqObjects;
                    LINQ_GROUP.children = linqObjects;
                    DISTRICT_GROUP.children = districtObjects;

                    /*object.position.x = 10;
                    object.position.y = 10;
                    object.scale.set(100,100,100);*/
                    scene.add(object);
                },
                // called when loading is in progresses
                (xhr) => {
                    console.log('Model ' + (xhr.loaded / xhr.total * 100) + '% loaded');
                },
                // called when loading has errors
                (error) => {
                    console.log('An error happened: ' + error);
                });
        });

        let meshGround = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(400, 400, 1, 1),
            new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 0 })
            // new THREE.MeshStandardMaterial({ color: 0xffffff })
            // new THREE.MeshLambertMaterial({ color: 0xf15b27 })
        );
        meshGround.name = 'Ground';
        meshGround.position.y = -35;
        meshGround.rotation.x = -Math.PI / 2; // Rotate ground 90 degrees
        meshGround.castShadow = true;
        meshGround.receiveShadow = true;
        DISTRICT_GROUP.add(meshGround);
        meshGround.userData.parent = DISTRICT_GROUP;
        scene.add(meshGround);

        let lights = [];
        lights[0] = new THREE.AmbientLight(0x97D6EA, 0.6);
        scene.add(lights[0]);


        lights[1] = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
        lights[1].position.set(0, 100, -25);
        /*lights[1] = new THREE.DirectionalLight(0xffffff, 0.6, 1000);
        // lights[1].target = meshGround;
        lights[1].position.set(0, 150, -25);
        // lights[1].position.set(50, 100, 150);
        lights[1].castShadow = true;

        // shadow properties for the light
        lights[1].shadow.mapSize.width = 2 * 2048; //512 = default
        lights[1].shadow.mapSize.height = 2 * 2048;
        // lights[1].shadow.camera = new THREE.OrthographicCamera(-100, 100, 100, -100, 0.5, 1000); // TODO: adjust values
        lights[1].shadow.camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 1000);*/
        // lights[1].shadowCameraLeft;
        scene.add(lights[1]);

        /* interior light(s) */
        lights[2] = new THREE.PointLight(0xfffd99, 0.75, 0, 2);
        // lights[2].shadow.camera.fov = 30;
        lights[2].position.set(7, 4, -2);
        // scene.add(lights[2]);

        /* for debugging */
        let controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;

        let axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);

        /*let gridHelper = new THREE.GridHelper(100, 100);
        scene.add(gridHelper);*/

        let lightHelpers = [];
        lightHelpers[0] = new THREE.HemisphereLightHelper(lights[1]);
        // lightHelpers[0] = new THREE.DirectionalLightHelper(lights[1]);
        lightHelpers[1] = new THREE.PointLightHelper(lights[2], 0.5);
        // lightHelpers[2] = new THREE.SpotLightHelper(lights[2]);
        scene.add(lightHelpers[0]);
        // scene.add(lightHelpers[1]);
        /*axesHelper.userData.parent = DISTRICT_GROUP;
        for (let i in lightHelpers) {
            lightHelpers[i].userData.parent = DISTRICT_GROUP;
            console.log(lightHelpers);
        }*/

        /*let cameraHelper = new THREE.CameraHelper(camera);
        scene.add(cameraHelper);*/

        let raycaster = new THREE.Raycaster();
        let mouse = new THREE.Vector2();

        this.scene = scene;

        this.width = width;
        this.height = height;

        this.camera = camera;
        this.renderer = renderer;
        this.lights = lights;
        this.MYLINQ_GROUP = MYLINQ_GROUP;
        this.LINQ_GROUP = LINQ_GROUP;
        this.DISTRICT_GROUP = DISTRICT_GROUP;
        this.raycaster = raycaster;
        this.mouse = mouse;

        this.start();
    }

    componentWillUnmount() {
        this.canvas.removeEventListener('resize', this.resizeCanvas);
        this.canvas.removeEventListener('touchstart', this.onClick);
        this.canvas.removeEventListener('click', this.onClick);

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

        if (opacityTween) {
            opacityTween.update();
        }
        if (cameraTween) {
            cameraTween.update();
        }

        // TODO: animate lights based on time of day
        /*if (this.lights[1]) {
            alpha += 0.05;

            this.lights[1].position.x = 200 * Math.sin(THREE.Math.degToRad(alpha));
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

        // console.log(this.canvas.clientWidth);

        this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
        this.camera.updateProjectionMatrix(); // TODO: only check when state is updated + then also update the size of renderer with this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    resizeCanvas = () => {
        this.canvas.style.width = '100%';
        this.canvas.style.height= '100%';

        // console.log(this.canvas.clientHeight, this.canvas.clientWidth);
        /*if (this.props.sustainabilityStatus.fullscreen) {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        } else {
            this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        }*/

        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

        /* for debugging, sharpens 3D view on fullscreen */
        // this.renderer.setSize(window.innerWidth, window.innerHeight);

        let cameraFactor = (this.width / this.height) * 10;

        this.camera.left = this.canvas.clientWidth / -cameraFactor;
        this.camera.right = this.canvas.clientWidth / cameraFactor;
        this.camera.top = this.canvas.clientHeight / cameraFactor;
        this.camera.bottom = this.canvas.clientHeight / -cameraFactor;
        this.camera.updateProjectionMatrix();

        /*let width = this.canvas.clientWidth;
        let height = this.canvas.clientHeight;*/

        /*if (this.props.sustainabilityStatus.fullscreen) {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        } else {
            this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        }*/
    };

    onClick = (event) => {
        event.preventDefault();

        if (event.type === 'click') {
            // calculate mouse position in normalized device coordinates
            // (-1 to +1) for both components
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        } else {
            this.mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = - (event.touches[0].clientY / window.innerHeight) * 2 + 1;
        }

        // update the picking ray with the camera and mouse position
        this.raycaster.setFromCamera(this.mouse, this.camera);

        // let color = null;
        let highlightColor = 0xff0000;
        // calculate objects intersecting the picking ray
        let intersects = this.raycaster.intersectObjects(this.scene.children, true);
        // let intersects = this.raycaster.intersectObjects(this.scene.children);
        // let firstObject = intersects[0].object;

        // check if there are 1 or more intersections and the first object has group data
        if (intersects.length > 0 && Object.keys(intersects[0].object.userData).length !== 0) {
            // check if the closest object intersected is not the currently stored intersection object
            if (intersects[0].object !== selectedObject) {
                // restore previous intersection object (if it exists) to its original color
                if (selectedObject) {
                    this.setTransparency(selectedObject, 1);
                    this.animateCamera(this.camera, { x: 0, y: 75, z: 5 });
                    // this.setColor(selectedObject, selectedObject.currentHex);
                }
                // store reference to closest object as current intersection object
                selectedObject = intersects[0].object;
                // store color of closest object (for later restoration)
                selectedObject.currentHex = this.getColor(selectedObject);

                // set a new color for closest object
                if (selectedObject.userData.parent.name === 'mylinq') {
                    this.setTransparency(selectedObject, 0.3);
                    this.animateCamera(this.camera, { x: 0, y: 75, z: 10 });
                } else {
                    this.setTransparency(selectedObject, 1);
                    this.animateCamera(this.camera, { x: 100, y: 75, z: 100 });
                }
                // this.setColor(selectedObject, highlightColor);

                // update Redux state
                this.setActiveTab(selectedObject.userData.parent.name)();
            }
        } else {
            // restore previous intersection object (if it exists) to its original color
            /*if (selectedObject) {
                this.setTransparency(selectedObject, 1);
                this.animateCamera(this.camera, { x: 0, y: 75, z: 10 });
                // this.setColor(selectedObject, selectedObject.currentHex);
            }*/
            selectedObject = null;
        }
    };

    setActiveTab = (tab) => (event) => {
        this.props.updateSustainabilityStatus(tab);
    };

    animateCamera = (camera, position) => {
        // animateCamera = (camera, position) => {
        let finalPosition = new THREE.Vector3(position.x, position.y, position.z);
        let currentPosition = camera.position;
        let value = { x: currentPosition.x, y: currentPosition.y, z: currentPosition.z  };
        cameraTween = new Tween(value)
            .to({ x: finalPosition.x, y: finalPosition.y, z: finalPosition.z }, 1200)
            .easing(Easing.Exponential.InOut)
            .on('update', ({ x, y, z }) => {
                // console.log(`Position: ${ x }, ${ y }, ${ z }`);
                camera.lookAt(0, 0, 0);

                camera.position.set(x, y, z);
                // camera.rotation.set(x, y, z);
                // console.log(Object.values({x})[0]);
            });
        cameraTween.start();
    };

    setTransparency = (object, opacity) => {
        // let coordinates = { x: 0, y: 0 };
        let currentOpacity = opacity === 1 ? 0.3 : 1; // TODO: fix unwanted animations
        let value = { x: currentOpacity };
        opacityTween = new Tween(value)
            .to({ x: opacity }, 500)
            // .easing(Easing.Circular.Out)
            .delay(500)
            .on('update', ({ x }) => {
                // console.log(`Opacity: ${ x }`);
                // console.log(Object.values({x})[0]);

                this.MYLINQ_GROUP.children[0].material[0].transparent = true;
                this.MYLINQ_GROUP.children[0].material[1].transparent = true;
                this.MYLINQ_GROUP.children[0].material[2].transparent = true;
                this.MYLINQ_GROUP.children[0].material[0].opacity = Object.values({x})[0];
                this.MYLINQ_GROUP.children[0].material[1].opacity = Object.values({x})[0];
                this.MYLINQ_GROUP.children[0].material[2].opacity = Object.values({x})[0];
            });
        opacityTween.start();

        // check if object has multiple materials (i.e. not the ground) and opacity is already set
        /*if (object.material instanceof Array && opacity !== object.material[0].opacity) {
            // let coordinates = { x: 0, y: 0 };
            let currentOpacity = opacity === 1 ? 0.25 : 1; // TODO: fix unwanted animations
            let value = { x: currentOpacity };
            opacityTween = new Tween(value)
                .to({ x: opacity }, 500)
                // .easing(Easing.Circular.Out)
                .delay(500)
                .on('update', ({ x }) => {
                    // console.log(`Opacity: ${ x }`);
                    // console.log(Object.values({x})[0]);

                    this.MYLINQ_GROUP.children[1].material[0].transparent = true;
                    this.MYLINQ_GROUP.children[1].material[1].transparent = true;
                    this.MYLINQ_GROUP.children[1].material[0].opacity = Object.values({x})[0];
                    this.MYLINQ_GROUP.children[1].material[1].opacity = Object.values({x})[0];
                });
            opacityTween.start();
        }*/
    };

    setColor = (object, color) => {
        if (object.material instanceof Array) {
            object.material[0].color.set(color); //setHex

            /*for (let i = 0; i < object.material.length; i++) {
                object.material[i].transparent = true;
                object.material[i].opacity = 0.25;
                // object.material[i].color.set(color);
            }*/
        } else {
            object.material.color.set(color);
        }
    };

    getColor = (object) => {
        if (object.material instanceof Array) {
            console.log('Array');
            return object.material[0].color.getHex();
        } else {
            console.log('No array');
            return object.material.color.getHex();
        }
    };

    render() {
        // const { classes } = this.props;
        // const { sustainabilityStatus } = this.props;

        if (this.canvas) {
            console.log(this.canvas.width);
        }
        // this.resizeCanvas(sustainabilityStatus.fullscreen);

        return ( // TODO: put styles in classes?
            <canvas
                // className={ this.props.fullScreen ? '' : classes.canvasCircle }
                // style={{ width: '100%', height: '100%' }}
                // onClick={ this.onClick }
                style={ !this.props.sustainabilityStatus.fullscreen ? { pointerEvents: 'none' } : { pointer: 'cursor' }}
                ref={ (canvas) => { this.canvas = canvas }}
            />
        )
    }
}

export default Scene;