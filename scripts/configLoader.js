/* configLoader.js
 * A Node.js module to load and validate .ini/.json config grammar
 * for the Anti-Normalization system based on Master1.ini.txt specs
 */

const fs = require('fs');
const path = require('path');
const ini = require('ini');

class ConfigLoader {
  /**
   * @param {string} configPath - path to .ini or .json file
   */
  constructor(configPath) {
    this.configPath = path.resolve(configPath);
    if (!fs.existsSync(this.configPath)) {
      throw new Error(`Config file not found: ${this.configPath}`);
    }
    this.raw = null;
    this.config = null;
  }

  /**
   * Load and parse the config file.
   * Supports .ini and .json formats.
   */
  load() {
    this.raw = fs.readFileSync(this.configPath, 'utf-8');
    const ext = path.extname(this.configPath).toLowerCase();
    if (ext === '.ini') {
      this.config = ini.parse(this.raw);
    } else if (ext === '.json') {
      this.config = JSON.parse(this.raw);
    } else {
      throw new Error(`Unsupported config format: ${ext}`);
    }
    return this.config;
  }

  /**
   * Validate that required sections and keys exist.
   * @param {Object} schema - definition of required structure
   *   e.g. { sections: { sectionName: ['key1', 'key2'] } }
   */
  validate(schema) {
    if (!this.config) {
      throw new Error('Config not loaded. Call load() first.');
    }
    const errors = [];
    for (const [section, keys] of Object.entries(schema.sections)) {
      if (!Object.prototype.hasOwnProperty.call(this.config, section)) {
        errors.push(`Missing section: ${section}`);
        continue;
      }
      for (const key of keys) {
        if (!Object.prototype.hasOwnProperty.call(this.config[section], key)) {
          errors.push(`Missing key '${key}' in section [${section}]`);
        }
      }
    }
    if (errors.length) {
      const msg = errors.join('; ');
      throw new Error(`Config validation failed: ${msg}`);
    }
    return true;
  }
}

module.exports = ConfigLoader;

// Usage example:
// const ConfigLoader = require('./configLoader');
// const loader = new ConfigLoader('Master1.ini.txt');
// const cfg = loader.load();
// loader.validate({ sections: { General: ['delimiter'], Mapping: ['DaTiX', 'ID1'] } });
