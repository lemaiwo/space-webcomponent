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
    constructor() {
        super();
    }
    static get observedAttributes() {
        return ['intro'];
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
			const { top, left } = this.getRandomPosition(mainDiv);
			mainDiv.append(this.getRandomStar(top, left));
		}
    }
	getRandomStar(top: string, left: string) {
		const star = document.createElement("div");
		star.className = "star";
		star.style.top = top;
		star.style.left = left;
		return star;
	}
	getRandomPosition(element: HTMLElement) {
		return {
			top: `${this.getRandomNumber(element.offsetHeight)}px`,
			left: `${this.getRandomNumber(element.offsetWidth)}px`,
		};
	}
	getRandomNumber(value: number) {
		return Math.floor(Math.random() * value);
	}
}
customElements.define('space-intro', SpaceComponent);
customElements.define('space-article', SpaceArticleComponent);