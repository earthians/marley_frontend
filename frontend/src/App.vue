<template>
  <FrappeUIProvider>
    <Layout>
      <router-view />
    </Layout>
  </FrappeUIProvider>
</template>

<script setup>
  import { setTheme } from '@/stores/theme'
  import { FrappeUIProvider, setConfig } from 'frappe-ui'
  import { computed, defineAsyncComponent, onMounted } from 'vue'

  
  const DesktopLayout = defineAsyncComponent(
    () => import('./components/Layouts/DesktopLayout.vue'),
  )
  const Layout = computed(() => {
    return DesktopLayout
  })
  onMounted(() => setTheme())

  setConfig('systemTimezone', window.timezone?.system || null)
  setConfig('localTimezone', window.timezone?.user || null)
</script>