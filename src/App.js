import { useEffect } from "react";
import * as THREE from "three";
// điều khiển quỹ đạo
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import "./App.css";

function App() {
  
  useEffect(() => {
    // thiết lập bối cảnh, camera, canvas, bộ dựng hình(renderer)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // camera.position.set(10, 15, -22)
    camera.position.set(10, 8, 8);
    const canvas = document.getElementById("myThreeJsCanvas");
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    // tạo ánh sáng xung quanh
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;
    scene.add(ambientLight);

    // tạo đèn chiếu
    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.castShadow = true;
    spotLight.position.set(0, 64, 32);
    scene.add(spotLight);

    // tạo khối lập phương
    // const boxGeometry = new THREE.BoxGeometry( 14, 14, 14 )
    // const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00})
    // const boxMesh = new THREE.Mesh( boxGeometry, boxMaterial )
    // scene.add( boxMesh )

    //tao 1 hinh phang
    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.MeshBasicMaterial({color: 0xffffff,side: THREE.DoubleSide,visible: false});
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.rotateX(-Math.PI / 2);
    scene.add(planeMesh);
    ////
    planeMesh.name = "ground";

    const grid = new THREE.GridHelper(10, 10);
    scene.add(grid);

    //// color: 0xffff00
    const highlightMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1),new THREE.MeshBasicMaterial({ color: 0xffff00,side: THREE.DoubleSide }));
    highlightMesh.rotateX(-Math.PI / 2);
    highlightMesh.position.set(0, 0, 0);
    scene.add(highlightMesh);

    ////
    const highlight1Mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1),new THREE.MeshBasicMaterial({ color: 0xffff00,side: THREE.DoubleSide }));
    highlight1Mesh.rotateX(-Math.PI / 2);
    highlight1Mesh.position.set(-0.5, 0, -0.5);
    scene.add(highlight1Mesh);

    //
    const highlight2Mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1),new THREE.MeshBasicMaterial({ color: 0xffff00,side: THREE.DoubleSide }));
    highlight2Mesh.rotateX(-Math.PI / 2);
    highlight2Mesh.position.set(-0.5, 0, 0.5);
    scene.add(highlight2Mesh);

    ////
    const mousePosition = new THREE.Vector2();
    // raycaster: chọn chuột-tìm ra những đối tượng nào trong không gian 3d mà chuột đi qua
    const raycaster = new THREE.Raycaster();
    console.log(raycaster);
    const highlightMeshId = planeMesh.id
    console.log(highlightMeshId)
    let intersects;

    window.addEventListener("mousemove", function (e) {
      // tính toán vị trí con trỏ chuột
      mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mousePosition, camera);
      // lấy các đối tượng giao vs tia chọn camera
      intersects = raycaster.intersectObjects(scene.children);
      console.log(intersects);
      ////
      for (let i = 0; i < intersects.length; i++) {
        if(intersects[i].object.id !== highlightMeshId)
            intersects[i].object.material.color.set(0xFF0000)
      }

      // intersects.forEach(function (intersect) {
      //   if (intersect.object.name === "ground") {
      //     // const highlightPos = new THREE.Vector3().copy(intersect.point).floor().addScalar(0.5);
      //     // console.log(highlightPos)           
      //     // highlightMesh.position.set(highlightPos.x,0, highlightPos.z); 
      //     const intersection = intersects[0]
      //     const highlightColor = intersection.object.geometry.getAttribute('color')
      //     console.log(highlightColor)
      //     // const color = new THREE.Color(Math.random() * 0xff0000);
      //     // highlightColor.setXYZ(color.r, color.g, color.b);
      //     // highlightColor.needsUpdate = true;  
      //   }
      // });

    });

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Add FPS Stats
    const stats = Stats();
    document.body.appendChild(stats.dom);

    // tạo ra hiệu ứng động
    const animate = () => {
      // boxMesh.rotation.x += 0.01
      // boxMesh.rotation.y += 0.01

      stats.update();
      controls.update();

      renderer.render(scene, camera);
      // requestAnimationFrame(animate);
      window.requestAnimationFrame(animate);
    };
    // window.addEventListener("click", onClick, false);
    animate();
  }, []);

  return (
    <div className="App">
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
