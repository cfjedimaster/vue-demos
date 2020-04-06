<template>
  <div>
    <div v-if="prompt">
        Give me a {{ prompt }}: <input v-model="currentPrompt"> 
        <button @click.prevent="savePrompt">Next</button>
    </div>
    {{ prompts }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  created() {
    this.$store.dispatch('initMadLib');
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