import React from 'react';
import * as THREE from 'three';

var camera, scene, renderer;
var geometry, material, mesh;

/**
 * The right way to use threejs with react
 */
class SphereMoreOptions extends React.Component{
    
    componentDidMount(){
        scene = new THREE.Scene();
        geometry = new THREE.IcosahedronGeometry(220, 3); //sphere
        material = new THREE.MeshNormalMaterial({
            //flatShading: true
            flatShading: false,
            transparent: true,
            opacity: 0.5
        });

        mesh = new THREE.Mesh(geometry, material);

        camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
        camera.position.z = 700;

        scene.add(camera);
        scene.add(mesh);

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene,camera);

        this.mount.appendChild(renderer.domElement); //this is it

    }
    
    render(){
        return (
            <div ref={ref => (this.mount = ref)} />
        );
    }
}

export default SphereMoreOptions;