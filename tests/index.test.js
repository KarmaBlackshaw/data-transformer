const transformer = require('../src')

test('Generate dictionary should work', () => {
  const data = {
    very_long_word: 'very_long_word',
    longer_word: 'very_long_word',
    object_foo: { foo: 'foo', bar: 'bar' },
    array_foo: ['foo', 'bar'],
    object_array_foo: [{ foo: 'foo', bar: 'bar' }, { foo: 'foo', bar: 'bar' }]
  }

  const actual = transformer.generateDictionary(data)

  const expected = {
    very_long_word: 'vlw',
    longer_word: 'lw',
    foo: 'f',
    bar: 'b',
    object_foo: 'of',
    array_foo: 'af',
    object_array_foo: 'oaf'
  }

  expect(actual).toEqual(expected)
})

test('Minify should work', () => {
  const data = {
    very_long_word: 'very_long_word',
    longer_word: 'very_long_word',
    object_foo: { foo: 'foo', bar: 'bar' },
    array_foo: ['foo', 'bar'],
    object_array_foo: [{ foo: 'foo', bar: 'bar' }, { foo: 'foo', bar: 'bar' }]
  }

  const dictionary = transformer.generateDictionary(data)

  const actual = transformer.minify(data, dictionary)

  const expected = {
    vlw: 'very_long_word',
    lw: 'very_long_word',
    of: { f: 'foo', b: 'bar' },
    af: ['foo', 'bar'],
    oaf: [{ f: 'foo', b: 'bar' }, { f: 'foo', b: 'bar' }]
  }

  expect(actual).toEqual(expected)
})

test('Magnify should work', () => {
  const data = {
    vlw: 'very_long_word',
    lw: 'very_long_word',
    of: { f: 'foo', b: 'bar' },
    af: ['foo', 'bar'],
    oaf: [{ f: 'foo', b: 'bar' }, { f: 'foo', b: 'bar' }]
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

  const expected = {
    very_long_word: 'very_long_word',
    longer_word: 'very_long_word',
    object_foo: { foo: 'foo', bar: 'bar' },
    array_foo: ['foo', 'bar'],
    object_array_foo: [{ foo: 'foo', bar: 'bar' }, { foo: 'foo', bar: 'bar' }]
  }

  const magnified = transformer.magnify(data, dictionary)

  expect(magnified).toEqual(expected)
})
