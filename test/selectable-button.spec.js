// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later


import { mount } from '@vue/test-utils'
import SelectableButton from '@/components/selectable-button.vue'

describe('selectable-button', () => {
  test('is not marked as selected', () => {
    const wrapper = mount(SelectableButton, {
      propsData: {
        text: 'Italy',
        value: 'IT',
        selectedValue: 'ITX',
        selectedColor: 'metric0',
        click: () => {}
      }
    })
    expect(wrapper.html()).toContain('Italy')
    expect(wrapper.classes()).toContain('border-black')
  })

  test('is marked as selected', () => {
    const wrapper = mount(SelectableButton, {
      propsData: {
        text: 'Italy',
        value: 'IT',
        selectedValue: 'IT',
        selectedColor: 'metric0',
        click: () => {}
      }
    })
    expect(wrapper.html()).toContain('Italy')
    expect(wrapper.classes()).toContain('border-metric0-500')
  })

  test('fires event when clicked', () => {
    let selectedValue = 'ITX'

    const wrapper = mount(SelectableButton, {
      propsData: {
        text: 'Italy',
        value: 'IT',
        selectedValue: selectedValue,
        selectedColor: 'metric0',
        click: (value) => {
          selectedValue = value
        }
      }
    })

    const button = wrapper.find('button')
    button.trigger('click')

    expect(selectedValue).toBe('IT')
  })
})
