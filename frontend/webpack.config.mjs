import {makeConfigWithParameters, generateParameters} from "@altshiftab/webpack_configuration"

export default makeConfigWithParameters({
    ...generateParameters(),
    preloadFonts: /^fonts\/mulish-.*\.woff2$/,
});
