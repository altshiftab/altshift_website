import {css, html, LitElement} from "lit";

import "@altshiftab/web_components/footer";
import "@altshiftab/web_components/box";

export default class AltShiftFooterWww extends LitElement {
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


        altshift-footer svg {
            width: 2rem;
            path {
                fill: var(--altshift-text-color);
            }
        }
    `;

    render() {
        return html`
            <altshift-footer>
                <altshift-box unbordered contracted textBox selectable class="first-row">
                    <a href="/contact">Contact</a>
                </altshift-box>
                <altshift-box unbordered contracted textBox selectable class="first-row">
                    <a href="/about">About</a>
                </altshift-box>
                <altshift-box unbordered contracted textBox selectable class="first-row">
                    <a href="/services">Services</a>
                </altshift-box>
                <altshift-box unbordered contracted textBox selectable class="second-row">
                    <a href="https://www.linkedin.com/company/alt-shift-ab" aria-label="LinkedIn" target="_blank">
                        <svg viewBox="0 0 42 42">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M21 0C32.5902 0 42 9.40981 42 21C42 32.5902 32.5902 42 21 42C9.40981 42 0 32.5902 0 21C0 9.40981 9.40981 0 21 0ZM14.4345 32.8019V16.4021H8.98234V32.8019H14.4345ZM34.0908 32.8019V23.3974C34.0908 18.3599 31.4012 16.0165 27.8147 16.0165C24.9227 16.0165 23.6272 17.607 22.9019 18.7241V16.4021H17.4512C17.5234 17.9408 17.4512 32.8019 17.4512 32.8019H22.9018V23.6431C22.9018 23.1529 22.9371 22.6629 23.0815 22.3125C23.4749 21.3335 24.3725 20.3192 25.8784 20.3192C27.8499 20.3192 28.6398 21.8237 28.6398 24.0274V32.8019H34.0908ZM11.7452 8.49434C9.87984 8.49434 8.66111 9.7207 8.66111 11.3281C8.66111 12.9016 9.84277 14.1618 11.673 14.1618H11.7082C13.6093 14.1618 14.7926 12.9016 14.7926 11.3281C14.7573 9.7207 13.6094 8.49434 11.7452 8.49434Z"/>
                        </svg>
                    </a>
                </altshift-box>
                <altshift-box unbordered contracted textBox selectable class="second-row">
                    <a class="nav-item__icon-a" href="https://www.github.com/altshiftab" aria-label="GitHub" target="_blank">
                        <svg viewBox="0 0 44 43">
                            <path d="M0.495142 21.4969C0.550101 9.49292 10.0797 0.469464 21.0139 0.0195696C33.8717 -0.510846 43.4703 9.82011 43.5048 21.3832C43.5406 33.4217 33.8155 42.9538 22.1233 42.9998C10.0874 43.0471 0.477249 33.2849 0.495142 21.4969ZM25.4362 29.7624C25.6317 30.0283 25.8388 30.2673 25.9973 30.5344C26.4702 31.3358 26.6069 32.2228 26.6082 33.1379C26.6107 34.8506 26.6082 36.5633 26.6107 38.2759C26.612 39.1617 27.2166 39.5988 28.0614 39.3138C29.8329 38.7169 31.4727 37.8618 32.9847 36.7652C34.4967 35.6686 35.817 34.3777 36.9532 32.8913C37.9795 31.5505 38.809 30.0999 39.4404 28.5419C40.0884 26.9417 40.4974 25.2763 40.6917 23.5547C41.0227 20.6406 40.6751 17.807 39.6973 15.0527C39.0327 13.1815 38.0703 11.465 36.8458 9.89808C35.4067 8.05504 33.6851 6.52131 31.6785 5.325C29.4469 3.99449 27.0427 3.15477 24.452 2.82119C21.7501 2.47354 19.1031 2.69082 16.506 3.46919C14.6259 4.03283 12.8839 4.89939 11.2658 6.02413C9.33199 7.36742 7.70496 9.01107 6.39489 10.9551C4.81387 13.3017 3.81695 15.8847 3.39262 18.6927C3.02196 21.1454 3.14211 23.5687 3.72492 25.9716C4.10963 27.5552 4.69757 29.0633 5.47849 30.4986C6.44091 32.2675 7.65639 33.8371 9.11343 35.22C10.311 36.3575 11.6339 37.3365 13.1075 38.0855C14.0124 38.5456 14.9557 38.9406 15.904 39.3023C16.7374 39.6205 17.3777 39.1323 17.3802 38.2465C17.3828 37.3429 17.3802 36.438 17.3802 35.5344C17.3802 35.4334 17.3675 35.3325 17.3585 35.2123C17.2614 35.2264 17.2 35.2328 17.14 35.243C16.0842 35.4245 15.0221 35.5101 13.9728 35.2455C12.4595 34.8621 11.4255 33.9316 10.8529 32.4644C10.4439 31.4176 9.81639 30.5229 8.82202 29.9299C8.64309 29.8238 8.48205 29.6743 8.34529 29.5158C8.2571 29.4135 8.15102 29.2269 8.19064 29.1387C8.24048 29.025 8.41942 28.9278 8.55746 28.8997C9.21313 28.7681 9.81767 28.9393 10.3903 29.264C11.1763 29.7088 11.6658 30.4245 12.1502 31.153C12.6078 31.8419 13.2226 32.3481 14.0226 32.6088C15.1359 32.9705 16.2057 32.789 17.2524 32.3519C17.3381 32.3161 17.4301 32.1998 17.448 32.1078C17.609 31.2681 17.9119 30.4999 18.5088 29.8685C18.5331 29.843 18.5344 29.7957 18.551 29.7458C18.4807 29.7343 18.4309 29.7241 18.3797 29.7164C16.8064 29.494 15.2611 29.1745 13.8527 28.3923C12.4608 27.6203 11.4421 26.5161 10.8082 25.0462C10.2995 23.8665 10.0899 22.6319 10.0043 21.364C9.8624 19.2717 10.2982 17.3507 11.6773 15.7122C11.8256 15.5371 11.8767 15.3914 11.809 15.1741C11.3476 13.6928 11.5188 12.2383 12.0045 10.7966C12.0889 10.5448 12.2384 10.4886 12.4761 10.4873C13.2136 10.4834 13.9166 10.6573 14.5684 10.9742C15.4145 11.3858 16.2299 11.8638 17.0646 12.2984C17.1796 12.3584 17.3419 12.3776 17.471 12.352C17.9912 12.2498 18.5024 12.1015 19.0239 12.0082C21.5661 11.5532 24.0814 11.7002 26.575 12.3584C26.6913 12.3891 26.8498 12.3674 26.9546 12.3086C27.4351 12.0376 27.8914 11.7258 28.3784 11.4663C29.1746 11.042 29.9939 10.6355 30.9026 10.5397C32.0299 10.4208 31.8548 10.362 32.1411 11.3014C32.1539 11.3423 32.1641 11.3832 32.1744 11.4241C32.5233 12.6907 32.5693 13.9548 32.1884 15.2265C32.1526 15.3479 32.1974 15.5435 32.2804 15.6432C33.1981 16.7641 33.7809 18.0243 33.942 19.4724C34.0864 20.7735 33.9918 22.0618 33.7311 23.34C33.5164 24.3906 33.1342 25.3721 32.5258 26.2592C31.2899 28.0626 29.4686 28.9202 27.4172 29.3931C26.7705 29.5426 26.111 29.6398 25.4387 29.7637L25.4362 29.7624Z"/>
                        </svg>
                    </a>
                </altshift-box>
            </altshift-footer>
        `
    }
}

customElements.define('altshift-footer-www', AltShiftFooterWww);
