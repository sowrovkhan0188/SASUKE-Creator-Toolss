SASUKE Creator Tools — independent clean-room starter
Version 1.0.0

This is a newly written alternative, not a modified copy of SENZE_EXT.
Features:
- Opens TikTok Studio upload page.
- On TikTok Studio upload pages, lets the user choose a local video and checks source dimensions, duration and file size in-browser.
- Provides a caption watermark text helper (manual copy/paste).
- Uses the user-provided SASUKE avatar as extension icons.

Privacy and permissions:
- No permissions requested.
- Host access and content script are limited to TikTok Studio upload pages.
- No remote JavaScript, analytics, credential collection, or video upload is included.
- Selected video metadata is read locally; no file bytes are sent anywhere.

Important limits:
- Does not bypass TikTok restrictions, force 4K, transcode video, or guarantee TikTok's final playback resolution.
- It is an independent starter, not a feature-for-feature clone of SENZE_EXT.
- The supplied SENZE_EXT archive did not include a license file; this package does not reuse its code or branding.

Android:
- Chrome for Android generally does not support installing desktop Chrome extensions.
- Use a browser/version that explicitly supports Chromium extensions and test compatibility. This package is not a Firefox add-on as-is.

Install where unpacked extensions are supported:
1. Extract this ZIP.
2. Open the browser's extension management page.
3. Enable developer mode and choose Load unpacked.
4. Select the extracted SASUKE_cleanroom folder containing manifest.json.
5. Open https://www.tiktok.com/tiktokstudio/upload?from=webapp.
