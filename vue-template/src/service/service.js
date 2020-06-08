// 引入service类
import article from './services/article'
const services = [article]
// 引入axios
import axios from '@/modules/axios'

import mixinClass from './serviceUtil'

class MixedService extends mixinClass(...services) {
  constructor(props) {
    super(props)
    this.instance = null
  }
  static getSingletonInstance = () => {
    if (!this.instance) {
      this.instance = new MixedService()
    }
    return this.instance
  }
  getAxiosInstance = () => axios
}

export default MixedService.getSingletonInstance()
