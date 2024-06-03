<template>
  <!--begin::Dashboard-->
  <div class="row gy-5 g-xl-12">
    <div class="card card-dashed">
      <div class="card-header">
        <h3 class="card-title">Actividades</h3>
      </div>
      <div class="row">
        <div class="col-4">
          <div class="row g-12 g-xl-12">
            <div class="col-md-12 col-xl-12 p-6" v-if="!eventStore.loading && eventStore.events"
                 v-for="event in eventStore.events"
                 :key="event.id">

              <div class="card card-dashed">
                <HeartIcon :initialIsFavorite="favorites.includes(event.id)" :eventId="event.id" />
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

        </div>
        <div class="col-8">
          <div id="map" style="height:90vh;"></div>
        </div>
      </div>
    </div>
  </div>
  <!--end::Dashboard-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, nextTick } from "vue";
import { useEventStore } from "../stores/eventStore";
import HeartIcon from "@/components/widgets/HeartIcon.vue";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { marker } from "leaflet";

export default defineComponent({
  name: "main-dashboard",
  components: {
    HeartIcon
  },

  setup() {

    const eventStore = useEventStore();

    // Recupera los favoritos del usuario desde el LocalStorage
    const userSessionId = localStorage.getItem("userSessionId");
    const favorites = ref(userSessionId ? JSON.parse(localStorage.getItem(userSessionId) || "[]") : []);


    onMounted(async () => {
      const initialMap = ref<L.Map | null>(null);
      // const markers = ref([]);

      await eventStore.fetchEvents();
      const markers = eventStore.events.map(event => {
        return event.location;
      });

      await nextTick();
      initialMap.value = L.map("map").setView([-33.4489, -70.6693], 13);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>"
      }).addTo(initialMap.value);

      markers.forEach(marker => {
        const position = [marker[1], marker[0]];
        L.marker(position).addTo(initialMap.value);
      });
    });

    return {
      eventStore,
      favorites
    };
  }

});
</script>
