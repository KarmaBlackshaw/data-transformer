const isArray = hit => Array.isArray(hit)
const isObject = hit => !isArray(hit) && typeof hit === 'object'

/**
 * Get all nested keys of an object
 *
 * @param {object|array} data - the data to extract keys from
 */
const extractKeys = data => {
  const keys = []

  if (isObject(data)) {
    for (const key in data) {
      const curr = data[key]

      if (isObject(curr)) {
        keys.push(...extractKeys(curr))
      }

      keys.push(key)
    }
  }

  if (isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      const curr = data[i]

      if (isObject(curr)) {
        keys.push(...extractKeys(curr))
      }
    }
  }

  return Array.from(new Set(set))
}

/**
 * Convert word to its  minified version
 *
 * @param {string} word   - the word to minify
 * @param {number} depth  - word minifation depth
 */
const minifyWord = (word, depth) => {
  return (/_/).test(word)
    ? word.split('_').map(x => x.substring(0, depth)).join('')
    : word.substring(0, depth)
}

/**
 * Convert an array of strings to its minified version
 *
 * @param {array} keys - unique keys to be minified
 */
const generateDictionary = data => {
  const keys = extractKeys(data)
  const hashContainer = {}
  const dictionary = {}

  for (let i = 0; i < keys.length; i++) {
    const curr = keys[i]

    let hash
    let isFound = false
    let count = 1

    while (!isFound) {
      hash = minifyWord(curr, count)

      if (!hashContainer[hash]) {
        hashContainer[hash] = curr
        isFound = true
      } else {
        count++
      }
    }

    dictionary[curr] = hash
  }

  return dictionary
}

/**
 * Minify keys
 *
 * @param {array|object} data - the data to be minified
 * @param {object} dictionary - the keys dictionary { [word]: minified_word }
 */
const minify = (data, dictionary) => {
  if (isObject(data)) {
    const newData = {}
    for (const key in data) {
      const curr = data[key]

      if (isObject(curr) || isArray(curr)) {
        newData[dictionary[key]] = minify(curr, dictionary)
      } else {
        newData[dictionary[key]] = curr
      }
    }

    return newData
  }

  if (isArray(data)) {
    const newData = []
    for (let i = 0; i < data.length; i++) {
      const curr = data[i]

      console.log(curr)

      if (isObject(curr) || isArray(curr)) {
        newData[i] = minify(curr, dictionary)
      } else {
        newData[i] = curr
      }
    }

    return newData
  }
}

/**
 * Magnify keys
 *
 * @param {array|object} data - the data to be magnified
 * @param {object} dictionary - the keys dictionary { [word]: minified_word }
 */
const magnify = (data, dictionary) => {
  const revertedDictionary = Object.entries(dictionary)
    .reduce((acc, curr) => ({ ...acc, [curr[1]]: curr[0] }), {})

  return minify(data, revertedDictionary)
}

module.exports = {
  generateDictionary,
  minify,
  magnify
}
