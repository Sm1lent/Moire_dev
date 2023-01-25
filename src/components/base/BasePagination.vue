<template>
<!-- eslint-disable -->
	<div class="catalog__pagination pagination">
    <a class="pagination__link pagination__link--arrow" :class="{'pagination__link--disabled' : page === 1}" @click.prevent="paginate(page - 1)" href="#" aria-label="Предыдущая страница"></a>
    <ul class="pagination__pages">
      <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
				<a class="pagination__link" :class="{'pagination__link--current' : pageNumber === page}" href="#" @click.prevent="paginate(pageNumber)">
					{{ pageNumber }}
				</a>
		  </li>
    </ul>
    <a class="pagination__link pagination__link--arrow"  :class="{'pagination__link--disabled' : page === pages}" @click.prevent="paginate(page + 1)" href="#" aria-label="Следующая страница"></a>
	</div>
</template>

<script>
/* eslint-disable */
	export default {
		name: 'base-pagination',
		model: {
			prop: 'page',
			event: 'paginate'
		},

		props: {
			page: Number,
			count: Number,
			perPage: Number
		},

		computed: {
			pages() {
				return Math.ceil(this.count / this.perPage)
			},
		},

		methods: {
			paginate(page) {
				this.$emit('paginate', page);
			},
		}
	}
</script>

<style lang="scss">
  .pagination {
    justify-self: center;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__pages {
      display: flex;
      gap: 30px;
    }

    &__link {
      font-size: 16px;
      line-height: 22px;
      color: var(--inactive-page-num-color);
      &--current {
        font-weight: 700;
        color: var(--black)
      }
      &--disabled {
        pointer-events: none;
      }

      &--arrow {
        position: relative;
        width: 40px;
        height: 40px;
        border-radius: 100%;
        border: 1px solid var(--pag-btn-color);
        &::after {
          position: absolute;
          content: '';
          width: 8px;
          height: 8px;
          left: calc(50% - 4px);
          top: calc(50% - 4px);
          border-right: 1px solid var(--pag-btn-color);
          border-bottom: 1px solid var(--pag-btn-color);
          transform: rotate(-45deg);
        }
        &:first-child {
          margin-right: 39px;
          transform: rotate(180deg);
        }
        &:last-child {
          margin-left: 39px;
        }
        &:not(.pagination__link--disabled) {
          border-color: var(--black);
          &::after {
            border-color: var(--black);
          }
        }

      }
    }
  }

  @media (max-width: 620px) {
    .pagination {
      &__pages {
        gap: 15px;
      }
      &__link--arrow {
        &:first-child {
          margin-right: 24px;
        }
        &:last-child {
          margin-left: 24px;
        }
      }
    }
  }
</style>
