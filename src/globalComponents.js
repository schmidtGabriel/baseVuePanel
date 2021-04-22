import fgInput from './components/UIComponents/Inputs/formGroupInput'
import fgTextarea from './components/UIComponents/Inputs/formGroupTextarea'
import fgSelect from './components/UIComponents/Inputs/formGroupSelect'
import fgCheckbox from './components/UIComponents/Inputs/formGroupCheckbox'
import DropDown from './components/UIComponents/Dropdown'
import BtnBlock from './components/UIComponents/Buttons/ButtonBlock';
import BtnRounded from './components/UIComponents/Buttons/ButtonRounded';
import SideBarMobile from './components/UIComponents/SidebarPlugin/SideBarMobile'
import {Pagination} from 'vue-pagination-2';

/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install (Vue) {
    Vue.component('fg-input', fgInput)
    Vue.component('fg-textarea', fgTextarea)
    Vue.component('fg-select', fgSelect)
    Vue.component('fg-checkbox', fgCheckbox)
    Vue.component('drop-down', DropDown)
    Vue.component('btn-block', BtnBlock)
    Vue.component('btn-rounded', BtnRounded)
    Vue.component('sidebarMob', SideBarMobile)
    Vue.component('pagination', Pagination);




  }
}

export default GlobalComponents
