<template>
  <!--begin::Campaigns toolbar-->
  <div class="d-flex flex-wrap flex-stack my-5">
    <!--begin::Title-->
    <h2 class="fw-semibold my-2">
      Favoritos
    </h2>
    <!--end::Title-->
  </div>
  <!--end::Campaigns toolbar-->
  <div class="row g-6 g-xl-12">
    <div class="col-md-4 col-xl-4" v-if="eventStore && !eventStore.loading && eventStore.events"
         v-for="event in eventStore.events.filter(e => favorites.includes(e.id))"
         :key="event.id">

      <div class="card card-dashed">
        <HeartIcon :initialIsFavorite="favorites.includes(event.id)" :eventId="event.id"
                   @favorite-changed="handleFavoriteChanged" />
        <div class="card-body">

          <div class="card-header">
            <h3 class="card-title">{{ event.title }}</h3>
          </div>
          <div class="card-body">
            <p>Categoría: {{ event.category }}</p>
            <p>Inicio: {{ event.start }}</p>
            <p>Fin: {{ event.end }}</p>
            <p>Ubicación: {{ event.location.join(", ") }}</p>
            <div v-if="event.entities.length > 0">
              <h4>Entidades:</h4>
              <ul>
                <li v-for="entity in event.entities" :key="entity.entity_id">
                  {{ entity.name }} - {{ entity.formatted_address }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref, watch } from "vue";
import { useEventStore } from "../../../../stores/eventStore";
import HeartIcon from "@/components/widgets/HeartIcon.vue";

export default defineComponent({
  name: "profile-campaigns",
  components: {
    HeartIcon
  },
  setup() {
    const eventStore = useEventStore();

    const userSessionId = localStorage.getItem("userSessionId");
    const favorites = ref(userSessionId ? JSON.parse(localStorage.getItem(userSessionId) || "[]") : []);

    watch(favorites, () => {
      eventStore.fetchEvents();
    }, { deep: true });

    onMounted(() => {
      eventStore.fetchEvents();
    });

    const handleFavoriteChanged = (eventId) => {
      const index = favorites.value.indexOf(eventId);
      if (index > -1) {
        favorites.value.splice(index, 1);
      }
    };
    return {
      getAssetPath,
      favorites,
      eventStore,
      handleFavoriteChanged
    };
  }
});
</script>
