<template>
  <div @click="toggleFavorite" class="heart-icon">
    <i :class="isFavorite ? 'fas fa-heart' : 'far fa-heart'"></i>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "HeartIcon",
  props: {
    initialIsFavorite: {
      type: Boolean,
      default: false
    },
    eventId: {
      type: String,
      required: true
    }
  },
  setup(props,{emit}) {
    const isFavorite = ref(props.initialIsFavorite);

    const toggleFavorite = () => {
      isFavorite.value = !isFavorite.value;

      // Guarda los favoritos del usuario en el LocalStorage
      const userSessionId = localStorage.getItem("userSessionId");
      if (userSessionId) {
        const favorites = JSON.parse(localStorage.getItem(userSessionId) || "[]");

        if (isFavorite.value) {
          // Agrega el evento a los favoritos si el usuario lo marcó como favorito
          favorites.push(props.eventId);
        } else {
          // Elimina el evento de los favoritos si el usuario lo desmarcó como favorito
          const index = favorites.indexOf(props.eventId);
          if (index > -1) {
            favorites.splice(index, 1);
          }
        }

        localStorage.setItem(userSessionId, JSON.stringify(favorites));
        emit("favorite-changed", props.eventId);
      }
    };

    return {
      isFavorite,
      toggleFavorite
    };
  }
});
</script>

<style scoped>
.heart-icon {
  position: absolute;
  top: 50px;
  right: 50px;
  cursor: pointer;
}

.heart-icon .fas.fa-heart {
  color: red; /* Marca el corazón en rojo cuando es un favorito */
}
</style>