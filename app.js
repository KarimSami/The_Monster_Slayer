const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 1,
    };
  },
  methods: {
    attackMonster() {
      const attackDamage = getRandomValue(5, 12);
      if (this.monsterHealth > attackDamage > 0)
        this.monsterHealth -= attackDamage;
      else this.monsterHealth = 0;
      this.currentRound += 1;
      this.attackPlayer();
    },
    attackPlayer() {
      const attackDamage = getRandomValue(8, 15);
      if (this.playerHealth > attackDamage) this.playerHealth -= attackDamage;
      else this.playerHealth = 0;
    },
    specialAttack() {
      this.currentRound += 1;
      const attackDamage = getRandomValue(15, 30);
      if (this.monsterHealth > attackDamage > 0)
        this.monsterHealth -= attackDamage;
      else this.monsterHealth = 0;
      this.attackPlayer();
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
});

app.mount("#game");
