export default [
  {
    id: 'metric0',
    title: 'Inquiry',
    description:
      'Composition of the guests according to family situation, relative to the total number of 309,680 guests',
    component: 'requests-bookings-cancellations'
  },
  {
    id: 'metric1',
    title: 'Time until arrival',
    description:
      'Time until arrival (the computation takes a while - maybe take a coffee break)',
    component: 'time-until-arrival'
  },
  {
    id: 'metric2',
    title: 'Accommodation',
    description: 'Accommodation category.',
    component: 'accomodation-category'
  },
  {
    id: 'metric3',
    title: 'Family',
    description: 'Family situation.',
    component: 'family-situation'
  },
  {
    id: 'metric4',
    title: 'Origin',
    description: 'Countries of origin.',
    component: 'country-of-origin',
    map: {
      center: {
        lat: 46.65,
        lng: 11.35
      },
      zoom: 4
    }
  },
  {
    id: 'metric5',
    title: 'Target',
    description: 'Target areas.',
    component: 'target-areas',
    map: {
      center: {
        lat: 46.65,
        lng: 11.35
      },
      zoom: 9
    }
  },
  {
    id: 'metric6',
    title: 'Length of stay',
    description: 'Length of stay.',
    component: 'length-of-stay'
  },
  {
    id: 'metric7',
    title: 'Data quality',
    description:
      'This metric shows how many sources uploaded data to the database in a specific timeframe.',
    component: 'data-quality'
  }
]
