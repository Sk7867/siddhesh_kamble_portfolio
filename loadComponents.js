let componetMap = [
  {
    componentId: 'headerComponent',
    htmlFilePath: './components/header/header.html',
    cssFilePath: './components/header/headerStyle.css'
  },
  {
    componentId: 'footerComponent',
    htmlFilePath: './components/footer/footer.html',
    cssFilePath: './components/footer/footerStyles.css'
  },
  {
    componentId: 'contentComponent',
    htmlFilePath: './components/content/content.html',
    cssFilePath: './components/content/contentStyles.css',
    jsFilePath: './components/content/content.js'
  },
]
function loadMainComponents(){
  componetMap.forEach((component) => {
    fetch(component.htmlFilePath)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      document.getElementById(component.componentId).innerHTML = data;
      // Load the header CSS
      const linkElement = document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.type = 'text/css';
      linkElement.href = component.cssFilePath;  // Path to the header.css file
      document.head.appendChild(linkElement);

      if(component.jsFilePath){
        let scriptElement = document.createElement('script');
        scriptElement.src = component.jsFilePath;
        document.body.appendChild(scriptElement);
      }
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  })
}
// Call the function to load the components
loadMainComponents();

// function loadHeaderComponent() {
//   fetch('./components/header/header.html')
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.text();
//     })
//     .then(data => {
//       document.getElementById('headerComponent').innerHTML = data;
//       // Load the header CSS
//       const linkElement = document.createElement('link');
//       linkElement.rel = 'stylesheet';
//       linkElement.type = 'text/css';
//       linkElement.href = './components/header/headerStyle.css';  // Path to the header.css file
//       document.head.appendChild(linkElement);
//     })
//     .catch(error => {
//       console.error('There has been a problem with your fetch operation:', error);
//     });
// }
// function loadFooterComponent() {
//   fetch('./components/footer/footer.html')
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.text();
//     })
//     .then(data => {
//       document.getElementById('footerComponent').innerHTML = data;
//     })
//     .catch(error => {
//       console.error('There has been a problem with your fetch operation:', error);
//     });
// }

// Call the function to load the header component
// loadHeaderComponent();
// loadFooterComponent();