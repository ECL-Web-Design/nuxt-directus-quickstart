<template>
    <div class="feature-text">
        <span v-for="(chunk, index) in textParsed" :key="index"
              :class="{'featured' : chunk.featured, 'featured-gradient' : chunk.featured && gradientText}">
        {{ chunk.text }}
    </span>
    </div>
</template>

<script lang="ts" setup>

import {computed} from "vue"

const props = defineProps<{
    text: string,
    featuredWords?: string[],
    gradientText?: boolean
}>()

const textParsed = computed<{ text: string, featured: boolean }[]>(() => {
    if (props.text.length === 0) {
        return []
    }

    if (!props.featuredWords || props.featuredWords.length === 0) {
        return [{text: props.text, featured: false}]
    }

    const splitString = props.text.split(' ')

    let currentChunk = {
        text:     '',
        featured: false
    }

    let init = false

    const compiledText: { text: string, featured: boolean }[] = []

    for (const word of splitString) {

        const isFeatured = props.featuredWords.some(checkWord => checkWord.toLowerCase() === word.toLowerCase())

        if (!init) {
            currentChunk.featured = isFeatured
            init = true
        }

        if (currentChunk.featured !== isFeatured) {
            compiledText.push({...currentChunk})

            currentChunk.text = ''
        }

        currentChunk.featured = isFeatured
        currentChunk.text += `${word} `
    }

    compiledText.push({...currentChunk})

    return compiledText
})

</script>

<style lang="scss" scoped>

.featured {
  color: var(--feature-color, #00c);
  font-weight: bold;
}

.featured-gradient {
  --feature-gradient: var(--feature-color-gradient, linear-gradient(353deg, rgba(231, 37, 93, 1) 12%, rgba(60, 101, 178, 1) 89%));
  background-image: var(--feature-gradient);
  background-clip: text;
  -webkit-background-clip: text;
  background-size: 100%;
  color: transparent;
}
</style>
