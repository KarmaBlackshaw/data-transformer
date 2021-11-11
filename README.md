# Data Transformer

The **Data Transformer** library converts your payload to its minified/magnified form by converting the keys

## Installation

Use the package manager [npm](https://docs.npmjs.com/).

```bash
npm i @cubic-wing/data-transformer
```

## Usage

### Generate a dictionary

```javascript
const transformer = require("@cubic-wing/data-transformer")

const data = {
  very_long_word: "very_long_word",
  longer_word: "very_long_word",
  object_foo: {
    foo: "foo",
    bar: "bar",
  },
  array_foo: ["foo", "bar"],
  object_array_foo: [
    {
      foo: "foo",
      bar: "bar",
    },
    {
      foo: "foo",
      bar: "bar",
    }
  ],
}

const dictionary = transformer.generateDictionary(data);

// This will return the following
{
  very_long_word: 'vlw',
  longer_word: 'lw',
  foo: 'f',
  bar: 'b',
  object_foo: 'of',
  array_foo: 'af',
  object_array_foo: 'oaf'
}
```

### Minify Data

```javascript
const transformer = require("@cubic-wing/data-transformer")

const data = {
  very_long_word: 'very_long_word',
  longer_word: 'very_long_word',
  object_foo: { foo: 'foo', bar: 'bar' },
  array_foo: [ 'foo', 'bar' ],
  object_array_foo: [ { foo: 'foo', bar: 'bar' }, { foo: 'foo', bar: 'bar' } ]
}

const dictionary = {
  very_long_word: 'vlw',
  longer_word: 'lw',
  foo: 'f',
  bar: 'b',
  object_foo: 'of',
  array_foo: 'af',
  object_array_foo: 'oaf'
}

const minified = transformer.minify(data, dictionary)

// This will return the following
{
  vlw: 'very_long_word',
  lw: 'very_long_word',
  of: { f: 'foo', b: 'bar' },
  af: [ 'foo', 'bar' ],
  oaf: [ { f: 'foo', b: 'bar' }, { f: 'foo', b: 'bar' } ]
}
```

### Magnify Data

```javascript
const transformer = require("@cubic-wing/data-transformer")

const data = {
  vlw: 'very_long_word',
  lw: 'very_long_word',
  of: { f: 'foo', b: 'bar' },
  af: [ 'foo', 'bar' ],
  oaf: [ { f: 'foo', b: 'bar' }, { f: 'foo', b: 'bar' } ]
}

const dictionary = {
  very_long_word: 'vlw',
  longer_word: 'lw',
  foo: 'f',
  bar: 'b',
  object_foo: 'of',
  array_foo: 'af',
  object_array_foo: 'oaf'
}

const magnified= transformer.minify(data, dictionary)

// This will return the following
{
  very_long_word: 'very_long_word',
  longer_word: 'very_long_word',
  object_foo: { foo: 'foo', bar: 'bar' },
  array_foo: [ 'foo', 'bar' ],
  object_array_foo: [ { foo: 'foo', bar: 'bar' }, { foo: 'foo', bar: 'bar' } ]
}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
