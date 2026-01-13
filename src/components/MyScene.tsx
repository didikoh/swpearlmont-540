import { useEffect, useRef, useState } from "react";
import {
  Scene,
  ArcRotateCamera,
  Engine,
  Vector3,
  DirectionalLight,
  Color3,
  KeyboardEventTypes,
  PointerEventTypes,
  // WebGPUEngine,
  Color4,
  ImportMeshAsync,
  CubeTexture,
  ShadowGenerator,
  VertexBuffer,
  PBRMaterial,
} from "@babylonjs/core"; // 导入 Babylon.js 核心库
import "@babylonjs/loaders"; // 导入 Babylon.js 的加载器模块
import "@babylonjs/inspector"; // 导入 Babylon.js 的 Inspector 模块
import "../css/MyScene.css"; // 导入自定义的 CSS 文件
import { Inspector } from "@babylonjs/inspector";

export const shouldEnableShadow = (engine: Engine): boolean => {
  const isMobile =
    /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
      navigator.userAgent
    );

  const caps = engine.getCaps();
  const isLowEnd =
    !caps.supportComputeShaders || // 不支持浮点纹理通常代表性能较弱
    caps.maxTextureSize < 2048 || // 纹理大小小于 2048 可能是老旧设备
    engine.getHardwareScalingLevel() > 1; // 硬件缩放比例大，可能分辨率高但性能差

  return !isMobile && !isLowEnd;
};

const MyScene = ({ onProgress }: any) => {
  const canvasRef = useRef(null); // 使用 useRef 创建一个引用，用于绑定到 canvas 元素
  const [model, setModel] = useState(); // 使用 useState 创建一个状态，用于存储加载的模型
  const [currentScene, setCurrentScene] = useState<Scene | null>(null); // 创建一个状态，用于存储当前场景
  const [currentCamera, setCurrentCamera] = useState<ArcRotateCamera | null>(
    null
  ); // 创建一个状态，用于存储当前相机
  const shadowGeneratorRef = useRef<ShadowGenerator | null>(null); // 创建一个引用，用于存储阴影生成器
  const sunRef = useRef<DirectionalLight | null>(null);
  const skyTextureRef = useRef<any>(null);
  const engineRef = useRef<Engine | null>(null);

  useEffect(() => {
    if (model && currentScene && currentCamera) {
      onProgress(105);
      // const minX = -600, maxX = 200, minY = 70, maxY = 600, minZ = -600, maxZ = 400;
      // 添加监听器以记录相机位置和目标和限制相机目标范围
      currentCamera.onViewMatrixChangedObservable.add(() => {
        // camera.target.x = Math.min(Math.max(camera.target.x, minX), maxX);
        // camera.target.y = Math.min(Math.max(camera.target.y, minY), maxY);
        // camera.target.z = Math.min(Math.max(camera.target.z, minZ), maxZ);
        // camera.panningSensibility = Math.min(300, Math.max(25, 5000 / camera.radius));
      });

      // 添加点击事件以记录被点击网格的名称
      currentScene.onPointerObservable.add((pointerInfo) => {
        if (pointerInfo.type === PointerEventTypes.POINTERPICK) {
          const pickedMesh = pointerInfo.pickInfo?.pickedMesh;
          if (pickedMesh) {
            // console.log("Picked mesh:", pickedMesh.name);
          }
        }
      });

      currentScene.materials.forEach((mat) => {
        if (mat.name.includes("Map_") && mat instanceof PBRMaterial) {
           mat.indexOfRefraction = 1;
        }
      });
      // const resetCam = () => {
      //   currentCamera.fov = 1.3;
      //   currentCamera.target = new Vector3(-2151.5, 108.5, 4523);
      //   currentCamera.alpha = 5.33;
      //   currentCamera.beta = 1.1;
      //   currentCamera.radius = 520.45;
      // }

      // // 为场景中的网格应用阴影
      currentScene.meshes.forEach((mesh) => {
        const hasNormals = mesh.isVerticesDataPresent(VertexBuffer.NormalKind);
        const isStdOrPBR =
          mesh.material &&
          ["StandardMaterial", "PBRMaterial"].includes(
            mesh.material.getClassName()
          );
        if (hasNormals && isStdOrPBR && !mesh.name.includes("Box")) {
          mesh.receiveShadows = true;
          if (shadowGeneratorRef.current) {
            // shadowGeneratorRef.current.addShadowCaster(mesh);
          }
        }
      });

      const mat_map = currentScene.getMaterialByName("Map_Small");
      const mat_map_mid = currentScene.getMaterialByName("Map_Mid");
      if (mat_map instanceof PBRMaterial) {
        mat_map.indexOfRefraction = 1;
      }
      if (mat_map_mid instanceof PBRMaterial) {
        mat_map_mid.indexOfRefraction = 1;
      }
      return () => {};
    }
  }, [model, currentScene, currentCamera]); // 监视模型的变化

  // const handleFocus = (targetMesh: any) => {
  //   let targetPosition;
  //   if (targetMesh.getBoundingInfo) {
  //     targetPosition = targetMesh.getBoundingInfo().boundingBox.centerWorld; // 获取点击网格的中心位置
  //   } else {
  //     targetPosition = targetMesh.getAbsolutePosition();
  //   }

  //   const createAnimation = ({ property, startValue, endValue, duration }: any) => {
  //     const animation = new Animation(
  //       `${property}Animation`, // 动画名称
  //       property, // 动画属性
  //       60, // 帧率
  //       Animation.ANIMATIONTYPE_FLOAT, // 动画类型
  //       Animation.ANIMATIONLOOPMODE_CONSTANT // 动画循环模式
  //     );

  //     animation.setKeys([
  //       { frame: 0, value: startValue }, // 起始值
  //       { frame: duration, value: endValue }, // 目标值
  //     ]);

  //     return animation;
  //   };

  //   const animationDuration = 50; // 动画持续时间（帧数）
  //   if (!currentCamera || !currentScene) return
  //   const radiusAnimation = createAnimation(
  //     {
  //       property: "radius",
  //       startValue: currentCamera.radius,
  //       endValue: 300,
  //       duration: animationDuration
  //     }
  //   );

  //   const targetAnimation = new Animation(
  //     "targetAnimation", // 动画名称
  //     "target", // 动画属性
  //     60, // 帧率
  //     Animation.ANIMATIONTYPE_VECTOR3, // 动画类型
  //     Animation.ANIMATIONLOOPMODE_CONSTANT // 动画循环模式
  //   );

  //   targetAnimation.setKeys([
  //     { frame: 0, value: currentCamera.target }, // 起始目标位置
  //     { frame: animationDuration, value: targetPosition }, // 目标位置
  //   ]);

  //   const easingFunction = new QuadraticEase(); // 创建二次缓动函数
  //   easingFunction.setEasingMode(EasingFunction.EASINGMODE_EASEIN); // 设置为由慢到快
  //   radiusAnimation.setEasingFunction(easingFunction);
  //   targetAnimation.setEasingFunction(easingFunction);

  //   currentCamera.animations = [radiusAnimation, targetAnimation]; // 将动画应用到相机
  //   currentScene.beginAnimation(currentCamera, 0, animationDuration, false); // 开始动画
  // };

  useEffect(() => {
    const canvas = canvasRef.current; // 获取 canvas 元素的引用
    if (!canvas) {
      console.error("Canvas element not found!");
      return;
    }

    const timer = setTimeout(() => {
      const createEngine = async () => {
        const webglEngine = new Engine(canvas, true, {
          antialias: true,
          alpha: true,
        }); // 使用 WebGL 引擎
        // console.log("WebGPU not supported. Falling back to WebGL.");
        return webglEngine;
        // }
      };

      createEngine().then((engine) => {
        const handleResize = () => engine.resize(); // 当窗口大小改变时，调整引擎的大小
        window.addEventListener("resize", handleResize); // 监听窗口大小变化事件

        engineRef.current = engine;

        const createScene = () => {
          const scene = new Scene(engine); // 创建一个新的 Babylon.js 场景

          if (!scene || !engine) {
            console.error("Scene or engine not initialized!");
            return;
          }

          const KNOWN_TOTAL = 127534804;

          // 加载模型
          ImportMeshAsync("./models/Pearlmont.glb", scene, {
            onProgress: (ev) => {
              // ev 的结构见 ISceneLoaderProgressEvent
              // { lengthComputable, loaded, total }
              if (ev.lengthComputable && ev.total > 0) {
                const percent = (ev.loaded / ev.total) * 100;
                onProgress(percent);
              } else {
                // gzip + 我们知道大小
                const percent = (ev.loaded / KNOWN_TOTAL) * 100;
                onProgress(percent);
              }
            },
          })
            .then((result: any) => {
              setModel(result); // 更新状态以存储加载的模型
              if (result.animationGroups) {
                result.animationGroups.forEach((animationGroup: any) =>
                  animationGroup.start(true)
                ); //
              }
            })
            .catch((error) => console.error("Failed to load model:", error)); // 捕获加载模型的错误

          // 添加太阳光
          const direction = new Vector3(1, -0.5, -1).normalize(); // 太阳光的方向
          const center = new Vector3(0, 0, 0);
          const sunlight = new DirectionalLight("sunlight", direction, scene);
          sunlight.position = center.add(direction.scale(-100));
          sunlight.intensity = 5.5; // 设置太阳光的强度
          sunlight.diffuse = new Color3(1, 1, 1); // 设置漫反射颜色
          sunlight.specular = new Color3(1, 1, 1); // 设置高光颜色
          sunlight.shadowEnabled = true; // 启用阴影
          sunlight.autoCalcShadowZBounds = true;
          sunRef.current = sunlight;

          // // 为太阳光添加阴影生成器
          const shadowGenerator = new ShadowGenerator(1024, sunlight);
          shadowGenerator.useBlurCloseExponentialShadowMap = true; // 启用柔和阴影
          shadowGenerator.setDarkness(0); // 设置阴影的暗度
          shadowGenerator.bias = 0.0008;
          shadowGenerator.filteringQuality = ShadowGenerator.QUALITY_MEDIUM; // 设置阴影过滤质量
          shadowGeneratorRef.current = shadowGenerator;

          // 创建相机
          const camera = new ArcRotateCamera(
            "my_camera", // 相机名称
            3.5, // 水平旋转角度
            1.37, // 垂直旋转角度
            960, // 相机半径
            new Vector3(180, 0, -75), // 相机目标位置
            scene // 所属场景
          );
          camera.attachControl(canvas, true); // 绑定相机到 canvas 上
          camera.lowerRadiusLimit = 10; // 最小半径限制 (Zoom)
          camera.upperRadiusLimit = 2000; // 最大半径限制 (Zoom)
          camera.wheelPrecision = 2; // 鼠标滚轮缩放灵敏度
          camera.lowerBetaLimit = 0.7; // 最低俯视角 (Rotate)
          camera.upperBetaLimit = 1.37; // 最高仰视角（最多水平）(Rotate)
          camera.panningSensibility = 70; // 平移灵敏度
          camera.panningInertia = 0.9; // 平移惯性
          camera.angularSensibilityY = 2500; // 垂直旋转灵敏度
          camera.angularSensibilityX = 2500; // 水平旋转灵敏度
          camera.minZ = 10; // 最小可视距离（靠得最近）
          camera.maxZ = 0; // 最大可视距离（最远能看到多远）
          camera.speed = 1; // 相机移动速度
          camera.fov = 1;

          setCurrentCamera(camera); // 更新状态以存储当前相机
          scene.activeCamera = camera; // 设置当前活动相机

          scene.clearColor = new Color4(0, 0, 0, 0);
          // engine.clear(scene.clearColor, true, true); // 清除蓝底

          // 调整 PBR 渲染参数
          scene.imageProcessingConfiguration.exposure = 1;
          scene.imageProcessingConfiguration.contrast = 1.3;
          scene.imageProcessingConfiguration.toneMappingEnabled = true;

          // 自定义环境纹理
          const skyTexture = new CubeTexture(
            "./textures/environment.env",
            scene
          );

          // skyTexture.rotationY = 4.76475

          const skybox = scene.createDefaultSkybox(
            skyTexture,
            true,
            100000,
            0.05
          ); // 创建天空盒
          skyTextureRef.current = skybox;

          // 设置环境纹理
          scene.environmentTexture = skyTexture;
          scene.environmentIntensity = 1.8; // 调整环境强度以增强日出效果

          return scene; // 返回创建的场景
        };

        const scene = createScene(); // 调用 createScene 函数创建场景
        if (!scene) {
          console.error("Failed to create scene!");
          return;
        }

        setCurrentScene(scene); // 更新状态以存储当前场景

        // Inspector 快捷键绑定
        scene.onKeyboardObservable.add(({ event, type }) => {
          if (
            type === KeyboardEventTypes.KEYDOWN &&
            event.ctrlKey &&
            event.key.toLowerCase() === "i"
          ) {
            scene.debugLayer.isVisible()
              ? Inspector.Hide()
              : Inspector.Show(scene, {});
          }
        });

        engine.runRenderLoop(() => scene.render()); // 在每一帧渲染场景

        return () => {
          window.removeEventListener("resize", handleResize); // 移除窗口大小变化事件监听器
          scene.dispose(); // 释放场景资源
          engine.dispose(); // 释放引擎资源
          engineRef.current = null;
        };
      });
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="scene">
      <canvas className="myCanvas" ref={canvasRef}></canvas>
    </div>
  );
};

export default MyScene; // 导出 Scene 组件
