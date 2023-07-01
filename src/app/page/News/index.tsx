import { IPersonaProps } from "@fluentui/react";
import Api from "api";
import { useState } from "react";
import Picker from "src/app/common/Picker";

const NewsPost = () => {
  const [a, setA] = useState<IPersonaProps[]>(undefined);

  const mappingValues = (datas) => {
    const values = datas.map(e => {
      return {
        displayName: e.name,
        text: e.name,
        secondaryText: e.designation,
        id: e._id,
        usage: e.usage
      }
    })
    return values
  }

  return(
    <div>
      <Picker
        label={"Chọn bệnh"}
        onChangeCallBack={(value) => setA(value)}
        value={a}
        integrateItems={Api.medicationApi.pickerMedication}
        mappingValues={mappingValues}
      />
      <button onClick={() => alert(JSON.stringify(a))}>click</button>
    </div>  
  )
}

export default NewsPost;