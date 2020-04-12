/* eslint no-global-assign: "error" */
/* global dndapi:writable */
/* exported dndapi */
module.exports = {
  baseUrl: 'http://www.dnd5eapi.co/api',
  async apiCall(url) {
    const response = await fetch(url);
    const responseJSON = response.json();
    return responseJSON.results;
  },
  async getMonsters() {
    const monsters = await this.apiCall(`${this.baseUrl}/monsters`);
    return monsters;
  },
  async getMonster(index) {
    const monster = await this.apiCall(`${this.baseUrl}/monsters/${index.toString()}`);
    return monster;
  },
  async queryMonstersName(name) {
    const monsters = await this.apiCall(`${this.baseUrl}/monsters?${encodeURIComponent(name)}`);
    return monsters;
  },
  async getAbilityScores() {
    const abilities = await this.apiCall(`${this.baseUrl}/ability-scores`);
    return abilities;
  },
  async getConditions() {
    const conditions = await this.apiCall(`${this.baseUrl}/conditions`);
    return conditions;
  },
  async getCondition(index) {
    const condition = await this.apiCall(`${this.baseUrl}/conditions/${index}}`);
    return condition;
  },
  async getDamageTypes() {
    const damageTypes = await this.apiCall(`${this.baseUrl}/damage-types`);
    return damageTypes;
  },
  async getDamageType(index) {
    const damageType = await this.apiCall(`${this.baseUrl}/damage-types/${index}`);
    return damageType;
  },
};
