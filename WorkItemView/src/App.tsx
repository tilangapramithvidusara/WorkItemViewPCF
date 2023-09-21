import * as React from 'react'
import ListView from './components/ListView'
// import ImageIcon from "./../images/dots.png";

interface MyComponentProps {
  imageUrl: any;
  defaultimageUrl: any;
}

const  App: React.FC<MyComponentProps> = ({ imageUrl, defaultimageUrl }) => {  
  return (
    <div>
      <ListView imageUrl={imageUrl} defaultimageUrl={defaultimageUrl} />
    </div>
  )
}

export default App;
