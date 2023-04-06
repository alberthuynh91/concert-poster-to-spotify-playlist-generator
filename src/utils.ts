function onlyLettersAndNumbers(str: string) {
	return /^[A-Za-z0-9]*$/.test(str);
}

// TODO: Improve this function as it only returns back some of the artists
export const parseArtistsFromOcrString = (ocrString: string): string[] => {
  const splitString = ocrString.split(' - ')
  const filteredList = []
  splitString.forEach((item) => {
    const lowered = item.toLowerCase().replace(/\s/g, '')
    // contains only letters and numbers
    if (onlyLettersAndNumbers(lowered)) {
      // console.log(`found only letters/numbers: `, item)
      filteredList.push(item)
    } else if (item.split(/[^A-Za-z0-9]/).length === 2) {
      // filteredList = filteredList.concat(item.split(/[^A-Za-z0-9]/))
      filteredList.push(item.split(/[^A-Za-z0-9]/)[0])
      filteredList.push(item.split(/[^A-Za-z0-9]/)[1])
    } 
  })
  return filteredList
}