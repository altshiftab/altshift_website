import {css, CSSResultGroup, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js"

@customElement("contact-us")
export default class ContactUs extends LitElement {
    static styles = css`
        :host {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            cursor: pointer;
        }

        :host(:hover) > a, a:focus-visible {
            font-weight: 900;
        }

        :focus-visible {
            outline: none;
        }

        a {
            display: block;
            text-transform: uppercase;
            font-weight: 700;
            font-size: 1.125rem;
            letter-spacing: 0.1rem;
            text-decoration: none;
        }

        .icon {
            margin-left: 0.5rem;
            height: 1rem;
        }
    ` as CSSResultGroup;

    render() {
        return html`
            <a part="text" href="/contact">Contact us</a>
            <svg class="icon" viewBox="0 0 32 23">
                <path part="icon-path" d="M31.0404 12.373C31.615 11.7985 31.615 10.8669 31.0404 10.2924L21.6773 0.929254C21.1028 0.354687 20.1712 0.354687 19.5966 0.929254C19.0221 1.50382 19.0221 2.43538 19.5966 3.00994L27.9194 11.3327L19.5966 19.6555C19.0221 20.23 19.0221 21.1616 19.5966 21.7362C20.1712 22.3107 21.1028 22.3107 21.6773 21.7362L31.0404 12.373ZM0.314453 12.804H30.0001V9.86143H0.314453V12.804Z"/>
            </svg>
        `;
    }
}