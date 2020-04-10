/* eslint no-global-assign: "error" */
/* global dndapi:writable */
/* exported dndapi */
module.exports = {
  baseUrl: 'http://www.dnd5eapi.co/api/',
  async getMonsters() {
    const endpoint = 'monsters';
    const response = await fetch(this.baseUrl + endpoint);
    const responseJSON = response.json();
    return responseJSON;
  },
  async getMonster(id) {
    const endpoint = `monsters/ + ${id.toString}`;
    const response = await fetch(this.baseUrl + endpoint);
    const responseJSON = response.json();
    return responseJSON;
  },
};
