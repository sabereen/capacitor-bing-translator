# capacitor-bing-translator
[![NPM version](https://img.shields.io/npm/v/capacitor-bing-translator.svg?style=flat)](https://www.npmjs.org/package/capacitor-bing-translator)
[![Auto Test](https://github.com/sabereen/capacitor-bing-translator/actions/workflows/autotest.yml/badge.svg)](https://github.com/sabereen/capacitor-bing-translator/actions/workflows/autotest.yml)
[![NPM Downloads](https://img.shields.io/npm/dm/capacitor-bing-translator.svg)](https://npmcharts.com/compare/capacitor-bing-translator?minimal=true)
[![License](https://img.shields.io/npm/l/capacitor-bing-translator.svg)](https://github.com/sabereen/capacitor-bing-translator/blob/master/LICENSE)

A **simple** and **free** API for [Bing Translator](https://bing.com/translator) for [Capacitor.js](https://capacitorjs.com).

## Install 

```
npm install capacitor-bing-translator
```

## Platforms
All Capacitor native platforms are supported (**Android** & **iOS**).

Web platform is not supported, because of [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS); Unless you disable CORS in your browser (for example with [this extention](https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino) or using [CLI flags](https://medium.com/@dmadan86/run-chrome-browser-without-cors-by-disabling-web-security-d124ad4dd2cf))

## Usage

From auto-detected language to English:

```js
import { translate } from 'bing-translate-api'

translate('你好', null, 'en').then(res => {
  console.log(res.translation)
}).catch(err => {
  console.error(err)
})
```

Translation result

```js
{
  // original text
  "text": "你好",
  // user-specified language code
  "userLang": "auto-detect",
  // translated text
  "translation": "Hello",
  // `correctedText` is returned only when `correct` is set as `true`
  // supported since v1.1.0
  "correctedText": "",
  // detected language
  "language": {
    // language code of translated text
    "to": "en",
    // detected language code of original text
    "from": "zh-Hans",
    // score of language detection
    // supported since v1.1.0
    "score": 1
  }
}
```

## API

### translate(text, [from], [to], [correct], [raw], [userAgent])

#### _text_

Type: `string`

The text to be translated, can't be blank. The **maximum** text length is **1000**.

##### _from_
Type: `string` Default: `auto-detect`

The language code of source text.

**MUST** be `auto-detect` or one of the codes/names (not case sensitive) contained in [lang.json](https://github.com/plainheart/bing-translate-api/blob/master/src/lang.json)

##### _to_
Type: `string` Default: `en`

The language in which the text should be translated.

**MUST** be one of the codes/names (not case sensitive) contained in [lang.json](https://github.com/plainheart/bing-translate-api/blob/master/src/lang.json).

##### _correct_
Type: `boolean` Default: `false` Since: `v1.1.0`

Whether to correct the input text.

Note that:
1) There is currently a **limit** of **50 characters** for correction service.
2) **Only** [the languages in the list](https://github.com/plainheart/bing-translate-api/blob/master/src/lang.js#L10-L29) are supported to be corrected.

##### _raw_
Type: `boolean` Default: `false`

Whether the translation result contains raw response from Bing API.

##### _userAgent_
Type: `string`

The header value of `user-agent` used in API requests. 

Default:
```
navigator.userAgent
```

## License

MIT &copy; 2021-2023 [plainheart](https://github.com/plainheart).

## Thanks

Great thanks to [Bing Translator](https://bing.com/translator) for providing so excellent translation service.

## Related projects

### Bing translate api for Node.js
[Bing Translate API](https://github.com/plainheart/bing-translate-api) - A free Bing translation api for using in Node.js. _Capacitor Bing Translator_ is a fork of that.

### Google translate api for Capacitor
If you want to use google translate API instead of Bing, use the [`google-translate-api-x`](https://www.npmjs.com/package/google-translate-api-x) package. and use a custom `requestFunction` like this:
```js
const result = await translate('سلام دنیا', {
  to: 'en',
  autoCorrect: true,
  forceBatch: false,
  fallbackBatch: false,
  async requestFunction(url: string, options: RequestInit) {
    const result = await CapacitorHttp.request({
      url,
      headers: {
        ...options.headers,
        'user-agent': navigator.userAgent,
      },
      method: options.method,
      data: options.body || null,
      webFetchExtra: {
        credentials: options.credentials,
      },
    })

    return new Response(
      JSON.stringify(result.data),
      {
        headers: result.headers,
        status: result.status,
      },
    )
  },
})
```