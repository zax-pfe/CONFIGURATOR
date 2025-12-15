import Experience from "../Experience"

export default class Animate
{
    constructor()
    {
        this.experience = new Experience()
        this.time = this.experience.time

        this.objectsToAnimate = []
    }

    update()
    {
        for(const object of this.objectsToAnimate)
        {
            if (object.update) {
                object.update(this.time)
            }
            if (object.hover){
                object.hover(this.time)
            }
            if (object.followCam){
                object.followCam(this.time)
            }
        }
    }
}