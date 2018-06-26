import * as THREE from 'three'

export default scene => {

    const lightIn = new THREE.PointLight('#fffd00', 30);
    const lightOut = new THREE.PointLight('#ff0001', 10);
    lightOut.position.set(20, 10, 20);

    scene.add(lightIn);
    scene.add(lightOut);

    const rad = 80;

    function update(time) {
        const x = rad * Math.sin(time*0.2);
        lightOut.position.x = x;
    }

    return {
        update
    }
}