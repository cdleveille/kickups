/// <reference lib="WebWorker" />

import { PrecacheEntry } from "workbox-precaching";

declare const self: ServiceWorkerGlobalScope;

const manifest = self.__WB_MANIFEST as PrecacheEntry[];

const cacheName = "swcache_" + new Date().toISOString();

const isCacheFirstFileType = (url: string) =>
	url.endsWith(".png") ||
	url.endsWith(".svg") ||
	url.endsWith(".jpg") ||
	url.endsWith(".jpeg") ||
	url.endsWith(".ico") ||
	url.endsWith(".ttf");

const deleteOldCaches = async () => {
	const keys = await caches.keys();
	return keys.map(async cache => {
		if (cache !== cacheName) {
			return await caches.delete(cache);
		}
	});
};

deleteOldCaches();

self.addEventListener("install", (event: ExtendableEvent) => {
	self.skipWaiting();
	event.waitUntil(
		(async () => {
			// once page is loaded and service worker is installed, immediately fetch and cache every
			// entry in the manifest so offline play is possible without a subsequent page refresh
			const cache = await caches.open(cacheName);

			for (const entry of manifest) {
				if (!entry.url.endsWith("LICENSE.txt")) {
					const response = await fetch(entry.url);
					await cache.put(entry.url, response.clone());
				}
			}

			const rootResponse = await fetch("/");
			await cache.put("/", rootResponse.clone());
		})()
	);
});

self.addEventListener("activate", (event: ExtendableEvent) => {
	event.waitUntil(deleteOldCaches());
});

self.addEventListener("fetch", (event: FetchEvent) => {
	if (isCacheFirstFileType(event.request.url)) {
		event.respondWith(cacheResponse(event));
	} else {
		event.respondWith(navigator.onLine ? networkResponse(event) : cacheResponse(event));
	}
});

const networkResponse = async (event: FetchEvent): Promise<Response> => {
	try {
		const networkResponse = await fetch(event.request);
		if (event.request.method === "GET" && !event.request.url.includes("socket.io")) {
			const cache = await caches.open(cacheName);
			event.waitUntil(cache.put(event.request, networkResponse.clone()));
		}
		return networkResponse;
	} catch (error) {
		return cacheResponse(event);
	}
};

const cacheResponse = async (event: FetchEvent): Promise<Response> => {
	try {
		const cache = await caches.open(cacheName);
		const cacheResponse = await cache.match(event.request);
		return cacheResponse ?? networkResponse(event);
	} catch (error) {
		return networkResponse(event);
	}
};
