<template>
  <q-page padding>
    <!-- <q-toolbar class="bg-grey-3 text-primary rounded-borders">
      <q-toolbar-title>
        Shipping Calculator
      </q-toolbar-title>
    </q-toolbar> -->
    <div class="q-gutter-sm">
      <q-radio @input="changeVehicle" v-model="vehicleType" val="motor" label="Motor" color="blue" />
      <q-radio @input="changeVehicle" v-model="vehicleType" val="sedan" label="Sedan Car" color="teal" />
      <q-radio @input="changeVehicle" v-model="vehicleType" val="long-distance" label="Long Distance" color="red" />
    </div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="card" flat bordered>
        <q-card-section class="q-pt-xs">
          <div class="text-overline">
            <div class="text-title">
              Base fare ₱{{ vehicles[selectedIndex].baseFare }} + ₱{{ vehicles[selectedIndex].perKilometer }}/km
            </div>
          </div>
          <div>
            <q-chip dense square>
              <q-avatar dense color="blue" text-color="white">
                {{ vehicles[selectedIndex].min }}
              </q-avatar>
              min
            </q-chip>
            <q-chip dense square>
              <q-avatar dense color="red" text-color="white">
                {{ vehicles[selectedIndex].max }}
              </q-avatar>
              max
            </q-chip>
          </div>
          <div class="text-h5 q-mt-sm q-mb-xs">
            {{ vehicles[selectedIndex].label }}
          </div>
          <div class="text-caption text-grey">
            {{ vehicles[selectedIndex].description }}
          </div>
        </q-card-section>
        <q-separator inset />
        <q-card-actions align="center">
          <q-badge color="secondary">
            {{ inputKilometer }} (per kilometer)
          </q-badge>
          <q-slider @change="calculate" v-model="inputKilometer" :min="vehicles[selectedIndex].min" :max="vehicles[selectedIndex].max" />
        </q-card-actions>
      </q-card>
      <div>
        <q-chip icon="payments" size="lg" color="teal" text-color="white">
          Total: ₱{{ getTotal }}
        </q-chip>
      </div>
    </div>
  </q-page>
</template>

<script>
import _ from 'lodash';
  export default {
    data () {
      return {
        vehicleType: 'motor',
        selectedIndex: 0,
        inputKilometer: 1,
        total: 110,
        vehicles: [{
          baseFare: 100,
          perKilometer: 10,
          name: 'motor',
          label: 'Motorcycle',
          min: 1,
          max: 100,
          description: 'Honda Click 125, NMax, Aerox, Honda Beat, Suzuki Raider R150. Tricycle (w/ sidecar)'
        },
        {
          baseFare: 200,
          perKilometer: 13,
          name: 'sedan',
          label: 'Sedan Car',
          min: 1,
          max: 150,
          description: 'Toyota Innova, Ford Raptor, Hyundai Starex, Toyota Vios, Honda City, Hyundai Accent'
        },
        {
          baseFare: 250,
          perKilometer: 15,
          name: 'long-distance',
          label: 'Long Distance',
          min: 151,
          max: 300,
          description: 'Trucks, Toyota Innova, Ford Raptor, Hyundai Starex, Toyota Vios, Honda City, Hyundai Accent'
        }
        ]
      }
    },
    methods: {
      finishLock(data) {
        console.log(data)
      },
      changeVehicle () {
        this.selectedIndex = _.findIndex(this.vehicles, x => x.name === this.vehicleType);
        this.inputKilometer = this.vehicles[this.selectedIndex].min;
        this.calculate();
      },
      calculate () {
        const vehicle = this.vehicles[this.selectedIndex];
        const totalPerKm = vehicle.perKilometer * this.inputKilometer;
        this.total = totalPerKm + vehicle.baseFare;
      }
    },
    computed: {
      getTotal () {
        return this.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    }
  }
  </script>

  <style lang="sass" scoped>
  .card
    width: 100%
    max-width: 350px
  </style>