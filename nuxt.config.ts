import {defineNuxtConfig} from "nuxt/config"

export default defineNuxtConfig({
                                    //global stylesheets go here
                                    css:           [
                                        '~/assets/base.css',
                                        'primevue/resources/themes/lara-light-blue/theme.css',
                                        '~/assets/primevue-overrides.css'
                                    ],
                                    runtimeConfig: {
                                        //Create a file called .env and put these values in:
                                        // NUXT_DIRECTUS_PRIVATE_URL='<YOUR URL>'
                                        // &
                                        // NUXT_DIRECTUS_PRIVATE_TOKEN='<YOUR TOKEN>'
                                        // The values in the env file will replace the values below,
                                        // which can then be accessed with either process.env.VARIABLE_NAME or useRuntimeConfig()
                                        // Nuxt app must be constructed first to use useRuntimeConfig, so cannot be used in this file or local modules
                                        //
                                        // IMPORTANT -- do not remove the .env selector in the gitignore file, or you risk publish your api secret
                                        // Values are only available server side
                                        directusPrivateUrl:   'WILL BE OVERRIDDEN AUTOMATICALLY',
                                        directusPrivateToken: 'WILL BE OVERRIDDEN AUTOMATICALLY',
                                        public:               {
                                            //public values go here, available to server and client
                                            //Use same method as above + PUBLIC: NUXT_PUBLIC_VAR_NAME
                                            directusPublicUrl:   'WILL BE OVERRIDDEN AUTOMATICALLY',
                                            directusPublicToken: 'WILL BE OVERRIDDEN AUTOMATICALLY',
                                            //url for fetching iconify icon data
                                            iconsUrl: 'WILL BE OVERRIDDEN AUTOMATICALLY'
                                        }
                                    },
                                    devtools:      {enabled: true},
                                    modules:       ['nuxt-primevue'],
                                    components:    {
                                        dirs: []
                                    },
                                    imports:       {
                                        autoImport: false
                                    },
                                })
