<template>
  <div>
    <div v-if="prompt" class="promptBlock">
        <p>
        Give me a {{ prompt }}: 
        <input v-model="currentPrompt" ref="promptField" v-on:keyup.enter="savePrompt"> 
        <button @click.prevent="savePrompt">Next</button>
        </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  created() {
    this.$store.dispatch('initMadLib');
    this.$nextTick(() => {
      if(this.$refs.promptField) this.$refs.promptField.focus();
    });
  },
  watch: {
    prompt(n,o) {
      console.log('prompt changed',n,o);
      this.$nextTick(() => {
        if(this.$refs.promptField) this.$refs.promptField.focus();
      });
    }
  },
  computed: {
    ...mapGetters(['prompts']),
    prompt() {
      return this.prompts[this.promptIndex];
    }
  },
  data() {
    return {
      promptIndex:0,
      currentPrompt:'',
      answers:[]
    }
  },
  methods: {
    savePrompt() {
      if(this.currentPrompt === '') return;
      this.answers.push(this.currentPrompt);
      this.promptIndex++;
      this.currentPrompt = '';
      if(this.promptIndex === this.prompts.length) {
        this.$store.commit('setAnswers', this.answers);
        this.$router.replace('/render');
      }
    }
  }
}
</script>

<style scoped>

.promptBlock {
  margin: auto;
  width: 80%;
  text-align: center;
}

input {
  height: 28px;
  font-size: 28px;
  width: 140px;
}

button {
  margin-left: 5px;
  height: 36px;
  vertical-align: top;
}

p {
  font-size: 30px;
}
</style>