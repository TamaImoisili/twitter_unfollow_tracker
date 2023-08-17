import type { AxiosInstance } from 'axios'
import type { InjectionKey } from 'vue'

export const ServerKey: InjectionKey<AxiosInstance> = Symbol('Server')
