<template>
  <div class="main-container">
    <card class="search-card">
      <div class="search-container">
        <svg
          enable-background="new 0 0 515.558 515.558"
          viewBox="0 0 515.558 515.558"
          xmlns="http://www.w3.org/2000/svg"
          class="search-icon"
        >
          <path
            d="m378.344 332.78c25.37-34.645 40.545-77.2 40.545-123.333 0-115.484-93.961-209.445-209.445-209.445s-209.444 93.961-209.444 209.445 93.961 209.445 209.445 209.445c46.133 0 88.692-15.177 123.337-40.547l137.212 137.212 45.564-45.564c0-.001-137.214-137.213-137.214-137.213zm-168.899 21.667c-79.958 0-145-65.042-145-145s65.042-145 145-145 145 65.042 145 145-65.043 145-145 145z"
            fill="#b4b5bf"
          />
        </svg>
        <input
          v-model="name"
          type="text"
          class="search-input"
          placeholder="Search for name"
          @input="searchDebounce"
          @focus="onFocus"
          @blur="onBlur"
          @keydown="onKeydown"
        >
      </div>
      <div class="search-results-container" :class="{'show': hasFocus }">
        <div v-if="!isEmpty(queryResult) && !isEmpty(name)" class="result-container">
          <span class="result-title">Results</span>
          <div v-if="!isEmpty(queryResult.country)" class="result" @click="onSelection(queryResult)">
            <span>{{ queryResult.name }}</span>
            <div class="select-container">
              <span>Select</span>
              <img src="@/assets/images/enter-key.svg" alt="enter-key" class="enter-key">
            </div>
          </div>
          <div v-else class="no-result">
            <span>No Result</span>
          </div>
        </div>
        <div class="result-container">
          <span class="result-title">Recent</span>
          <div v-if="!isEmpty(results)">
            <div
              v-for="(result, resultIdx) in results"
              :key="resultIdx"
              class="result"
            >
              <span>{{ result.name }}</span>
              <div class="select-container">
                <span>Select</span>
                <img src="@/assets/images/enter-key.svg" alt="enter-key" class="enter-key">
              </div>
            </div>
          </div>
          <div v-else class="no-result">
            <span>No recent searches</span>
          </div>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import _ from 'lodash'

export default {
  data () {
    return {
      name: '',
      searchDebounce: Function,
      isEmpty: _.isEmpty,
      hasFocus: false
    }
  },
  computed: {
    results: {
      get () {
        return this.$store.state.nationality.results
      }
    },
    queryResult: {
      get () {
        return this.$store.state.nationality.queryResult
      }
    }
  },
  created () {
    this.searchDebounce = _.debounce(this.onSearchDebounce.bind(this), 500)
  },
  methods: {
    ...mapActions({
      fetchNationality: 'nationality/fetchNationalityByName',
      onSelection: 'nationality/setSelectedResult'
    }),
    async onSearchDebounce () {
      await this.fetchNationality(this.name)
    },
    onFocus () {
      this.hasFocus = true
    },
    onBlur () {
      this.hasFocus = false
    },
    onKeydown (event) {
      if (event.code === 'Enter') {
        // @TODO: Get first result or recent search
      } else if (event.code === 'Escape') {
        this.onBlur()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  @apply flex flex-col h-screen min-h-screen;
  background-color: #cfd1dd;
}
.search {
  &-card {
    @apply w-9/12 md:w-6/12 rounded-md mx-auto mt-5 overflow-hidden;
  }
  &-container {
    @apply flex items-center space-x-3 p-4;
  }
  &-icon {
    height: 20px;
    width: 20px;
  }
  &-input {
    @apply w-full focus:outline-none placeholder-gray-300;
  }
  &-results {
    &-container {
      @apply border-t border-gray-200 p-0 overflow-auto;
      transition: all 0.2s ease-in;
      max-height: 0;
      opacity: 0;

      &.show {
        @apply p-3;
        max-height: 50vh;
        opacity: 1;
      }

      .result {
        @apply flex justify-between cursor-pointer ml-2 rounded-md p-2 hover:bg-gray-200;

          .select-container {
            @apply hidden items-center text-gray-500;
            font-size: 12px;
          }

          .enter-key {
            @apply ml-2;
            height: 16px;
            width: 16px;
          }

        &:hover {
          .select-container {
            @apply flex;
          }
        }

        &-container {
          @apply flex flex-col mb-2;

          .no-result {
            @apply text-gray-500 ml-2;
            font-size: 12px;
          }
        }
        &-title {
          @apply text-gray-500;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
