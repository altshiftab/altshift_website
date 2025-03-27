import {css, html, LitElement} from "lit";

import "@altshiftab/web_components/header";
import "@altshiftab/web_components/box";

export default class AltShiftHeaderWww extends LitElement {
    static styles = css`
        altshift-box {
            border-left: var(--altshift-border-width) solid var(--altshift-border-color);
            
            > * {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                padding: 0 2rem;
            }
        }

        altshift-header[compact] {
            > altshift-box {
                background-color: var(--altshift-main-color);

                border-top: var(--altshift-border-width) solid var(--altshift-border-color);
                border-left: var(--altshift-border-width) solid var(--altshift-border-color);
                border-right: var(--altshift-border-width) solid var(--altshift-border-color);

                &:last-of-type {
                    border-bottom: var(--altshift-border-width) solid var(--altshift-border-color);
                }

                > * {
                    padding: 2rem;
                    height: auto;
                    background-color: var(--altshift-main-color);
                    justify-content: unset;
                }
            }
        }
    `;

    render() {
        return html`
            <altshift-header>
                <altshift-box unbordered contracted textBox selectable><a href="/services">Services</a></altshift-box>
                <altshift-box unbordered contracted textBox selectable><a href="/about">About</a></altshift-box>
                <altshift-box unbordered contracted textBox selectable><a href="/contact">Contact</a></altshift-box>
            </altshift-header>
        `;
    }
}

customElements.define('altshift-header-www', AltShiftHeaderWww);
