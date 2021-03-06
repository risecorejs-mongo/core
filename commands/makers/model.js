const _ = require('lodash')
const path = require('path')
const consola = require('consola')

const writeFileWithPrettier = require('../helpers/write-file-with-prettier')

module.exports = {
  command: 'make:model [entityName]',
  describe: 'Creating a base model',
  builder(yargs) {
    yargs.positional('entityName', { describe: 'Entity name', type: 'string' })

    yargs.option('entityName', { alias: 'en' })

    yargs.example([
      ['$0 make:model UserGroup'],
      ['$0 make:model --entityName UserGroup'],
      ['$0 make:model --en UserGroup']
    ])

    return yargs
  },
  async handler({ entityName }) {
    const filePath = path.resolve('database', 'models')
    const fileName = _.upperFirst(_.camelCase(entityName)) + '.js'

    const fileContent = getFileContent(entityName)

    await writeFileWithPrettier(filePath + '/' + fileName, fileContent)

    consola.success('Model created: ' + fileName)
  }
}

/**
 * GET-FILE-CONTENT
 * @param entityName {string}
 * @return {string}
 */
function getFileContent(entityName) {
  const modelName = _.upperFirst(_.camelCase(entityName))

  return `const mongoose = require('mongoose')

const ${modelName}Schema = new mongoose.Schema({
  fieldName: 'value'
})

const ${modelName} = mongoose.model(${modelName},${modelName}Schema)

module.exports = ${modelName}`
}
