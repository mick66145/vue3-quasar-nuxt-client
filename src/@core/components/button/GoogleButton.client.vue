<template>
  <div>
    <base-button v-if="!useIconStyle" color="white" text-color="black" :outline="outline" :rounded="rounded"
      :label="buttonLabel" @click="handleClick" />
    <q-icon v-else class="cursor-pointer" size="3rem" @click="handleClick">
      <img src="@/assets/images/socialite-images/circle-google.svg">
    </q-icon>
  </div>
</template>

<script>
import { defineComponent, computed, onMounted, toRefs } from 'vue-demi'
import useGoogle from '@/composables/useGoogle'
import useLoading from '@/composables/useLoading'

const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_CLIENT_SECRET, VITE_GOOGLE_REDIRECT_URI, } = useEnv()

export default defineComponent({
  props: {
    label: { type: String },
    outline: { type: Boolean, default: false },
    rounded: { type: Boolean, default: false },
    channelId: { type: String, default: VITE_GOOGLE_CLIENT_ID },
    channelSecret: { type: String, default: VITE_GOOGLE_CLIENT_SECRET },
    redirectUri: { type: String, default: VITE_GOOGLE_REDIRECT_URI },
    scope: { type: String, default: 'profile openid email' },
    useIconStyle: { type: Boolean, default: false },
    action: { type: String, default: 'oauth2' }, // oauth2,share
  },
  emits: ['handleSuccess'],
  setup(props, { emit }) {
    const { $i18n } = useNuxtApp();

    // data
    const { label, channelId, channelSecret, redirectUri, scope } = toRefs(props)

    // computed
    const buttonLabel = computed(() => {
      return label.value ? label.value : $i18n.t('g.btn.google')
    })

    // mounted
    onMounted(async () => {
      if (isRedirect.value) {
        showLoading({})
        const { accessToken, idToken } = await oauth2Token()
        hideLoading()
        emit('handleSuccess', { accessToken, idToken })
      }
    })

    // methods
    const handleClick = () => {
      const actionObj = {
        oauth2: () => { oauth2() },
        share: () => { share() },
      }
      actionObj[props.action]()
    }

    // use
    const { isRedirect, oauth2, share, oauth2Token } = useGoogle({
      channelId: channelId.value,
      channelSecret: channelSecret.value,
      redirectUri: redirectUri.value,
      scope: scope.value,
    })
    const { showLoading, hideLoading } = useLoading({})

    return {
      buttonLabel,
      handleClick,
    }
  },
})
</script>

<style lang="postcss" scoped></style>
