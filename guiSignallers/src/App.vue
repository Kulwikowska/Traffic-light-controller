<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <Signallers />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Signallers from './components/Signallers.vue'

export default {
  name: 'app',
  components: {
    Signallers
  }
}
</script>

<style>

</style>