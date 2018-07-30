import * as THREE from 'three';
import * as OBJLoader from 'three-obj-loader';
import url from '../assets/models/cone.obj';
import alphaTexture from '../assets/gradient.jpg';

OBJLoader(THREE);


export default scene => {
    this.THREE = THREE;
    const loader = new this.THREE.OBJLoader();

    console.log(loader);

    // Load a glTF resource
    loader.load(url,
        // called when the resource is loaded
        function ( gltf ) {
            scene.add( gltf.scene );
        },
        // called while loading is progressing
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( error );
        }
    );

    // group.rotation.z = Math.PI / 4;

    const speed = 0.25;

    function update(time) {
        // const angle = time * speed;
        // console.log(angle);
        // group.rotation.y = angle;
    }

    return {
        update
    }
}

/*
export default scene => {
    const group = new THREE.Group();

    let geometry = new THREE.BoxGeometry( 10, 10, 10 );
    const material = new THREE.MeshStandardMaterial({
        color: '#000',
        transparent: true,
        side: THREE.DoubleSide,
        alphaTest: 0.5
    });
    material.alphaMap = new THREE.TextureLoader().load(alphaTexture);
    // material.alphaMap.magFilter = THREE.NearestFilter;
    material.alphaMap.wrapS = THREE.RepeatWrapping;
    material.alphaMap.wrapT = THREE.RepeatWrapping;
    material.alphaMap.repeat.set( 0, 0 );

    // let material = new THREE.MeshDepthMaterial();
    // let material = new THREE.MeshBasicMaterial({ color: '#f15b27' });
    let mesh = new THREE.Mesh( geometry, material );

    const wireframe = new THREE.LineSegments(
        new THREE.EdgesGeometry(geometry),
        new THREE.LineBasicMaterial()
    );

    group.add(mesh);
    group.add(wireframe);
    scene.add(group);

    group.rotation.z = Math.PI / 4;

    const speed = 0.25;

    function update(time) {
        const angle = time * speed;

        wireframe.material.color.setHSL( 0, 0, 0 );

        group.rotation.y = angle;
    }

    return {
        update
    }
}
*/
