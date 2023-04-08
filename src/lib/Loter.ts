import { obj } from "./csv";

export class Loter {

  lot(countGroup: number, players: obj[]) {
    players = players.sort((a, b) => (a.ranking < b.ranking ? 1 : -1));
    const rated = [] as obj[];
    const unrated = [] as obj[];
    for (const player of players) {
      if (player.ranking == 0 || player.ranking == undefined) {
        unrated.push(player);
      } else {
        rated.push(player);
      }
    }
    const groups = [] as (obj | null)[][];
    for (let index = 0; index < countGroup; index++) {
      groups[index] = [] as (obj | null)[];
      const element = groups[index];
      element.push(rated.shift() || null);
    }
    const arr = [...rated, ...unrated]
      while (arr.length > 0) {
        const round = arr.splice(0, countGroup) as (obj|null) [];
        while (round.length < countGroup) {
          round.push(null);
        }
        const shuffled = this.shuffle<obj|null>(round);
        for (let gind = 0; gind < groups.length; gind++) {
          const element = groups[gind];
          if (shuffled[gind]) element.push(shuffled[gind]);
        }
      }
    
    return groups
  }
  shuffle<T>(array: Array<T>) {
    let currentIndex = array.length,
      randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }
}   