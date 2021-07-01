<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
          />

        <q-toolbar-title>
          Cloud Bytes App
        </q-toolbar-title>
         <q-btn flat round color="grey-3" icon="lock" @click="lock" />
         <q-btn flat round color="grey-3" :icon="getFullScreenIcon" @click="fullScreen" />
        <div class="q-ml-md">
          v0.12
        </div>
      </q-toolbar>
      <q-toolbar inset class="bg-white text-primary">
        <q-toolbar-title>
          <q-icon name="subdirectory_arrow_right" /> {{ getRouteName }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :width="250"
      overlay
      content-class="bg-grey-1"
      >
      <q-scroll-area class="fit">
        <q-list bordered padding>
          <template v-for="(menu, i) in menus">
            <q-item
              :to="menu.to" exact
              :key="i"
              clickable
              v-ripple
              :active="menu.name === activeMenu"
              @click="activeMenu = menu.name"
              >
              <q-item-section avatar>
                <q-icon :name="menu.icon" />
              </q-item-section>
              <q-item-section>{{ menu.label }}</q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { AppFullscreen } from 'quasar'
  export default {
    name: 'MainLayout',
    data () {
      return {
        isFullScreen: false,
        leftDrawerOpen: false,
        activeMenu: 'shipping',
        menus: [{
          name: 'shipping',
          icon: 'local_shipping',
          label: 'Shipping Calculator',
          to: '/shipping-calculator'
        },
          {
            name: 'pricing',
            icon: 'summarize',
            label: 'Pricing Report',
            to: 'pricing-report'
          },
          {
            name: 'quotation',
            icon: 'ballot',
            label: 'Quotations',
            to: 'quotation'
          }]
      }
    },
    computed: {
      getFullScreenIcon() {
        if (this.isFullScreen) return 'fullscreen_exit';
        else return 'fullscreen'
      },
      getRouteName () {
        return this.$route.name;
      }
    },
    methods: {
      lock () {
        localStorage.setItem('pattern-lock', null)
        this.$router.replace('/pattern-lock');
      },
      fullScreen () {
        if (!this.isFullScreen){
          AppFullscreen.request()
            .then(() => this.isFullScreen = true)
            .catch(err => this.isFullScreen = false);
        } else {
          AppFullscreen.exit()
            .then(() => this.isFullScreen = false)
            .catch(err => this.isFullScreen = false);
        }
      }
    }
  }
  </script>