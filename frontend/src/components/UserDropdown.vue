<template>
  <Dropdown :options="dropdownItems" v-bind="$attrs">
    <template v-slot="{ open }">
      <button
        class="flex h-12 items-center rounded-md py-2 duration-300 ease-in-out"
        :class="
          isCollapsed
            ? 'w-auto px-0'
            : open
              ? 'w-52 bg-surface-white px-2 shadow-sm'
              : 'w-52 px-2 hover:bg-surface-gray-3'
        "
      >
        <BrandLogo v-model="brand" class="h-8 max-w-16 flex-shrink-0" />
        <div
          class="flex flex-1 flex-col text-left duration-300 ease-in-out truncate"
          :class="
            isCollapsed
              ? 'ml-0 w-0 overflow-hidden opacity-0'
              : 'ml-2 w-auto opacity-100'
          "
        >
          <div
            class="text-base font-medium leading-none text-ink-gray-9 truncate"
          >
            {{ brand.name || 'Healthcare' }}
          </div>
          <div class="mt-1 text-sm leading-none text-ink-gray-7 truncate">
            {{ user.full_name }}
          </div>
        </div>
        <div
          class="duration-300 ease-in-out"
          :class="
            isCollapsed
              ? 'ml-0 w-0 overflow-hidden opacity-0'
              : 'ml-2 w-auto opacity-100'
          "
        >
          <FeatherIcon
            name="chevron-down"
            class="size-4 text-ink-gray-5"
            aria-hidden="true"
          />
        </div>
      </button>
    </template>
  </Dropdown>
  <AboutModal v-model="showAboutModal" />
</template>

<script setup>
import BrandLogo from '@/components/BrandLogo.vue'
import Apps from '@/components/Apps.vue'
import { session } from '@/data/session'
import { getUser } from '@/data/users'
import { getSettings } from '@/stores/settings'
import { showAboutModal } from '@/composables/modals'
import AboutModal from '@/components/Modals/AboutModal.vue'
import { Dropdown } from 'frappe-ui'
import { theme, toggleTheme } from '@/stores/theme'
import { computed, h, markRaw } from 'vue'

const props = defineProps({
  isCollapsed: {
    type: Boolean,
    default: false,
  },
})

const { settings, brand } = getSettings()
const logout = session.logout

const user = computed(() => getUser() || {})

const dropdownItems = computed(() => {
  if (!settings.value?.dropdown_items) return []

  let items = settings.value.dropdown_items

  let _dropdownItems = [
    {
      group: 'Dropdown Items',
      hideLabel: true,
      items: [],
    },
  ]

  items.forEach((item) => {
    if (item.hidden) return
    if (item.type !== 'Separator') {
      _dropdownItems[_dropdownItems.length - 1].items.push(
        dropdownItemObj(item),
      )
    } else {
      _dropdownItems.push({
        group: '',
        hideLabel: true,
        items: [],
      })
    }
  })

  return _dropdownItems
})

function dropdownItemObj(item) {
  let _item = JSON.parse(JSON.stringify(item))
  let icon = _item.icon || 'external-link'
  if (typeof icon === 'string' && icon.startsWith('<svg')) {
    icon = markRaw(h('div', { innerHTML: icon }))
  }
  _item.icon = icon

  if (_item.is_standard) {
    return getStandardItem(_item)
  }

  return {
    icon: _item.icon,
    label: _item.label,
    onClick: () =>
      window.open(_item.route, _item.open_in_new_window ? '_blank' : ''),
  }
}

function getStandardItem(item) {
  switch (item.name1) {
    case 'app_selector':
      return {
        component: markRaw(Apps),
      }
    case 'toggle_theme':
      return {
        icon: theme.value === 'dark' ? 'sun' : item.icon,
        label: item.label,
        onClick: toggleTheme,
      }
    case 'about':
      return {
        icon: item.icon,
        label: item.label,
        onClick: () => (showAboutModal.value = true),
      }
    case 'logout':
      return {
        icon: item.icon,
        label: item.label,
        onClick: () => logout.submit(),
      }
  }
}
</script>
