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
            object.update(this.time)
        }
    }
}