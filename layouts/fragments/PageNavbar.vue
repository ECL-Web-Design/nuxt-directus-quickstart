<template>
    <nav class="page-navbar">
        <div class="navbar-inner">
            <div class="nav-left">
                <site-logo-name :site-logo-src="constructedLogo.src ?? ''"
                                :site-name="siteName ?? ''"
                                is-home-link></site-logo-name>
            </div>
            <div class="nav-right">
                <div :class="{'mobile-open' : mobileOpen}" class="routes-wrapper">
                    <button class="mobile-close" @click="onMobileClose">
                        <slot name="close-icon">
                            Close Icon
                        </slot>
                    </button>
                    <ol class="page-routes">
                        <li v-for="(route, index) in navRoutes" :key="index" class="page-item">
                            <nuxt-link :to="route.route" class="page-link" @click="onMobileClose">{{
                                    route.label
                                }}
                            </nuxt-link>
                        </li>
                    </ol>
                    <transition-fade-in-out>
                        <div v-if="mobileOpen"
                             aria-hidden="true"
                             class="mobile-page-cover"
                             @click="onMobileClose"></div>
                    </transition-fade-in-out>
                </div>
                <button class="open-nav-menu mobile" @click="onMobileOpen">
                    <slot name="menu-icon"></slot>
                </button>
            </div>
        </div>
    </nav>
</template>

<script lang="ts" setup>

import {ref} from "vue"
import TransitionFadeInOut from "~/components/transitions/TransitionFadeInOut.vue"
import SiteLogoName from "~/components/builder-fragments/SiteLogoName.vue"
import useSiteSettings from "~/composables/useSiteSettings"

const emit = defineEmits<{
    (event: 'mobile-open'): void,
    (event: 'mobile-close'): void
}>()

const props = defineProps<{
    navRoutes: { route: string, label: string }[],
}>()

const {siteName, constructedLogo} = useSiteSettings()

const mobileOpen = ref(false)

function onMobileOpen() {
    mobileOpen.value = true
    emit('mobile-open')
}

function onMobileClose() {
    mobileOpen.value = false
    emit('mobile-close')
}
</script>

<style lang="scss" scoped>

.page-navbar {
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  box-sizing: border-box;
  background: var(--navbar-bg);
  padding: 1rem var(--page-margin);
  //box-shadow: var(--soft-shadow);
  font-size: var(--font-medium);
  z-index: 1000;
  box-shadow: var(--soft-shadow);
}

.navbar-inner {
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  max-width: var(--content-max-width);
  margin: 0 auto;
  z-index: 1000;
}

.open-nav-menu {
  background-color: transparent;
  color: var(--fg-color);
  height: 100%;
  display: none;
  align-items: center;
  justify-content: center;
  margin-left: auto;
}

.page-routes {
  display: flex;
  gap: 1rem;
}

.menu-icon {
  font-size: calc(var(--font-large) - 0.15rem);
}

.page-link {
  text-transform: uppercase;
  font-size: calc(var(--font-small) + 0.1rem);
  opacity: 0.8;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    height: 0.3rem;
    width: 0.3rem;
    left: 50%;
    bottom: 0;
    translate: -50% 130%;
    opacity: 0;
    background-color: var(--strong-bg);
    transition: translate 0.4s, opacity 0.2s;
  }
}

.page-link.router-link-active {
  opacity: 1;
  position: relative;

  &::before {
    opacity: 1;
    translate: -50% 180%;
  }
}

ol {
  li {
    display: flex;
    align-items: center;
  }
}

.mobile-close {
  display: none;
}

@media screen and (max-width: 65rem) {
  .open-nav-menu {
    display: flex;
  }

  .routes-wrapper {
    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
    transition: translate 0.4s;
    translate: 100% 0;
    backdrop-filter: blur(30px) brightness(0.6);
    -webkit-backdrop-filter: blur(30px) brightness(0.6);
    border-left: 1px solid var(--text-more-subtle);
  }

  .page-routes {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: min-content;
    gap: 1rem;

    padding: calc(var(--section-top-padding)) 4rem 0 2rem;
  }

  .page-link {
    width: 100%;

    &::before {
      top: 47%;
      left: 0;
      bottom: unset;
      translate: -120% -50%;
    }
  }

  .page-link.router-link-active {
    position: relative;

    &::before {
      translate: -200% -50%;
      opacity: 1;
    }
  }

  .mobile-close {
    background: transparent;
    display: flex;
    width: 100%;
    justify-content: flex-end;
    padding: 1rem;

    .material-icon-symbol {
      font-size: 1.7rem;
    }
  }

  .mobile-page-cover {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    translate: -100.2% 0;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .mobile-open {
    translate: 0 0;
  }
}

</style>
