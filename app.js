const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      logs: [],
      currentRound: 1,
      winner: null,
    };
  },
  methods: {
    attackMonster() {
      const attackDamage = getRandomValue(5, 12);
      if (this.monsterHealth > attackDamage > 0)
        this.monsterHealth -= attackDamage;
      else this.monsterHealth = 0;
      this.currentRound += 1;
      this.addLogMessages("player", "attack", attackDamage);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackDamage = getRandomValue(8, 15);
      if (this.playerHealth > attackDamage) this.playerHealth -= attackDamage;
      else this.playerHealth = 0;
      this.addLogMessages("monster", "attack", attackDamage);
    },
    specialAttack() {
      this.currentRound += 1;
      const attackDamage = getRandomValue(10, 25);
      if (this.monsterHealth > attackDamage > 0)
        this.monsterHealth -= attackDamage;
      else this.monsterHealth = 0;
      this.addLogMessages("player", "attack", attackDamage);
      this.attackPlayer();
    },
    healPlayer() {
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue < 100) this.playerHealth += healValue;
      else this.playerHealth = 100;
      this.addLogMessages("player", "heal", healValue);
      this.attackPlayer();
    },
    startNewGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.winner = null;
      this.currentRound = 1;
      this.logs = [];
    },
    surrender() {
      this.playerHealth = 0;
    },
    addLogMessages(who, what, value) {
      this.logs.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
  computed: {
    monsterHealthBarStyles() {
      return { width: `${this.monsterHealth}%` };
    },
    playerHealthBarStyles() {
      return { width: `${this.playerHealth}%` };
    },
    specialAttackAvailable() {
      return !(this.currentRound % 3 === 0);
    },
  },
  watch: {
    playerHealth(val) {
      if (val === 0 && this.monsterHealth === 0) {
        this.winner = "draw";
      } else if (val === 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(val) {
      if (val === 0 && this.playerHealth === 0) {
        this.winner = "draw";
      } else if (val === 0) {
        this.winner = "player";
      }
    },
  },
});

app.mount("#game");
