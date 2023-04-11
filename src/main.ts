type fields = {
    intro: string
}
type articleFields = {
    sectiontitle: string,
    sectionbody: string
}
class SpaceArticleComponent extends HTMLElement {
    private sectiontitle: string = '';
    private sectionbody: string = '';
    constructor() {
        super();
        // this.name = '';//default value
    }
    static get observedAttributes() {
        return ['sectiontitle', 'sectionbody'];
    }
    attributeChangedCallback(property: string, oldValue: string, newValue: string) {
        if (oldValue === newValue) return;
        this[property as keyof articleFields] = newValue;
    }
    connectedCallback() {
        const
            shadow = this.attachShadow({ mode: 'closed' }),
            element = (document.getElementById('space-article') as HTMLTemplateElement)?.content.cloneNode(true);


        shadow.append(
            element
        );

        shadow.addEventListener('click', e => {
            const event = new CustomEvent('doSomething', {
                composed: true,
                bubbles: true,
                detail: {
                    sectiontitle: this.sectiontitle,
                    sectionbody: this.sectionbody
                }
            });
            shadow.dispatchEvent(event);
        });
        shadow.querySelector('slot[name=title]')!.textContent = this.sectiontitle;
        shadow.querySelector('slot[name=body]')!.textContent = this.sectionbody;

    }
}
class SpaceComponent extends HTMLElement {
    private intro: string = '';
    private sectiontitle: string = '';
    private sectionbody: string = '';
    constructor() {
        super();
        // this.name = '';//default value
    }
    static get observedAttributes() {
        return ['intro', 'sectiontitle', 'sectionbody'];
    }
    attributeChangedCallback(property: string, oldValue: string, newValue: string) {
        if (oldValue === newValue) return;
        this[property as keyof fields] = newValue;
    }
    connectedCallback() {
        const
            shadow = this.attachShadow({ mode: 'closed' }),
            element = (document.getElementById('star-wars-intro') as HTMLTemplateElement)?.content.cloneNode(true);

        const numStars = 100;

        shadow.append(
            element
        );

        shadow.addEventListener('click', e => {
            const event = new CustomEvent('doSomething', {
                composed: true,
                bubbles: true,
                detail: { intro: this.intro }
            });
            shadow.dispatchEvent(event);
        });
        shadow.querySelector('slot[name=intro]')!.textContent = this.intro;
        const mainDiv = shadow.querySelector(".star-wars-intro") as HTMLElement;
        // For every star we want to display
        for (let i = 0; i < numStars; i++) {
            let star = document.createElement("div");
            star.className = "star";
            var xy = this.getRandomPosition(mainDiv);
            star.style.top = xy[0] + 'px';
            star.style.left = xy[1] + 'px';
            mainDiv.append(star);
        }
        // shadow.querySelector('slot[name=title]')!.textContent = this.sectiontitle;
        // shadow.querySelector('slot[name=body]')!.textContent = this.sectionbody;

    }
    getRandomPosition(element: HTMLElement) {
        var y = element.offsetWidth;//innerWidth;
        var x = element.offsetHeight;//innerHeight;
        var randomX = Math.floor(Math.random() * x);
        var randomY = Math.floor(Math.random() * y);
        return [randomX, randomY];
    }
}
customElements.define('space-intro', SpaceComponent);
customElements.define('space-article', SpaceArticleComponent);