import {MENUCLICK, TEST} from './types'

export const testAction = (data) => ({type: TEST, data: data})

export const menuListClickAction = (data) => ({type: MENUCLICK, data: data})