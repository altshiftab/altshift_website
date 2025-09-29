import {css, CSSResultGroup, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js"

@customElement('services-table')
export default class ServicesTable extends LitElement {
    static styles = css`
        :host {
            --new-offset-top: 1rem;

            --title-container-padding: 2rem;
            --title-container-font-size: 1.875rem;
            --title-container-line-height: 1.3;
            --new-filler-top-height: calc(50% - 0.5 * var(--new-offset-top));
        }

        altshift-box {
            --offset-top: var(--new-offset-top);
            --offset-left: 1.25rem;
            --inner-border: unset;
            --filler-top-height: var(--new-filler-top-height);

            @media screen and (max-width: 1280px) {
                --filler-top-height: 100%;
            }

            &::part(box-container) {
                border-left: unset;
                border-right: unset;
                border-bottom: unset;
            }

            > .container {
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-auto-rows: 1fr;
                width: 100%;

                @media screen and (max-width: 1280px) {
                    //--new-filler-top-height: calc(100% - var(--new-offset-top));
                    grid-template-columns: 1fr;
                }

                > .title-container {
                    grid-row: 1 / 3;
                    grid-column: 1;
                    padding: var(--title-container-padding);

                    border-left: var(--border-width) solid var(--border-color);
                    border-bottom: var(--border-width) solid var(--border-color);

                    font-weight: 900;
                    font-size: var(--title-container-font-size);
                    line-height: var(--title-container-line-height);

                    @media screen and (max-width: 1280px) {
                        & {
                            border-right: var(--border-width) solid var(--border-color);
                        }
                    }
                }

                > .texts-container {
                    display: contents;
                }
            }
        }

        ::slotted([slot="text"]) {
            display: flex;
            align-items: center;
            height: 100%;
            padding: 0 2rem;
            box-sizing: border-box;
            border-bottom: var(--border-width) solid var(--border-color);
            border-left: var(--border-width) solid var(--border-color);
            border-right: var(--border-width) solid var(--border-color);

            grid-column: 2;

            font-weight: 700;
            font-size: 1.125rem;
            line-height: 1.4375rem;
            text-transform: uppercase;

            @media not screen and (max-width: 1280px) {
                &:first-of-type {
                    border-top: var(--border-width) solid var(--border-color);
                }
            }

            @media screen and (max-width: 1280px) {
                grid-column: 1;
            }
        }
    ` as CSSResultGroup;

    render() {
        return html`
            <altshift-box>
                <div class="container">
                    <div class="title-container"><slot name="title"></slot></div>
                    <div class="texts-container"><slot name="text"></slot></div>
                </div>
            </altshift-box>
        `;
    }
}
