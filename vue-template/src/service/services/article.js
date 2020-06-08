import axios from '@/modules/axios'

class Article {
  constructor() {}
  test = () => axios.get('/test/test')
}

export default Article
