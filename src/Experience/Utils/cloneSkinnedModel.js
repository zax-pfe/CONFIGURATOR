import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";

export function cloneSkinnedModel(source) {
    // SkeletonUtils.clone effectue un clonage profond et gère 
    // automatiquement le re-binding des SkinnedMeshes avec leurs nouveaux Bones.
    const clone = SkeletonUtils.clone(source);

    // On s'assure que les animations fonctionneront indépendamment
    // en clonant les objets, mais SkeletonUtils le fait généralement bien.
    
    // Petite sécurité : parfois les matrices ne sont pas à jour après un clone
    clone.traverse((node) => {
        if (node.isSkinnedMesh) {
            node.frustumCulled = false; // Optionnel : évite que le modèle disparaisse s'il sort du champ caméra à cause de l'animation
        }
    });

    return clone;
}