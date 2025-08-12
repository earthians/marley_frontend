<template>
  <div
    class="relative flex h-full flex-col justify-between transition-all duration-300 ease-in-out"
    :class="isSidebarCollapsed ? 'w-12' : 'w-[220px]'"
  >
    <div>
      <UserDropdown class="p-2" :isCollapsed="isSidebarCollapsed" />
    </div>
    <div class="flex-1 overflow-y-auto py-6">
      <div v-for="view in allViews" :key="view.label">
        <div
          v-if="!view.hideLabel && isSidebarCollapsed && view.views?.length"
          class="mx-2 my-2 h-1 border-b"
        />
        <Section
          :label="view.name"
          :hideLabel="view.hideLabel"
          :opened="view.opened"
        >
          <template #header="{ opened, hide, toggle }">
            <div
              v-if="!hide"
              class="flex cursor-pointer gap-1.5 px-1 text-base font-medium text-ink-gray-5 transition-all duration-300 ease-in-out"
              :class="
                isSidebarCollapsed
                  ? 'ml-0 h-0 overflow-hidden opacity-0'
                  : 'ml-2 mt-4 h-7 w-auto opacity-100'
              "
              @click="toggle()"
            >
              <FeatherIcon
                name="chevron-right"
                class="h-4 text-ink-gray-9 transition-all duration-300 ease-in-out"
                :class="{ 'rotate-90': opened }"
              />
              <span>{{ view.name }}</span>
            </div>
          </template>
          <nav class="flex flex-col">
            <SidebarLink
              v-for="link in view.views"
              :icon="link.icon"
              :label="link.label"
              :to="link.to"
              :isCollapsed="isSidebarCollapsed"
              class="mx-2 my-0.5"
            />
          </nav>
        </Section>
      </div>
    </div>
    <div class="m-2 flex flex-col gap-1">
      <SidebarLink
        :label="isSidebarCollapsed ? 'Expand' : 'Collapse'"
        :isCollapsed="isSidebarCollapsed"
        @click="isSidebarCollapsed = !isSidebarCollapsed"
        class=""
      >
        <template #icon>
          <span class="grid h-4 w-4 flex-shrink-0 place-items-center">
            <CollapseSidebar
              class="h-4 w-4 text-ink-gray-7 duration-300 ease-in-out"
              :class="{ '[transform:rotateY(180deg)]': isSidebarCollapsed }"
            />
          </span>
        </template>
      </SidebarLink>
    </div>
  </div>
</template>

<script setup>
import LucideLayoutDashboard from '~icons/lucide/layout-dashboard'
import Section from '@/components/Section.vue'
import UserDropdown from '@/components/UserDropdown.vue'
import BedManagementIcon from '~icons/lucide/bed'
import DoctorIcon from '~icons/lucide/stethoscope'
import AppointmentDeskIcon from '~icons/lucide/calendar-plus'
import MonitorIcon from '~icons/lucide/monitor'
import KioskIcon from '~icons/lucide/tablet'
import CollapseSidebar from '@/components/Icons/CollapseSidebar.vue'
import SidebarLink from '@/components/SidebarLink.vue'
import { FeatherIcon } from 'frappe-ui'
import { useStorage } from '@vueuse/core'
import { ref, computed } from 'vue'

const isSidebarCollapsed = useStorage('isSidebarCollapsed', false)

const allViews = computed(() => {
  const links = [
    // {
    //   label: 'Dashboard',
    //   icon: LucideLayoutDashboard,
    //   to: 'Dashboard'
    // },
    {
      label: 'Appointment Desk',
      icon: AppointmentDeskIcon,
      to: 'Waitlist',
    },
    // {
    //   label: 'Practitioner Screen',
    //   icon: DoctorIcon,
    //   to: 'practitioner_screen',
    // },
    {
      label: 'Bed Management',
      icon: BedManagementIcon,
      to: 'bed_management',
    },
    {
      label: 'Queue',
      icon: MonitorIcon,
      to: 'QueueSelection',
    },
    {
      label: 'Patient Self Service',
      icon: KioskIcon,
      to: 'Kiosk',
    },
  ]

  let _views = [
    {
      name: 'All Views',
      hideLabel: true,
      opened: true,
      views: links.filter((link) => {
        if (link.condition) {
          return link.condition()
        }
        return true
      }),
    },
  ]
  return _views
})

</script>
