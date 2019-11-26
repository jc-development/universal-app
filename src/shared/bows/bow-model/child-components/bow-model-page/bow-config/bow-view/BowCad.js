import React, { Component } from 'react';
import * as THREE from 'three';

import axios from 'axios';
import TweenMax from 'gsap/TweenMax';

import {
  createRenderer,
  createScene,
  createCamera,
  createControls,
  createGLTFLoader,
  createTextureLoader,
  createBlackMaterial,
  createLimbMaterial,
  createRiserMaterial,
  createHemisphereLight,
  dispose,
  disposeHierchy,
  disposeNode
 } from './assets/utils/bow-cad-support';

import './assets/css/bow-cad.css';

export default class BowCad extends Component {
  constructor() {
    super();

    // THREE related vars
    this.renderer, this.scene, this.camera, this.controls, this.glTFLoader, this.gltf, this.textureLoader,
    this.material, this.limbMaterial, this.riserMaterial, this.hemisphereLight, this.id, this.canvasContainer;

    // THREE related methods
    this.createRenderer = createRenderer.bind(this);
    this.createScene = createScene.bind(this);
    this.createCamera = createCamera.bind(this);
    this.createControls = createControls.bind(this);
    this.createGLTFLoader = createGLTFLoader.bind(this);
    this.createTextureLoader = createTextureLoader.bind(this);
    this.createBlackMaterial = createBlackMaterial.bind(this);
    this.createRiserMaterial = createRiserMaterial.bind(this);
    this.createLimbMaterial = createLimbMaterial.bind(this);
    this.createHemisphereLight = createHemisphereLight.bind(this);

    this.buildSceneAndLoadBow = this.buildSceneAndLoadBow.bind(this);
    this.loadGeometries = this.loadGeometries.bind(this);
    this.renderAnimation = this.renderAnimation.bind(this);
    this.dispose = dispose.bind(this);
    this.disposeHierchy = disposeHierchy.bind(this);
    this.disposeNode = disposeNode.bind(this);
    this.cleanUp = this.cleanUp.bind(this);

    this.updateRiserColor = this.updateRiserColor.bind(this);
    this.updateLimbColor = this.updateLimbColor.bind(this);

    this.state = {
      progressLoader: 0
    };

  }

  cleanUp() {
    cancelAnimationFrame(this.id);
    // this.dispose(this.scene, this.gltf);
    // this.disposeHierchy(this.scene, this.disposeNode);

    // console.log(this.scene.children);

    for (let i = this.scene.children.length - 1; i >= 0; i--) {
      if (this.scene.children[i].type === "Mesh" || this.scene.children[i].type === "Object3D") {
        // console.log('child: ', this.scene.children[i]);
        // console.log('child material: ', this.scene.children[i].material);
        if (this.scene.children[i].material) this.scene.children[i].material.dispose();
        // console.log('child geometry: ', this.scene.children[i].geometry);
        if (this.scene.children[i].geometry) this.scene.children[i].geometry.dispose();
        this.scene.remove(this.scene.children[i]);
        // console.log('this.gtlf: ', this.gtlf);
      }
    }

    // this.renderer.clear(true, true, true);
    // this.renderer.dispose();
    // this.renderer.forceContextLoss();
    // this.renderer.context = undefined;
    // this.renderer.domElement = undefined;
    // this.scene = undefined;
    // this.gltf = undefined;
  }

  buildSceneAndLoadBow(bowModelName) {
    this.renderer = this.renderer || this.createRenderer(this.canvasContainer);
    this.renderer.gammaOutput = true;
    this.renderer.gammaFactor = 0.8;
    this.scene = this.scene || this.createScene();
    this.camera = this.camera || this.createCamera();
    this.canvasContainer.appendChild( this.renderer.domElement );
    this.controls = this.controls || this.createControls();
    this.hemisphereLight = this.hemisphereLight || this.createHemisphereLight();
    this.scene.add( this.hemisphereLight);

    this.loadGeometries(bowModelName); // this.props.bowModel

    this.renderAnimation();

  }

  renderAnimation() {
    const renderBow3D = () => {
      this.renderer.render( this.scene, this.camera );

      this.scene.children.forEach( child => {
        child.rotation.y += 0.001;
      });
    };

    const animate = () => {
      this.id = requestAnimationFrame( animate );
      renderBow3D();
    };

    animate();
  }

  loadGeometries(bowModelName) {

    this.glTFLoader = this.glTFLoader || this.createGLTFLoader()

    this.glTFLoader.load(`${bowModelName}`,
      (gltf) => {
        this.gltf = gltf;
          this.gltf.scene.children.forEach( child => {
              this.material = this.material || this.createBlackMaterial('ninjaBlack');
              console.log('child: ', child);
              child.scale.x = child.scale.y = child.scale.z = 290;
              // child.material = this.material;
          });

          for (let i = this.gltf.scene.children.length - 1; i >= 0; i--) {
            this.scene.add(this.gltf.scene.children[i]);
          }

          this.updateRiserColor(this.props.riserColor.color.swatchUrl);
          this.updateLimbColor(this.props.limbColor.color.swatchUrl);



      },
      (xhr) => {
        // console.log( (xhr.loaded / xhr.total * 100) + '% LOADED' );
        this.setState({
          progressLoader: parseInt(xhr.loaded / xhr.total * 100)
        })
      },
      (error) => console.log( 'An Error occurred: ', error)
    );
  }

  updateRiserColor(color) {
    this.textureLoader = this.textureLoader || this.createTextureLoader();
    this.textureLoader.setCrossOrigin('anonymous');

    const urlString = this.props.riserColor.color.swatchUrl;
      axios.get('/api/get-riser-color/', {
        params : urlString
      }).then( response => {
        console.log('response.data from img: ', response.data);
        const image = response.data;
        this.textureLoader.load(image, (colorFinish) => {
          colorFinish.wrapS = colorFinish.wrapT = THREE.RepeatWrapping;
          colorFinish.offset.set(0, 0);
          colorFinish.repeat.set(2, 2);

          this.riserMaterial = new THREE.MeshPhongMaterial({
            color: 0xFFFFFF,
            map: colorFinish,
            skinning: true,
            precision: 'highp',
            specular: 0x000000,
            emissive: 0x000000,
            emissiveIntensity: 0.25
          });

          this.scene.children.forEach( child => { if (child.name === 'riser' || child.name === 'limb-graphics') child.material = this.riserMaterial });
        });
      });
    }


  updateLimbColor(color) {
    // console.log('this.props from updateLimbColor!!! ', this.props);
    this.setState({
      progressLoader: 101
    })

    this.textureLoader = this.textureLoader || this.createTextureLoader();
    this.textureLoader.setCrossOrigin('anonymous');

    const urlString = this.props.limbColor.color.swatchUrl;
    axios.get('/api/get-limb-color/', {
      params : urlString
    }).then( response => {
      // console.log('response.data from img: ', response.data);
      const image = response.data;
      this.textureLoader.load(image, (colorFinish) => {
        colorFinish.wrapS = colorFinish.wrapT = THREE.RepeatWrapping;
        colorFinish.offset.set(0, 0);
        colorFinish.repeat.set(2, 2);

        this.limbMaterial = new THREE.MeshPhongMaterial({
          color: 0xFFFFFF,
          map: colorFinish,
          skinning: true,
          precision: 'highp',
          specular: 0x000000,
          emissive: 0x000000,
          emissiveIntensity: 0.25
        });

        this.scene.children.forEach( child => { if (child.name === 'limbs') child.material = this.limbMaterial });

      });
    });


  }


  componentDidMount() {
    this.buildSceneAndLoadBow(this.props.cadPath);
  }

  componentDidUpdate(prevProps) {

    if (this.props.cadPath !== prevProps.cadPath) {
      this.cleanUp();
      this.buildSceneAndLoadBow(this.props.cadPath);
    }

    if (this.props.riserColor.color.swatchUrl && prevProps.riserColor.color.swatchUrl) {
      if (this.props.riserColor.color.swatchUrl !== prevProps.riserColor.color.swatchUrl) {
        this.updateRiserColor(this.props.riserColor.color.swatchUrl);
      }
    }

    if (this.props.limbColor.color.swatchUrl && prevProps.limbColor.color.swatchUrl) {
      if (this.props.limbColor.color.swatchUrl !== prevProps.limbColor.color.swatchUrl) {
        this.updateLimbColor(this.props.limbColor.color.swatchUrl);
      }
    }

  }

  componentWillUnmount() {
    cancelAnimationFrame(this.id);
    this.dispose(this.scene, this.gltf);
    this.disposeHierchy(this.scene, this.disposeNode);
    this.renderer.clear(true, true, true);
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.renderer.context = undefined;
    this.renderer.domElement = undefined;
    this.scene = undefined;
    this.gltf = undefined;
  }

  render() {
    // console.log('this.props.dimensions: ', this.props.dimensions)
    const divPos = {
      position: 'absolute',
      height: '100%',
      width: '100%',
      textAlign: 'center',
      marginTop: '0.5rem'
    };

    const width = {
      backgroundColor: 'blue',
      width: `${this.state.progressLoader}%`,
      height: '30px',
      position: 'absolute',
    };

    const divPos2 = {
      left: '50%',
      transform: 'translate(-50%, 0)',
      position: 'absolute',
      width: '90%',
      height: '100%',
      paddingTop: '5rem',
      background: 'rgba(255,255,255,0.5)',
      overflow: 'hidden'
      }

    const load3D = () => {
      if (this.state.progressLoader <= 100) {
        return (
          <div id="progress-loader" style={divPos}>
            <div style={divPos2}>
              <h5 style={{margin: '1rem 0'}}>Loading Interactive {this.props.bowName}</h5>
              <div style={width}></div>
            </div>
            {this.props.bowImage !== null ? <img src={this.props.bowImage} alt={`Elite Archery ${this.props.bowName} Riser in ${this.props.riserColor.color.colorName}`} /> : null}
          </div>
        )
      } else {
        return null;
      }
    };

    return (
      <div id="canvas-container" ref={el => this.canvasContainer = el}>
        { load3D() }
      </div>
    );
  }
}
