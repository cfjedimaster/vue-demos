<template>
  <div> 
    <h1>Hangman</h1>
    <p>
    To play, simply select letters to try to guess the word. Everytime you select an incorrect letter you will get 
    closer to losing the game... and your neck!
    </p>

    <div class="columns">

      <div class="maskedWord">
        {{ maskedWord }}
      </div>
    
      <div>
        <img :src="hangman">
      </div>
    
    </div>

    <div>
      Your Guesses: <span v-for="(letter,idx) in pickedLetters" :key="idx" class="guess">{{ letter }}</span>
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
    ...mapState(["word", "pickedLetters", "misses"]),
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
      console.log('letter guessed '+letter);
      this.$store.dispatch('guess', letter);
      this.$nextTick(() => {
        if(this.$store.state.gameOver) {
            window.removeEventListener('keypress', this.doGuess);
            if(this.$store.state.won) {
              alert('You Won!');
              this.newGame();
            } else {
              alert('You lost! The word was '+this.word);
              this.newGame();
            }
        }
      });
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

</style>
