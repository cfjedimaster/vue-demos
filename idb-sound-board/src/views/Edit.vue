<template>
  <div>
    <v-text-field label="Sound Name" required v-model="title" />
    <v-btn class="mr-4" @click="record">
      <v-icon>mdi-record</v-icon>
      {{ recordingStatus }}
    </v-btn>
    <v-btn class="mr-4" :disabled="!blob" @click="play">
      <v-icon>mdi-play</v-icon>
      Play Sound
    </v-btn>
    <v-btn color="primary" @click="save" :disabled="cantSave">Save</v-btn>
  </div>
</template>

<script>
/*global WebAudioRecorder*/

export default {
  data() {
    return {
      recordingStatus:'Record Sound',
      recording: false,
      title:'', 
      recorder:null, 
      blob:null, 
      stream:null
    }
  },
  computed: { 
    cantSave() {
      //check title and recording
      if(this.title === '') return true;
      if(!this.blob) return true;
      return false;
    }
  },
  methods: {
    /*
    I handle recording, but also stopping during recording. 
    */
    async record() {

      if(this.recording) {
        this.stream.getAudioTracks()[0].stop();
        this.recorder.finishRecording();
        this.recordingStatus = 'Record Sound';
        this.recording = false;
        return;
      }

      console.log('begin record');

      var constraints = {
          audio: true,
          video: false
      }

      this.stream = await navigator.mediaDevices.getUserMedia(constraints);

      var audioContext = new AudioContext;
      var input = audioContext.createMediaStreamSource(this.stream);

      let configs = {
        workerDir:'/web-audio-recorder/'
      };

      this.recorder = new WebAudioRecorder(input, configs);
      
      this.recorder.setOptions({
        timeLimit: 30,
        encodeAfterRecord:true,
        ogg: { quality: 0.5 },
        mp3: { bitRate: 160 } 
      });

      this.recorder.onComplete = (recorder, blob) => {
        this.recordingStatus = 'Record Sound';
        this.blob = blob;
      };

      this.recorder.startRecording();
      this.recordingStatus = 'Stop Recording';
      this.recording = true;
      this.blob = null;
      console.log('ok it worked');

    },
    play() {
      let player = new window.Audio();
      player.src = window.URL.createObjectURL(this.blob);
      player.play();
    },
    async save() {
      console.log('save it');
      let sound = {
        title: this.title, 
        blob: this.blob
      };
      await this.$store.dispatch('saveSound', sound);
      this.$router.push('/');
      
    }
  }
}
</script>

