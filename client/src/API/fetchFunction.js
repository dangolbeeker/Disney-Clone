export const fetchFunction = (templateUrl, dispatch, action) => {
  fetch(templateUrl)
    .then(res => res.json())
    .then(data => dispatch(action(data.results)))
    .catch(err => console.error(err));
}