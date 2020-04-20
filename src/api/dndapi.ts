/* eslint no-global-assign: "error" */
/* global dndapi:writable */
/* exported dndapi */
import axios from 'axios';
declare module 'axios' {
  export interface AxiosResponse<T = any> extends Promise<T> {}
}

export const api = {
  baseUrl: 'https://api.open5e.com',
  async getMonsters() {
    const monsters: any = await new Promise((resolve, reject) => {
      this.getPaginatedResults(`${this.baseUrl}/monsters/?fields=slug,name`, [], resolve, reject);
    });
    return monsters;
  },
  async getMonster(slug: string) {
    try {
      const monster = await axios.get(`${this.baseUrl}/monsters/${slug}`);
      return monster.data;
    } catch (e) {
      return null;
    }
  },
  async queryMonstersName(name: string) {
    const monsters = await axios.get(`${this.baseUrl}/monsters?${encodeURIComponent(name)}`);
    return monsters.data.results;
  },
  async getAbilityScores() {
    const abilities = await axios.get(`${this.baseUrl}/ability-scores`);
    return abilities.data.results;
  },
  async getConditions() {
    const conditions = await axios.get(`${this.baseUrl}/conditions`);
    return conditions.data.results;
  },
  async getCondition(index: string) {
    const condition = await axios.get(`${this.baseUrl}/conditions/${index}}`);
    return condition.data;
  },
  async getDamageTypes() {
    const damageTypes = await axios.get(`${this.baseUrl}/damage-types`);
    return damageTypes.data.results;
  },
  async getDamageType(index: string) {
    const damageType = await axios.get(`${this.baseUrl}/damage-types/${index}`);
    return damageType.data;
  },
  async getPaginatedResults(url: string, results: any, resolve: any, reject: any) {
    const response = await axios.get(url);
    const retrieveResults = [...results, ...response.data.results];
    if (response.data.next !== null) {
      this.getPaginatedResults(response.data.next, retrieveResults, resolve, reject);
    } else {
      resolve(retrieveResults);
    }
  },
};
