import React from 'react';
import * as THREE from 'three';

var camera, scene, renderer;
var geometry, material, wireframeMaterial, mesh;

/**
 * The not so right way to use threejs with react
 */
class SpinningCube extends React.Component{

init = () => {
    scene = new THREE.Scene();
    geometry = new THREE.IcosahedronGeometry(220, 5);
    material = new THREE.LineBasicMaterial({
        color: 0xFFFFFF
    });
    
    wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        wireframe: true,
        wireframeLinewidth: 5
    });

    let geo = new THREE.Geometry();
    geo.vertices = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 100, 0),
        new THREE.Vector3(0, 0, 100)
    ];
    geo.faces.push(new THREE.Face3(0, 1, 2));
    geo.computeBoundingSphere();

    let mat = new THREE.MeshBasicMaterial({
        color: 0xFFFFFF
    });

    /* Extrude geometry */
    let triangle = new THREE.Shape([
        new THREE.Vector2(0, 100),
        new THREE.Vector2(100, 100),
        new THREE.Vector2(100, 0),
    ]);
    let extrudeGeometry = new THREE.ExtrudeGeometry(triangle, {
        bevelEnabled : true,
        depth: 30
    });

    mesh = new THREE.Line(geometry, material); //cool stuff here
    //mesh = new THREE.Mesh(geo, mat);
    //mesh = new THREE.Mesh(extrudeGeometry, wireframeMaterial);



    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.z = 700;

    scene.add(camera);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    //renderer.render(scene, camera);

    document.body.appendChild(renderer.domElement);
}

animate = () => {
    requestAnimationFrame(this.animate);

    mesh.rotation.x = Date.now() * 0.00005;
    mesh.rotation.y = Date.now() * 0.0001;

    renderer.render(scene, camera);
}
    render(){
        return (
            <>
                { this.init() }
                { this.animate() }
            </>
        );
    }
}

export default SpinningCube;