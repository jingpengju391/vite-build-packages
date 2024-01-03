import { FormInstance, FormItemInstance } from 'element-plus'
import { Component } from 'vue'
export interface Form extends Partial<FormInstance> {
}
export interface FormItem extends Partial<FormItemInstance> {
    component?: Component
}

// export type DatabaseModule = ModuleOption<State, Getters, Mutations, Actions>