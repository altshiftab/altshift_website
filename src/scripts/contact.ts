import "@altshiftab/styles/common.css";
import "../styles/common_www.css";
import "../styles/contact.css";

import "./custom_elements/altshift_header_www.ts";
import "./custom_elements/altshift_footer_www.ts";

document.addEventListener("DOMContentLoaded", () => {
    ["mouseover", "click"].forEach(listener_type => {
        [".email-a", ".phone-a"].forEach(selector => {
            const href_value = (() => {
                switch (selector) {
                    case ".email-a":
                        return atob("bWFpbHRvOnZpa3Rvci5wZXJzc29uQGFsdHNoaWZ0LnNl");
                    case ".phone-a":
                        return atob("dGVsOis0NjczOTI0OTcyNw==");
                    default:
                        console.error(`Bad selector: ${selector}`);
                        return "";
                }
            })();
            document.querySelector(selector)?.addEventListener(listener_type, event => {
                const anchor = event.currentTarget as HTMLAnchorElement;
                anchor.href = href_value;
            }, {once: true});
        });
    });
})
