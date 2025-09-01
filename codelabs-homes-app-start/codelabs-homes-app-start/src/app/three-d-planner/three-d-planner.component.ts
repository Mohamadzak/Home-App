import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-three-d-planner',
  templateUrl: './three-d-planner.component.html',
  styleUrls: ['./three-d-planner.component.css']
})
export class ThreeDPlannerComponent implements AfterViewInit {
  @ViewChild('canvas') private canvasRef!: ElementRef;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private animationFrameId: number = 0;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  ngAfterViewInit(): void {
    this.initThree();
    this.animate();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
    this.renderer.dispose();
  }

  private initThree(): void {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xa0a0a0);

    // Camera
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.set(0, 10, 20);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setSize(width, height);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(10, 20, 10);
    this.scene.add(dirLight);

    // Ground (e.g. garden/lawn)
    const groundGeometry = new THREE.PlaneGeometry(40, 40);
    const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x4caf50 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    this.scene.add(ground);

    // Example: Simple building (box)
    const buildingGeometry = new THREE.BoxGeometry(6, 4, 6);
    const buildingMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
    building.position.set(0, 2, 0);
    this.scene.add(building);

    // Example: Simple parking area (gray box)
    const parkingGeometry = new THREE.BoxGeometry(8, 0.1, 3);
    const parkingMaterial = new THREE.MeshLambertMaterial({ color: 0x888888 });
    const parking = new THREE.Mesh(parkingGeometry, parkingMaterial);
    parking.position.set(-10, 0.05, 8);
    this.scene.add(parking);

    // Example: Simple garden decoration (sphere as a tree)
    const treeGeometry = new THREE.SphereGeometry(1, 16, 16);
    const treeMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 });
    const tree = new THREE.Mesh(treeGeometry, treeMaterial);
    tree.position.set(10, 1, -10);
    this.scene.add(tree);
  }

  private animate = () => {
    this.renderer.render(this.scene, this.camera);
    this.animationFrameId = requestAnimationFrame(this.animate);
  }
}