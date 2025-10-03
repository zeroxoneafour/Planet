import type { Attachment } from "svelte/attachments";

export interface ShortcutParams {
	alt?: boolean;
	shift?: boolean;
	ctrl?: boolean;
	key: string;
	callback?: () => void;
}

export type ShortcutHandler = (ev: KeyboardEvent) => void;

function createShortcutHandler(params: ShortcutParams, element: Element | HTMLElement | undefined) {
	return (ev: KeyboardEvent) => {
		if (
			!!params.alt != ev.altKey ||
			!!params.shift != ev.shiftKey ||
			!!params.ctrl != (ev.ctrlKey || ev.metaKey) ||
			params.key != ev.code
		)
			return;
		ev.preventDefault();
		if (params.callback !== undefined) {
			params.callback();
		} else if (element !== undefined) {
			element.dispatchEvent(new MouseEvent("click"));
		}
	};
}

function addShortcut(params: ShortcutParams, element?: Element | HTMLElement): ShortcutHandler {
	const handler = createShortcutHandler(params, element);
	window.addEventListener("keydown", handler);
	return handler;
}

function removeShortcut(handler: ShortcutHandler) {
	window.removeEventListener("keydown", handler);
}

export function shortcutAttachment(params: ShortcutParams): Attachment {
	return (element) => {
		const handler = addShortcut(params, element);
		return () => {
			window.removeEventListener("keydown", handler);
		};
	};
}
