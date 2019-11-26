import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols/OrbitControls';
import GLTFLoader from 'three-gltf-loader';

let renderer, camera, containerWidth, containerHeight, scene, controls, glTFLoader, textureLoader, hemisphereLight;

export const createRenderer = (el) => {

  // console.log('el: ', el);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, autoClear: true, physicallyCorrectLights: true, forceClear: true });
  renderer.setPixelRatio( 2 );

  containerWidth = el.offsetWidth;
  containerHeight = el.offsetHeight;

  renderer.setSize( containerWidth, containerHeight );

  return renderer;
}

export const createScene = () => {
  let scene = new THREE.Scene();
  scene.translateY( -490 );
  return scene;
}

export const createCamera = () => {
  camera = new THREE.OrthographicCamera(containerWidth / - 2, containerWidth / 2, containerHeight / 2, containerHeight / - 2, -1000, 1000);
  camera.position.z = 3;

  camera.aspect = containerWidth / containerHeight;

  camera.left = -1000 * camera.aspect / 2;
  camera.right = 1000 * camera.aspect / 2;
  camera.top = 1000 / 2;
  camera.bottom = -1000 / 2;
  camera.updateProjectionMatrix();
  camera.updateMatrixWorld();
  return camera;
}

export const createControls = () => {
  controls = new OrbitControls( camera, renderer.domElement );
  controls.minZoom = 1;
  controls.maxZoom = 1;
  controls.enablePan = false;
  return controls;
}

export const createGLTFLoader = () => {
glTFLoader = new GLTFLoader();
return glTFLoader;
}

// export const createDracoLoader = () => {
//   THREE.DRACOLoader.setDecoderPath('')
// }

export const createTextureLoader = () => {
  textureLoader = new THREE.TextureLoader();
  return textureLoader;
}

export const createBlackMaterial = () => {}

export const createRiserMaterial = () => {}

export const createLimbMaterial = () => {}

export const createHemisphereLight = () => {
  hemisphereLight =  new THREE.HemisphereLight( { skyColor: 0xffffbb, groundColor: 0x080820, intensity: 0.25, position: {x: 0, y: 430, z: -2500 } } );
  return hemisphereLight;
}

export const dispose = (scene, gltf) => {

 if (gltf) {
   scene.remove(gltf.scene);


   gltf.scene.children.forEach( object => {

   object.traverse(obj => {
     console.log('obj: ', obj)
     if(obj.material){
       obj.material.dispose();
       if(obj.material.map){
         obj.material.map.dispose();
         obj.material.map = undefined;
       }
       if(obj.material.lightMap){
         obj.material.lightMap.dispose();
         obj.material.lightMap = undefined;
       }
       if(obj.material.aoMap){
         obj.material.aoMap.dispose();
         obj.material.aoMap = undefined;
       }
       if(obj.material.emissiveMap){
         obj.material.emissiveMap.dispose();
         obj.material.emissiveMap = undefined;
       }
       if(obj.material.bumpMap){
         obj.material.bumpMap.dispose();
         obj.material.bumpMap = undefined;
       }
       if(obj.material.normalMap){
         obj.material.normalMap.dispose();
         obj.material.normalMap = undefined;
       }
       if(obj.material.displacementMap){
         obj.material.displacementMap.dispose();
         obj.material.displacementMap = undefined;
       }
       if(obj.material.roughnessMap){
         obj.material.roughnessMap.dispose();
         obj.material.roughnessMap = undefined;
       }
       if(obj.material.metalnessMap){
         obj.material.metalnessMap.dispose();
         obj.material.metalnessMap = undefined;
       }
       if(obj.material.alphaMap){
         obj.material.alphaMap.dispose();
         obj.material.alphaMap = undefined;
       }
     }
     if(obj.geometry){
       obj.geometry.dispose();
       obj.geometry = undefined;
     }
     if (obj.isMesh) {
       this.gltf.scene.remove( obj )
     }
     scene.remove( obj );
     obj = undefined;
   });
 });

   renderer.dispose();

   gltf.animations = undefined;
   gltf.cameras = undefined;
   gltf.scene = undefined;
   gltf.scenes = undefined;
   gltf.asset = undefined;
   gltf.parser = undefined;
   gltf.userData = undefined;

   gltf = undefined;
   glTFLoader = undefined;
 }
}

export const disposeNode = (node) => {
  // console.log('node: ', node);
  if (node instanceof THREE.Mesh) {
    if (node.material) {
      if (node.material instanceof THREE.MeshFaceMaterial || node.material instanceof THREE.MultiMaterial) {
        node.material.materials.forEach( function(mtrl, idx) {
          if (mtrl.map) mtrl.map.dispose();
          if (mtrl.lightMap) mtrl.lightMap.dispose();
          if (mtrl.bumpMap) mtrl.bumpMap.dispose();
          if (mtrl.normalMap) mtrl.normalMap.dispose();
          if (mtrl.specularMap) mtrl.specularMap.dispose();
          if (mtrl.envMap) mtrl.envMap.dispose();

          mtrl.dispose();
          mtrl = undefined;
        } );
      }
      else {
        if (node.material.map) node.material.map.dispose();
        if (node.material.lightMap) node.material.lightMap.dispose();
        if (node.material.bumpMap) node.material.bumpMap.dispose();
        if (node.material.normalMap) node.material.normalMap.dispose();
        if (node.material.specularMap) node.material.specularMap.dispose();
        if (node.material.envMap) node.material.envMap.dispose();

        node.material.dispose();
        node.material = undefined;
      }
    }
    if (node.geometry) {
      node.geometry.dispose();
      node.geometry = undefined;
    }
    // this is a Mesh
    // scene.remove( node );
    node = undefined;
  }
  // scene.remove( node );
  node = undefined;
}

export const disposeHierchy = (node, callback) => {
  for (let i = node.children.length - 1; i >= 0; i--) {
    let child = node.children[i];

    disposeHierchy(child, callback);
    callback(child);
    callback(node);
  }
}
