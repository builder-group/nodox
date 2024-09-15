import { defineContentScript } from 'wxt/sandbox';

import { $isActive, $patterns } from './store';

const BLUR_ATTRIBUTE = 'data-blurred';
const BLACKLISTED_HTML_TAGS = [
	'script',
	'style',
	'iframe',
	'canvas',
	'svg',
	'input',
	'textarea',
	'select',
	'button',
	'link',
	'meta',
	'base',
	'head',
	'title',
	'noscript',
	'object',
	'embed'
];

export default defineContentScript({
	matches: ['<all_urls>'],
	runAt: 'document_start', // Run before document body was loaded and thus first paint
	main() {
		let regexPatterns: RegExp[] = [];

		const observer = new MutationObserver((mutations) => {
			if (!$isActive.get()) {
				return;
			}

			for (const mutation of mutations) {
				if (mutation.type === 'childList') {
					for (const node of mutation.addedNodes) {
						if (node.nodeType === Node.ELEMENT_NODE) {
							blurMatchingElements(node as Element, regexPatterns);
						}
					}
				}
			}
		});
		observer.observe(document.documentElement, { childList: true, subtree: true });

		$patterns.listen(({ value }) => {
			regexPatterns = value
				.filter((pattern) => pattern.isActive)
				.map((pattern) => new RegExp(pattern.source, pattern.flags));
			blurMatchingElements(document.body, regexPatterns);
		});

		$isActive.listen(({ value }) => {
			if (value) {
				blurMatchingElements(document.body, regexPatterns);
			} else {
				unblurAllElements();
			}
		});
	}
});

function blurMatchingElements(element: Element, regexPatterns: RegExp[]): void {
	const toBlurNodes: Text[] = [];
	const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);

	let textNode: Text | null;
	while ((textNode = walker.nextNode() as Text | null)) {
		const text = textNode.textContent;
		if (
			text != null &&
			regexPatterns.some((pattern) => pattern.test(text)) &&
			!isParentBlacklisted(textNode)
		) {
			toBlurNodes.push(textNode);
		}
	}

	for (const toBlurNode of toBlurNodes) {
		applyBlurToNode(toBlurNode);
	}
}

function isParentBlacklisted(node: Text): boolean {
	const parentTag = node.parentElement?.tagName.toLowerCase();
	return parentTag == null || BLACKLISTED_HTML_TAGS.includes(parentTag);
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

function unblurAllElements(): void {
	const blurredElements = document.querySelectorAll(`[${BLUR_ATTRIBUTE}]`);

	for (const element of blurredElements) {
		if (element instanceof HTMLElement) {
			const originalText = element.textContent ?? '';
			const textNode = document.createTextNode(originalText);
			element.replaceWith(textNode);
		}
	}
}
