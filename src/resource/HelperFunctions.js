const HelperFunctions = (() => {
  return {

    calculateTotalPage: (itemCount) => {
      let totalPage = Math.ceil(itemCount / 5)

      if (totalPage === 0) {
        totalPage = 1
      }
      return totalPage
    },

    getLinkListFromLocalStorage: () => {
      let items = localStorage.getItem('hbChallenge')
      if (items === null) {
        return []
      } else {
        return JSON.parse(items)
      }
    },

    setLinkListToLocalStorage: (items) => {
      localStorage.setItem('hbChallenge', JSON.stringify(items))
    }

  }
})()

export default HelperFunctions
