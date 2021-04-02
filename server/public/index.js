console.log('fetch')

fetch('admin')
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })

