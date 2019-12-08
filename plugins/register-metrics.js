import Vue from 'vue'
import MetricRequestsBookingsCancellations from '../components/scoreboard/requests-bookings-cancellations.vue'
import MetricTimeUntilArrival from '../components/scoreboard/time-until-arrival.vue'
import MetricAccomodationCategory from '../components/scoreboard/accomodation-category.vue'
import MetricFamiliySituation from '../components/scoreboard/family-situation.vue'
import MetricCountryOfOrigin from '../components/scoreboard/country-of-origin.vue'
import MetricTargetAreas from '../components/scoreboard/target-areas.vue'
import MetricLengthOfStay from '../components/scoreboard/length-of-stay.vue'

Vue.component(
  'requests-bookings-cancellations',
  MetricRequestsBookingsCancellations
)
Vue.component('time-until-arrival', MetricTimeUntilArrival)
Vue.component('accomodation-category', MetricAccomodationCategory)
Vue.component('family-situation', MetricFamiliySituation)
Vue.component('country-of-origin', MetricCountryOfOrigin)
Vue.component('target-areas', MetricTargetAreas)
Vue.component('length-of-stay', MetricLengthOfStay)
