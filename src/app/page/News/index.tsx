import { IPersonaProps } from "@fluentui/react";
import { useState } from "react";
import Picker from "src/app/common/Picker";

const peoples: IPersonaProps[] = [
  {
    text: 'Annie Lindqvist',
    secondaryText: 'Designer',
  },
  {
    text: 'Aaron Reid',
    secondaryText: 'Designer',
  },
  {
    text: 'Alex Lundberg',
    secondaryText: 'Software Developer',
  },
];
const NewsPost = () => {
  const [a, setA] = useState<IPersonaProps[]>(peoples);

  

  return(
    <div>
      <Picker
        label={"Chọn bệnh"}
        onChangeCallBack={(value) => setA(value)}
        value={a}
      />
      <button onClick={() => alert(JSON.stringify(a))}>click</button>
    </div>  
  )
}

export default NewsPost;