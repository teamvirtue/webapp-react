import React, { Component } from 'react';
import * as THREE from 'three';
import OrbitControls  from 'three-orbitcontrols';
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';
import { Easing, Tween } from 'es6-tween';
import GLTFLoader from 'three-gltf-loader';

// Local import
import objUrl from '../assets/models/marker_web_app.obj';
// import mtlUrl from '../assets/models/marker_web_app.mtl';
import aoMapUrl from '../assets/models/textures/marker.jpg';
// import crateTextureUrl from '../assets/models/textures/crate_diffuse.png';
import gltfUrl from '../assets/models/linq_low_poly_web_app.glb';
// import aoUrl from '../assets/models/textures/ao2.png';
// import gltfUrl from '../assets/models/linq_low_poly_web_app.gltf';
// import gltfUrl from '../assets/models/gun.glb';
// import gltfUrl from '../assets/models/aircraft.glb';
// import gltfUrl from '../assets/models/Duck.glb';
// import gltfUrl from '../assets/models/DamagedHelmet/DamagedHelmet.gltf';

let levels = ['MY', 'LINQ', 'DISTRICT'];
let selectedObject = null;
// let alpha = 0;
let highlightColor = 0xff0000;
let markers = [];
let markerHeight = 1.25;

let opacityTween,
    cameraPositionTween,
    cameraZoomTween,
    cameraRotationTween,
    markerTween;
    // cameraTween;

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
    constructor(props) {
        super(props);
        this.state = {
            transitioning: false,
        }
    }

    componentDidMount() { // glTF implementation based on https://medium.com/@matthewmain/how-to-import-a-3d-blender-object-into-a-three-js-project-as-a-gltf-file-5a67290f65f2
        window.addEventListener('resize', this.resizeCanvas);
        this.canvas.addEventListener('touchstart', this.onClick);
        this.canvas.addEventListener('click', this.onClick);
        // this.canvas.addEventListener('click', this.onClick, false);
        // window.addEventListener('mousemove', this.onMouseMove, false);

        const width = window.innerWidth;
        const height = window.innerHeight;
        /*let width = this.canvas.clientWidth;
        let height = this.canvas.clientHeight;*/
        let cameraFactor = (width / height) * 350;
        // let cameraFactor = (width / height) * 200;

        /*let fieldOfView = 45,
            aspectRatio = width / height,
            near = 1,
            far = 1000;*/

        const renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
        /*const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);*/
        renderer.setSize(width, height);
        // renderer.shadowMap.enabled = true; // TODO: fix light from inside LINQ
        // renderer.shadowMap.type = THREE.PCFSoftShadowMap; // softer shadows
        // renderer.shadowMap.type = THREE.BasicShadowMap;
        // renderer.shadowMap.enabled = true;

        // renderer.shadowMap.renderReverseSided = true;
        // renderer.setClearColor( scene.fog.color );
        // renderer.gammaInput = true;
        // renderer.gammaOutput = true;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x97D6EA);
        const camera = new THREE.OrthographicCamera(
            width / -cameraFactor, //2
            width / cameraFactor,
            height / cameraFactor,
            height / -cameraFactor,
            0, // -500,
            1000
        );
        /*const camera = new THREE.PerspectiveCamera(
            fieldOfView,
            aspectRatio,
            near,
            far
        );*/
        camera.position.set(0, 100, 5);
        // camera.position.set(0, 500, 100);
        // camera.zoom = 1.3;
        // camera.position.set(0, 75, 10);
        camera.lookAt(0, 0, 0);
        // scene.add(camera);


        let MYLINQ_GROUP = new THREE.Group();
        let LINQ_GROUP = new THREE.Group();
        let DISTRICT_GROUP = new THREE.Group();
        let OTHER_GROUP = new THREE.Group();

        // group names = same as Redux sustainabilityStatus state
        MYLINQ_GROUP.name = 'mylinq';
        LINQ_GROUP.name = 'linq';
        DISTRICT_GROUP.name = 'district';
        OTHER_GROUP.name = 'other';

        // let objects = [];
        let mylinqObjects = [];
        let linqObjects = [];
        let districtObjects = [];
        let otherObjects = [];

        // let loadedObject = null;
        let gltfLoader = new GLTFLoader();
        // let mtlLoader = new MTLLoader();
        let objLoader = new OBJLoader();

        // let texture = new THREE.TextureLoader().load(aoUrl);

        gltfLoader.load(gltfUrl,
            // called when resource is loaded
            (gltf) => {
                /*console.log(gltf.scene.children[13]);
                gltf.scene.children[13].children[0].material.transparent = true;
                gltf.scene.children[13].children[1].material.transparent = true;
                gltf.scene.children[13].children[2].material.transparent = true;
                gltf.scene.children[13].children[0].material.opacity = 0.25;
                gltf.scene.children[13].children[1].material.opacity = 0.25;
                gltf.scene.children[13].children[2].material.opacity = 0.25;*/

                gltf.scene.traverse((node) => {
                    if (node instanceof THREE.Mesh) {
                        node.material.transparent = true;
                        node.material.color.setHex(0xffffff);
                        node.material.aoMap = node.material.map;
                        node.material.aoMapIntensity = 0.75;
                        node.material.map = null;
                        node.geometry.attributes.uv2 = node.geometry.attributes.uv;

                        // console.log(node.material);

                        // node.material.aoMapIntensity = 2;

                        // node.material = new THREE.MeshStandardMaterial({color: 0xffffff});

                        /*texture.flipY = false;
                        node.material.aoMap = texture;*/

                        // enable casting shadows
                        // node.castShadow = true;
                        // node.receiveShadow = true;
                        // node.material.opacity = 0.25;

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
                            otherObjects.push(node);
                            node.userData.parent = OTHER_GROUP;
                        }
                    }
                });

                // add filled arrays to correct THREE.js group
                MYLINQ_GROUP.children = mylinqObjects;
                LINQ_GROUP.children = linqObjects;
                DISTRICT_GROUP.children = districtObjects;
                OTHER_GROUP.children = otherObjects;

                console.log(MYLINQ_GROUP);

                this.selectLevel(this.props.sustainabilityStatus.selected);

                scene.add(gltf.scene);

                /*scene.remove(gltf.scene.getObjectByName('MYLINQ_roof_solar_panels'));

                console.log(gltf.scene);
                console.log(gltf.scene.getObjectByName('MYLINQ_roof_solar_panels'));*/
                // MYLINQ_GROUP.remove(gltf.scene.getObjectByName('MYLINQ_roof_solar_panels_3_0'));
                // gltf.scene.remove(MYLINQ_GROUP.children[3])
            },
            // called when loading is in progresses
            (xhr) => {
                //console.log('Model ' + (xhr.loaded / xhr.total * 100) + '% loaded'); // TODO: check Infinity
            },
            // called when loading has errors
            (error) => {
                console.log('Error ' + error);
            });

        // Texture Loading
        let aoMap = new THREE.TextureLoader().load(aoMapUrl);
        let material = new THREE.MeshStandardMaterial({
            // color: 0xffffff,
            color: 0xff0000,
            aoMap: aoMap,
            aoMapIntensity: 2,
            transparent: true,
            // opacity: 0.5,
        });
        // let mesh;

        objLoader.load(objUrl,
            (object) => {
                let geometry = object.children[0].geometry;
                geometry.attributes.uv2 = geometry.attributes.uv;
                // geometry.center();
                object = new THREE.Mesh(geometry, material);
                object.scale.multiplyScalar(0.5);
                object.rotation.set(0, 0.5, 0);
                object.rotateX(Math.PI * -0.1);

                object.name = 'Marker';

                scene.add(object);

                /*scene.add(markerObject);
                markerObject.position.set(0, 2, 0);*/

                /*object.traverse((node) => {
                    if (node instanceof THREE.Mesh) {
                        node.material.flatShading = true;
                        node.material.shininess = 0;

                        new THREE.MeshStandardMaterial({
                            color: 0xf15b27,
                            aoMap: aoMap,
                            aoMapIntensity: 1,
                        })
                    }
                });*/

                // this.setTransparency({ objects: [object], opacity: [0] });
            },
            // called when loading is in progresses
            (xhr) => {
                console.log('Marker ' + (xhr.loaded / xhr.total * 100) + '% loaded');
            },
            // called when loading has errors
            (error) => {
                console.log('Error ' + error);
            });

        // Create mesh with these textures
        /*let crate = new THREE.Mesh(
            new THREE.BoxGeometry(3, 3, 3),
            new THREE.MeshPhongMaterial({
                color: 0xf15b27,

                // aoMap: crateTexture,
                map: crateTexture,
                // bumpMap: crateBumpMap,
                // normalMap: crateNormalMap
            })
        );

        console.log(crate);
        scene.add(crate);
        crate.position.set(2.5, 3/2, 2.5);*/

        /*mtlLoader.load(mtlUrl, (materials) => {
            materials.preload();

            objLoader.setMaterials(materials);
            objLoader.load(objUrl, (object) => {
                scene.add(object);
                object.position.set(0, 0, 0);

                // this.setTransparency({ objects: [object], opacity: [0] });
                },
                // called when loading is in progresses
                (xhr) => {
                    console.log('Marker ' + (xhr.loaded / xhr.total * 100) + '% loaded');
                },
                // called when loading has errors
                (error) => {
                    console.log('Error ' + error);
            });
        });*/

        /*mtlLoader.load(mtlUrl, (materials) => {
            materials.preload();
            objLoader.setMaterials(materials);

            objLoader.load(objUrl,
                // called when resource is loaded
                (object) => {
                    object.traverse((node) => {
                        if (node instanceof THREE.Mesh) {
                            // child.geometry.computeFaceNormals();
                            // node.material = new THREE.MeshLambertMaterial({ color: 0xf15b27, flatShading: true });
                            // node.material.side = THREE.DoubleSide;
                            node.material.flatShading = true;
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

                    this.selectLevel(this.props.sustainabilityStatus.selected);

                    console.log(object);

                    // object.position.x = 10;
                    // object.position.y = 10;
                    // object.scale.set(100,100,100);
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
        });*/

        /*let meshGround = new THREE.Mesh(
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
        scene.add(meshGround);*/

        let lights = [];
        lights[0] = new THREE.AmbientLight(0xffffff, 0.6);
        // lights[0] = new THREE.AmbientLight(0x97D6EA, 0.6);
        scene.add(lights[0]);


        lights[1] = new THREE.HemisphereLight(0xffffff, 0x080820, 1.25);
        // lights[1] = new THREE.HemisphereLight(0x97D6EA, 0x080820, 1);
        // lights[1] = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
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
        controls.dampingFactor = 0.5;
        // controls.enableZoom = false;
        controls.rotateSpeed = 0.75;
        controls.minZoom = 0.05;
        controls.maxZoom = 8;
        controls.maxPolarAngle = Math.PI * 0.4;

        /*let cameraHelper = new THREE.CameraHelper(camera);
        scene.add(cameraHelper);*/

        /*let axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);*/

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
        this.OTHER_GROUP = OTHER_GROUP;
        // this.markerObject = markerObject;
        this.controls = controls;
        this.raycaster = raycaster;
        this.mouse = mouse;

        this.start();
    }

    componentWillUnmount() {
        this.canvas.removeEventListener('resize', this.resizeCanvas);
        this.canvas.removeEventListener('touchstart', this.onClick);
        this.canvas.removeEventListener('click', this.onClick);

        // this.canvas.removeEventListener('transitionend', this.test);

        this.stop();
    }

    componentDidUpdate(previousProps, previousState) {
        // only update if fullscreen state has changed
        if (this.props.sustainabilityStatus.fullscreen !== previousProps.sustainabilityStatus.fullscreen) {
            this.setState({ transitioning: true });
            this.selectLevel(this.props.sustainabilityStatus.selected);

            setTimeout(() => {
                this.setState({ transitioning: false });

                // console.log('fullscreen transition done');
            }, 500);

            // this.resizeCanvas();
            // this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        }

        if (this.props.sustainabilityStatus.selected !== previousProps.sustainabilityStatus.selected) {
            this.selectLevel(this.props.sustainabilityStatus.selected);
        }
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
        if (cameraPositionTween) {
            cameraPositionTween.update();
        }
        if (cameraZoomTween) {
            cameraZoomTween.update();
        }
        if (cameraRotationTween) {
            cameraRotationTween.update();
        }
        if (markerTween) {
            markerTween.update();
        }

        // console.log(this.MYLINQ_GROUP.getObjectByName('MYLINQ_roof_solar_panels'));

        /*if (this.camera) {
            console.log(this.camera.zoom)
        }*/

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

        if (this.state.transitioning) {
            this.resizeCanvas();

            // console.log(this.camera);
            // console.log(this.canvas.clientWidth, this.canvas.clientHeight);

            // this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        }
    }

    resizeCanvas = () => { // TODO: make responsive again
        this.canvas.style.width = window.innerWidth;
        this.canvas.style.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        /*this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';*/

        // console.log(this.canvas.clientHeight, this.canvas.clientWidth);

        /* for debugging, sharpens 3D view on fullscreen */
        // this.renderer.setSize(window.innerWidth, window.innerHeight);

        // let cameraFactor = (this.width / this.height) * 10;
        // let cameraFactor = (this.canvas.clientWidth / this.canvas.clientHeight) * 10;
        // let cameraFactor = (window.innerWidth / window.innerHeight) * 10;
        // let cameraFactor = window.innerWidth / window.innerHeight;
        // let cameraFactor = this.width / this.height;
        // let cameraPosition = this.camera.position;

        /*this.camera.left = this.canvas.clientWidth / -cameraFactor;
        this.camera.right = this.canvas.clientWidth / cameraFactor;
        this.camera.top = this.canvas.clientHeight / cameraFactor;
        this.camera.bottom = this.canvas.clientHeight / -cameraFactor;*/

        /*if (!this.props.sustainabilityStatus.fullscreen) {
            this.camera.position.set(12, 500, 110);
            // this.animateCamera(this.camera, { x: 12, y: 500, z: 110 });
        } else {
            this.camera.position.set(0, 250, 50);
        }*/
        // this.camera.updateProjectionMatrix();

        // this.renderer.setSize(this.canvas.parentNode.clientWidth, this.canvas.parentNode.clientHeight);
        // this.renderer.setSize(window.innerWidth, window.innerHeight);
        // this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

        // console.log(this.canvas.parentNode.clientWidth, this.canvas);

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
        // calculate objects intersecting the picking ray
        let intersects = this.raycaster.intersectObjects(this.scene.children, true);
        // let intersects = this.raycaster.intersectObjects(this.scene.children);
        // let firstObject = intersects[0].object;

        // let marker = this.scene.getObjectByName('Marker');

        // check if there are 1 or more intersections and the first object has group data
        if (intersects.length > 0 && Object.keys(intersects[0].object.userData).length !== 0) {
            // check if the closest object intersected is not the currently stored intersection object
            if (intersects[0].object !== selectedObject) {
                // restore previous intersection object (if it exists) to its original color
                if (selectedObject) {
                    // this.selectLevel(selectedObject.userData.parent.name);

                    /*this.setTransparency(selectedObject, 1);
                    this.animateCamera(this.camera, { x: 0, y: 75, z: 5 });*/
                    this.setColor(selectedObject, selectedObject.currentHex);
                    // this.setMarker(selectedObject);
                }
                // store reference to closest object as current intersection object
                selectedObject = intersects[0].object;

                // console.log(selectedObject.name);

                /*if (selectedObject.name = 'Marker') {
                    console.log('hi')
                }*/

                // store color of closest object (for later restoration)
                selectedObject.currentHex = this.getColor(selectedObject);

                // this.selectLevel(selectedObject.userData.parent.name);

                // set a new color for closest object
                this.setColor(selectedObject, highlightColor);
                // this.setMarker(selectedObject);
            }
        } else {
            // restore previous intersection object (if it exists) to its original color
            if (selectedObject) {
                // this.setTransparency(selectedObject, 1);
                // this.animateCamera(this.camera, { x: 0, y: 75, z: 10 });
                this.setColor(selectedObject, selectedObject.currentHex);
            }
            selectedObject = null;
        }
    };

    setActiveTab = (tab) => (event) => { // TODO: check event variable
        this.props.updateSustainabilityStatus(tab);
    };

    selectLevel = (level) => { // TODO: check if level is already selected? + Make marker object global
        // let level = object.userData.parent.name;

        let indicator = this.OTHER_GROUP.getObjectByName('Indicator');
        let marker = this.scene.getObjectByName('Marker');
        let roof = this.MYLINQ_GROUP.getObjectByName('MYLINQ_roof_solar_panels');
        let laptop = this.OTHER_GROUP.getObjectByName('Laptop');
        let tv = this.OTHER_GROUP.getObjectByName('TV');
        let washingMachine = this.OTHER_GROUP.getObjectByName('Washing_machine');

        // console.log(marker);

        switch(level) {
            case 'mylinq':
                this.setTransparency({ objects: [roof, indicator, marker], opacity: [0, 0, 1] });
                this.setMarker(laptop);
                this.setColor(laptop, highlightColor);

                this.setMarker(tv);
                this.setColor(tv, highlightColor);

                this.setMarker(washingMachine);
                this.setColor(washingMachine, highlightColor);

                // roof.position.setY(10);

                // this.animateMarker()

                // this.MYLINQ_GROUP.remove(roof);
                // this.scene.remove(this.MYLINQ_GROUP)

                if (this.props.sustainabilityStatus.fullscreen) {
                    this.animateCamera(this.camera, { x: 15, y: 50, z: 30 }, 1500, 2);

                    this.animateMarker(markers);

                    // this.controls.enabled = false;
                    // this.animateCamera(this.camera, { x: 0, y: 500, z: 100 });
                    // this.animateCamera(this.camera, { x: 0, y: 75, z: 10 });

                    // this.MYLINQ_GROUP.remove(this.scene.getObjectById(26));

                    /*for (var i = this.MYLINQ_GROUP.children.length - 1; i >= 0; i--) {
                        this.MYLINQ_GROUP.remove(this.MYLINQ_GROUP.children[i]);
                    }*/

                    // this.scene.remove(this.scene.getObjectById(26));
                    // console.log(this.DISTRICT_GROUP.getObjectByName('Indicator'));
                } else {
                    this.animateCamera(this.camera, { x: 25, y: 50, z: 25 }, 1000, 0.5, { x: 5.5, y: 0, z: 2.5 });
                    // this.camera.position.set(25, 5, 25)
                }
                break;
            case 'linq':
                this.setTransparency({ objects: [roof, indicator, marker], opacity: [1, 1, 0] });
                // this.setTransparency({ objects: [roof, indicator], opacity: [1, 1] });

                if (this.props.sustainabilityStatus.fullscreen) {
                    this.animateCamera(this.camera, { x: 35, y: 25, z: 35 }, 1500);
                    // this.controls.enabled = false;
                } else {
                    this.animateCamera(this.camera, { x: 25, y: 25, z: 25 }, 1000, 0.25, { x: 10, y: -3, z: 7 });
                }
                break;
            case 'district':
                this.setTransparency({ objects: [roof, indicator, marker], opacity: [1, 1, 0] });
                // this.setTransparency({ objects: [roof, indicator], opacity: [1, 1] });

                if (this.props.sustainabilityStatus.fullscreen) {
                    this.animateCamera(this.camera, { x: 35, y: 45, z: 35 }, 1500, 0.3);
                    // this.controls.enabled = true;
                } else {
                    this.animateCamera(this.camera, { x: 25, y: 25, z: 25 }, 1000, 0.15, { x: 11, y: -17, z: 3});
                }
                break;
        }

        // update Redux state
        this.setActiveTab(level)();

        /*if (this.props.sustainabilityStatus.selected) {
            // update Redux state
            this.setActiveTab(level)();
        }*/
    };

    animateCamera = (camera, targetPosition, duration, targetZoom = 1, lookAt = { x: 0, y: 0, z:0 }) => {
        // Method from https://stackoverflow.com/questions/28091876/tween-camera-position-while-rotation-with-slerp-three-js

        let originalPosition = new THREE.Vector3().copy(camera.position); // original position
        let originalRotation = new THREE.Euler().copy(camera.rotation); // original rotation

        camera.position.set(targetPosition.x, targetPosition.y, targetPosition.z);
        // camera.lookAt(0, 0, 0);
        let targetRotation = new THREE.Euler().copy(camera.rotation);

        // Reset original position and rotation
        camera.position.set(originalPosition.x, originalPosition.y, originalPosition.z);
        camera.rotation.set(originalRotation.x, originalRotation.y, originalRotation.z);

        // Position Tweening
        cameraPositionTween = new Tween(camera.position)
            .to({
                x: targetPosition.x,
                y: targetPosition.y,
                z: targetPosition.z,
                // zoom: targetZoom,
            }, duration)
            .easing(Easing.Exponential.InOut)
            .on('update', ({ x, y, z }) => {
                // console.log(x, y, z);
                camera.lookAt(lookAt.x, lookAt.y, lookAt.z);
                // lookAtVector.applyQuaternion(camera.quaternion);
            });

        cameraZoomTween = new Tween({ zoom: camera.zoom })
            .to({ zoom: targetZoom }, duration)
            .easing(Easing.Exponential.InOut)
            .on('update', ({ zoom }) => {
                camera.zoom = zoom;
            });

        // Rotation Tweening (using slerp)
        let originalQuaternion = new THREE.Quaternion().copy(camera.quaternion);
        let targetQuaternion = new THREE.Quaternion().setFromEuler(targetRotation);
        let quaternion = new THREE.Quaternion();

        let object = { t: 0 };
        cameraRotationTween = new Tween(object)
            .to({ t: 1 }, duration)
            .easing(Easing.Exponential.InOut)
            .on('update', ({ t }) => {
                THREE.Quaternion.slerp(originalQuaternion, targetQuaternion, quaternion, t);
                quaternion.normalize();
                camera.quaternion.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
                camera.lookAt(lookAt.x, lookAt.y, lookAt.z);
            });

        cameraPositionTween.start();
        cameraZoomTween.start();
        cameraRotationTween.start();
    };

    /*animateCamera = (camera, position, zoom = 1) => {
    // animateCamera = (camera, position) => {
        let currentZoom = camera.zoom;
        let finalZoom = zoom;
        let currentPosition = camera.position;
        let finalPosition = new THREE.Vector3(position.x, position.y, position.z);
        let coordinates = { x: currentPosition.x, y: currentPosition.y, z: currentPosition.z, zoom: currentZoom };

        cameraTween = new Tween(coordinates)
            .to({ x: finalPosition.x, y: finalPosition.y, z: finalPosition.z, zoom: finalZoom }, 1500) //1200
            .easing(Easing.Exponential.InOut)
            .on('update', ({ x, y, z, zoom }) => {
                // console.log(`Position: ${ x }, ${ y }, ${ z }`);
                camera.lookAt(0, 0, 0);

                camera.position.set(x, y, z);
                camera.zoom = zoom;
                // camera.rotation.set(x, y, z);
                // console.log(Object.values({x})[0]);
            });
        cameraTween.start();
    };*/

    setTransparency = (targetProperties) => {
        let currentOpacity = [];
        let targetOpacity = [];
        // let currentOpacity = targetProperties.objects;
        // console.log(currentOpacity)

        if (targetProperties.objects[0]) {
            for (let i = 0; i < targetProperties.objects.length; i++) {
                currentOpacity.push(targetProperties.objects[i].material.opacity);
            }
        }

        for (let i = 0; i < targetProperties.opacity.length; i++) {
            targetOpacity.push(targetProperties.opacity[i]);
        }

        /*let currentOpacityObject = Object.assign({}, currentOpacity);
        let targetOpacityObject = Object.assign({}, targetOpacity);

        console.log(currentOpacityObject, targetOpacityObject);*/

        opacityTween = new Tween(Object.assign({}, currentOpacity))
            .to(Object.assign({}, targetOpacity), 500)
            .delay(500)
            .on('update', (o) => {
                for (let i = 0; i < targetProperties.objects.length; i++) {
                    // targetProperties.objects[i].material.transparent = true;
                    targetProperties.objects[i].material.opacity = o[i];
                    // targetProperties.objects[i].material.alphaTest = 0.5;
                    // targetProperties.objects[i].material.visible = false;
                    // targetProperties.objects[i].material.opacity = opacityObject[index];
                }
            })
            .on('complete', (x) => {
                // console.log(x);
            });
        opacityTween.start();
    };

    /*setTransparency = (objectArray, targetOpacity) => {
        let currentOpacity = [];

        for (let i in objectArray) {
            currentOpacity.push(objectArray[i].material.opacity)
        }

        let currentOpacityObject = Object.assign({}, currentOpacity);
        // let size = Object.size(currentOpacity);
        let targetOpacityObject = { 0:targetOpacity, 1:targetOpacity };
        // let targetOpacityObject = Object.assign(currentOpacity, targetOpacity);

        // console.log(currentOpacityObject, targetOpacityObject)

        opacityTween = new Tween(currentOpacityObject)
            .to(targetOpacityObject , 500)
            .delay(500)
            .on('update', (opacityObject) => {
                objectArray.forEach((object, index) => {
                    object.material.transparent = true;
                    object.material.opacity = opacityObject[index];
                    // object.material.opacity = Object.values({ o })[index];
                })
            });
        opacityTween.start();
    };*/

    /*setTransparency = (object, opacity) => {
        let currentOpacity = object.material.opacity;
        // let currentOpacity = object.material[0].opacity;
        let finalOpacity = opacity;
        let value = { o: currentOpacity };

        opacityTween = new Tween(value)
            .to({ o: finalOpacity }, 500)
            // .easing(Easing.Circular.Out)
            .delay(500)
            .on('update', ({ o }) => {
                // console.log(`Opacity: ${ x }`);
                // console.log(Object.values({x})[0]);

                object.material.transparent = true;
                object.material.opacity = Object.values({ o })[0];

                /!*this.MYLINQ_GROUP.children[0].material[0].transparent = true;
                this.MYLINQ_GROUP.children[0].material[1].transparent = true;
                this.MYLINQ_GROUP.children[0].material[2].transparent = true;
                this.MYLINQ_GROUP.children[0].material[0].opacity = Object.values({ o })[0];
                this.MYLINQ_GROUP.children[0].material[1].opacity = Object.values({ o })[0];
                this.MYLINQ_GROUP.children[0].material[2].opacity = Object.values({ o })[0];*!/
            });
        opacityTween.start();

        // check if object has multiple materials (i.e. not the ground) and opacity is already set
        /!*if (object.material instanceof Array && opacity !== object.material[0].opacity) {
            // let coordinates = { x: 0, y: 0 };
            let currentOpacity = opacity === 1 ? 0.25 : 1;
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
        }*!/
    };*/

    setColor = (object, color) => {
        // console.log(object)

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
            // console.log('Array');
            return object.material[0].color.getHex();
        } else {
            // console.log('No array');
            return object.material.color.getHex();
        }
    };

    setMarker = (object) => {
        // store object position to be highlighted and add ~10 to the z coordinate
        // animate marker (Tween bounce?)
        let position = object.position;

        if (!object.userData.marker) {
            let marker = this.scene.getObjectByName('Marker').clone();
            marker.position.set(position.x, markerHeight , position.z);

            this.scene.add(marker);

            markers.push(marker);
        }

        object.userData.marker = true;
    };

    animateMarker = (markerArray) => {
        let currentYCoordinates = [];
        let bounceYCoordinates = [];

        for (let i = 0; i < markerArray.length; i++) {
            currentYCoordinates.push(markerHeight);
        }

        for (let i = 0; i < markerArray.length; i++) {
            bounceYCoordinates.push(markerArray[i].position.y + 1);
        }

        markerTween = new Tween(Object.assign({}, bounceYCoordinates))
            .to(Object.assign({}, currentYCoordinates), 2000)
            .easing(Easing.Bounce.Out)
            .on('update', (y) => {
                for (let i = 0; i < markerArray.length; i++) {
                    markerArray[i].position.setY(y[i]);
                }
            });
        markerTween.start();

        /*let position = marker.position;
        let bouncePosition = position.y + 2;

        markerTween = new Tween({ y: position.y })
            .to({ y: bouncePosition }, 2000)
            .easing(Easing.Bounce.Out)
            .on('update', ({ y }) => {
                marker.position.set(position.x, y, position.z)
            });
        markerTween.start();*/
    };

    render() {
        // const { classes } = this.props;
        const { sustainabilityStatus } = this.props;

        return ( // TODO: put styles in classes?
            <canvas
                // className={ this.props.fullScreen ? '' : classes.canvasCircle }
                // style={{ width: '100%', height: '100%' }}
                style={ !this.props.sustainabilityStatus.fullscreen || this.state.transitioning ? { pointerEvents: 'none' } : { pointer: 'cursor' }}
                ref={ (canvas) => { this.canvas = canvas }}
            />
        )
    }
}

export default Scene;