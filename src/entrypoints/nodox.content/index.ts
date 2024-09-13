import { defineContentScript } from 'wxt/sandbox';

const BLUR_ATTRIBUTE = 'data-blurred';

function blurMatchingElements(element: Element, patterns: RegExp[]): void {
	const toBlurNodes: Text[] = [];
	const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);

	let node: Text | null;
	while ((node = walker.nextNode() as Text | null)) {
		const text = node.textContent;
		if (text != null && patterns.some((pattern) => pattern.test(text))) {
			toBlurNodes.push(node);
		}
	}

	for (const toBlurNode of toBlurNodes) {
		applyBlurToNode(toBlurNode);
	}
}
function applyBlurToNode(node: Text): void {
	// Ensure we're not wrapping an already processed node (marked with data-blurred attribute)
	if (node.parentElement?.hasAttribute(BLUR_ATTRIBUTE)) {
		return;
	}

	const span = document.createElement('span');
	span.textContent = node.parentElement?.textContent ?? '';
	span.style.filter = 'blur(5px)';
	span.style.userSelect = 'none';
	span.setAttribute(BLUR_ATTRIBUTE, 'true');

	node.replaceWith(span);
}

export default defineContentScript({
	matches: ['<all_urls>'],
	runAt: 'document_start',
	main() {
		const patterns: RegExp[] = [/Deutschland/, /Benno/];

		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				if (mutation.type === 'childList') {
					for (const node of mutation.addedNodes) {
						if (node.nodeType === Node.ELEMENT_NODE) {
							blurMatchingElements(node as Element, patterns);
						}
					}
				}
			}
		});
		observer.observe(document.documentElement, { childList: true, subtree: true });
	}
});
