<template>
  <div> 
    <h1>Hangman</h1>
    <p>
    To play, simply select letters to try to guess the word. Everytime you select an incorrect letter you will get 
    closer to losing the game... and your neck!
    </p>

    <div class="columns">
      <div class="maskedWord"> 
        <span v-if="gameOver">{{ word }}</span><span v-else>{{ maskedWord }}</span> 
      </div>
    
      <div>
        <img :src="hangman">
      </div>
    
    </div>

    <div>
      Your Guesses: <span v-for="(letter,idx) in pickedLetters" :key="idx" class="guess">{{ letter }}</span>
    </div>

    <div v-if="gameOver" class="gameOver">
      <span v-if="won">
        Congratulations, you won!
      </span><span v-else>
        Sorry, you lost.
      </span>
      <button @click="newGame">Play Again</button>
    </div>

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'app',
  components: {
  },
  computed: {
    ...mapState(["word", "pickedLetters", "misses", "gameOver", "won"]),
    ...mapGetters(["maskedWord",  "hangman"])
  },
  created() {
    this.newGame();
  },
  methods:{
    async newGame() {
      await this.$store.dispatch('selectWord');
      window.addEventListener('keypress', this.doGuess);
    },
    doGuess(e) {
      let letter = String.fromCharCode(e.keyCode).toLowerCase();
      // hack as seen on multiple SO posts
      if(letter.toUpperCase() === letter.toLowerCase()) return;
      this.$store.dispatch('guess', letter)
    }
  }
}
</script>

<style>
.maskedWord {
  font-family: 'Courier New', Courier, monospace;
  font-size: 48px;
  text-transform: uppercase;
  vertical-align: middle;
  text-align: center;
  line-height: 200px;
}

.guess {
  font-family: 'Courier New', Courier, monospace;
  margin: 4px;
  text-transform: uppercase;
}

.columns {
	display: grid;
	grid-template-columns: 30% 80%;
}

.gameOver {
  margin-top: 10px;
  font-weight: bold;
}
</style>
