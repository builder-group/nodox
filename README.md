<h1 align="center">
    <img src="https://raw.githubusercontent.com/builder-group/nodox/develop/.github/banner.svg" alt="nodox banner">
</h1>

Keep your sensitive data private while sharing your screen or recording videos. NoDox automatically blurs text based on customizable Regex patterns, perfect for streamers, professionals, and educators.

- Blurs personal information (emails, names, etc.) on websites
- Easy-to-use, with customizable Regex patterns

# 📖 Usage

TODO video

## 🙅‍♂️ Limitiations

- Cannot blur content inside [`IFrames`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe)
- Only blurs text content

## ⚠️ Disclaimer

While this extension has been tested and works effectively in most cases, it cannot guarantee that every instance of sensitive information will be blurred on every website. Website structures and designs vary, making it challenging to identify all elements with 100% accuracy. If you encounter any issues or unblurred content, please provide feedback to help improve the extension.

## ⚖️  Alternatives

- [SafeBlur](https://chromewebstore.google.com/detail/dpllgpokpkpfdmbdolkiebbcmggnmobd)
- [Blurry Blur](https://chromewebstore.google.com/detail/blurry-blur-sensitive-inf/cohnecpfcfoihjedibnggaoaibnphoeo)
- [ElementHider](https://chromewebstore.google.com/detail/elementhider/jnbamieaacddlfcoanmbkclnpoafhmie)
- [Hide That!](https://chromewebstore.google.com/detail/hide-that/kjheknompfelomdgfloikfbnjmaiflfe)
- [ZeroBlur](https://chromewebstore.google.com/detail/ckmpibbifmcamfmfelkencbbiilpcfjg)
- [TextRedactor](https://github.com/t18n/chrome-extension-text-redactor)
- [BlurWeb](https://www.blurweb.app/)

## ❓ FAQ

### Why can't Google Account popover data be blurred?
It is embedded within an iFrame.

### Can it blur patterns only during screen recording?
Not possible at this time. [Learn more](https://stackoverflow.com/questions/74711614/how-to-detect-if-user-is-screen-sharing-in-a-chrome-extension).