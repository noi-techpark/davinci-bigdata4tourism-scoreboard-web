export default [
  {
    id: 'metric0',
    title: 'Inquiry',
    description:
      'This metric shows the type of inquiry, partitioned in requests, bookings and cancellations. While requests and bookings are unique datasets, a cancellations must be a follow up to an existing booking.',
    component: 'requests-bookings-cancellations'
  },
  {
    id: 'metric1',
    title: 'Time until arrival',
    description:
      'This metric shows the days between the date of a request or a booking and the planned arrival date (important: the computation can take up to 1 minute).',
    component: 'time-until-arrival'
  },
  {
    id: 'metric2',
    title: 'Accommodation',
    description:
      'This metric provides information about the different accomodation categories. Metrics and diagram always show the percentage based on the selected amount of records, either as overall value or as timeline.',
    component: 'accomodation-category'
  },
  {
    id: 'metric3',
    title: 'Family',
    description:
      'This metric provides information about the different types of guests. "Unaccompanied" means one adult and no children. "Groups without children" means more than 2 adults and no children. "Couples without children" means two adults and no children. "Singles with children" means one adult and one or more children. "Families" means two adults and one or more children.',
    component: 'family-situation'
  },
  {
    id: 'metric4',
    title: 'Origin',
    description:
      'This metric shows the origin countries of visitors, with the top 5 countries, according to the filtered selection.',
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
    description:
      'This metric shows the target municipalities of visitors, with the top 5 municipalities, according to the filtered selection. Hover over map to see specific values.',
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
    description:
      'This metric shows the number of days guests stayed (days between arrival and departure).',
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
