import {css, CSSResultGroup, html, LitElement, nothing, render} from "lit";
import {customElement, property, query} from "lit/decorators.js"


@customElement('services-details-table-row')
class ServiceDetailsTableRow extends LitElement {
    @property({type: Boolean, reflect: true})
    private selected: boolean = false;

    @query('slot[name="content"]')
    contentSlot!: HTMLSlotElement;

    static styles = css`
        :host {
            --border-width: var(--altshift-border-width);
            --border-color: var(--altshift-border-color);
            --text-color: var(--altshift-text-color);

            > .button-container{
                all: unset;
                display: flex;
                justify-content: space-between;
                cursor: pointer;
                user-select: none;
                padding: 2rem;
                width: 100%;
                box-sizing: border-box;
                border-right: var(--border-width) solid var(--border-color);

                @media screen and (max-width: 1280px) {
                    border-right: unset;
                }

                &:not(:last-of-type) {
                    border-bottom: var(--border-width) solid var(--border-color);
                }
                
                &:focus-visible > .title-container {
                    font-weight: 900;
                }

                > .title-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    font-size: 1.125rem;
                    font-weight: 700;
                    line-height: 1.4375rem;
                    letter-spacing: 0.1rem;
                    text-transform: uppercase;
                    user-select: none;
                }

                > .icon-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    > svg {
                        height: 2rem;

                        > path {
                            fill: var(--text-color);
                        }
                    }
                }
            }

            > .content-container {
                max-height: 15rem;
                display: none;
                overflow-y: auto;
            }
        }
        
        :host(:hover, :focus-visible) > .button-container > .title-container {
            font-weight: 900;
        }

        :host([selected]) > .button-container {
            background-color: var(--altshift-opposite-main-color);
            color: var(--altshift-opposite-text-color);
            
            > .icon-container > svg {
                @media screen and (max-width: 1280px) {
                    transform: rotate(90deg);
                }
                
                > path {
                    fill: var(--altshift-opposite-text-color);
                }
            }
            
            & + .content-container {
                @media screen and (max-width: 1280px) {
                    display: block;
                }
            }
        }
        
        :host(:not(:last-of-type)) {
            > :is(.button-container, .content-container) {
                border-bottom: var(--border-width) solid var(--border-color);
            }
        }

        *, *::before, *::after {
            box-sizing: border-box;
            scrollbar-color: var(--altshift-text-color) var(--altshift-main-color);
            scrollbar-width: thin;
        }
        
        
        ::slotted([slot="content"]) {
            margin: 2rem 0;
            padding: 0 2rem;
        }
    ` as CSSResultGroup;

    getSlottedContentElements() {
        return this.contentSlot?.assignedElements() ?? [];
    }

    render() {
        return html`
            <button class="button-container" part="button-container" @click=${() => this.selected = !this.selected}>
                <div class="title-container">
                    <slot name="title"></slot>
                </div>
                <div class="icon-container">
                    <svg viewBox="0 0 21 44">
                        <path part="icon-path" d="M2.80937 0.996124L0.449548 3.0077L16.4071 21.9573L16.4434 22.0005L16.4067 22.0432L0.114701 40.989L2.80638 42.9665L18.8091 23.8484L18.8092 23.8483L20.3688 21.9795L18.8092 20.1107L18.8091 20.1107L2.80937 0.996124Z"
                              fill="#F8F8F8" stroke="#F8F8F8" stroke-width="0.132513"/>
                    </svg>
                </div>
            </button>
            <div class="content-container">
                <slot name="content"></slot>
            </div>
        `;
    }
}

@customElement('services-details-table')
class ServicesDetailsTable extends LitElement {
    @query('slot')
    slotElement!: HTMLSlotElement;

    static styles = css`
        :host {
            --border-width: var(--altshift-border-width);
            --border-color: var(--altshift-border-color);
        }
        
         altshift-box {
             --offset-top: 1rem;
             --offset-left: 1rem;
             
             > .container {
                 display: grid;
                 grid-template-columns: 1fr 1fr;

                 @media screen and (max-width: 1280px) {
                     display: unset;
                 }
                 
                 > .content-container {
                     margin: 2rem 0;
                     padding: 0 2rem;

                     @media screen and (max-width: 1280px) {
                         display: none;
                     }
                 }
             }
         }

        @media screen and (max-width: 1280px) {
            display: unset;
        }
    ` as CSSResultGroup;

    constructor() {
        super();

        this.addEventListener("click", event => {
            const row = event.target;
            if (row === null)
                return;

            for (const slottedElement of this.slotElement.assignedElements())
                if (slottedElement !== row)
                    slottedElement.removeAttribute("selected");

            for (const child of this.children)
                if (child.getAttribute("slot") === "content")
                    child.remove();

            if (row instanceof ServiceDetailsTableRow) {
                if (row.hasAttribute("selected")) {
                    for (const element of row.getSlottedContentElements()) {
                        this.appendChild(element.cloneNode(true));
                    }
                }
            }
        });

        this.addEventListener("mouseover", event => {
            const target = event.target as HTMLElement;
            if (!(target instanceof ServiceDetailsTableRow))
                return

            if (this.slotElement.assignedElements().some(element=> element.hasAttribute("selected")))
                return;

            for (const child of this.children) {
                if (child.getAttribute("slot") === "content") {
                    child.remove();
                }
            }

            for (const element of target.getSlottedContentElements()) {
                this.appendChild(element.cloneNode(true));
            }
        });

        this.addEventListener("mouseout", event => {
            const target = event.target as HTMLElement;
            if (!(target instanceof ServiceDetailsTableRow))
                return

            if (this.slotElement.assignedElements().some(element=> element.hasAttribute("selected")))
                return;

            for (const child of this.children) {
                if (child.getAttribute("slot") === "content") {
                    child.remove();
                }
            }
        });
    }

    render() {
        return html`
            <altshift-box>
                <div class="container">
                    <div class="rows-container">
                        <slot name="row"></slot>
                    </div>
                    <div class="content-container">
                        <slot name="content"></slot>
                    </div>
                </div>
            </altshift-box>
        `;
    }
}
