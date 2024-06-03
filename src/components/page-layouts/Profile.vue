<template>
  <!--begin::Navbar-->
  <div class="card mb-5 mb-xxl-8">
    <div class="card-body pt-9 pb-0">
      <!--begin::Details-->
      <div class="d-flex flex-wrap flex-sm-nowrap mb-3">
        <!--begin: Pic-->

        <!--end::Pic-->

        <!--begin::Info-->
        <div class="flex-grow-1">
          <!--begin::Title-->
          <div
            class="d-flex justify-content-between align-items-start flex-wrap mb-2"
          >
            <!--begin::User-->
            <div class="d-flex flex-column">
              <!--begin::Name-->

              <!--end::Name-->

              <!--begin::Info-->
              <div class="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">

                <a
                  href="#"
                  class="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                >
                  <KTIcon icon-name="geolocation" icon-class="fs-4 me-1" />
                  Macul, Santiago, Chile
                </a>
              </div>
              <!--end::Info-->
            </div>


          </div>
          <!--end::Title-->

          <!--begin::Stats-->
          <div class="d-flex flex-wrap flex-stack">
            <!--begin::Wrapper-->
            <div class="d-flex flex-column flex-grow-1 pe-8">
              <!--begin::Stats-->
              <div class="d-flex flex-wrap">
                <!--begin::Stat-->
                <div
                  class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3"
                >
                  <!--begin::Number-->
                  <div class="d-flex align-items-center">
                    <KTIcon
                      icon-name="heart"
                      icon-class="fs-3 text-danger me-2"
                    />
                    <div
                      class="fs-2 fw-bold"
                      data-kt-countup="true"
                      data-kt-countup-value="75"
                    >
                      {{ totalFavorites }}
                    </div>
                  </div>
                  <!--end::Number-->

                  <!--begin::Label-->
                  <div class="fw-semibold fs-6 text-gray-500">Favoritos</div>
                  <!--end::Label-->
                </div>
                <!--end::Stat-->
              </div>
            </div>

          </div>
          <!--end::Stats-->
        </div>
        <!--end::Info-->
      </div>
      <!--end::Details-->

      <!--begin::Navs-->
      <div class="d-flex overflow-auto h-55px">
        <ul
          class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold flex-nowrap"
        >
          <li class="nav-item">
            <router-link
              class="nav-link text-active-primary me-6"
              to="/crafted/pages/profile/favorites"
              active-class="active"
            >
              Mis favoritos
            </router-link>
          </li>
          <!--end::Nav item-->
        </ul>
      </div>
      <!--begin::Navs-->
    </div>
  </div>
  <!--end::Navbar-->
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "profile-page-layout",

  setup() {
    const totalFavorites = ref(0);

    onMounted(() => {
      const userSessionId = localStorage.getItem("userSessionId");
      if (userSessionId) {
        const favorites = JSON.parse(localStorage.getItem(userSessionId) || "[]");
        totalFavorites.value = favorites.length;
      }
    });

    return {
      totalFavorites
    };
  },
});
</script>
