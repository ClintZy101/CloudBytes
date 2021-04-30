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

        <div>
          v0.1
        </div>
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

  export default {
    name: 'MainLayout',
    data () {
      return {
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
    }
  }
  </script>