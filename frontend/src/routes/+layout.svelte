<script lang="ts">
  import { onMount } from 'svelte'
  import { onNavigate } from '$app/navigation'

  import App from '$lib/js/index'
  import { registerServiceWorker } from '$UITools/serviceWorker'
  import Header from '$components/Header.svelte'
  import Cursor from '$UITools/Cursor/index.svelte'
  import Loader from '$UITools/InitialLoader/index.svelte'
  import SmoothScroller from '$UITools/SmoothScroller/index.svelte'
  import NotificationWrapper from '$UITools/Notifications/NotificationWrapper.svelte'
  import {
    firstLoadComplete,
    setFirstOpen,
    setRessourceToValide,
  } from '$stores/UX/initialLoaderStore'

  import { fetchMockData } from '$lib/utils/mockService'
  import { authStore } from '$stores/Data/AuthStore/authStore.js'

  onNavigate(async (navigation) => {
    if (!document.startViewTransition) return

    await new Promise<void>((resolve) => {
      document.startViewTransition(async () => {
        // console.log("2. Déclenchement de la transition - Préparation de l'animation");
        // // Préparation des éléments pour l'animation de sortie
        // // Exemple : document.querySelector('.ma-classe').classList.add('etat-sortie');

        // console.log("3. Début de l'animation de sortie");
        // // Insérez ici la logique pour déclencher les animations de sortie

        // // Attendez un délai approprié pour permettre l'animation de sortie
        // // Exemple : await new Promise(resolve => setTimeout(resolve, 1000));

        // console.log("4. Mise à jour du DOM et début de l'animation d'entrée", navigation);
        // // Ici, vous pouvez attendre la fin de la navigation si nécessaire
        // //await navigation.complete;

        // // Appliquez des animations d'entrée ou d'autres transformations nécessaires
        // // Exemple : document.querySelector('.nouvelle-classe').classList.add('etat-entree');

        // // Assurez-vous que toutes les animations sont terminées avant de résoudre la promesse
        // // Exemple : await new Promise(resolve => setTimeout(resolve, 1000));

        // console.log("5. Fin de l'animation et nettoyage");
        // // Nettoyage des styles temporaires ou des classes utilisées pour l'animation

        resolve() // Fin de la transition
      })
    })
  })

  $: console.log('authStore', $authStore)

  onMount(async () => {
    new App()
    registerServiceWorker()
    // Détermine le premier chargement de l'application
    setFirstOpen(true)

    authStore.checkAuthAPI()

    // Test de chargement de ressource au démarrage de l'application
    const mockData = await fetchMockData()
    if (mockData) {
      setRessourceToValide(true)
      //console.log($loadingStates);
    }
  })
</script>

<svelte:head>
  <link rel="icon" href="/favicon.png" />
  <meta name="viewport" content="width=device-width" />
  <link rel="manifest" href="/pwa/manifest.webmanifest" />
  <meta name="theme-color" content="#4285f4" />
</svelte:head>

{#if !$firstLoadComplete}
  <Loader />
{/if}

<NotificationWrapper />
<Header />

<SmoothScroller>
  <main>
    <slot />
  </main>
</SmoothScroller>

<style lang="scss" global>
  @import './src/styles/main';
</style>
