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
    private shadow:ShadowRoot;
    constructor() {
        super();
        
        this.shadow = this.attachShadow({ mode: 'closed' });


        this.shadow.append(
            (document.getElementById('space-article') as HTMLTemplateElement)?.content.cloneNode(true)
        );

        this.shadow.addEventListener('click', e => {
            const event = new CustomEvent('doSomething', {
                composed: true,
                bubbles: true,
                detail: {
                    sectiontitle: this.sectiontitle,
                    sectionbody: this.sectionbody
                }
            });
            this.shadow.dispatchEvent(event);
        });
        this.shadow.querySelector('h2')!.textContent = this.sectiontitle;
        this.shadow.querySelector('p')!.textContent = this.sectionbody;
    }
    static get observedAttributes() {
        return ['sectiontitle', 'sectionbody'];
    }
    attributeChangedCallback(property: string, oldValue: string, newValue: string) {
        if (oldValue === newValue) return;
        this[property as keyof articleFields] = newValue;
        
        this.shadow.querySelector('h2')!.textContent = this.sectiontitle;
        this.shadow.querySelector('p')!.textContent = this.sectionbody;
    }
}
class SpaceComponent extends HTMLElement {
    private intro: string = '';
    private shadow:ShadowRoot;
    constructor() {
        super();
        
        this.shadow = this.attachShadow({ mode: 'closed' });

        const numStars = 100;

        this.shadow.append(
            (document.getElementById('star-wars-intro') as HTMLTemplateElement)?.content.cloneNode(true)
        );
        
        this.shadow.addEventListener('click', e => {
            const event = new CustomEvent('doSomething', {
                composed: true,
                bubbles: true,
                detail: { intro: this.intro }
            });
            this.shadow.dispatchEvent(event);
        });

        this.shadow.querySelector('.intro-text')!.textContent = this.intro;

        const mainDiv = this.shadow.querySelector(".star-wars-intro") as HTMLElement;    
		// For every star we want to display
		for (let i = 0; i < numStars; i++) {
			const { top, left } = this.getRandomPosition(mainDiv);
			mainDiv.append(this.getRandomStar(top, left));
		}
    }
    static get observedAttributes() {
        return ['intro'];
    }
    attributeChangedCallback(property: string, oldValue: string, newValue: string) {
        if (oldValue === newValue) return;
        this[property as keyof fields] = newValue;
        
        this.shadow.querySelector('.intro-text')!.textContent = this.intro;
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