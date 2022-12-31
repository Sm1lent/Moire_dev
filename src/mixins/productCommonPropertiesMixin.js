/* eslint-disable */
import numberFormat from '@/helpers/numberFormat'

export default {
  data(){
    return {
      productColorCode: '',
    }
  },
  methods: {
    getImage(){
      if(this.currentColor){
        try {
          return this.currentColor.gallery[0].file.url
        }
        catch{
          return './img/svg/no-img.svg'
        }
      }
      return ''
    },
    getColor(color){
      return color ? color.code : '#fff';
    }
  },
  computed: {
    currentColor(){
      return this.productColorCode ? this.product.colors.find(item => item.color.code === this.productColorCode) : ''
    }
  },
  filters: {
    numberFormat
  },
}
