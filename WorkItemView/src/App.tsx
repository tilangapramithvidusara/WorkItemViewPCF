import * as React from 'react'
import ListView from './components/ListView'
// import ImageIcon from "./../images/dots.png";

interface MyComponentProps {
  imageUrl: any;
}

const  App: React.FC<MyComponentProps> = ({ imageUrl }) => {
  console.log("qq==.>", imageUrl);
  
  return (
    <div>
      <ListView imageUrl={imageUrl} />
    </div>
  )
}

export default App;
