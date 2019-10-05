<template>
  <p>
    Successful login! Redirecting you to your sites...
  </p>
</template>

<script>
export default {
  created() {
    if(document.location.hash && document.location.hash.indexOf('access_token') >= 0) {
      let access_token = document.location.hash.split('=')[1].split('&')[0];
      this.$store.commit('storeToken', access_token);
      console.log('access_token', access_token);
      this.$router.replace('sites');
    }
  }
}
</script>