const _getDOMElements = id => {
  return document.getElementById(id)
}

export const mapListToDOMElements = listOfIds => {

  const _viewElements = {};

  for (const id of listOfIds) {
    _viewElements[id] = _getDOMElements(id)
  }

  return _viewElements;
}