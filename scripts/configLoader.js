/**
 * configLoader.js
 * A Node.js module to load and validate .ini/.json config grammar
 * for the Anti-Normalization system based on Master1.ini.txt specs
 */

const fs   = require('fs');
const path = require('path');
const ini  = require('ini');

class ConfigLoader {
  /**
   * @param {string} configPath - path to .ini or .json file
   */
  constructor(configPath) {
    this.configPath = path.resolve(configPath);
    if (!fs.existsSync(this.configPath)) {
      throw new Error(`Config file not found: ${this.configPath}`);
    }
    this.raw    = null;
    this.config = null;
  }

  /**
   * Load and parse the config file.
   * Supports .ini and .json formats.
   * @returns {Object} Parsed config
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
   *   e.g. { sections: { General: ['delimiter'], Mapping: ['DaTiX','ID1'] } }
   * @returns {boolean}
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
      throw new Error(`Config validation failed: ${errors.join('; ')}`);
    }
    return true;
  }
}

module.exports = ConfigLoader;

/*
Usage Example:

const ConfigLoader = require('./configLoader');
const loader = new ConfigLoader('Master1.ini.txt');

// Load and parse
const cfg = loader.load();

// Validate required structure
loader.validate({
  sections: {
    General: ['delimiter'],
    Mapping: ['DaTiX', 'ID1', 'ID2']
  }
});

// cfg now contains your parsed config object
*/
