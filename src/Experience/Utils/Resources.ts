import { Subject } from "rxjs";
import { Experience } from "../Experience";
import { Renderer } from "../Renderer";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DracoLoader";
import * as THREE from "three";

export interface IAsset {
  name: string;
  type: string;
  path: string;
}

export interface IAssetInstance {
  type: string;
  file: any;
  elementRef?: any;
}

export class Resources {
  public resourcesLoaded$: Subject<any> = new Subject();
  public experience: Experience;
  public renderer: Renderer;
  public assets: IAsset[];
  public items: { [key: string]: IAssetInstance} = {};
  queue: number;
  loaded: number;
  loaders: any = {};

  constructor(assets: any[]) {
    this.experience = new Experience();
    this.renderer = this.experience.renderer;
    this.assets = assets;

    this.items = {};
    this.queue = this.assets.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  public setLoaders() {
    this.loaders = {}
    this.loaders.gltf = new GLTFLoader();
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.draco = new DRACOLoader();
    this.loaders.draco.setDecoderPath("/draco/");
    this.loaders.gltf.setDRACOLoader(this.loaders.draco);
  }

  public startLoading() {
    for (const asset of this.assets) {
      this.load(asset);
    }
  }

  public load(asset: any) {
    if (asset.type === 'glb') {
      this.loaders.gltf.load(asset.path, (gltf: any) => {
        this.items[asset.name] = { type: asset.type, file: gltf }
        this.onLoaded();
      });
    }

    if (asset.type === 'video-texture') {
      const videoElement = document.createElement('video');
      videoElement.src = asset.path;
      videoElement.autoplay = true;
      videoElement.muted = true;
      videoElement.loop = true;
      // videoElement.play();

      const videoTexture = new THREE.VideoTexture(videoElement);
      videoTexture.flipY = true;
      videoTexture.minFilter = THREE.NearestFilter;
      videoTexture.magFilter = THREE.NearestFilter;
      videoTexture.generateMipmaps = false;
      videoTexture.encoding = THREE.sRGBEncoding;

      this.items[asset.name] = { type: asset.type, elementRef: videoElement, file: videoTexture };
      this.onLoaded();
    }

    if (asset.type === 'jpg') {
      this.loaders.textureLoader.load(asset.path, (file: any) => {
        file.encoding = THREE.sRGBEncoding;
        file.flipY = false;
        
        this.items[asset.name] = { type: asset.type, file }
        this.onLoaded();
      });
    }
  }

  public onLoaded() {
    this.loaded++;

    if (this.loaded === this.queue) {
      this.resourcesLoaded$.next(null);
    }
  }
}
