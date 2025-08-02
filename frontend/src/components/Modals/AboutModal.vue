<template>
  <Dialog v-model="show" :options="{ size: 'sm' }">
    <template #body>
      <div class="p-4 pt-5">
        <div class="flex justify-center">
          <div class="flex flex-col items-center">
            <BrandLogo class="mb-3 size-12" />
            <h3 class="font-semibold text-xl text-ink-gray-9">Healthcare</h3>
          </div>
        </div>
        <hr class="border-t my-3 mx-2" />
        <div>
          <a
            v-for="link in links"
            :key="link.label"
            class="flex py-2 px-2 hover:bg-surface-gray-1 rounded cursor-pointer"
            target="_blank"
            :href="link.url"
          >
            <component
              v-if="link.icon"
              :is="link.icon"
              class="size-4 mr-2 text-ink-gray-7"
            />
            <span class="text-base text-ink-gray-8">
              {{ link.label }}
            </span>
          </a>
        </div>
        <hr class="border-t my-3 mx-2" />
        <p class="text-sm text-ink-gray-6 px-2 mt-2">
          © earthians Health Informatics Pvt. Ltd. and contributors
        </p>
      </div>
    </template>
  </Dialog>
</template>
<script setup>
import BrandLogo from '@/components/BrandLogo.vue'
import LucideGlobe from '~icons/lucide/globe'
import LucideGitHub from '~icons/lucide/github'
import LucideHeadset from '~icons/lucide/headset'
import LucideBug from '~icons/lucide/bug'
import LucideBookOpen from '~icons/lucide/book-open'
import TelegramIcon from '@/components/Icons/TelegramIcon.vue'

let show = defineModel()

let links = [
  {
    label: 'Website',
    url: 'https://marley.frappe.cloud',
    icon: LucideGlobe,
  },
  {
    label: 'GitHub Repository',
    url: 'https://github.com/earthians/marley',
    icon: LucideGitHub,
  },
  {
    label: 'Documentation',
    url: 'https://marley.frappe.cloud/docs',
    icon: LucideBookOpen,
  },
  {
    label: 'Telegram Channel',
    url: 'https://t.me/frappehealth',
    icon: TelegramIcon,
  },
  {
    label: 'Report an Issue',
    url: 'https://github.com/earthians/marley/issues',
    icon: LucideBug,
  },
  {
    label: 'Contact Support',
    url: 'https://support.frappe.io',
    icon: LucideHeadset,
  },
]
</script>
