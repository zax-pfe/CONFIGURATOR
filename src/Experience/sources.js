// Tableau contenant les sources des ressources 3D à charger

export default [
  {
    name: "environmentMapTexture",
    type: "cubeTexture",
    path: [
      "textures/environmentMap/px.jpg",
      "textures/environmentMap/nx.jpg",
      "textures/environmentMap/py.jpg",
      "textures/environmentMap/ny.jpg",
      "textures/environmentMap/pz.jpg",
      "textures/environmentMap/nz.jpg",
    ],
  },

  {
    name: "grassColorTexture",
    type: "texture",
    path: "textures/dirt/color.jpg",
  },
  {
    name: "grassNormalTexture",
    type: "texture",
    path: "textures/dirt/normal.jpg",
  },

  {
    name: "foxModel",
    type: "gltfModel",
    path: "models/Fox/glTF/Fox.gltf",
  },

  {
    name: "speakerModel",
    type: "gltfModel",
    path: "models/Speaker/scene.gltf",
  },

  {
    name: "speakerColorTexture",
    type: "texture",
    path: "models/Speaker/textures/small_speaker_1_1001_baseColor.jpeg",
  },
  {
    name: "speakerMetalnessTexture",
    type: "texture",
    path: "models/Speaker/textures/small_speaker_1_1001_metallicRoughness.jpeg",
  },
  {
    name: "speakerNormalTexture",
    type: "texture",
    path: "models/Speaker/textures/small_speaker_1_1001_normal.png",
  },

  {
    name: "Speaker2CenteredModel",
    type: "gltfModel",
    path: "models/Speaker/Speaker2/speaker2Centered.glb",
  },
  {
    name: "Speaker1CenteredModel",
    type: "gltfModel",
    path: "models/Speaker/Speaker1/speakerCentered.glb",
  },
  {
    name: "Speaker3CenteredModel",
    type: "gltfModel",
    path: "models/Speaker/Speaker3/speaker3Centered.glb",
  },
  {
    name: "Speaker4CenteredModel",
    type: "gltfModel",
    path: "models/Speaker/Speaker4/speaker4Centered.glb",
  },
];
