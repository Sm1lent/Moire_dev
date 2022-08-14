/* eslint-disable */
export default function mySelect(){
  document.addEventListener('DOMContentLoaded', () => {
    // MY SELECT - шкурка для селектов
    const mySelects = document.querySelectorAll('.my-select')

    for (let mySelect of mySelects) {
      runMySelect(mySelect)
    }

    function runMySelect(selectWrap) {
      const select = selectWrap.querySelector('select')
      const selectSkin = selectWrap.querySelector('.select-skin')
      const optionsList = selectWrap.querySelector('.options-list-skin')

      select.classList.add('origin-select')
      select.setAttribute('tabindex','-1')

      updateSelectSkinValue()

      optionsList.addEventListener('click', (e) => {
        if (e.target.classList.contains('option-skin')) {
          select.value = e.target.textContent
          optionsList.classList.remove('is-opened')
          updateSelectSkinValue()
        }
      })

      selectSkin.addEventListener('click', ()=>{
        optionsList.classList.toggle('is-opened')
      })

      function updateSelectSkinValue() {
        selectSkin.value = select.value
      }
    }

    //скрываем скин селекта при клике мимо него
    document.addEventListener('click', (e)=> {
      const openedOptionsList = document.querySelector('.options-list-skin.is-opened')
      if (openedOptionsList && !e.target.classList.contains('select-skin') && !e.target.classList.contains('origin-select')) {
        openedOptionsList.classList.remove('is-opened')
      }
    })
  })
}
