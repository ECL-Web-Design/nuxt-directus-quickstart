<template>
    <Teleport
            v-if="mounted"
            to=".airdrops">
        <transition name="modal-transition">
            <div v-if="showModal"
                 class="modal">
                <div class="blur"></div>
                <div class="shade"
                     @click="emit('close-modal')"></div>
                <div :class="{'content--hide-overflow' : !allowContentOverflow}"
                     class="modal-content">
                    <button class="close-button"
                            @click="emit('close-modal')">
                        <material-icon-symbol icon-name="close">
                        </material-icon-symbol>
                    </button>
                    <h3 class="header">
                        {{ props.header }}
                    </h3>
                    <div class="slot">
                        <slot>Modal Content</slot>
                    </div>
                </div>
            </div>
        </transition>
    </Teleport>
</template>

<script lang="ts" setup>

import {onMounted, PropType, ref} from 'vue'
import MaterialIconSymbol from "@/components/generic/MaterialIconSymbol.vue"

const props = defineProps({
                              showModal:            {
                                  default: false,
                                  type:    Boolean as PropType<boolean>
                              }, //
                              header:               {
                                  default: '',
                                  type:    String as PropType<string>
                              }, //
                              allowContentOverflow: {
                                  default: true,
                                  type:    Boolean as PropType<boolean>
                              }, //
                          })

const emit = defineEmits(['close-modal'])
const mounted = ref(false)

onMounted(() => {
    mounted.value = true
})

</script>

<style lang="scss" scoped>

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.blur {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  content: '';
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}

.shade {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  z-index: 1000;
  overscroll-behavior: none;
}

.header {
  font-size: 1.2rem;
  font-weight: 500;
  width: 100%;
  text-align: center;
}

.modal-content {
  position: relative;
  z-index: 1001;
  display: grid;
  grid-template-rows: min-content 1fr;
  background-color: var(--global-bg);
  border-radius: 5px;
  padding: 6px 12px 24px 12px;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.3);

  &--hide-overflow {
    overflow: hidden;
  }
}

.close-button {
  position: absolute;
  top: 8px;
  right: 8px;
  color: var(--global-highlight);
  cursor: pointer;
}


.modal-transition-enter-active, .modal-transition-leave-active {
  transition: all 0.4s;

  .blur, .shade, .modal-content {
    transition: opacity 0.4s, transform 0.3s;
  }
}

.modal-transition-enter-from {

  .blur, .shade, .modal-content {
    opacity: 0;
  }

  .modal-content {
    transform: scale(0.9) translateY(-30px);
  }
}

.modal-transition-leave-to {
  .blur, .shade, .modal-content {
    opacity: 0;
  }

  .modal-content {
    transform: scale(0.9) translateY(30px);
  }
}

@media screen and (max-width: 400px) {
  .modal-content {
    max-width: 350px;
    box-sizing: border-box;
  }
}

</style>

