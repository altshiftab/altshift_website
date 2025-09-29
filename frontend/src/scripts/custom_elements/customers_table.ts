import {css, CSSResultGroup, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js"

@customElement("customer-icon-container")
export class CustomerIconContainer extends LitElement {
    static styles = css`
        :host {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 2rem;
        }
        
        ::slotted(svg) {
            fill: var(--text-color);
            height: 4rem;

            @media screen and (max-width: 1280px) {
                height: 3rem;
            }
        }
    `;

    render() {
        return html`<slot></slot>`;
    }
}

@customElement("customers-table")
export class CustomersTable extends LitElement {
    static styles = css`
        @media screen and (max-width: 1280px) {
            ::slotted(*) {
                padding: 2rem;
                border-bottom: var(--border-width) solid var(--border-color);
            }
            ::slotted(*:last-of-type) {
                border-bottom: unset;
            }
        }

        @media not screen and (max-width: 1280px) {
            ::slotted(*) {
                border-bottom: var(--border-width) solid var(--border-color);
            }

            ::slotted(*:not(:nth-of-type(2n + 1))) {
                border-left: var(--border-width) solid var(--border-color);
            }

            ::slotted(*:nth-last-of-type(-n+2)) {
                border-bottom: unset;
            }
        }

        altshift-box {
            --offset-top: 1rem;
            --offset-left: 1.25rem;

            > .container {
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-auto-rows: 1fr;

                @media screen and (max-width: 1280px) {
                    grid-template-columns: 1fr;
                }
            }
        }
    ` as CSSResultGroup;

    render() {
        return html`
            <altshift-box>
                <div class="container">
                    <slot name="icon"></slot>
                </div>
            </altshift-box>
        `;
    }
}
