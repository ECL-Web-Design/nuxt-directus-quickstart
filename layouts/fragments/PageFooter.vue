<template>
    <footer class="page-footer">
        <div v-if="showFooterInner" class="footer-inner">
            <section class="footer-left">
                <site-logo-name :site-logo-src="constructedLogo.src"
                                :site-name="siteName ?? ''"></site-logo-name>
                <nuxt-link :to="footerData?.footer_button?.route_link?.parsed_route ?? ''"
                           class="footer-button strong-button">
                    {{ footerData?.footer_button?.button_text }}
                </nuxt-link>
            </section>
            <footer-section v-for="(section, index) in footerData?.sections ?? []"
                            :key="index"
                            :content="section"></footer-section>
            <section class="footer-contact">
                <span class="footer-section-header">Contact</span>
                <div class="contact-links">
                    <a v-for="(link, index) in contactData?.contact_links"
                       :key="index"
                       :href="link.link"
                       class="contact-link">
                        <mdi-icon :icon-name="link?.key ?? ''"></mdi-icon>
                        {{ link?.label ?? '' }}
                    </a>
                </div>
            </section>
            <section class="footer-social">
                <div class="social-links">
                    <a v-for="(link, index) in socialLinks" :key="index"
                       :href="link?.link"
                       class="social-link">
                        <mdi-icon :icon-name="link?.key ?? ''" class="social-link-icon"></mdi-icon>
                    </a>
                </div>
                <div class="footer-copywrite-privacy">
                    <span class="copywrite">{{ footerData?.copywrite_info }}</span>
                    <underline-link :to="footerData?.privacy_policy_route?.parsed_route ?? ''"
                                    class="privacy-policy">
                        Privacy Policy
                    </underline-link>
                </div>
            </section>
        </div>
        <div v-else>
            Page Footer
        </div>
    </footer>
</template>

<script lang="ts" setup>


import {useAsyncData} from "#app"
import usePrivateDirectusClient from "~/composables/usePrivateDirectusClient"
import fetchFooter from "~/utils/directus/DirectusFetchFooter"
import {computed} from "vue"
import useSiteSettings from "~/composables/useSiteSettings"
import MdiIcon from "~/components/generic/MdiIcon.vue"
import UnderlineLink from "~/components/generic/UnderlineLink.vue"
import SiteLogoName from "~/components/builder-fragments/SiteLogoName.vue"
import FooterSection from "~/components/builder-fragments/FooterSection.vue"

const {data: footerData} = await useAsyncData('footer', () => {
    const directusSdk = usePrivateDirectusClient()
    return fetchFooter(directusSdk)
})

const showFooterInner = computed(() => {
    return constructedLogo.value && siteName.value && socialLinks.value && contactData.value
})

const {constructedLogo, siteName, socialLinks, contactData} = useSiteSettings()

</script>

<style lang="scss" scoped>

.page-footer {
  --footer-logo-height: var(--font-large);
  width: 100vw;
  gap: 5rem;
  background: var(--footer-bg);
  padding: 3rem 3rem 6rem 3rem;
  box-sizing: border-box;
  box-shadow: var(--soft-shadow);
}

.footer-inner {
  max-width: var(--content-max-width);
  width: 100%;
  margin: 0 auto;
  display: grid;
  gap: 3rem;
  flex-wrap: wrap;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  grid-auto-rows: min-content;
  justify-content: center;
}

.site-logo-name {
  font-size: var(--footer-logo-height);
  height: var(--footer-logo-height);
}

.footer-left {
  display: grid;
  gap: 0.8rem;
  grid-auto-rows: min-content;
}

.footer-social {
  min-height: 8rem;
}

:deep(.footer-section-header) {
  font-size: calc(var(--font-normal) + 0.2rem);
  text-transform: uppercase;
  opacity: 0.8;
  height: var(--footer-logo-height);
  margin-bottom: 0.8rem;
  display: flex;
  align-items: flex-end;
}

.footer-copywrite-privacy {
  display: grid;
  gap: 0.5rem;
  grid-template-rows: min-content;
  justify-content: center;
}

.copywrite, .privacy-policy {
  font-size: var(--font-small);
  opacity: 0.8;
}

.privacy-policy {
  width: fit-content;
}

.footer-social {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}

.footer-contact {
  display: grid;
  grid-auto-rows: min-content;
}

.social-links {
  display: flex;
  gap: 1.5rem;
}

.social-link-icon {
  font-size: calc(var(--font-medium));
  transition: scale 0.2s;

  &:hover {
    scale: 1.15
  }
}

.contact-links {
  display: grid;
  gap: 0.7rem;
}

.contact-link {
  display: flex;
  gap: 0.5rem;
  font-size: var(--font-small);
  opacity: 0.7;
  transition: opacity 0.3s;

  .mdi-icon {
    font-size: calc(var(--font-small) + 0.3rem);
  }

  &:hover {
    opacity: 1;
  }
}

.social-links {
  margin-top: 0.2rem;
}

@media screen and (max-width: 600px) {
  .footer-inner {

  }
}

</style>
