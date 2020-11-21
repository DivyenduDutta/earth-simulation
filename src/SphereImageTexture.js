import React from 'react';
import * as THREE from 'three';
import groundImage from './images/grass.jpg';
import bumpImage from './images/earthbump.jpg';
import specularImage from './images/earthspec.jpg';
import cloudImage1 from './images/earthcloudmap1.jpg';
import galaxyImage from './images/galaxy_starfield.png';

class SphereImageTexture extends React.Component{
    
    componentDidMount(){
        var scene, camera, renderer;
        var geometry, material, mesh, cloudMesh, galaxyMesh;
        

        scene = new THREE.Scene();
        geometry = new THREE.SphereGeometry(0.5, 32, 32); //sphere

        var mouse	= {x : 0, y : 0}
        document.addEventListener('mousemove', function(event){
            mouse.x	= (event.clientX / window.innerWidth ) - 0.5
            mouse.y	= (event.clientY / window.innerHeight) - 0.5
        }, false);
    
        //cloud geometry
        var cloudGeometry = new THREE.SphereGeometry(0.504, 32, 32);

        //galaxy
        var galaxyGeometry = new THREE.SphereGeometry(90, 32, 32);
        var galaxyMaterial = new THREE.MeshBasicMaterial({
            side : THREE.BackSide
        });

        var ambientLight	= new THREE.AmbientLight( 0x888888 );
        scene.add( ambientLight );
        
        var light = new THREE.DirectionalLight( 0xffffff, 1 );
        light.position.set( -1, 1, 1 ).normalize();
        scene.add(light);

        material = new THREE.MeshPhongMaterial();

        //cloud material
        var cloudMaterial = new THREE.MeshPhongMaterial({
            side : THREE.DoubleSide,
            opacity : 0.3,
            transparent : true,
            depthWrite : false
        });

        var loader = new THREE.TextureLoader();
        loader.load(groundImage,
            function(texture){
                console.log('loading texture');
                material.map = texture;
            },
            // Function called when download progresses
            function ( xhr ) {
                console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
            },
            // Function called when download errors
            function ( xhr ) {
                console.log(xhr);
                console.log( 'An error happened' );
            }

            
        );

        loader.load(specularImage,
            function(texture){
                console.log('loading specular texture');
                material.specularMap = texture;
                material.specular = new THREE.Color('grey');
            },
            // Function called when download progresses
            function ( xhr ) {
                console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
            },
            // Function called when download errors
            function ( xhr ) {
                console.log(xhr);
                console.log( 'An error happened' );
            }

            
        );

        loader.load(galaxyImage,
            function(texture){
                console.log('loading galaxy texture');
                galaxyMaterial.map = texture;
                galaxyMesh = new THREE.Mesh(galaxyGeometry, galaxyMaterial);
                scene.add(galaxyMesh);
            },
            // Function called when download progresses
            function ( xhr ) {
                console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
            },
            // Function called when download errors
            function ( xhr ) {
                console.log(xhr);
                console.log( 'An error happened' );
            }

            
        );

        loader.load(bumpImage,
            function(texture){
                console.log('loading bump texture');
                material.bumpMap = texture;
                material.bumpScale = 5;
                mesh = new THREE.Mesh(geometry, material);
                
                scene.add(mesh);
            },
            // Function called when download progresses
            function ( xhr ) {
                console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
            },
            // Function called when download errors
            function ( xhr ) {
                console.log(xhr);
                console.log( 'An error happened' );
            }

            
        );

        loader.load(cloudImage1,
            function(texture){
                console.log('loading cloud texture');
                cloudMaterial.map = texture;
                cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
                mesh.add(cloudMesh);
            },
            // Function called when download progresses
            function ( xhr ) {
                console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
            },
            // Function called when download errors
            function ( xhr ) {
                console.log(xhr);
                console.log( 'An error happened' );
            }

            
        );
        
        
    
        camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
        camera.position.z = 1.5;

        scene.add(camera);

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
        this.mount.appendChild(renderer.domElement); //this is it  

        const animate = (nowMsec) => {
            requestAnimationFrame(animate);
            var delta	= Math.min(200, nowMsec)/1000;
            if(mesh != undefined || mesh != null){
               
                mesh.rotation.y = Date.now() * 0.0001;
                cloudMesh.rotation.y = Date.now() * 0.00012;

                camera.position.x += (mouse.x*5 - camera.position.x) * (delta*3);
                camera.position.y += (mouse.y*5 - camera.position.y) * (delta*3);
                camera.lookAt( scene.position );
            }
            renderer.render(scene, camera);
        }

        animate();
    }
    
    render(){
        return (
            <div ref={ref => (this.mount = ref)} />
        );
    }
}

export default SphereImageTexture;