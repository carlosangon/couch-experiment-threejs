function script() {
			if (!Detector.webgl) Detector.addGetWebGLMessage();

				
			var camera, controls, scene, renderer;
			var pointLight, pointLight2;

			var stroheim  = "img/stroheim@2x.jpg";
			var clintz  = "img/royal@2x.jpg";
			var jacklyn = "img/jacklyn@2x.jpg";
			var dana    = "img/dana@2x.jpg";
			
			var texture_material = dana;

			var blonde  = "img/blonde@2x.jpg";
			var dark   = "img/dark@2x.jpg";
			var walnut = "img/walnut@2x.jpg";

			var wood_texture = blonde;

			document.getElementById( 'Clintz' ).addEventListener( 'click', function() {
			texture_material = clintz;
			couchLoader();
			}); 

			document.getElementById( 'Stroheim' ).addEventListener( 'click', function() {
			texture_material = stroheim;
			couchLoader();
			});

			document.getElementById( 'Jacklyn' ).addEventListener( 'click', function() {
			texture_material = jacklyn;
			couchLoader();
			});

			document.getElementById( 'Dana' ).addEventListener( 'click', function() {
			texture_material = dana;
			couchLoader();
			});  

			document.getElementById( 'Blonde' ).addEventListener( 'click', function(){
			wood_texture = blonde;
			couchBaseLoader();
			});

			document.getElementById( 'Dark' ).addEventListener( 'click', function(){
			wood_texture = dark;
			couchBaseLoader();
			});

			document.getElementById( 'Walnut' ).addEventListener( 'click', function(){
			wood_texture = walnut;
			couchBaseLoader();
			});

	    CANVAS_WIDTH = 800,
    	CANVAS_HEIGHT = 800;

			function init() {

				

				scene = new THREE.Scene();
				scene.fog = new THREE.FogExp2(0xFFFFFF, 0);

				renderer = new THREE.WebGLRenderer({ antialias: true });
				renderer.setClearColor(scene.fog.color);
				renderer.setPixelRatio(window.devicePixelRatio);
				renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
				// renderer.gammaOutput = true;


				renderer.shadowMap.enabled = true;
				renderer.shadowMap.type = THREE.BasicShadowMap;


				var container = document.getElementById('model__container');
				container.appendChild(renderer.domElement);



				camera = new THREE.PerspectiveCamera(50, CANVAS_WIDTH/ CANVAS_HEIGHT , 1, 1000);
				camera.position.z = 50;
				camera.position.y = 20;
				camera.position.x = -20;

				controls = new THREE.OrbitControls(camera, renderer.domElement);
				// controls.addEventListener( 'change', render ); // remove when using animation loop
				// enable animation loop when using damping or autorotation
				controls.enableDamping = true;
				controls.dampingFactor = 0.25;
				controls.autoRotate = true;
				controls.enableZoom = true;
				controls.minDistance = 90;
				controls.maxDistance = 90;
				controls.minPolarAngle = 0; // radians
				controls.maxPolarAngle = Math.PI; // radians

				controls.maxPolarAngle = Math.PI/2;

				var light;
				scene.add( new THREE.AmbientLight( 0xffffff, .7 ) );

				light = new THREE.DirectionalLight( 0xffffff, .7 );
				light.position.set( 50, 50, 0 );
				light.position.multiplyScalar( 1 );
				light.castShadow = true;
				light.shadow.mapSize.width = 2000;
				light.shadow.mapSize.height = 2000;
				scene.add( light );




				// Floor object

				var geometryPlane = new THREE.PlaneBufferGeometry( 100, 100, 10, 10 );

				var geo = new THREE.EdgesGeometry(geometryPlane);

				var planeMaterial = new THREE.MeshPhongMaterial( {
					color: 0xa0adaf,
					shininess: 1,
					specular: 0x111111,
					side: THREE.BackSide
				} );

				var planeMesh = new THREE.Mesh( geometryPlane, planeMaterial );
				planeMesh.rotation.x = -90 * Math.PI / 180;
				planeMesh.position.y = 0;
				planeMesh.receiveShadow = true;
  			scene.add( planeMesh );

				window.addEventListener('resize', onWindowResize, false);


			}

			// Couch bottom 

			var couch_bottomOBJ = 'model/couch-bottom.obj'
			var couch_bottomMTL = 'model/couch-bottom.mtl'

			// Couch side left

			var couch_side_leftOBJ = 'model/couch-side-left.obj'
			var couch_side_leftMTL = 'model/couch-side-left.mtl'

			// Couch side right 

			var couch_side_rightOBJ = 'model/couch-side-right.obj'
			var couch_side_rightMTL = 'model/couch-side-right.mtl'

			// Couch back

			var couch_backOBJ = 'model/couch-back.obj'
			var couch_backMTL = 'model/couch-back.mtl'

			// Couch seat left

			var couch_seat_leftOBJ = 'model/couch-seat-left.obj'
			var couch_seat_leftMTL = 'model/couch-seat-left.mtl'

			// Couch seat right

			var couch_seat_rightOBJ = 'model/couch-seat-right.obj'
			var couch_seat_rightMTL = 'model/couch-seat-right.mtl'

			// Couch pillow right

			var couch_pillow_rightOBJ = 'model/couch-pillow-right.obj'
			var couch_pillow_rightMTL = 'model/couch-pillow-right.mtl'

			// Couch pillow left

			var couch_pillow_leftOBJ = 'model/couch-pillow-left.obj'
			var couch_pillow_leftMTL = 'model/couch-pillow-left.mtl'

			// Couch base

			var baseOBJ = 'model/base.obj'
			var baseMTL = 'model/base.mtl'


			function couchLoader(){

				// model bottom

				var bottom__loader = new THREE.OBJLoader();

				bottom__loader.load(couch_bottomOBJ, function(bottom__object) {
					bottom__object.traverse(function(child) {
						if (child instanceof THREE.Mesh) {
							child.material.map = bottom__texture;
						}
					});
					bottom__object.position.set(0, 0, 0);
					bottom__object.scale.set(10, 10, 10);
					bottom__object.receiveShadow = true;
					bottom__object.castShadow = true;				
					scene.add(bottom__object);
				});

				var bottom__loader = new THREE.ImageLoader();
				var bottom__texture = new THREE.Texture();

				bottom__loader.load(texture_material, function(bottom__image) {
							bottom__texture.image = bottom__image;
							bottom__texture.needsUpdate = true;
							bottom__texture.repeat.set(1, 1);
							bottom__texture.wrapS = THREE.RepeatWrapping;
							bottom__texture.wrapT = THREE.RepeatWrapping;
							bottom__texture.offset.x = 0.7;
				});

				// mtl bottom

				var bottom__mtlLoader = new THREE.MTLLoader();
				bottom__mtlLoader.setPath('/');
				bottom__mtlLoader.load(couch_bottomMTL);

				// model side left

				var side_left__loader = new THREE.OBJLoader();

				side_left__loader.load(couch_side_leftOBJ, function(side_left__object) {
					side_left__object.traverse(function(child) {
						if (child instanceof THREE.Mesh) {
							child.material.map = side_left__texture;
						}
					});
					side_left__object.position.set(0, 0, 0);
					side_left__object.scale.set(10, 10, 10);	
					side_left__object.castShadow = true;
					side_left__object.receiveShadow = true;			
					scene.add(side_left__object);
				});

				var side_left__loader = new THREE.ImageLoader();
				var side_left__texture = new THREE.Texture();

				side_left__loader.load(texture_material, function(side_left__image) {
							side_left__texture.image = side_left__image;
							side_left__texture.needsUpdate = true;
							side_left__texture.repeat.set(1, 1);
							side_left__texture.wrapS = THREE.RepeatWrapping;
							side_left__texture.wrapT = THREE.RepeatWrapping;
							side_left__texture.offset.x = 0.7;
				});

				// mtl left
				var side_left__mtlLoader = new THREE.MTLLoader();
				side_left__mtlLoader.setPath('/');
				side_left__mtlLoader.load(couch_side_leftMTL);

				// model side right

				var side_right__loader = new THREE.OBJLoader();

				side_right__loader.load(couch_side_rightOBJ, function(side_right__object) {
					side_right__object.traverse(function(child) {
						if (child instanceof THREE.Mesh) {
							child.material.map = side_right__texture;
						}
					});
					side_right__object.position.set(0, 0, 0);
					side_right__object.scale.set(10, 10, 10);
					side_right__object.castShadow = true;
					side_right__object.receiveShadow = true;				
					scene.add(side_right__object);
				});

				var side_right__loader = new THREE.ImageLoader();
				var side_right__texture = new THREE.Texture();

				side_right__loader.load(texture_material, function(side_right__image) {
							side_right__texture.image = side_right__image;
							side_right__texture.needsUpdate = true;
							side_right__texture.repeat.set(1, 1);
							side_right__texture.wrapS = THREE.RepeatWrapping;
							side_right__texture.wrapT = THREE.RepeatWrapping;
				});

				// mtl side right
				var side_right__mtlLoader = new THREE.MTLLoader();
				side_right__mtlLoader.setPath('/');
				side_right__mtlLoader.load(couch_side_rightMTL);


				// model back

				var back__loader = new THREE.OBJLoader();

				back__loader.load(couch_backOBJ, function(back__object) {
					back__object.traverse(function(child) {
						if (child instanceof THREE.Mesh) {
							child.material.map = back__texture;
						}
					});
					back__object.position.set(0, 0, 0);
					back__object.scale.set(10, 10, 10);
					back__object.castShadow = true;					
					back__object.receiveShadow = true;				
					scene.add(back__object);
				});

				var back__loader = new THREE.ImageLoader();
				var back__texture = new THREE.Texture();

				back__loader.load(texture_material, function(back__image) {
							back__texture.image = back__image;
							back__texture.needsUpdate = true;
							back__texture.repeat.set(1, 1);
							back__texture.wrapS = THREE.RepeatWrapping;
							back__texture.wrapT = THREE.RepeatWrapping;
				});

				// mtl back
				var back__mtlLoader = new THREE.MTLLoader();
				back__mtlLoader.setPath('/');
				back__mtlLoader.load(couch_backMTL);


				// model seat left

				var seat_left__loader = new THREE.OBJLoader();

				seat_left__loader.load(couch_seat_leftOBJ, function(seat_left__object) {
					seat_left__object.traverse(function(child) {
						if (child instanceof THREE.Mesh) {
							child.material.map = seat_left__texture;
						}
					});
					seat_left__object.position.set(0, 0, 0);
					seat_left__object.scale.set(10, 10, 10);
					seat_left__object.castShadow = true;
					seat_left__object.receiveShadow = true;				
					scene.add(seat_left__object);
				});

				var seat_left__loader = new THREE.ImageLoader();
				var seat_left__texture = new THREE.Texture();

				seat_left__loader.load(texture_material, function(seat_left__image) {
							seat_left__texture.image = seat_left__image;
							seat_left__texture.needsUpdate = true;
							seat_left__texture.repeat.set(1, 1);
							seat_left__texture.wrapS = THREE.RepeatWrapping;
							seat_left__texture.wrapT = THREE.RepeatWrapping;
				});

				// mtl seat left
				var seat_left__mtlLoader = new THREE.MTLLoader();
				seat_left__mtlLoader.setPath('/');
				seat_left__mtlLoader.load(couch_seat_leftMTL);

				
				// model seat right

				var seat_right__loader = new THREE.OBJLoader();

				seat_right__loader.load(couch_seat_rightOBJ, function(seat_right__object) {
					seat_right__object.traverse(function(child) {
						if (child instanceof THREE.Mesh) {
							child.material.map = seat_right__texture;
						}
					});
					seat_right__object.position.set(0, 0, 0);
					seat_right__object.scale.set(10, 10, 10);
					seat_right__object.castShadow = true;
					seat_right__object.receiveShadow = true;					
					scene.add(seat_right__object);
				});

				var seat_right__loader = new THREE.ImageLoader();
				var seat_right__texture = new THREE.Texture();

				seat_right__loader.load(texture_material, function(seat_right__image) {
							seat_right__texture.image = seat_right__image;
							seat_right__texture.needsUpdate = true;
							seat_right__texture.repeat.set(1, 1);
							seat_right__texture.wrapS = THREE.RepeatWrapping;
							seat_right__texture.wrapT = THREE.RepeatWrapping;
							seat_right__texture.offset.y = 0.7;
				});

				// mtl seat right
				var seat_right__mtlLoader = new THREE.MTLLoader();
				seat_right__mtlLoader.setPath('/');
				seat_right__mtlLoader.load(couch_seat_leftMTL);


				// model pillow right

				var pillow_right__loader = new THREE.OBJLoader();

				pillow_right__loader.load(couch_pillow_rightOBJ , function(pillow_right__object) {
					pillow_right__object.traverse(function(child) {
						if (child instanceof THREE.Mesh) {
							child.material.map = pillow_right__texture;
						}
					});
					pillow_right__object.position.set(0, 0, 0);
					pillow_right__object.scale.set(10, 10, 10);		
					pillow_right__object.castShadow = true;
					pillow_right__object.receiveShadow = true;		
					scene.add(pillow_right__object);
				});

				var pillow_right__loader = new THREE.ImageLoader();
				var pillow_right__texture = new THREE.Texture();

				pillow_right__loader.load(texture_material, function(pillow_right__image) {
							pillow_right__texture.image = pillow_right__image;
							pillow_right__texture.needsUpdate = true;
							pillow_right__texture.repeat.set(1, 1);
							pillow_right__texture.wrapS = THREE.RepeatWrapping;
							pillow_right__texture.wrapT = THREE.RepeatWrapping;
							pillow_right__texture.offset.y = 0.7;
				});

				// mtl pillow right
				var pillow_right__mtlLoader = new THREE.MTLLoader();
				pillow_right__mtlLoader.setPath('/');
				pillow_right__mtlLoader.load(couch_pillow_rightMTL);

				// model pillow left

				var pillow_left__loader = new THREE.OBJLoader();

				pillow_left__loader.load(couch_pillow_leftOBJ, function(pillow_left__object) {
					pillow_left__object.traverse(function(child) {
						if (child instanceof THREE.Mesh) {
							child.material.map = pillow_left__texture;
						}
					});
					pillow_left__object.position.set(0, 0, 0);
					pillow_left__object.scale.set(10, 10, 10);
					pillow_left__object.castShadow = true;
					pillow_left__object.receiveShadow = true;			
					scene.add(pillow_left__object);
				});

				var pillow_left__loader = new THREE.ImageLoader();
				var pillow_left__texture = new THREE.Texture();

				pillow_left__loader.load(texture_material, function(pillow_left__image) {
							pillow_left__texture.image = pillow_left__image;
							pillow_left__texture.needsUpdate = true;
							pillow_left__texture.repeat.set(1, 1);
							pillow_left__texture.wrapS = THREE.RepeatWrapping;
							pillow_left__texture.wrapT = THREE.RepeatWrapping;
				});

				// mtl pillow left
				var pillow_left__mtlLoader = new THREE.MTLLoader();
				pillow_left__mtlLoader.setPath('/');
				pillow_left__mtlLoader.load(couch_pillow_leftMTL);


				}

				// This function loads the couch's base independently
				function couchBaseLoader(){

				// model base
				var base__loader = new THREE.OBJLoader();

				base__loader.load(baseOBJ, function(base__object) {
				base__object.traverse(function(child) {
						if (child instanceof THREE.Mesh) {
							child.material.map = base__texture;
						}
					});
					base__object.position.set(0, 0, -1);
					base__object.scale.set(10, 10, 10);				
					scene.add(base__object);
				});

				var base__loader = new THREE.ImageLoader();
				var base__texture = new THREE.Texture();

				base__loader.load(wood_texture, function(base__image) {
							base__texture.image = base__image;
							base__texture.needsUpdate = true;
							base__texture.repeat.set(.02, .08);
							// base__texture.scale.set(.05, .05);
							base__texture.wrapS = THREE.RepeatWrapping;
							base__texture.wrapT = THREE.RepeatWrapping;
				});

				// mtl base
				var base__mtlLoader = new THREE.MTLLoader();
				base__mtlLoader.setPath('/');
				base__mtlLoader.load(baseMTL);
				}


				function onWindowResize() {
					camera.aspect = window.innerWidth / window.innerHeight;
					camera.updateProjectionMatrix();
					renderer.setSize(window.innerWidth, window.innerHeight);
				}

				function animate() {

					requestAnimationFrame(animate);
					if (controls.AutoRotate) {
					controls.autoRotate = true;
				}
					controls.update();
					render();
				}

				function render() {
					renderer.render(scene, camera);



				}

				init();
				animate();
				couchLoader();
				couchBaseLoader()
}