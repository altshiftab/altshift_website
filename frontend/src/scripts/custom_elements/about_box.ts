import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js"

@customElement('about-box')
export default class AboutBox extends LitElement {
    static styles = css`
        altshift-box {
            --offset-top: 1rem;
            --offset-left: 1.25rem;

            > .container {
                width: 100%;
                aspect-ratio: 2;
                display: flex;

                @media screen and (max-width: 1280px) {
                    display: block;
                }

                > .image-container {
                    display: flex;
                    flex-direction: column;
                    box-sizing: border-box;

                    background-image: var(--image);
                    background-size: contain;
                    background-repeat: round;

                    border-right: var(--border-width) solid var(--border-color);
                    aspect-ratio: 1 / 1;

                    @media screen and (max-width: 1280px) {
                        box-sizing: content-box;
                        border-bottom: var(--border-width) solid var(--border-color);
                        width: 100%;
                    }

                    > .buttons-container {
                        display: flex;
                        margin-top: auto;
                    }
                }

                > .text-container {
                    box-sizing: border-box;
                    aspect-ratio: 1 / 1;
                    padding: 4rem;
                    overflow-y: auto;

                    @media screen and (max-width: 1280px) {
                        padding: 2rem;
                        width: 100%;
                    }
                }
            }
        }

        ::slotted(altshift-box[slot="button"]) {
            border-top: var(--border-width) solid var(--border-color);
            border-right: var(--border-width) solid var(--border-color);
            height: 100%;
        }
    `;

    render() {
        return html`
            <altshift-box>
                <div class="container">
                    <div class="image-container">
                        <div class="buttons-container"><slot name="button"></slot></div>
                    </div>
                    <div class="text-container">
                        <slot name="text"></slot>
                    </div>
                </div>
            </altshift-box>
        `;
    }
}
