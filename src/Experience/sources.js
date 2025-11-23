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
    name: "discoBall",
    type: "gltfModel",
    path: "models/DiscoBall/discoBall.gltf",
  },

  {
    name: "discoBallColorTexture",
    type: "texture",
    path: "models/DiscoBall/textures/material_0_baseColor.jpeg",
  },

  {
    name: "discoBallMetalnessTexture",
    type: "texture",
    path: "models/DiscoBall/textures/material_0_metallicRoughness.png",
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
];
