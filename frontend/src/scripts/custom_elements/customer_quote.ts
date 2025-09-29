import {css, CSSResultGroup, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js"

@customElement("customer-quote")
export default class CustomerQuote extends LitElement {
    static styles = css`
        :host {
            --offset-top: 1rem;
            --offset-left: 1.25rem;
            --icon-container-height: 5rem;
        }

        altshift-box {
            --offset-top: 1rem;
            --offset-left: 1.25rem;
            --inner-border: unset;
            --filler-top-height: var(--icon-container-height);
            --filler-bottom-height: calc(var(--offset-top) + var(--border-width));

            &::part(box-container) {
                border-left: unset;
                border-bottom: unset;
            }

            > .container {
                display: grid;
                grid-template-rows: 1fr 1fr;
                width: 100%;

                > .icon-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: var(--icon-container-height);
                    aspect-ratio: 1 / 1;
                    grid-column: 1;

                    border-left: var(--border-width) solid var(--border-color);
                    border-bottom: var(--border-width) solid var(--border-color);

                    > .icon {
                        width: 50%;
                        path {
                            fill: var(--altshift-orange);
                        }
                    }
                }

                > .text-container {
                    grid-column: 2;
                    grid-row: 1 / 4;
                    padding: 2rem;

                    border-left: var(--border-width) solid var(--border-color);
                    border-bottom: var(--border-width) solid var(--border-color);
                }
            }
        }

        .quote-scroll-hider {
            width: 100%;

            @media screen and (max-width: 1280px) {
                & {
                    max-height: 24rem;
                    overflow-y: auto;
                }
            }
        }
    ` as CSSResultGroup;

    render() {
        return html`
            <altshift-box>
                <div class="container">
                    <div class="icon-container">
                        <div class="icon">
                            <svg viewBox="0 0 45 36">
                                <path d="M44.5376 0.123969V11.9546C44.5376 16.3132 43.7419 20.2914 42.1507 23.889C40.5594 27.4866 37.8612 31.2226 34.056 35.097L26.9992 29.5968C29.6974 26.8985 31.6346 24.3733 32.8107 22.021C33.9869 19.7379 34.5749 17.2127 34.5749 14.4453L38.6223 19.0115H25.3387V0.123969H44.5376ZM19.9423 0.123969V11.9546C19.9423 16.3132 19.1467 20.2914 17.5554 23.889C15.9642 27.4866 13.266 31.2226 9.4608 35.097L2.40393 29.5968C5.10215 26.8985 7.03932 24.3733 8.21547 22.021C9.39161 19.7379 9.97969 17.2127 9.97969 14.4453L14.027 19.0115H0.743493V0.123969H19.9423Z"/>
                            </svg>
                        </div>
                    </div>
                    <div class="text-container">
                        <slot></slot>
                    </div>
                </div>
            </altshift-box>
        `;
    }
}
