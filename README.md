<h1 align="center">
    <img src="https://raw.githubusercontent.com/builder-group/nodox/develop/.github/banner.svg" alt="nodox banner">
</h1>

Chrome Extension to BLUR Sensitive Information based on Regex Patterns.

## 🙅‍♂️ Limitiations

- Content in [`IFrames`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) can't be blurred
- Only Text Content can be blurred

## ⚖️  Alternatives

- [SafeBlur](https://chromewebstore.google.com/detail/dpllgpokpkpfdmbdolkiebbcmggnmobd)
- [Blurry Blur](https://chromewebstore.google.com/detail/blurry-blur-sensitive-inf/cohnecpfcfoihjedibnggaoaibnphoeo)
- [ElementHider](https://chromewebstore.google.com/detail/elementhider/jnbamieaacddlfcoanmbkclnpoafhmie)
- [Hide That!](https://chromewebstore.google.com/detail/hide-that/kjheknompfelomdgfloikfbnjmaiflfe)
- [ZeroBlur](https://chromewebstore.google.com/detail/ckmpibbifmcamfmfelkencbbiilpcfjg)
- [TextRedactor](https://github.com/t18n/chrome-extension-text-redactor)
- [BlurWeb](https://www.blurweb.app/)

## Potential Users

- [Extension or script to hide/alter sensitive info such as full name, email etc when streaming.](https://www.reddit.com/r/chrome/comments/r8ua5o/extension_or_script_to_hidealter_sensitive_info/)
- [any addons for hiding sensitive information?](https://www.reddit.com/r/edge/comments/14bb7ft/any_addons_for_hiding_sensitive_information/)

## ❓ FAQ

### Why are information in the Google Account popover not blurred
Because its an iFrame..

### Only blur patterns if screen is recorded
Currently not possible.

- [Stackoverflow](https://stackoverflow.com/questions/74711614/how-to-detect-if-user-is-screen-sharing-in-a-chrome-extension)