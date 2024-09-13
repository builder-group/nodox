export async function closeOffscreenDocument(): Promise<void> {
	if (await hasOffscreenDocument()) {
		// @ts-expect-error: MV3 only API not typed
		await browser.offscreen.closeDocument();
	}
}

export async function createOffscreenDocument(): Promise<void> {
	if (await hasOffscreenDocument()) {
		console.warn('A offscreen document already exist!');
		return;
	}

	// @ts-expect-error: MV3 only API not typed
	await browser.offscreen.createDocument({
		url: browser.runtime.getURL('/offscreen.html' as any),
		// @ts-expect-error: MV3 only API not typed
		reasons: [browser.offscreen.Reason.DOM_PARSER],
		justification: 'Parse DOM'
	});
}

export async function hasOffscreenDocument(): Promise<boolean> {
	// @ts-expect-error: MV3 only API not typed
	const contexts = await browser.runtime.getContexts({
		// @ts-expect-error: MV3 only API not typed
		contextTypes: [browser.runtime.ContextType.OFFSCREEN_DOCUMENT],
		documentUrls: [browser.runtime.getURL('/offscreen.html' as any)]
	});

	if (contexts != null) {
		return contexts.length > 0;
	}
	// @ts-expect-error: MV3 only API not typed
	const matchedClients = await self.clients.matchAll();
	return matchedClients.some((client: any) => client.url.includes(browser.runtime.id));
}
