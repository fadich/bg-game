<template>
  <div id="app">
    <nav>
      <div></div>
      <div class="tools">
        <span class="tools-title">Tools</span>
        <ul class="tools-content">
          <li>
            <a @click="fullScreen">full screen</a>
          </li>
        </ul>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import icons from 'glyphicons'
import browser from './assets/browser-behaviours'

export default {
  name: 'app',
  data () {
    return {
      icons: icons
    }
  },
  methods: {
    fullScreen (ev) {
      ev && ev.preventDefault()

      browser.toggleFullScreen()
    }
  }
}
</script>

<style lang="scss">
  body {
    overflow: auto;
    min-width: 1250px;
  }

  nav {
    height: 80px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .tools {
      padding: 5px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      &-title {
        font-size: 28px;
      }

      &-content {
        display: none;
        cursor: pointer;
        list-style-type: none;
        padding: 0;
      }

      &:hover .tools-content {
        display: block;
      }
    }
  }
</style>
