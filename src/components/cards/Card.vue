<template>
  <!--begin::Card-->
  <div class="card">
    <!--begin::Card body-->
    <div class="card-body p-0">
      <!--begin::Heading-->
      <div class="card-px text-center py-20 my-10">
        <!--begin::Title-->
        <h2 class="fs-2x fw-bold mb-10">{{ title }}</h2>
        <!--end::Title-->

        <!--begin::Description-->
        <p class="text-gray-500 fs-5 fw-semibold mb-13">
          <span v-html="description"></span>
        </p>
        <!--end::Description-->

        <!--begin::Action-->

        <!--end::Action-->
      </div>
      <!--end::Heading-->

      <!--begin::Illustration-->
      <div class="text-center px-5">
        <img :src="image" alt="" class="mw-100 mh-300px" />
      </div>
      <!--end::Illustration-->
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "modal-card",
  props: {
    title: String,
    description: String,
    buttonText: String,
    image: String,
    modalId: String,
  },
  components: {},
});
</script>
