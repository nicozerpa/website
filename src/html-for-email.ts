export function getHTMLCodeForEmail(contentsDiv: HTMLElement): void {
    const allPres = contentsDiv.querySelectorAll("pre");

    const originalPres: string[] = [];
    const baseElems = new Map<string, [HTMLElement, CSSStyleDeclaration]>();

    const basePre = document.createElement("pre");
    document.body.append(basePre);

    for (const pre of allPres) {
        originalPres.push(pre.outerHTML);

        const nodes: Node[] = [pre];

        for (const node of nodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as HTMLElement;

                let baseStyle: CSSStyleDeclaration | undefined;
                const style = getComputedStyle(element);

                if (baseElems.has(element.tagName)) {
                    baseStyle = baseElems.get(element.tagName)?.[1];
                } else {
                    const baseElem = document.createElement(element.tagName);
                    basePre.append(baseElem);

                    baseStyle = getComputedStyle(baseElem);
                    baseElems.set(
                        element.tagName,
                        [baseElem, baseStyle]
                    )
                }

                if (!baseStyle) {
                    baseStyle = style;
                }

                for (const propName of style) {
                    if (
                        baseStyle.getPropertyValue(propName) != style.getPropertyValue(propName)
                        && ![
                            "width", "height", "perspective-origin", "transform-origin",
                            "block-size", "overflow", "inline-size", "font-size"
                        ].includes(propName)
                    ) {
                        element.style.setProperty(
                            propName,
                            style.getPropertyValue(propName)
                        );
                    }
                }

                if (element.tagName === "CODE") {
                    element.style.display = "block";
                    element.style.fontSize = "14px";
                    element.style.padding = "5px";
                }

                element.setAttribute("data-style", element.getAttribute("style") ?? "");
                element.removeAttribute("style");
                
                for (const childNode of node.childNodes) {
                    nodes.push(childNode);
                }
            }
        }
    }

    contentsDiv.querySelectorAll("[data-style]").forEach(
        elm => {
            elm.removeAttribute("class");
            elm.setAttribute("style", elm.getAttribute("data-style") ?? "");
            elm.removeAttribute("data-style");
        }
    )

    basePre.remove();

    const newContents = contentsDiv.outerHTML;
    document.documentElement.innerHTML = "<!DOCTYPE html>";
    document.body.innerHTML = newContents;
}