import {css, CSSResultGroup, html, LitElement} from "lit";
import {customElement, property, query, state} from "lit/decorators.js"

export const rowSelectedEventType = "row-selected";

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

            > .button-container {
                all: unset;
                display: flex;
                justify-content: space-between;
                cursor: pointer;
                user-select: none;
                padding: 2rem;
                width: 100%;
                box-sizing: border-box;
                border-right: var(--border-width) solid var(--border-color);
                gap: 1rem;

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

        :host(:hover) > .button-container > .title-container {
            font-weight: 900;
        }

        :host([selected]) > .button-container {
            background-color: var(--altshift-opposite-main-color);
            color: var(--altshift-opposite-text-color);

            @media screen and (max-width: 1280px) {
                border-bottom: var(--border-width) solid var(--border-color);
            }

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

        :host(:not(:last-of-type)) > :is(.button-container, .content-container) {
            border-bottom: var(--border-width) solid var(--border-color);
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

    private _handleClick = () => {
        this.selected = !this.selected;
        this.dispatchEvent(
            new CustomEvent(rowSelectedEventType, {detail: {selected: this.selected}, bubbles: true, composed: true})
        );
    }

    render() {
        return html`
            <button class="button-container" part="button-container" @click=${this._handleClick}>
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
    @query("slot")
    slotElement!: HTMLSlotElement;

    @state()
    private displayedContent: Element[] = [];

    private _currentSelected: ServiceDetailsTableRow | null = null;

    static styles = css`
        :host {
            --border-width: var(--altshift-border-width);
            --border-color: var(--altshift-border-color);

            > altshift-box {
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

                        p {
                            font-size: 1.125rem;
                            font-weight: 400;
                            line-height: 2.125rem;
                            height: 100%;
                        }
                    }
                }
            }
        }

        @media screen and (max-width: 1280px) {
            display: unset;
        }
    ` as CSSResultGroup;

    private _handleRowSelected = (event: CustomEvent) => {
        const {selected} = event.detail;

        if (selected) {
            const row = event.target as ServiceDetailsTableRow;

            if (row !== this._currentSelected && this._currentSelected !== null)
                this._currentSelected?.removeAttribute("selected");

            this._currentSelected = row;
            this.displayedContent = row.getSlottedContentElements();

        } else {
            this._currentSelected = null;
            this.displayedContent = [];
        }
    }

    private _handleRowHover = (event: Event) => {
        const row = event.currentTarget as ServiceDetailsTableRow;
        if (row === null)
            return;

        if (this._currentSelected !== null)
            return;

        this.displayedContent = row.getSlottedContentElements();
    }

    private _handleRowUnhover = (event: Event) => {
        const row = event.currentTarget as ServiceDetailsTableRow;
        if (row === null)
            return;

        if (this._currentSelected !== null)
            return;

       this.displayedContent = [];
    }

    private _handleSlotChange= (event: Event) => {
        const slot = event.target as HTMLSlotElement | null;
        if (slot === null)
            return;

        const elements = slot.assignedElements();

        elements.forEach(element => {
            if (element instanceof ServiceDetailsTableRow) {
                element.addEventListener(rowSelectedEventType, this._handleRowSelected);
                element.addEventListener("mouseover", this._handleRowHover);
                element.addEventListener("mouseout", this._handleRowUnhover);
            }
        });
    }

    render() {
        return html`
            <altshift-box>
                <div class="container">
                    <div class="rows-container">
                        <slot name="row" @slotchange=${this._handleSlotChange}></slot>
                    </div>
                    <div class="content-container">
                        ${this.displayedContent.map(element => html`${element.cloneNode(true)}`)}
                    </div>
                </div>
            </altshift-box>
        `;
    }
}

declare global {
    interface HTMLElementEventMap {
        [rowSelectedEventType]: CustomEvent;
    }
}
