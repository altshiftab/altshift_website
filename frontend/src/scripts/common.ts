import {css} from "lit";

export const textStyles = css`
    h1 {
        margin: 0;
        font-weight: 900;
        font-size: 15.625em;
        text-transform: lowercase;

        @media screen and (max-width: 1280px) {
            font-size: 5.2083em;
        }
    }

    h2 {
        font-weight: 900;
        font-size: 2.5em;
    }

    p {
        font-size: 1.125rem;
        font-weight: 400;
        line-height: 2.125rem;
    }
`;