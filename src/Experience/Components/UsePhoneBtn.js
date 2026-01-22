import gsap from "gsap";

export default class UsePhoneBtn {
  constructor(text, parent) {
    this.text = text;
    this.parent = parent;

    const svgIcon1 = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_1244_3613" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9"/></mask><g mask="url(#mask0_1244_3613)"><path d="M16.175 13H4V11H16.175L10.575 5.4L12 4L20 12L12 20L10.575 18.6L16.175 13Z" fill="#071031"/></g></svg>`;
    const svgIcon2 = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_1244_3607" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9"/></mask><g mask="url(#mask0_1244_3607)"><path d="M15.925 23C15.4917 23 15.0833 22.9125 14.7 22.7375C14.3167 22.5625 13.9833 22.3167 13.7 22L8.65 15.95L9.775 14.8C10.075 14.5 10.4417 14.3125 10.875 14.2375C11.3083 14.1625 11.7167 14.225 12.1 14.425L15 15.875V7H17C18.1 7 19.0417 7.39167 19.825 8.175C20.6083 8.95833 21 9.9 21 11V19C21 20.1 20.6083 21.0417 19.825 21.825C19.0417 22.6083 18.1 23 17 23H15.925ZM6 22C5.45 22 4.97917 21.8042 4.5875 21.4125C4.19583 21.0208 4 20.55 4 20V4C4 3.45 4.19583 2.97917 4.5875 2.5875C4.97917 2.19583 5.45 2 6 2H15C15.55 2 16.0208 2.19583 16.4125 2.5875C16.8042 2.97917 17 3.45 17 4V7H15V4H6V20H12.025L13.7 22H6ZM10.5 7C10.7833 7 11.0208 6.90417 11.2125 6.7125C11.4042 6.52083 11.5 6.28333 11.5 6C11.5 5.71667 11.4042 5.47917 11.2125 5.2875C11.0208 5.09583 10.7833 5 10.5 5C10.2167 5 9.97917 5.09583 9.7875 5.2875C9.59583 5.47917 9.5 5.71667 9.5 6C9.5 6.28333 9.59583 6.52083 9.7875 6.7125C9.97917 6.90417 10.2167 7 10.5 7ZM15.925 21H17C17.55 21 18.0208 20.8083 18.4125 20.425C18.8042 20.0417 19 19.5667 19 19V11C19 10.45 18.8042 9.97917 18.4125 9.5875C18.0208 9.19583 17.55 9 17 9V19.125L11.7 16.45L15.15 20.65C15.25 20.7667 15.3667 20.8542 15.5 20.9125C15.6333 20.9708 15.775 21 15.925 21Z" fill="#071031"/></g></svg>`

    this.element = document.createElement("button");
    this.element.className = "use-phone-btn";

    if (this.text) {
      this.element.innerHTML = `
        <span>${this.text}</span>
        <span class="btn-icons">
            ${svgIcon1}
            ${svgIcon2}
        </span>
      `;
    } else {
      this.element.innerHTML = `
        <span class="btn-icons">
            ${svgIcon2}
        </span>
      `;
    }
    
    this.parent.appendChild(this.element);

    this.animate();
  }

  animate() {
    gsap.set(this.element, { autoAlpha: 0 });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

    tl
      .to(this.element, {
        duration: 0.6,
        autoAlpha: 1,
        ease: "power2.inOut"
      })
      .to(this.element, {
        duration: 0.6,
        autoAlpha: 0,
        ease: "power2.inOut"
      }, "+=2");
 }
}