<template>
  <!--begin::Dashboard-->
  <div class="row gy-5 g-xl-12">
    <div class="card card-dashed">
      <div class="card-header">
        <h3 class="card-title">Actividades</h3>
      </div>
      <div class="row g-6 g-xl-12">
        <div class="col-md-4 col-xl-4" v-if="!eventStore.loading && eventStore.events"
             v-for="event in eventStore.events"
             :key="event.id">
          <div class="card card-dashed" >
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
  </div>
  <!--end::Dashboard-->
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import KTModalCard from "@/components/cards/Card.vue";
import KTCard from "@/components/cards/Card1.vue";
import { useEventStore } from "../stores/eventStore";

export default defineComponent({
  name: "main-dashboard",
  components: {
    KTCard

  },
  setup() {

    const eventStore = useEventStore();

    onMounted(() => {
      eventStore.fetchEvents();
    });

    return {
      eventStore
    };
  }

});
</script>
