<template>
  <div id="layout" class="font-sans">
    <div class="mb-4">
      <div class="mb-4 xl:mb-0 flex content-end border-b border-gray-500">
        <div class="p-4 flex flex-col justify-center">
          <nuxt-link to="/"
            ><img src="~/static/noi.svg" alt="NOI" class="image-noi"
          /></nuxt-link>
        </div>
        <div
          class="flex-1 p-4 border-l border-gray-500 leading-tight font-light text-3xl sm:text-4xl"
        >
          <nuxt-link to="/"
            >BigData4Tourism<br />
            Scoreboard</nuxt-link
          >
        </div>
        <div class="p-4 hidden xl:flex flex-col justify-end">
          <img
            src="~/static/efre-fesr.jpg"
            alt="Europäischer Fonds für regionale Entwicklung - Südtirol - Fondo europeo per lo sviluppo regionale - Alto Adige"
            class="image-efre-fesr"
          />
        </div>
      </div>
      <div class="mx-4 flex xl:hidden justify-center">
        <img
          src="~/static/efre-fesr.jpg"
          alt="Europäischer Fonds für regionale Entwicklung - Südtirol - Fondo europeo per lo sviluppo regionale - Alto Adige"
          class="image-efre-fesr"
        />
      </div>
    </div>

    <div class="px-0 xl:px-4">
      <nuxt />

      <div
        class="mt-4 mb-0 xl:mb-4 flex flex-col xl:flex-row justify-between bg-gray-300"
      >
        <div class="m-4 md:m-5 flex flex-col">
          <div class="mb-3 text-base md:text-2xl font-bold">
            &copy; {{ year }} BigData4Tourism - a project from NOI Techpark
          </div>
          <div
            class="flex flex-col sm:flex-row leading-relaxed text-xs md:text-base"
          >
            <div class="mr-5">
              NOI SPA<br />
              Techpark Südtirol / Alto Adige<br />
              <a href="mailto:info@davinci.bz.it" class="hover:underline"
                >info@davinci.bz.it</a
              >
            </div>
            <div class="mt-3 sm:mt-0">
              A.-Volta-Straße 13/A - 39100 Bozen/South Tyrol - Italy<br />
              P.IVA 02595720216<br />
              <a href="https://noi.bz.it" class="hover:underline">noi.bz.it</a>
            </div>
          </div>
        </div>
        <div
          class="m-4 md:m-5 mt-0 xl:mt-5 flex flex-row xl:flex-col justify-between"
        >
          <div
            class="flex-1 order-first xl:order-last flex flex-col justify-center"
          >
            <div class="text-left xl:text-right text-xs md:text-lg font-bold">
              Developed by
              <a href="https://rmb.bz.it/" class="hover:underline"
                >Martin Rabanser</a
              >
              and
              <a href="https://gappc.net" class="hover:underline"
                >Christian Gapp</a
              >
            </div>
          </div>
          <div class="flex-1 order-last xl:order-first flex justify-end">
            <a href="https://davinci.bz.it"
              ><img
                src="~/static/davinci.png"
                alt="Davinci - Big Data"
                class="image-davinci"
            /></a>
          </div>
        </div>
      </div>
    </div>

    <portal-target name="modals"></portal-target>
  </div>
</template>

<script>
export default {
  computed: {
    year() {
      return new Date().getUTCFullYear()
    }
  }
}
</script>

<style>
#layout {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @apply text-black;
}

.image-noi {
  width: auto;
  height: 40px;

  @screen sm {
    height: 50px;
  }

  @screen xl {
    height: 65px;
  }
}

.image-efre-fesr {
  width: auto;
  height: auto;

  @screen sm {
    height: 90px;
  }

  @screen xl {
    height: 100px;
  }
}

.image-davinci {
  width: auto;
  height: auto;
  max-height: 50px;

  @screen md {
    height: 60px;
  }
}
</style>
